/*
	Usage:

	var materials = require('materials')([
		{name: 'grass', parts: ['grass', 'dirt', 'grass_dirt']},
		'diamond',
		'brick'
	])

	var game = createGame({
		generate: function (x, y, z) {
			return z < 0 ? materials.obsidian : z == 0 ? materials.grass : materials.empty
		},
		materials: materials._list,
		...
	})
*/

function createDict(items) {
	var list = []
	var dict = {space: 0, _space: 0, empty: 0, _empty: 0}

	for (var i = 0; i < items.length; i++) {
		var item = items[i]

		if (typeof item == 'string') {
			list.push(item)
			dict[item] = i + 1
		}
		else {
			list.push(item.parts)
			dict[item.name] = i + 1
		}
	}

	dict._list = list

	return dict
}

module.exports = createDict