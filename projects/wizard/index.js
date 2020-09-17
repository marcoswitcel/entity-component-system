/**
* Start da simulação
*/
const floorTexture = new Image();
floorTexture.src = '461223110.jpg';

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
        entitiesToInsert : [],
        entitiesToRemove : [],
    }
});

var isRunning = true;

const worldArea = entity({
    components : [ 'world-area' ]
})
world.queue.entitiesToInsert.push(worldArea);

for (let i = 0; i < 10; i++) {
    let enemyEntity = entity({
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
    enemyEntity.componentsState.position.x = (CANVAS_WIDTH/2) + Math.floor(Math.random() * (CANVAS_WIDTH) - (CANVAS_WIDTH/2))
    enemyEntity.componentsState.position.y = (CANVAS_HEIGHT/2) + Math.floor(Math.random() * (CANVAS_HEIGHT) - (CANVAS_HEIGHT/2))

    enemyEntity.componentsState.enemy.velocityFactor = (Math.random() * 500) * 60
    
    world.queue.entitiesToInsert.push(enemyEntity);
}


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
newEntity01.componentsState.position.x = (CANVAS_WIDTH/2)/2
newEntity01.componentsState.position.y = (CANVAS_HEIGHT/2)/2

world.queue.entitiesToInsert.push(newEntity01);

function loop(world) {
    for (let entity of world.queue.entitiesToInsert) {
        world.entities.push(entity)
    }
    world.queue.entitiesToInsert = [];

    world.entities = world.entities.filter((x) => !world.queue.entitiesToRemove.includes(x));
    world.queue.entitiesToRemove = [];


    isRunning && updateWorld(world);
    // setTimeout(() => loop(world), 1000/60);
    requestAnimationFrame(() => loop(world));
}

startLoop(world, loop);


canvasElement.addEventListener('click', function(event) {
    const enemies = entityWithComponent('enemy');
    const enemyEntity = enemies[0];

    // Se houver pelo menos un inimigo no mapa essa variável terá a referência do mesmo
    if (enemyEntity) {
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
    
        entityInstance.componentsState.position.x = (CANVAS_WIDTH/2) + Math.floor(Math.random() * (CANVAS_WIDTH) - (CANVAS_WIDTH/2))
        entityInstance.componentsState.position.y = (CANVAS_HEIGHT) + Math.floor(Math.random() * (CANVAS_HEIGHT) - (CANVAS_HEIGHT))
        // Velocity
        entityInstance.componentsState.velocity.dy = Math.floor(Math.random() * 10 - 5)
        entityInstance.componentsState.velocity.dx = Math.floor(Math.random() * 10 - 5)
    
        // Following the player
        entityInstance.componentsState.following.target = newEntity01;
    
    
        world.queue.entitiesToInsert.push(entityInstance)
        followers++;
    }, 800);
}