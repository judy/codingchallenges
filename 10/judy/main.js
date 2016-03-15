var markov = Object.create(null)
var beginnings = Object.create(null)

// addWikipediaArticle('California')
addTranscript('transcripts/2015-1-24.txt')
.then(function() {
	for(var i = 0; i <= 100; i++) {
		$('#chainz').append(makeChain(30))
	}
})

function addTranscript(url) {
	return Q($.ajax({
		url: url,
		dataType: 'text'
	})).then(function(data) {
		tokens = data.match(/[a-z\']+|[\.\,\!\?]+/gi)
		addToMarkovChain(tokens)
		console.log('Transcript added: ' + url)
	})
}

function addWikipediaArticle(q) {
	return Q($.ajax({
		url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvparse=1&titles=' + q + '&callback=?',
		dataType: 'json'
	}))
	.then(function(data) {
		// Get HTML
		var key  = Object.keys(data.query.pages)[0]
		var html = data.query.pages[key].revisions[0]['*']

		// Strip to just text
		var text = $(html).text()
		text = text.replace(/\[edit\]/g, '')

		// Tokenize it
		var tokens = text.match(/[a-z\']+|[\.\,\!\?]+/gi)

		// Add it into the markov dictionary
		addToMarkovChain(tokens)

		console.log('Article added: ' + q)
	})
}

function addToMarkovChain(tokens) {
	beginnings[tokens[0]] = null
	for(var i = 0; i < tokens.length - 1; i++) {
		key = tokens[i]
		word = tokens[i+1]
		if (key === "." || key === "?" || key === "!") {
			beginnings[word] = null
		}
		if (!Array.isArray(markov[key])) { markov[key] = [] }
		markov[key].push(word)
	}
	// TODO: Add '[END]' to last key
}

function chooseRandomWord(array) {
	length = array.length
	return array[Math.floor(length * Math.random())]
}

function makeChain(max_length) {
	word = chooseRandomWord(Object.keys(beginnings))
	string = word
	for(var i = 0; i <= max_length; i++) {
		word = chooseRandomWord(markov[word])
		if (word === "." || word === "?" || word === "!") {
			string = string + word + " "
			return string
		}
		else if (word === ",") {
			string = string + ","
		}
		else {
			string = string + " " + word
		}
	}
	string = string + '.'
	return string
}
