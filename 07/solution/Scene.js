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
		this.ctx.lineWidth = width || 1
		return this
	}

	region(x, y, width, height) {
		this.ctx.fillRect  (x, y, width, height)
		this.ctx.strokeRect(x, y, width, height)
		return this
	}

	dot(x, y) {
		return this.region(x, y, 1, 1)
	}

	circle(x, y, r) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, r, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.stroke()
		this.ctx.fill()

		return this
	}

	shape(points) {
		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])

		points.slice(1).forEach(point => {
			this.ctx.lineTo(point[0], point[1])
		})

		this.ctx.closePath()
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