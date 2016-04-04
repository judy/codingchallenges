'use strict';

var _ = require('lodash')

/*
	Rules:
		- Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		- Any live cell with two or three live neighbours lives on to the next generation.
		- Any live cell with more than three live neighbours dies, as if by over-population.
		- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

class Life {
	constructor(config) {
		this.config = config

		this.init()
		this.randomize()

		return this
	}

	init() {
		this.generation = 0

		this.states = [
			_.chain().range(this.config.height, 0).map(
				x => _.range(0, this.config.width, 0)
			).value()
		]

		return this
	}

	randomize(density) {
		density = density || 0.5

		_.each(this.states[this.generation], row => {
			_.each(row, (cell, index) => {
				row[index] = (Math.random() < density) * 1
			})
		})

		return this
	}

	isAlive(x, y) {
		if (
			y >= 0 && y < this.states[this.generation]   .length &&
			x >= 0 && x < this.states[this.generation][y].length &&
			this.states[this.generation][y][x]
		) {
			return 1
		} else {
			return 0
		}
	}

	shouldBeAlive(state, neighbors) {
		if (neighbors == 3 || (neighbors == 2 && state == 1)) {
			return 1
		}
		else {
			return 0
		}
	}

	current() {
		return this.states[this.generation]
	}

	advance() {
		// TODO: create a new state, push it onto the state stack, and increment the generation counter
		var state = this.current()
		var new_state = []

		_.each(state, (row, x) => {
			new_state[x] = []
			_.each(row, (_, y) => {
				var neighbors =  this.isAlive(x-1, y-1) + this.isAlive(x-1, y) + this.isAlive(x-1, y+1) +
				                 this.isAlive(x,   y-1) +                        this.isAlive(x,   y+1) +
				                 this.isAlive(x+1, y-1) + this.isAlive(x+1, y) + this.isAlive(x+1, y+1)
				new_state[x].push(this.shouldBeAlive(state[x][y], neighbors))
			})
		})

		this.generation++
		this.states.push(new_state)
	}

	previous() {
		return this.generation > 0 ? this.states[this.generation - 1] : false
	}
}

module.exports = config => new Life(config)
