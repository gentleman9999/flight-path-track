const express = require('express');
const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;
    const result = calculateFlightPath(flights);
    res.json(result);
});

const calculateFlightPath = (flights) => {
    const flightMap = new Map();
    const reverseMap = new Map();

    flights.forEach(([start, end]) => {
        flightMap.set(start, end);
        reverseMap.set(end, start);
    });

    // Find the starting point
    let start = flights[0][0];
    while (reverseMap.has(start)) {
        start = reverseMap.get(start);
    }

    // Find the ending point by following the path
    let end = start;
    while (flightMap.has(end)) {
        end = flightMap.get(end);
    }

    return [start, end];
};

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
