# Resulyzer

**Resulyzer** is an AI-powered Resume Analyzer application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and integrated with the **Google Gemini AI API**.  
It helps job seekers and recruiters analyze resumes for clarity, relevance, keyword matching, and impact by leveraging cutting-edge AI technology.

🌐 **Live Demo:** [https://resulyzer.vercel.app](https://resulyzer.vercel.app)

---

## 🚀 Features

- 📄 Upload resumes (PDF, DOCX, or plain text) for instant analysis
- 🤖 AI-powered insights and suggestions using Google Gemini AI API
- 🔍 Highlights keywords, strengths, and areas for improvement
- 📊 Visual feedback on resume structure, tone, and formatting
- 💼 Matches resume content with job descriptions to improve fit
- 🌐 SEO optimized with `robots.txt` and `sitemap.xml`
- 📱 Fully responsive and mobile-friendly design

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React.js, Tailwind CSS       |
| Backend   | Node.js, Express.js          |
| Database  | MongoDB (Atlas)              |
| AI API    | Google Gemini AI             |
| Deployment| Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

resulyzer/
├── client/ # React frontend
│ ├── public/
│ │ ├── robots.txt # SEO - robots rules
│ │ └── sitemap.xml # SEO - sitemap for indexing
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # React pages (Home, Analyze, etc.)
│ │ └── App.jsx
│ └── package.json
├── server/ # Express backend
│ ├── controllers/ # Route handlers
│ ├── models/ # MongoDB schemas
│ ├── routes/ # Express routes
│ ├── utils/ # Helper functions (Google Gemini API client)
│ ├── server.js # Entry point
│ └── package.json
├── .env # Environment variables (not committed)
└── README.md


---

## 📦 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/resulyzer.git
cd resulyzer
```

### 2. Setup Backend

```bash
cd server
npm install
```

### 3. Create a .env file in `server/` folder

```bash
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=jwt_secret
USER=your_email
PASS=your_gmail_app_password
```

### 4. Start backend server (development mode)

```bash
npx nodemon server.ts
```

### 3. Setup Frontend
open a new terminal

```bash
cd ../client
npm install
npm run dev
```
