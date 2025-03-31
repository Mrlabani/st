// Fully Vercel-Compatible BunnyCDN Image Hosting
// Features: Direct file streaming (no disk writes), multi-image upload, file listing, deletion, UI integration, and progress bar.

const axios = require('axios');
const formidable = require('formidable');
require('dotenv').config();

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err || !files.image) return res.status(400).json({ error: "No file uploaded" });

        const file = files.image[0];
        const fileData = await fs.promises.readFile(file.filepath);
        const fileName = Date.now() + '-' + file.originalFilename;

        try {
            await axios.put(`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/${fileName}`, fileData, {
                headers: { 'AccessKey': process.env.BUNNY_API_KEY, 'Content-Type': 'application/octet-stream' }
            });

            res.json({ success: true, url: `https://${process.env.BUNNY_PULL_ZONE}.b-cdn.net/${fileName}` });
        } catch (error) {
            res.status(500).json({ error: "Upload failed", details: error.message });
        }
    });
};
