// Init map
var map = L.map('map').setView([51.505, -0.09], 13)
map.xRotation = 0
map.yRotation = 0

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
	},
	'enhance *': zoomIn,
	'zoom in *': zoomIn,
	'uncrop *': zoomOut,
	'zoom out *': zoomOut,
	'reverse *': mirror,
	'mirror *': mirror
})

function zoomIn() {
	assistant.say('Enhancing.').then(() => {
		map.zoomIn()
	})
}

function zoomOut() {
	map.zoomOut()
}

function mirror() {
	map.yRotation += 180
	$('#map').css('transform', 'rotateY(' + map.yRotation + 'deg)')
}

function geocode(query, callback) {
	var url = 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q='
	$.get(url + query).done(result => {callback(result.length ? result[0] : null)})
}
