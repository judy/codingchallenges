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
		this.ctx.fillStyle = color
		return this
	}

	border(color, width) {
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width
		return this
	}

	region(x, y, width, height) {
		this.ctx.fillRect(x, y, width, height)
		return this
	}

	dot(x, y) {
		this.ctx.fillRect(x, y, 1, 1)
		return this
	}

	circle(x, y, r) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, r, 0, 2 * Math.PI)
		this.ctx.fill()
		this.ctx.stroke()
		return this
	}

	shape(points) {
		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])
		for (var i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i][0], points[i][1])
		}
		this.ctx.fill()
		this.ctx.stroke()
		return this
	}

	animation(fn, interval) {
		var state = {}
		var bound = fn.bind(this, state)
		window.setInterval(bound, interval)
	}
}
