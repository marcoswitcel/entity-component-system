
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

component('moveable', {
    dx: 1,
    dy: 1,
})

component('position', {
    x : 0,
    y:  0,
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

const entity01 = entity({ components : ['moveable', 'position'] });
const entity02 = entity({ components : ['moveable', 'position'] });

function movementSystem(world) {
    for (let entity of world.entities) {
        entity.componentsState['position'].x += entity.componentsState['moveable'].dx
        entity.componentsState['position'].y += entity.componentsState['moveable'].dy
    }
}
function renderSystem(world) {
    clearScreen();
    for (let entity of world.entities) {
        drawCircle(
            entity.componentsState['position'].x,
            entity.componentsState['position'].y 
        )
    }
}

const world = {
    entities: [ entity01 ],
    systems : [ movementSystem, renderSystem ],
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