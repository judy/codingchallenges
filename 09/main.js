// Init map
var map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

// Init assistant
var assistant = new Assistant()

assistant.teach({
	'move to *location': location => {
		geocode(location, result => {
			if (!result) {
				assistant.say("I'm sorry, I couldn't find that location.")
				return
			}

			assistant.say('Moving map location to ' + location).then(() => {
				map.panTo([result.lat, result.lon])
			})
		})
	}
})

function geocode(query, callback) {
	var url = 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q='
	$.get(url + query).done(result => {callback(result.length ? result[0] : null)})
}