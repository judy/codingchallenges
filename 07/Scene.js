'use strict'

class Scene {
	constructor(canvas, options) {
		if (typeof canvas == 'string') {
			canvas = document.getElementById(canvas)
		}

		this.canvas = canvas
		this.ctx    = canvas.getContext('2d')
		this.layers = {}

		if (options && options.stretch) {
			this.canvas.width  = window.innerWidth
			this.canvas.height = window.innerHeight
		}
	}

	layer(name, fn) {
		this.layers[name] = fn.bind(this)
		return this
	}

	color(color) {
		/* TODO: set fill color */
		return this
	}

	border(color, width) {
		/* TODO: set border color and width (default to 1) */
		return this
	}

	region(x, y, width, height) {
		/* TODO: draw the given rectangular region */
		return this
	}

	dot(x, y) {
		/* TODO: draw a dot at the given point */
		return this
	}

	circle(x, y, r) {
		/* TODO: draw a circle around the given point with radius r */
		return this
	}

	shape(points) {
		/* TODO: draw path using specified points */
		return this
	}

	animation(fn, interval) {
		var state = {}
		var bound = fn.bind(this, state)
		window.setInterval(bound, interval)
	}
}