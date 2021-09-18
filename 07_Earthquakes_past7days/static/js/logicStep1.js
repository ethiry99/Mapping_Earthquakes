// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//   center: [40.7, -94.5],
//   zoom: 4
// });

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

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
    id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets,
};

// Create the map object with center, zoom level and default layer.
// let map = L.map('mapid', {
//   center: [39.5, -98.5],
//   zoom: 3,
//   layers: [streets]
// })

// Pass our map layers into our layers control and add the layers control to the map.
//L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/ethiry99/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/static/js/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://github.com/ethiry99/Mapping_Earthquakes/blob/main/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/ethiry99/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.name  
//       + feature.properties.city + "</h2>");
//     }

//   }).addTo(map);

  // Grabbing our GeoJSON data.
/* d3.json(torontoHoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,
    {weight:1,
    
    fillColor:'yellow'  
  }
  
  ).addTo(map);
}); */



//  2. Create the createFeatures function to hold the data.features object
function createFeatures(earthquakeData) {

  // 3. Define a function we want to run once for each feature in the features array
  // 4. Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // 5. Create a GeoJSON layer containing the features array on the earthquakeData object
  // 6. Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    
    pointToLayer:function(geoJsonPoint, latlng) {
      console.log(geoJsonPoint)
      return L.circle(latlng, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "orange",
            //radius:60000
            // Adjust radius
            radius: geoJsonPoint.properties.mag * 15000
          })//.bindPopup("<h1>" + data.features[i].properties.title + "</h1> <hr> <h3>Time: " + data.features[i].properties.time + "</h3>").addTo(map);
        // })
  }
  });

  //7. Send our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// 8. Create the createMap function to hold 
// the map layers, basemaps, overlay object, map object, and layer control.
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
    40.0, -97.0
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}



// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

createFeatures(data.features);

// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data).addTo(map);
//  console.log(data)
// //  var count=data.length
// // console.log(count)
//  for (var i = 0; i < 2100; i++) {
// //console.log(data.features[i].geometry.coordinates.slice(0,2))

//     // Add circles to map
//   L.circle(data.features[i].geometry.coordinates.slice(0,2), {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "orange",
//     radius:60000
//     // Adjust radius
//     //radius: data.features[i].properties.mag * 150000
//   })//.bindPopup("<h1>" + data.features[i].properties.title + "</h1> <hr> <h3>Time: " + data.features[i].properties.time + "</h3>").addTo(map);
// // })
// .addTo(map)
// }
});

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);