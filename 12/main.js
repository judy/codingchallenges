window.turf = require('turf')
var geojson = require('./example-geojson.js')

window.map   = initMap()
window.scene = initVoxelLayer(document.body, geojson)

function initMap() {
	var map = L.map('map').setView([30.46357292453711, -87.82479286193848], 18)

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'alexwebb2.plkg93g2',
		accessToken: 'pk.eyJ1IjoiYWxleHdlYmIyIiwiYSI6ImQ4X01Lc0kifQ.dv0HbEJPo-nZswOGCszPMg'
	}).addTo(map)

	map._getPixelBounds = map.getPixelBounds
	map.getPixelBounds = function () {
		var bounds = this._getPixelBounds()

		bounds.min.x -= 1000
		bounds.min.y -= 1000
		bounds.max.x += 1000
		bounds.max.y += 1000

		return bounds
	}

	return map
}

function initVoxelLayer(element, geojson) {
	var PI          = Math.PI
	var scene       = new voxelcss.Scene()
	var lightSource = new voxelcss.LightSource(300, 300, 300, 1500, 0.3, 0.65)

	scene.attach(element)
	scene.addLightSource(lightSource)
	scene.setRotation(-.75, 0, 0)
	scene.setZoom(0.5)
	scene.disableOrbit()
	scene.disableZoom()

	// Example voxel
	scene.add(new voxelcss.Voxel(0, 0, 0, 100, {
		mesh: voxelcss.Meshes.grass
	}))

	// OPTIONAL: use turf to gridify and interpolate the geojson

	// OPTIONAL: add points to Leaflet map to aid in voxel positioning

	// TODO: use voxelcss to render voxels

	return scene
}