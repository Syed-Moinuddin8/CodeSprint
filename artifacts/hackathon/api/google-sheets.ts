import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { 
        fullName, 
        email, 
        phone, 
        college, 
        teamName, 
        teamSize, 
        teamMembers, 
        transactionId 
      } = req.body;

      // Validate required fields
      if (!fullName || !email || !phone || !college || !teamName || !teamSize || !transactionId) {
        return res.status(400).json({ 
          success: false,
          error: 'Missing required fields' 
        });
      }

      const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
      
      if (!GOOGLE_SCRIPT_URL) {
        console.error('GOOGLE_SCRIPT_URL not configured');
        return res.status(500).json({ 
          success: false,
          error: 'Google Sheets not configured. Please contact administrator.' 
        });
      }

      // Forward to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          college,
          teamName,
          teamSize,
          teamMembers,
          transactionId
        })
      });

      const result = await response.json();

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: 'Registration submitted successfully',
          data: {
            fullName,
            email,
            teamName,
            transactionId
          }
        });
      } else {
        throw new Error(result.error || 'Failed to save to Google Sheets');
      }

    } catch (error: any) {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to submit registration',
        message: error.message 
      });
    }
  }

  return res.status(405).json({ 
    success: false,
    error: 'Method not allowed' 
  });
}
