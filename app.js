const express = require('express');
const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;
    try {
        const result = calculateFlightPath(flights);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const calculateFlightPath = (flights) => {
    const flightMap = new Map();
    const reverseMap = new Map();

    flights.forEach(([start, end]) => {
        flightMap.set(start, end);
        reverseMap.set(end, start);
    });

    // Find the starting point
    let start = flights[0][0], loopCount = 0;
    while (reverseMap.has(start)) {
        start = reverseMap.get(start);
        loopCount++;
        if (loopCount >= reverseMap.size) break;
    }

    // Rebuild the path from start to end and detect circular paths
    const path = [];
    const visited = new Set();
    let current = start;

    while (current) {
        if (visited.has(current)) {
            throw new Error("Circular path detected. The input contains a loop.");
        }

        path.push(current);
        visited.add(current);
        current = flightMap.get(current);
    }

    // If the path length is less than the number of flights + 1, it indicates disconnected paths
    if (path.length !== flights.length + 1) {
        throw new Error("Disconnected paths detected. Please provide a single connected flight path.");
    }

    return [path[0], path[path.length - 1]];
};


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
