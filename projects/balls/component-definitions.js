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
    width: 900 / 2,
    height: 600 / 2,
    background: '#7FFFD4',
});

component('renderable', {
    canRender: true
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
    
})

component('following', {
    target: null,
})