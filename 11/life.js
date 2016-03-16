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

	advance() {
		// TODO: create a new state, push it onto the state stack, and increment the generation counter
	}

	isAlive(x, y) {
		return (
			y >= 0 && y < this.states[this.generation]   .length &&
			x >= 0 && x < this.states[this.generation][y].length &&
			this.states[this.generation][y][x]
		)
	}

	current() {
		return this.states[this.generation]
	}

	previous() {
		return this.generation > 0 ? this.states[this.generation - 1] : false
	}
}

module.exports = config => new Life(config)