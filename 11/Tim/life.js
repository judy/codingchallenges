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

		this.rule_sets = {
			conway: function(cur_cell_value, count, new_row) {
				// B3/S23
				if (count === 3  || (cur_cell_value && count === 2)) {
					new_row.push(1)
				}
				else {
					new_row.push(0)
				}
			},
			seed: function(cur_cell_value, count, new_row) {
				// B2/S
				// Born with exactly 2 neighbors, no survivors
				if (!cur_cell_value && count === 2) {
					new_row.push(1)
				}
				else {
					new_row.push(0)
				}
			},
			highlife: function(cur_cell_value, count, new_row) {
				// B36/S23
				if (count === 3 || (!cur_cell_value && count === 6)  || (cur_cell_value && count === 2)) {
					new_row.push(1)
				}
				else {
					new_row.push(0)
				}
			}
		}

		this.edge_funcs = {
			toroidal: function(rule_func, cur_state, width, height) {
				console.log('toroidal')

				var i_minus_corrected
				var i_plus_corrected
				var j_minus_corrected
				var j_plus_corrected

				var new_state = []
				var new_row
				var count
				for (var i = 0; i < width; i++) {
					new_row = []
					new_state.push(new_row)
					i_minus_corrected = (i - 1 < 0) ? width - 1 : i - 1
					i_plus_corrected = (i + 1 >= width) ? 0 : i + 1
					for (var j = 0; j < height; j++) {
						j_minus_corrected = (j - 1 < 0) ? height - 1 : j - 1
						j_plus_corrected = (j + 1 >= height) ? 0 : j + 1
						count = cur_state[i_minus_corrected][j_minus_corrected] +
						        cur_state[i_minus_corrected][j] +
						        cur_state[i_minus_corrected][j_plus_corrected] +
						        cur_state[i][j_minus_corrected] +
						        // cur_state[i][j] +
						        cur_state[i][j_plus_corrected] +
						        cur_state[i_plus_corrected][j_minus_corrected] +
						        cur_state[i_plus_corrected][j] +
						        cur_state[i_plus_corrected][j_plus_corrected]

						rule_func(cur_state[i][j], count, new_row)
						
					}
				}
				return new_state
			},
			dead: function(rule_func, cur_state, width, height) {
				// console.log('dead')

				var new_state = []
				var new_row
				var count
				
				for (var i = 0; i < width; i++) {
					new_row = []
					new_state.push(new_row)
					for (var j = 0; j < height; j++) {
						count = 0
						if (i - 1 >= 0) {
							count += cur_state[i - 1][j]
							if (j - 1 >= 0) {
								count += cur_state[i - 1][j - 1]
							}
							if (j + 1 < width) {
								count += cur_state[i - 1][j + 1]
							}
						}
						if (i + 1 < width) {
							count += cur_state[i + 1][j]
							if (j - 1 >= 0) {
								count += cur_state[i + 1][j - 1]
							}
							if (j + 1 < width) {
								count += cur_state[i + 1][j + 1]
							}
						}

						if (j - 1 >= 0) {
							count += cur_state[i][j - 1]
						}
						if (j + 1 < width) {
							count += cur_state[i][j + 1]
						}

						rule_func(cur_state[i][j], count, new_row)
						
					}
				}

				return new_state
			}
		}

		this.init()
		this.randomize(config.density)

		return this
	}

	init() {
		this.current_rule_set_func = this.config.rule_set || 'conway'
		this.current_edge_func = this.config.edge_method || 'dead'
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
		var rule_func = this.rule_sets[this.current_rule_set_func]
		var cur_state = this.current()
		var width = this.config.width
		var height = this.config.height
		
		var new_state = this.edge_funcs[this.current_edge_func](rule_func, cur_state, width, height)
		this.states.push(new_state)
		this.generation = this.generation + 1
	}

	cycleRuleSet() {
		var rule_sets = ['conway', 'seed', 'highlife']
		var pos = rule_sets.indexOf(this.current_rule_set_func)
		var next_pos = pos + 1 >= rule_sets.length ? 0 : pos + 1
		this.current_rule_set_func = rule_sets[next_pos]
		console.log('cycleRuleSet', this.current_rule_set_func)
	}

	cycleEdges() {
		var edge_methods = ['dead', 'toroidal']
		var pos = edge_methods.indexOf(this.current_edge_func)
		var next_pos = pos + 1 >= edge_methods.length ? 0 : pos + 1
		this.current_edge_func = edge_methods[next_pos]
		console.log('cycleEdges', this.current_edge_func)
	}

	current() {
		return this.states[this.generation]
	}

	previous() {
		return this.generation > 0 ? this.states[this.generation - 1] : false
	}
}

module.exports = config => new Life(config)