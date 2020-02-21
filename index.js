/**
* Start da simulação
*/

// var once =  false;
setInterval(function() {
    // if (once) return;
    // once = true;
    const components = ['velocity', 'position', 'renderable', 'acceleration', Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02' ];
    if (1 || Math.round(Math.random())) {
        components.push('gravity');
    }
    const entityInstance = entity({ components : components });

    world.entities.push(entityInstance);
}, 2000);

const world = createWorld({
    entities: [ ],
    systems : [ gravitySystem, movementSystem, collisionSystem, renderSystem ],
});

var isRunning = true;
const queue = {
    entitiesToInsert : []
}

function loop(world) {
    for (let entity of queue.entitiesToInsert) {
        world.entities.push(entity)
    }

    queue.entitiesToInsert = [];

    isRunning && updateWorld(world);
    // setTimeout(() => loop(world), 1000/60);
    requestAnimationFrame(() => loop(world));
}

loop(world)

canvasElement.addEventListener('click', function(event) {
    const { offsetX, offsetY } = event

    const newEntity = entity({
        components : [
            'velocity',
            'position',
            'renderable',
            'acceleration',
            'gravity',
            Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02'
        ]
    })

    newEntity.componentsState.position.x = offsetX
    newEntity.componentsState.position.y = offsetY

    queue.entitiesToInsert.push(newEntity)
});