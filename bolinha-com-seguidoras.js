/**
* Start da simulação
*/


winStateDetector

const world = createWorld({
    entities: [ ],
    systems : [ controlsSystem, followSystem, gravitySystem, movementSystem, collisionSystem, damageSystem, winStateDetector, renderSystem ],
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
        'shape-circle'
    ]
})
newEntity01.componentsState.position.x = 100
newEntity01.componentsState.position.y = 100

queue.entitiesToInsert.push(newEntity01);

const enemyEntity = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        'shape-circle03',
        'vital-status',
        'enemy',
    ]
})
enemyEntity.componentsState.position.x = 300
enemyEntity.componentsState.position.y = 300

queue.entitiesToInsert.push(enemyEntity);

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
    for (let entity of entityWithComponent('following', 'velocity', 'position', 'acceleration')) {
        let actualEntityTarget = entity.componentsState['following'].target;
        
        if (actualEntityTarget !== enemyEntity) {
            entity.componentsState['following'].target = enemyEntity;
            setTimeout(function() {
                entity.componentsState['following'].target = actualEntityTarget;
            }, 2000);
            break;
        }
    }
});

{
    let followers = 0;
    setInterval(function() {
    
        if (!isRunning || followers >= 5) return;
    
        // if (once) return;
        // once = true;
        const components = ['velocity', 'position', 'renderable', 'following', 'acceleration', 'shape-circle02' ];
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
        followers++;
    }, 500);
}