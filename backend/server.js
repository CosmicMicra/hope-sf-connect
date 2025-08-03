require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { GOOGLE_SHEETS_ID } = process.env;

console.log('Starting server...');
console.log('GOOGLE_SHEETS_ID:', GOOGLE_SHEETS_ID);

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

app.get('/api/resources', async (req, res) => {
  try {
    const client = await google.auth.getClient({
      scopes: SCOPES
    });
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: VITE_GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:Z',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No data found in spreadsheet' });
    }

    const resources = rows.slice(1).map(row => ({
      id: row[0] || '',
      category: row[1] || '',
      name: row[2] || '',
      description: row[3] || '',
      contact: {
        phone: row[4] || '',
        email: row[5] || '',
        address: row[6] || '',
      },
      eligibility: row[7]?.split(',') || [],
      hours: row[8] || '',
      languages: row[9]?.split(',') || []
    }));

    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Try accessing:', `http://localhost:${PORT}/api/resources`);
});
