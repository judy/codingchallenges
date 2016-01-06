'use strict'

let left   = 0
let _top   = 0
let right  = window.innerWidth
let bottom = window.innerHeight

let scene = new Scene('canvas', {stretch: true})
	.layer('background', function() {
		this
			.color('#00001a').border('transparent')
			.region(left, _top, right, bottom)

			.color('#ffffe0').border('transparent')
			.circle(right - 100, _top + 100, 70)
	})

	.layer('foreground', function() {
		this
			.color('#eeeeee').border('transparent')
			.region(left, bottom - 200, right, bottom)

			.color('#eeeeee').border('gray')
			.circle(right / 2, bottom - 200, 150)
			.circle(right / 2, bottom - 375, 115)
			.circle(right / 2, bottom - 515,  80)

			.color('black').border('transparent')
			.circle(right / 2, bottom - 410, 10)
			.circle(right / 2, bottom - 360, 10)
			.circle(right / 2, bottom - 310, 10)

			.color('black').border('transparent')
			.circle((right / 2) - 25, bottom - 550, 10)
			.circle((right / 2) + 25, bottom - 550, 10)

			.color('black').border('transparent')
			.circle((right / 2),      bottom - 470, 5)
			.circle((right / 2) - 12, bottom - 474, 5)
			.circle((right / 2) + 12, bottom - 474, 5)
			.circle((right / 2) - 23, bottom - 480, 5)
			.circle((right / 2) + 23, bottom - 480, 5)
			.circle((right / 2) - 32, bottom - 490, 5)
			.circle((right / 2) + 32, bottom - 490, 5)

			.color('orange').border('transparent')
			.circle(right / 2, bottom - 515, 10)
			.shape([
				[(right / 2),      (bottom - 515) - 10],
				[(right / 2) + 80, (bottom - 515)     ],
				[(right / 2),      (bottom - 515) + 10],
				[(right / 2),      (bottom - 515) - 10]
			])

			.color('#391a00').border('#391a00', 5)
			.shape([
				[(right / 2) -  85, bottom - 415],
				[(right / 2) - 250, bottom - 500]
			])
			.shape([
				[(right / 2) +  85, bottom - 415],
				[(right / 2) + 250, bottom - 500]
			])
	})

	.animation(function(state) {
		// Draw background
		this.layers.background()

		// Set initial state
		if (_.isEmpty(state)) {
			state.points = []
			_.times(bottom, i => {
				_.times(5, () => addPoint(i))
			})
		}

		// Add points at top and remove them past bottom
		_.times(5, () => addPoint(_top))
		state.points = _.filter(state.points, point => point.y < bottom)

		// Update state
		this.color('white').border('transparent')
		_.each(state.points, point => {
			point.y += point.speed
			this.dot(Math.round(point.x), Math.round(point.y))
		})

		// Draw foreground
		this.layers.foreground()

		function addPoint(y) {
			state.points.push({
				x: _.random(right),
				y: y,
				speed: _.random(0.5, 1.5, true)
			})
		}
	}, 5)