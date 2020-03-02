/**
 * SYSTEMS
 */

function collisionSystem(world) {
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 600;

    for (let entity of entityWithComponent('position', 'velocity', 'acceleration')) {
        if (hasComponent(entity, 'shape-circle') || hasComponent(entity, 'shape-circle02')) {
            let { x : xPos, y : yPos } = entity.componentsState['position'];
            // Referência do componente de movimento de uma dada entidade
            let acceleration = entity.componentsState['acceleration'];
            let velocity = entity.componentsState['velocity'];
            let position = entity.componentsState['position'];

            let { radius } = entity.componentsState['shape-circle'] || entity.componentsState['shape-circle02'];
    
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
    for (let entity of entityWithComponent('position', 'velocity')) {
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

Input.setKeyIsPressedListenner('u');
Input.setKeyIsPressedListenner('j');
Input.setKeyIsPressedListenner('h');
Input.setKeyIsPressedListenner('k');

function controlsSystem(wolrd) {
    for (let entity of entityWithComponent('input-control', 'acceleration')) {
        let acceleration = entity.componentsState['acceleration']
        let force = { x : 0, y : 0 }

        if (Input.areBothKeysPressed('u', 'j')) {
            // Faz na por hora
        } else if (Input.isKeyPressed('u')) {
            force.y = -0.09;
        } else if (Input.isKeyPressed('j')) {
            force.y = 0.09;
        }
        if ( Input.areBothKeysPressed('h', 'k') ) {
            // Faz na por hora
        } else if (Input.isKeyPressed('h')) {
            force.x = -0.09;
        } else if (Input.isKeyPressed('k')) {
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


            entityAcceleration.ax += maxValue(0.5, (difX / 10));
            entityAcceleration.ay += maxValue(0.5, (difY / 10));
        }
        // acceleration.ax += x?;
        // acceleration.ay += y?;
    }
}