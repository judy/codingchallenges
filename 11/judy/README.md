# Coding Challenge #11

For this challenge, you'll be building [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in [Voxel.js](http://voxeljs.com/).

Conway's Game of Life is a set of basic logical rules describing a 2D cellular automaton.

Voxel.js is a Minecraft-inspired library for making voxel-based games and simulations.

### Controls

Mouse to look around, `WASD` to move, `space` to jump.

##### Flight mode

Double-tap `space` to enter flight mode. This allows you to change your altitude with `space` and `shift`. Flight mode exits when you land on a block.

### Goals

Start off by filling in the two function stubs:

- the `advance()` function in `life.js`
- the `drawLife()` function in `main.js`

This should get you a live viewer for changes over time, with a snapshot looking something like this:

![Screenshot](http://i.imgur.com/j7izPKQ.jpg)

Once that's done, there are plenty of directions you can take it. For example, instead of redrawing the same y-layer every time, you could increment it for each generation to get a time-dimensional view:

![Screenshot](http://i.imgur.com/MmthavL.jpg)

Sky's the limit - feel free to bring in
[additional voxel.js helper modules](https://www.npmjs.com/search?q=voxel).

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