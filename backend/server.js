const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Predefined path (source to destination) with waypoints
const vehicleRoute = [
  { latitude: 41.87475, longitude: -87.64525 },  // Source
  { latitude: 41.87577, longitude: -87.65074 },
  { latitude: 41.87475, longitude: -87.65658 },
  { latitude: 41.87526, longitude: -87.66379 },
  { latitude: 41.87552, longitude: -87.66997 },
  { latitude: 41.86938, longitude: -87.66997 },
  { latitude: 41.86580, longitude: -87.66928 },
  { latitude: 41.85695, longitude: -87.66619 },
  { latitude: 41.85132, longitude: -87.66610 },
  { latitude: 41.84486, longitude: -87.66602 },
  { latitude: 41.84122, longitude: -87.66593 },
  { latitude: 41.83545, longitude: -87.66550 },
  { latitude: 41.83167, longitude: -87.66567 },
  { latitude: 41.83049, longitude: -87.66031 },  // Destination
];

// Endpoint to return the predefined route
app.get('/api/vehicle-route', (req, res) => {
    console.log("hello");
  res.json(vehicleRoute);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
