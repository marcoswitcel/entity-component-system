
function clone(object) {
    return Object.assign(Object.create(null), object);
}
function component(name, componentScheme) {
    component.registeredComponent[name] = Object.assign(Object.create(null), componentScheme)

    return component.registeredComponent[name];
}
component.registeredComponent = Object.create(null);
component.getByName = function componentGetByName(componentName) {
    return component.registeredComponent[componentName] || null
}

component('gravity', {
    x : 0,
    y : -0.7,
})

component('renderable', {
    canRender: true
})

component('shape-circle', {
    type: 'circle',
    radius: 15,
    color: 'blue',
})

component('shape-circle02', {
    type: 'circle',
    radius: 30,
    color: 'red',
})

component('moveable', {
    dx: 9,
    dy: 27,
})

component('position', {
    x : 100,
    y:  100,
})

function entity({ components }) {
    const entity = Object.create(null);

    entity.components = []
    entity.componentsState = Object.create(null)

    for (let componentName of components) {
        entity.components.push(componentName);
        entity.componentsState[componentName] = clone(component.getByName(componentName))
    }

    return entity;
}

function entityWithComponent(...names) {
    return world.entities
        .filter(entity => {
            for (let name of names) {
                if (!entity.components.includes(name)) {
                    return false;
                }
            }
            return true;
        })
}

function hasComponent(entity, name) {
    return entity.components.includes(name)
}

function collisionSystem(world) {
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 600;

    for (let entity of entityWithComponent('position', 'moveable')) {
        if (hasComponent(entity, 'shape-circle') || hasComponent(entity, 'shape-circle02')) {
            let { x, y } = entity.componentsState['position'];
            // Referência do componente de movimento de uma dada entidade
            let moveable = entity.componentsState['moveable'];

            let { radius } = entity.componentsState['shape-circle'] || entity.componentsState['shape-circle02'];
    
            if (y + radius > CANVAS_HEIGHT || y - radius < 0) {
                moveable.dy *= -.9;
            }
            if (x + radius > CANVAS_WIDTH || x - radius < 0) {
                moveable.dx *= -.9;
            }
        }
    }
}

function gravitySystem(world) {
    for (let entity of entityWithComponent('gravity', 'moveable')) {
        let moveable = entity.componentsState['moveable'];
        let { x, y } = entity.componentsState['gravity'];
        
        moveable.dx += x;
        moveable.dy -= y;
    }
}

function movementSystem(world) {
    for (let entity of entityWithComponent('position', 'moveable')) {
        entity.componentsState['position'].x += entity.componentsState['moveable'].dx
        entity.componentsState['position'].y += entity.componentsState['moveable'].dy
    }
}
function renderSystem(world) {
    clearScreen();
    for (let entity of entityWithComponent('renderable', 'position')) {
        if (entity.componentsState.renderable.canRender) {
            if (hasComponent(entity, 'shape-circle')) {
                drawCircle(
                    entity.componentsState['position'].x,
                    entity.componentsState['position'].y,
                    entity.componentsState['shape-circle'].radius,
                    entity.componentsState['shape-circle'].color,
                )
            }
            if (hasComponent(entity, 'shape-circle02')) {
                drawCircle(
                    entity.componentsState['position'].x,
                    entity.componentsState['position'].y,
                    entity.componentsState['shape-circle02'].radius,
                    entity.componentsState['shape-circle02'].color,
                )
            }
        }
    }
}

setInterval(function() {
    const components = ['moveable', 'position', 'renderable', Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02' ];
    if (Math.round(Math.random())) {
        components.push('gravity');
    }
    const entityInstance = entity({ components : components });

    world.entities.push(entityInstance);
} ,2000);

const world = {
    entities: [ ],
    systems : [ gravitySystem, movementSystem, collisionSystem, renderSystem ],
}

function updateWorld(world) {
    for (let system of world.systems) {
        system(world);
    }
}

var isRunning = true;
function loop(world) {
    isRunning && updateWorld(world);
    // setTimeout(() => loop(world), 1000/60);
    requestAnimationFrame(() => loop(world));
}

loop(world)