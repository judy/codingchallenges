var challenges = [
	{
		name:      'Coding Challenge #7',
		challenge: './07',
		reference: './07/solution',
		winner:    './07/mdedmon'
	},
	{
		name:      'Coding Challenge #8',
		challenge: './08/readme.html',
		reference: './08/solution',
		winner:    './08/mdedmon'
	},
	{
		name:      'Coding Challenge #9',
		challenge: './09/readme.html',
		reference: './09/index.html',
		winner:    './09/dhamm'
	},
	{
		name:      'Coding Challenge #10',
		challenge: './10/readme.html',
		winner:    './10/judy'
	},
	{
		name:      'Coding Challenge #11',
		challenge: './11/readme.html',
		winner:    './11/Tim'
	},
	{
		name:      'Coding Challenge #12',
		challenge: './12/readme.html'
	}
]

_.each(challenges, challenge => {
	$('.container').append(
		div('challenge', [
			div('name', challenge.name + ':'),
			div('links btn-group', [
				btn('Challenge', challenge.challenge),
				btn('Reference', challenge.reference),
				btn('Winner',    challenge.winner)
			])
		])
	)

	function div(classes, items) {
		var $div = $('<div>').addClass(classes)

		if (typeof items == 'string') {
			$div.text(items)
		}
		else if (items.length) {
			$div.append(items)
		}

		return $div
	}

	function btn(text, href) {
		return $('<a>').addClass('btn btn-primary').text(text).attr('href', href || '#').attr('disabled', href == null)
	}
})