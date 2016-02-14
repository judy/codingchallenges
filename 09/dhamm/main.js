// Init map
var map = L.map('map').setView([51.505, -0.09], 13)
//map.panBy([200, 300]);
var mapLayer = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
L.tileLayer(mapLayer).addTo(map)

var Esri_WorldTopoMap = null

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
	'hello*': greeting,
	'zoom in*': zoomIn,
	'auto pan*': autoPan,
	'reset*': viewReset,
	'add circle*': addMarker,
	'change layer*': changeTile,
	'reset map*': resetMap
	
})

function geocode(query, callback) {
	var url = 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q='
	$.get(url + query).done(result => {callback(result.length ? result[0] : null)})
}
function greeting() {
  assistant.say("Hello where would you like to begin?");
}
function zoomIn(){
	assistant.say("Zooming in.");
	map.zoomIn()
}
function autoPan(){
	map.panBy([20, 30]);
}
function viewReset(){
	assistant.say("Resetting map view.");
	map.setView([51.505, -0.09], 13)
}
function addMarker(){
	assistant.say("Adding circle at center of map.")
	var centroid = map.getCenter()
	L.circle([centroid.lat, centroid.lng], 120.5, {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	weight: 1
	}).bindPopup("This is popup.").addTo(map);
}
function changeTile(){
	map.removeLayer(mapLayer)
	assistant.say("Changing to Topo Map.")
	Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
	Esri_WorldTopoMap.addTo(map)
}
function resetMap(){
	map.removeLayer(Esri_WorldTopoMap)	
	assistant.say("Reset Map.")
	mapLayer = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	L.tileLayer(mapLayer).addTo(map)
}
