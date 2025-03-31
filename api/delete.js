const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
    if (req.method !== 'DELETE') return res.status(405).json({ error: "Method Not Allowed" });

    const { filename } = req.query;
    if (!filename) return res.status(400).json({ error: "Filename is required" });

    try {
        await axios.delete(`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/${filename}`, {
            headers: { 'AccessKey': process.env.BUNNY_API_KEY }
        });
        res.json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete file", details: error.message });
    }
};
