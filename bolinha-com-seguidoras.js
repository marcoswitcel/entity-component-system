/**
* Start da simulação
*/

const world = createWorld({
    entities: [ ],
    systems : [ controlsSystem, followSystem, gravitySystem, movementSystem, collisionSystem, renderSystem ],
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

queue.entitiesToInsert.push(newEntity01);

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

    const components = ['velocity', 'position', 'renderable', 'acceleration', Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02' ];
    if (1 || Math.round(Math.random())) {
        components.push('gravity');
    }
    const entityInstance = entity({ components : components });

    entityInstance.componentsState.position.x = offsetX
    entityInstance.componentsState.position.y = offsetY
    // Velocity
    entityInstance.componentsState.velocity.dy = Math.floor(Math.random() * 10 - 5)
    entityInstance.componentsState.velocity.dx = Math.floor(Math.random() * 10 - 5)


    queue.entitiesToInsert.push(entityInstance)
});

setInterval(function() {

    if (!isRunning) return;

    // if (once) return;
    // once = true;
    const components = ['velocity', 'position', 'renderable', 'following', 'acceleration', Math.round(Math.random()) ? 'shape-circle' : 'shape-circle02' ];
    if (1 || Math.round(Math.random())) {
        components.push('gravity');
    }
    const entityInstance = entity({ components : components });

    entityInstance.componentsState.position.x = 450 + Math.floor(Math.random() * 900 - 450)
    entityInstance.componentsState.position.y = 300 + Math.floor(Math.random() * 600 - 300)
    // Velocity
    entityInstance.componentsState.velocity.dy = Math.floor(Math.random() * 10 - 5)
    entityInstance.componentsState.velocity.dx = Math.floor(Math.random() * 10 - 5)

    // Following the player
    entityInstance.componentsState.following.target = newEntity01;


    queue.entitiesToInsert.push(entityInstance)
}, 2500);