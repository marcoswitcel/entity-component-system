component('gravity', {
    x : 0,
    y : 0.0001,
})

component('vital-status', {
    maxLife: 100,
    life : 100,
})

component('movement', {

})

component('world-area', {
    width: CANVAS_WIDTH *2,
    height: CANVAS_HEIGHT *2,
    background: '#7FFFD4',
});

component('renderable', {
    renderable: true,
    canRender: true,
})

component('shape-circle', {
    type: 'circle',
    radius: 15,
    color: 'blue',
})

component('shape-circle02', {
    type: 'circle',
    radius: 8,
    color: 'yellow',
})

component('shape-circle03', {
    type: 'circle',
    radius: 25,
    color: 'green',
})

component('velocity', {
    dx: 0,
    dy: 0,
})

component('acceleration', {
    ax: 0,
    ay: 0,
})

component('position', {
    x : 100,
    y:  100,
})

component('input-control', {
    
})

component('enemy', {
    velocityFactor: 100 * 60,
})

component('following', {
    target: null,
})