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
                acceleration.ay *= -1;
                velocity.dy *= -0.7;
                if (yPos + radius > CANVAS_HEIGHT) {
                    position.y = CANVAS_HEIGHT - radius
                } else {
                    position.y = radius
                }
            }
            if (xPos + radius > CANVAS_WIDTH || xPos - radius < 0) {
                acceleration.ax *= -1;
                velocity.dx *= -0.7;
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
        // Computando velocidade
        if (hasComponent(entity, 'acceleration')) {
            let velocity = entity.componentsState['velocity'];

            velocity.dx += entity.componentsState['acceleration'].ax
            velocity.dy += entity.componentsState['acceleration'].ay

            // Limitando velocidade
            if (Math.abs(velocity.dx) > 10) {
                velocity.dx = 10 * (velocity.dx / Math.abs(velocity.dx))
            }
            if (Math.abs(velocity.dy) > 10) {
                velocity.dy = 10 * (velocity.dy / Math.abs(velocity.dy))
            }
        }
        // Computando posição
        entity.componentsState['position'].x += entity.componentsState['velocity'].dx
        entity.componentsState['position'].y += entity.componentsState['velocity'].dy
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