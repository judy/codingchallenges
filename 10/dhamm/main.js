var markov = { 'MARKOV': []};
addArticle('Ben Roethlisberger')

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
    if (!tokens.length) return;
    markov['MARKOV'].push(tokens);
    // loop text and add it to the previous word's node
    for (var i = 0; i < tokens.length - 1; i++) {
        if (!markov[tokens[i]])
            markov[tokens[i]] = [];
        markov[tokens[i]].push(tokens[i + 1]);
        // If it's the beginning of a sentence, add the next word to the start node too
        if (tokens[i].match(/\.$/))
            markov['MARKOV'].push(tokens[i + 1]);
    }
}

function make_chain() {
	var currentWord = 'MARKOV';
    var str = '';
    // Generate 180 words of text
    for (var i = 0; i < 180; i++) {
        var rand = Math.floor(Math.random() * markov[currentWord].length);
        str += markov[currentWord][rand];
        if (!markov[markov[currentWord][rand]]) {
            currentWord = 'MARKOV';
            if (!markov[currentWord][rand].match(/\.$/))
                str += '. ';
            else
                str += ' ';
        } else {
            currentWord = markov[currentWord][rand];
            str += ' ';
        }
    }
    return(str);
}
