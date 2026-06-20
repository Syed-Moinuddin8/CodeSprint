# 🚀 CodeSprint 2026 - Hackathon Registration Website

Official registration website for CodeSprint 2026 Hackathon.

## ✨ Features

- **Registration Form** - Complete team registration with transaction ID
- **Google Sheets Integration** - All registrations saved automatically
- **Multiple Pages** - Home, About, Timeline, Rules, Prizes, FAQ, Contact
- **WhatsApp Integration** - Auto-show QR code after successful registration
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Google Apps Script (Serverless)
- **Database**: Google Sheets
- **Hosting**: Vercel
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Google Account (for Sheets)
- Vercel Account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Syed-Moinuddin8/CodeSprint.git
cd CodeSprint
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create `.env` file:

```env
VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url_here
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:5173

## 📊 Google Sheets Setup

### Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new sheet: "CodeSprint 2026 Registrations"
3. Add headers: `Timestamp | Team Leader | Email | Phone | College | Team Name | Team Size | Team Members | Transaction ID | Status`

### Step 2: Create Apps Script

1. Extensions → Apps Script
2. Paste the webhook code (see `GOOGLE-APPS-SCRIPT.md`)
3. Deploy as Web App
4. Copy the URL

### Step 3: Update Environment Variable

Add the Apps Script URL to your `.env` file.

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_GOOGLE_SCRIPT_URL`
4. Deploy!

**See detailed guide**: `DEPLOY-TO-VERCEL-NOW.md`

## 📁 Project Structure

```
CodeSprint/
├── artifacts/hackathon/          # Main application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   └── utils/               # Utility functions
│   └── api/                     # API endpoints (unused with Google Sheets)
├── lib/                         # Shared libraries
└── docs/                        # Documentation
```

## 📖 Documentation

- **`STARTUP.md`** - How to run locally
- **`DEPLOY-TO-VERCEL-NOW.md`** - Deployment guide
- **`GOOGLE-SHEETS-COMPLETE-GUIDE.md`** - Google Sheets setup
- **`GOOGLE-APPS-SCRIPT.md`** - Apps Script webhook

## 🎯 Event Details

- **Event**: CodeSprint 2026
- **Duration**: 10 AM - 9 PM (11 hours)
- **Team Size**: 1-4 members
- **Registration Fee**: ₹350 per team
- **Payment**: UPI (smoinuddin283-1@okicici)

## 📞 Contact

- **Syed Moinuddin**: 8904281955
- **Usman**: 9886481493

## 🔧 Development

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with ❤️ for CodeSprint 2026

---

**Made with React + TypeScript + Vite + Google Sheets**
