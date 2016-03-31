var createGame   = require('voxel-engine')
var createPlayer = require('voxel-player')
var texturePath  = require('painterly-textures')(__dirname)

var materials = require('./materials')([
	{name: 'grass', parts: ['grass', 'dirt', 'grass_dirt']},
	'dirt',
	'diamond',
	'obsidian',
	'brick',
	'plank'
])

var width  = 64
var height = 64
var playerStart = {x: width / 2, y: 10, z: height / 2}

initGame()
initPlayer()
initLife()
drawLife()

var safeCycleRuleSet = triggerOnRelease(window.game.life.cycleRuleSet.bind(window.game.life), 'click')
var safeCycleEdges = triggerOnRelease(window.game.life.cycleEdges.bind(window.game.life), 'right_click')

window.update = window.setInterval(() => {
	safeCycleRuleSet()
	safeCycleEdges()
	window.game.life.advance()
	drawLife()
}, 500)

function initGame() {
	window.game = createGame({
		generate: function (x, y, z) {
			if (x >= 0 && x < width  && z >= 0 && z < height && y == 1) {
				return materials.dirt
			}

			return materials.space
		},
		keybindings: {
			W: 'forward',
			A: 'left',
			S: 'backward',
			D: 'right',
			'<space>'  : 'jump',
			'<shift>'  : 'crouch',
			'<control>': 'alt',
			'<mouse 1>': 'click',
			'<mouse 3>': 'right_click'
		},
		controls: {
			// discreteFire: true,
			speed:        0.001, // default is 0.0032, see voxel-control/index.js
			accelTimer:   500,    // time to reach max speed
			click: function(){console.log('click')},
			right_click: function(){console.log('right_click')}
		},
		chunkDistance: 4,
		materials:   materials._list,
		texturePath: texturePath
	})

	window.game.appendTo(document.body)
}

function initPlayer() {
	window.player = createPlayer(window.game)('maxogden.png', {gravity: true})
	window.player.possess()
	window.player.pov(1)
	window.player.yaw.position.set(0.5, 14, 0.5)
	window.player.position.set(playerStart.x, playerStart.y, playerStart.z)

	// Give player the power of flight
	var fly = require('voxel-fly')
	var makeFly = fly(window.game)
	makeFly(window.player)

	// Hide the player skin
	window.player.playerSkin.rightArm.visible = false
	window.player.playerSkin.leftArm .visible = false
	window.player.playerSkin.body    .visible = false
	window.player.playerSkin.rightLeg.visible = false
	window.player.playerSkin.leftLeg .visible = false
	window.player.playerSkin.head    .visible = false
}

function initLife() {
	window.game.life = require('./life')({width, height})
}

function drawLife() {
	// TODO: use data from window.game.life to set blocks correctly
	var current_generation = window.game.life.generation
	var current_state = window.game.life.current()

	var current_row
	for (var i = 0; i < width; i++) {
		current_row = current_state[i]
		for (var j = 0; j < height; j++) {
			if (current_row[j]) {
				window.game.setBlock([i,1,j], materials.grass)
			}
			else {
				window.game.setBlock([i,1,j], materials.dirt)
			}
		}
	}
}

function triggerOnRelease(func, state) {
	var old_state = 0
	return function() {
		var cur_state = window.game.controls.state[state]
		// trigger the function only after user has released the button
		if (old_state && !cur_state) {
			// was running into an issue when the function call fails the old_state was never getting updated
			// could have done a try catch but assignment is a cheaper operation
			old_state = cur_state
			func()
		}
		old_state = cur_state
	}
}