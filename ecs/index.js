
function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

const moveable = {
    dx: 0.5,
    dy: 0.5,
}

const position = {
    x : 0,
    y:  0,
}

const entity = {
    components : [ 'moveable', 'position' ],
    componentsState: {
        'position' : clone(position),
        'moveable' : clone(moveable),
    }
}

function movementSystem(world) {
    for (let entity of world.entities) {
        entity.componentsState['position'].x += entity.componentsState['moveable'].dx
        entity.componentsState['position'].y += entity.componentsState['moveable'].dy
    }
}

const world = {
    entities: [ entity ],
    systems : [ movementSystem ],
}

function updateWorld(world) {
    for (let system of world.systems) {
        system(world);
    }
}

function loop(world) {
    updateWorld(world)
    console.log(entity.componentsState.position.x)
    setTimeout(() => loop(world), 1000/60);
}

loop(world)