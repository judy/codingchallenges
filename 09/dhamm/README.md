# Coding Challenge #9

Smart helpers and virtual assistants have come a long way since that accursed Office paperclip of the 90s - today, we have more and more mainstream implementations including Siri, OK Google, Cortana, and Amazon Echo. Increasingly, users are starting to expect that their devices - and software - will understand spoken commands and be able to respond in turn. This trend is likely to continue over the next few years.

This coding challenge introduces the Web Speech API, which is composed of two technologies: the SpeechSynthesis API and the SpeechRecognition API. These are on by default in Chrome, and can be enabled in Firefox via configuration flags. They are available in this challenge through some abstractions: [Annyang](https://www.talater.com/annyang/), a library that ties into the SpeechRecognition API and provides some lightweight control flow, is further abstracted into the Assistant class, which turns the plumbing of the SpeechSynthesis API into a simple `say()` function.

This challenge is designed to be open ended - you're given a Leaflet starting map and an example command for the Assistant to recognize and execute (`move to ...`). See the Annyang docs for more information on the command syntax.

There are a lot of ways you can go from here, so be creative and start trying things - you're free to add any additional dependencies or modify any existing code.