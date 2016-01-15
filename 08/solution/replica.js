// Init firebase connection - only access your own section of it
var username = window.location.href.match(/\/[0-9]+\/([^\/]+)/)[1]
var $db = new Firebase('https://fa-cc08.firebaseio.com').child(username)

// Init map
var map = L.map('map', {
	scrollWheelZoom: false,
	dragging: false,
	doubleClickZoom: false,
	boxZoom: false
}).setView([51.505, -0.09], 13)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

// YOUR CODE HERE
$db.child('state').orderByKey().limitToLast(1).on('value', snapshot => {
	var state = _.values(snapshot.val())[0]
	map.setView(state.center, state.zoom)
})