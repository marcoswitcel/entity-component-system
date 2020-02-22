/**
* Start da simulação
*/

// var once =  false;
// setInterval(function() {

//     if (!isRunning) return;

//     // if (once) return;
//     // once = true;
//     const components = ['velocity', 'position', 'renderable', 'acceleration', Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02' ];
//     if (1 || Math.round(Math.random())) {
//         components.push('gravity');
//     }
//     const entityInstance = entity({ components : components });

//     queue.entitiesToInsert.push(entityInstance)
// }, 2000);

const world = createWorld({
    entities: [ ],
    systems : [ controlsSystem, gravitySystem, movementSystem, collisionSystem, renderSystem ],
});

var isRunning = true;
const queue = {
    entitiesToInsert : []
}

const newEntity01 = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        'input-control',
        // 'gravity',
        Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02'
    ]
})
newEntity01.componentsState.position.x = 100
newEntity01.componentsState.position.y = 100

const newEntity02 = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        // 'gravity',
        Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02'
    ]
})
newEntity02.componentsState.position.x = 200
newEntity02.componentsState.position.y = 200

queue.entitiesToInsert.push(newEntity01);
queue.entitiesToInsert.push(newEntity02);

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