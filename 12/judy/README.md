# Coding Challenge #12

For this challenge, you'll be using [voxel.css](http://voxelcss.com/) to render GeoJSON in 3D on top of a Leaflet [perspective map](https://www.mapbox.com/blog/3d-leaflet/).

To keep things simple, this is a [specific dataset](http://bl.ocks.org/anonymous/raw/fa0548759be92769acca8b866c493cad/) with the map locked to a single field.

### Documentation

* [voxel.css](https://github.com/HunterLarco/voxel.css/tree/master/docs/Core)
* [turf](http://turfjs.org/static/docs/)

### Build instructions

1.	Make sure you have `browserify` installed globally:

	```bash
	$  npm install -g browserify
	```

2.	Install dependencies:

	```bash
	$  npm install
	```

3.	Complete the build step after any changes to the source files:

	```bash
	$  npm run build
	```

	This will compile all dependencies into `bundle.js`, which is included by `index.html`.