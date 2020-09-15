/**
* Start da simulação
*/


const world = createWorld({
    entities: [ ],
    constraint: [
        function(world) {
            return [ !!entityWithComponent('input-control')[0] , 'o jogador está presente', 'o jogador está ausente'];
        },
        function(world) {
            return [ !!entityWithComponent('world-area')[0], 'world area presente', 'a entidade que delimita a área está ausente'];
        }
    ],
    systems : [ controlsSystem, enemyAI, followSystem, gravitySystem, movementSystem, collisionSystem, damageSystem, winStateDetector, renderSystem ],
    queue : {
        entitiesToInsert : []
    }
});

var isRunning = true;

const worldArea = entity({
    components : [ 'world-area' ]
})
world.queue.entitiesToInsert.push(worldArea);

const enemyEntity = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        'shape-circle03',
        'vital-status',
        'enemy',
        'movement',
    ]
})
enemyEntity.componentsState.position.x = 100;
enemyEntity.componentsState.position.y = 100;

world.queue.entitiesToInsert.push(enemyEntity);

const enemyEntity2 = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        'shape-circle03',
        'vital-status',
        'enemy',
        'movement',
    ]
})
enemyEntity2.componentsState.position.x = 200;
enemyEntity2.componentsState.position.y = 100;

world.queue.entitiesToInsert.push(enemyEntity2);

const newEntity01 = entity({
    components : [
        'velocity',
        'position',
        'renderable',
        'acceleration',
        'input-control',
        // 'gravity',
        'shape-circle',
        'movement',
        'vital-status',
    ]
})
newEntity01.componentsState.position.x = 450/2
newEntity01.componentsState.position.y = 300/2

world.queue.entitiesToInsert.push(newEntity01);

function loop(world) {
    for (let entity of world.queue.entitiesToInsert) {
        world.entities.push(entity)
    }

    world.queue.entitiesToInsert = [];

    isRunning && updateWorld(world);
    // setTimeout(() => loop(world), 1000/60);
    requestAnimationFrame(() => loop(world));
}

startLoop(world, loop);


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
        const components = ['velocity', 'position', 'renderable', 'following', 'acceleration', 'movement', 'shape-circle02' ];
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
    
    
        world.queue.entitiesToInsert.push(entityInstance)
        followers++;
    }, 800);
}