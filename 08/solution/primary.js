// Init firebase connection - only access your own section of it
var username = window.location.href.match(/\/[0-9]+\/([^\/]+)/)[1]
var $db = new Firebase('https://fa-cc08.firebaseio.com').child(username)

// Init map
var map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

// YOUR CODE HERE
map.on('moveend', update)
map.on('zoomend', update)
window.setInterval(update, 1000)

update()

function update() {
	$db.child('state').push({
		zoom:   map.getZoom(),
		center: map.getCenter()
	})
}