// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Coordinates for each point to be used in the line.
// Coordinates for each point to be used in the polyline.
let line = [
    [37.6213, -122.3790],
    [30.18999924, -97.668663992],
    [43.678524, -79.6291291306445],
    [46.107332904, -64.673830638],
    [40.641766, -73.780968]
  ];
  
  // Create a polyline using the line coordinates and make the line red.
  // Create a polyline using the line coordinates and make the line black.
L.polyline(line, {
    color: "blue",
    weight:4,
    opacity:0.5,
    dashArray:'5,8'
 }).addTo(map);

// Create the map object with a center and zoom level.
//This method is useful when we need to add multiple tile layers, 
//or a background image of our map(s), which we will do later in this module.

// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);