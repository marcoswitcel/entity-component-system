component('gravity', {
    x : 0,
    y : 0.0001,
})

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
    radius: 30,
    color: 'red',
})

component('velocity', {
    dx: 0,
    dy: 0,
})

component('acceleration', {
    ax: 0.001,
    ay: 0.001,
})

component('position', {
    x : 100,
    y:  100,
})