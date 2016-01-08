# Coding Challenge #8

This challenge introduces Firebase, a unique cloud-based data store using an evented JSON architecture.

Firebase occupies the space between the local storage API and a dedicated backend database, using a frontend JS library to read and manipulate remote data. This is extremely useful for things like Github Pages, which hosts frontend-only sites for free. Combining it with the free tier of Firebase is enough to run a small app with persistent cloud data storage at zero cost, and with zero maintenance.

A Firebase instance is created via their website, and is then manipulated via a simple JS library that connects to it, pushes updates, and listens for any changes.

---

For this challenge, you'll be synchronizing the view state of a Leaflet map across two pages:

* the [**primary** page](./primary.html), which updates the Firebase store every time its map view changes; and
* the [**replica** page](./replica.html), which updates its map view whenever the Firebase store changes, with no user interaction allowed.

In other words, zooming or moving the map on the primary page should automatically and instantly zoom or move the map on the replica page.

This challenge is estimated at roughly 15-20 lines of new code.