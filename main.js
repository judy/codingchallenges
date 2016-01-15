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