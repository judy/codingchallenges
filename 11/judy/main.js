var _ = require('lodash')

var createGame   = require('voxel-engine')
var createPlayer = require('voxel-player')
var highlight    = require('voxel-highlight')
var texturePath  = require('painterly-textures')(__dirname)

var materials = require('./materials')([
	'dirt',
	{name: 'grass', parts: ['grass', 'dirt', 'grass_dirt']},
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

window.update = window.setInterval(() => {
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
			'<mouse 1>': 'change',
			'<mouse 3>': 'freeze'
		},
		controls: {
			// discreteFire: true,
			speed:        0.001, // default is 0.0032, see voxel-control/index.js
			accelTimer:   500    // time to reach max speed
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
	var current_state = window.game.life.current()
	for(var x = 0; x < width; x++) {
		for(var z = 0; z < height; z++) {
			window.game.setBlock([x, 1, z], current_state[x][z] + 1)
		}
	}
}
