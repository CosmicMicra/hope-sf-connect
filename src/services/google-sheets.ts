import { google } from 'googleapis';
import { Resource } from '@/types/chat';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;

export const googleSheetsService = {
  async getSheetData() {
    try {
      // Use default credentials
      const client = await google.auth.getClient({
        scopes: SCOPES
      });
      const sheets = google.sheets({ version: 'v4', auth: client });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A:Z', // Adjust range as needed
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        throw new Error('No data found in spreadsheet');
      }

      // Convert rows to resources
      const resources: Resource[] = rows.slice(1).map(row => ({
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

      return resources;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw error;
    }
  }
};
