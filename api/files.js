const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/`, {
            headers: { 'AccessKey': process.env.BUNNY_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve files", details: error.message });
    }
};
