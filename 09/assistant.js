Assistant = function(commands) {
	annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
		console.log(userSaid)
		console.log(commandText)
		console.log(phrases)
	})

	annyang.addCallback('error', () => {
		this.say("I'm sorry, I didn't catch thaht.")
	})

	return this
}

Assistant.prototype.teach = function(commands) {
	annyang.addCommands(commands)
	// annyang.debug(true)
	annyang.start()
}

Assistant.prototype.say = function(text) {
	return new Promise((resolve, reject) => {
		var u = new SpeechSynthesisUtterance(text)
		tryExecuteSpeech(u, resolve)
	})

	function tryExecuteSpeech(u, resolve) {
		if (!this.voice) {
			this.voice = _.find(window.speechSynthesis.getVoices(), {
				name: 'Google UK English Female'
			})
		}

		// Chrome may take a second to make voices available the first time
		if (!this.voice) {
			setTimeout(() => tryExecuteSpeech(u, resolve), 25)
			return
		}

		u.voice = this.voice
		u.onend = () => resolve()
		window.speechSynthesis.speak(u)
	}
}