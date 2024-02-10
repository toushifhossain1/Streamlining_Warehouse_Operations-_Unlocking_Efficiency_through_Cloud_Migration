const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Your API endpoint
app.get('/api-endpoint', async (req, res) => {
    try {
        // Make a request to the external API
        const response = await axios.get('http://localhost:8000/all-data');
        const data = response.data;

        // Your logic to process the data from the external API
        // For example, you might want to transform or filter the data

        // Respond with the processed data
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
