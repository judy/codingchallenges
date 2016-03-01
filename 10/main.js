var markov = {}

addArticle('Tocobaga')

function addArticle(q) {
	$.ajax({
		url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvparse=1&titles=' + q + '&callback=?',
		dataType: 'json',
		success: function(data, textStatus, jqXHR) {
			// Get HTML
			var key  = Object.keys(data.query.pages)[0]
			var html = data.query.pages[key].revisions[0]['*']

			// Strip to just text
			var text = $(html).text()
			text = text.replace(/\[edit\]/g, '')

			// Tokenize it
			var tokens = text.match(/[a-z\']+|[\.\,\!\?\"]+/gi)

			// Add it into the markov dictionary
			addToMarkovChain(tokens)

			console.log('Article added: ' + q)
		}
	})
}

function addToMarkovChain(tokens) {
}