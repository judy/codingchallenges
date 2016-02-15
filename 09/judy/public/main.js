// Init map
L.mapbox.accessToken = 'pk.eyJ1IjoiY2xpbnRvbmp1ZHkiLCJhIjoiY2lrZ2FsOXF0MDAzZ3Z0a21qc3p2a3F2YyJ9.ppJmfFS7cLDaNzWupa41qg'
var map = L.mapbox.map('map').setView([51.505, -0.09], 13)
L.mapbox.styleLayer('mapbox://styles/clintonjudy/cikgamnsj0030apm54lazomfc').addTo(map);
map.xRotation = 0
map.yRotation = 0
map.zRotation = 0
var degrees = 0

// Init assistant
var assistant = new Assistant()

assistant.teach({
	'move to *location': locate(location),
	'locate *location': locate(location),
	'enhance *': zoomIn,
	'zoom in *': zoomIn,
	'uncrop *': zoomOut,
	'zoom out *': zoomOut,
	'reverse *': mirror,
	'mirror *': mirror,
	'flip *': flip,
	'rotate *degrees': rotate(degrees)
})

function locate(location) {
	geocode(location, result => {
		if (!result) {
			assistant.say("Not found.")
			return
		}

		assistant.say('Locating ' + location)
		map.panTo([result.lat, result.lon])
	})
}

function zoomIn() {
	assistant.say('Enhancing.')
	map.zoomIn()
}

function zoomOut() {
	map.zoomOut()
}

function mirror() {
	map.yRotation += 180
	updateTransform()
}

function flip() {
	map.xRotation += 180
	updateTransform()
}

function rotate(degrees) {
	degrees = parseInt(degrees)
	map.zRotation += degrees
	updateTransform()
}

function updateTransform() {
	$('#map').css('transform', 'rotateX(' + map.xRotation + 'deg) rotateY(' + map.yRotation + 'deg) rotateZ(' + map.zRotation + 'deg)')
}

function geocode(query, callback) {
	var url = 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q='
	$.get(url + query).done(result => {callback(result.length ? result[0] : null)})
}
