// const express = require("express");
// const mbxClient = require("@mapbox/mapbox-sdk");
// const mbxDirections = require("@mapbox/mapbox-sdk/services/directions");

// const app = express();
// const port = 3000;

// const baseClient = mbxClient({ accessToken: "YOUR_MAPBOX_ACCESS_TOKEN" });
// const directionsClient = mbxDirections(baseClient);

// app.get("/directions", async (req, res) => {
//   try {
//     const origin = [-122.4194, 37.7749]; // Example coordinates for San Francisco
//     const destination = [-118.2437, 34.0522]; // Example coordinates for Los Angeles

//     directionsClient
//       .getDirections({
//         profile: "driving", // Profile can be 'driving', 'walking', 'cycling'
//         waypoints: [{ coordinates: origin }, { coordinates: destination }],
//       })
//       .send()
//       .then((response) => {
//         const directions = response.body; // The directions information
//         const eta = directions.routes[0].duration; // ETA in seconds

//         res.json({ eta, directions });
//       });
//   } catch (error) {
//     res.status(500).json({ error: "An internal error occurred" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
