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
		this.ctx.fillStyle = color;
		return this
	}

	border(color, width) {
		/* TODO: set border color and width (default to 1) */
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = width;
		return this
	}

	region(x, y, width, height) {
		/* TODO: draw the given rectangular region */
		this.ctx.fillRect(x,y,width,height);
		return this
	}

	dot(x, y) {
		/* TODO: draw a dot at the given point */
		this.ctx.fillRect(x,y,1,1);
		return this
	}

	circle(x, y, r) {
		/* TODO: draw a circle around the given point with radius r */
		this.ctx.beginPath();
        this.ctx.arc(x,y,r,0,2 * Math.PI);
        this.ctx.fill();
		this.ctx.stroke();
        this.ctx.closePath();
		return this
	}

	shape(points) {
		/* TODO: draw path using specified points */
		if (points != null) {
			var self = this;
			this.ctx.beginPath();
			this.ctx.moveTo(points[0], points[1]);
			points.forEach(function(point) {	
				self.ctx.lineTo(point[0],point[1])
			})
			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();
		}
		return this
	}
	
	animation(fn, interval) {
		var state = {}
		var bound = fn.bind(this, state)
		window.setInterval(bound, interval)
	}
}