/**
 * SYSTEMS
 */

function collisionSystem(world) {
    // Supõem que tem exatamente uma área
    const worldAreaEntity = entityWithComponent('world-area')[0];

    const { width : CANVAS_WIDTH, height : CANVAS_HEIGHT } = worldAreaEntity.componentsState['world-area'];

    for (let entity of entityWithComponent('position', 'velocity', 'acceleration')) {
        if (hasComponent(entity, 'shape-circle') || hasComponent(entity, 'shape-circle02') || hasComponent(entity, 'shape-circle03')) {
            let { x : xPos, y : yPos } = entity.componentsState['position'];
            // Referência do componente de movimento de uma dada entidade
            let acceleration = entity.componentsState['acceleration'];
            let velocity = entity.componentsState['velocity'];
            let position = entity.componentsState['position'];

            let { radius } = entity.componentsState['shape-circle'] || entity.componentsState['shape-circle02'] || entity.componentsState['shape-circle03'];
    
            if (yPos + radius > CANVAS_HEIGHT || yPos - radius < 0) {
                velocity.dy *= -1;
                if (yPos + radius > CANVAS_HEIGHT) {
                    position.y = CANVAS_HEIGHT - radius
                } else {
                    position.y = radius
                }
            }
            if (xPos + radius > CANVAS_WIDTH || xPos - radius < 0) {
                velocity.dx *= -1;
                if (xPos + radius > CANVAS_WIDTH) {
                    position.x = CANVAS_WIDTH - radius
                } else {
                    position.x = radius
                }
            }
        }
    }
}

function gravitySystem(world) {
    for (let entity of entityWithComponent('gravity', 'acceleration')) {
        let acceleration = entity.componentsState['acceleration'];
        let { x, y } = entity.componentsState['gravity'];

        acceleration.ax += x;
        acceleration.ay += y;
    }
}


function movementSystem(world) {

    for (let entity of entityWithComponent('position', 'velocity', 'movement')) {
        let velocity = entity.componentsState['velocity'];
        let acceleration =  entity.componentsState['acceleration']
        let position = entity.componentsState['position'];
        // Computando velocidade
        if (hasComponent(entity, 'acceleration')) {

            velocity.dx += acceleration.ax
            velocity.dy += acceleration.ay

            // Limitando velocidade
            if (Math.abs(velocity.dx) > 10) {
                velocity.dx = 10 * (velocity.dx / Math.abs(velocity.dx))
            }
            if (Math.abs(velocity.dy) > 10) {
                velocity.dy = 10 * (velocity.dy / Math.abs(velocity.dy))
            }
        }
        // Computando posição
        velocity.dx *= .99;
        velocity.dy *= .99;
        position.x += velocity.dx
        position.y += velocity.dy
    }
}

function renderSystem(world) {
    const worldAreaEntity = entityWithComponent('world-area')[0].componentsState['world-area'];
    const playerEntity = entityWithComponent('input-control')[0];
    const { x : playerPosX, y : playerPosY } = playerEntity.componentsState.position;
    const { width , height, background } = worldAreaEntity;
    const offsetX = window.width / 2;
    const offsetY = window.height / 2;

    clearScreen();

    drawRect(offsetX + (width/2) - playerPosX,offsetY + (height/2) - playerPosY,width, height, background)

    const entitiesInCameraView = entityWithComponent('renderable', 'position')
        .filter(entity => {
            const { x, y } = entity.componentsState.position;

            return Math.abs(playerPosX - x) < offsetX && Math.abs(playerPosY - y) < offsetY;
        })

    for (let entity of entitiesInCameraView) {
        let entityComponentsState = entity.componentsState;
        if (
            entityComponentsState.renderable.renderable &&
            entityComponentsState.renderable.canRender
        ) {

            let shape01 = hasComponent(entity, 'shape-circle');
            let shape02 = hasComponent(entity, 'shape-circle02');
            //let shape03 = hasComponent(entity, 'shape-circle03');
            let shapeComponentName = shape01 ? 
                'shape-circle' : shape02 ?
                'shape-circle02' : 'shape-circle03';

            if (hasComponent(entity, 'input-control')) {
                drawCircle(
                    offsetX,
                    offsetY,
                    entityComponentsState[shapeComponentName].radius,
                    entityComponentsState[shapeComponentName].color,
                );
                // Pinta a barra de vida
                if (hasComponent(entity, 'vital-status')) {
                    let { life, maxLife } = entityComponentsState['vital-status'];
                    let radius = entityComponentsState[shapeComponentName].radius;
                    let width = 75;
                    let height = 5;

                    drawRect(offsetX, offsetY - radius * 1.5, width, height, '#F0F8FF');
                    drawRect(offsetX, offsetY - radius * 1.5, width * (life/maxLife), height, 'red');
                }
            } else {    
                drawCircle(
                    offsetX + (entityComponentsState['position'].x - playerPosX),
                    offsetY + (entityComponentsState['position'].y - playerPosY),
                    entityComponentsState[shapeComponentName].radius,
                    entityComponentsState[shapeComponentName].color,
                );
                // Pinta a barra de vida
                if (hasComponent(entity, 'vital-status')) {
                    let { life, maxLife } = entityComponentsState['vital-status'];
                    let radius = entityComponentsState[shapeComponentName].radius;
                    let width = 75;
                    let height = 5;

                    drawRect(offsetX + (entityComponentsState['position'].x - playerPosX), offsetY + (entityComponentsState['position'].y - playerPosY) - radius * 1.5, width, height, '#F0F8FF');
                    drawRect(offsetX + (entityComponentsState['position'].x - playerPosX), offsetY + (entityComponentsState['position'].y - playerPosY) - radius * 1.5, width * (life/maxLife), height, 'red');
                }
            }          
        }
    }
}

Input.setKeyIsPressedListenner('w');
Input.setKeyIsPressedListenner('s');
Input.setKeyIsPressedListenner('a');
Input.setKeyIsPressedListenner('d');

function controlsSystem(wolrd) {
    for (let entity of entityWithComponent('input-control', 'acceleration')) {
        let acceleration = entity.componentsState['acceleration']
        let force = { x : 0, y : 0 }

        if (Input.areBothKeysPressed('w', 's')) {
            // Faz na por hora
        } else if (Input.isKeyPressed('w')) {
            force.y = -0.09;
        } else if (Input.isKeyPressed('s')) {
            force.y = 0.09;
        }
        if ( Input.areBothKeysPressed('a', 'd') ) {
            // Faz na por hora
        } else if (Input.isKeyPressed('a')) {
            force.x = -0.09;
        } else if (Input.isKeyPressed('d')) {
            force.x = 0.09;
        }

        
        acceleration.ax = force.x;
        acceleration.ay = force.y;
    }
}

function followSystem(world) {
    for (let entity of entityWithComponent('following', 'velocity', 'position', 'acceleration')) {
        let entityTarget = entity.componentsState['following'].target;

        if (hasComponent(entityTarget, 'position')) {
            let entityAcceleration = entity.componentsState['acceleration'];
            let { x: xTarget, y : yTarget } = entityTarget.componentsState['position'];
            let { x: xEntity, y : yEntity } = entity.componentsState['position'];

            let difX = xTarget - xEntity;
            let difY = yTarget - yEntity;


            entityAcceleration.ax = maxValue(1, (difX / 10));
            entityAcceleration.ay = maxValue(1, (difY / 10));
        }
    }
}


function damageSystem(world) {
    for (let entity of entityWithComponent('following')) {
        let actualEntityTarget = entity.componentsState['following'].target;
        if (hasComponent(actualEntityTarget, 'enemy') && hasComponent(actualEntityTarget, 'vital-status')) {
            let vitalStatus = actualEntityTarget.componentsState['vital-status'];

            if (vitalStatus.life > 0) {
                vitalStatus.life -= 0.1;
            }
        }
    }
}

function winStateDetector(world) {
    for (let entity of entityWithComponent('enemy', 'vital-status')) {
        let vitalStatus = entity.componentsState['vital-status'];

        if (vitalStatus.life < 0.2) {
            alert('Status vital zerado');
            vitalStatus.life = vitalStatus.maxLife;
        }
    }
}

function enemyAI(world) {
    const player = entityWithComponent('input-control', 'position')[0];
    const playerPosition = player.componentsState['position'];


    for (let entity of entityWithComponent('enemy', 'vital-status', 'position', 'velocity', 'movement', 'acceleration')) {
        let { x : xEnemy, y : yEnemy } = entity.componentsState['position'];
        let entityAcceleration = entity.componentsState['acceleration'];

        entityAcceleration.ax = (playerPosition.x - xEnemy)/10000;
        entityAcceleration.ay = (playerPosition.y - yEnemy)/10000;
    }
}