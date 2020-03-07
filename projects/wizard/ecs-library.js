function clone(object) {
    return Object.assign(Object.create(null), object);
}

function component(name, componentScheme) {
    component.registeredComponent[name] = Object.assign(Object.create(null), componentScheme)

    return component.registeredComponent[name];
}

component.registeredComponent = Object.create(null);
component.getByName = function componentGetByName(componentName) {
    return component.registeredComponent[componentName] || null
}

function entity({ components }) {
    const entity = Object.create(null);

    entity.components = []
    entity.componentsState = Object.create(null)

    for (let componentName of components) {
        entity.components.push(componentName);
        entity.componentsState[componentName] = clone(component.getByName(componentName))
    }

    return entity;
}

function entityWithComponent(...names) {
    return world.entities
        .filter(entity => {
            for (let name of names) {
                if (!entity.components.includes(name)) {
                    return false;
                }
            }
            return true;
        })
}

function hasComponent(entity, name) {
    return entity.components.includes(name)
}

function updateWorld(world) {
    for (let system of world.systems) {
        system(world);
    }
}

function createWorld(world) {
    return Object.assign(Object.create(null), world);
}

function startLoop(world, loop) {
    for (let entity of world.queue.entitiesToInsert) {
        world.entities.push(entity)
    }

    world.queue.entitiesToInsert = [];

    const checks = world.constraint.map(constraint => {
        const [ passed, successMessage, failureMessage ] = constraint(world);

        console.log(passed ? successMessage : failureMessage)

        return passed;
    })

    if (checks.every(x => x)) {
        console.warn('Loop iniciado');
        loop(world)
    } else {
        console.error('[ Não passou nas validações ]');
    }
}

function maxValue(maxValue, value) {
    return value > maxValue ? maxValue : value;
}