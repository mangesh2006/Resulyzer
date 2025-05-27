# Resulyzer

**Resulyzer** is an AI-powered Resume Analyzer application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and integrated with the **Google Gemini AI API**. It helps job seekers and recruiters evaluate resumes for clarity, relevance, and strengths using advanced natural language understanding.

🌐 **Live Site**: [https://resulyzer.vercel.app](https://resulyzer.vercel.app)

---

## 🚀 Features

- 📄 Upload and analyze resumes in real-time
- 🤖 Uses Google Gemini AI to extract insights and give suggestions
- 📊 Provides feedback on resume structure, keywords, and tone
- 💼 Helps match resume content to job descriptions
- 💡 Suggestions to improve impact and clarity
- 🌐 SEO-ready with `robots.txt` and `sitemap.xml`

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite or CRA), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Cloud/Atlas)
- **AI Integration:** Google Gemini API (via REST/SDK)
- **Deployment:** Vercel (Frontend) & Render/Heroku (Backend)

---

## 📁 Project Structure

resulyzer/
├── client/ # React frontend
│ ├── public/
│ │ ├── robots.txt
│ │ └── sitemap.xml
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.jsx
├── server/ # Express backend
│ ├── routes/
│ ├── controllers/
│ ├── utils/
│ └── server.js
├── .env
├── package.json
└── README.md


---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/resulyzer.git
cd resulyzer

cd server
npm install
# Add .env with MONGO_URI and GEMINI_API_KEY, JWT_SECRET, GMAIL_USER, GMAIL_APP_PASS 
npm run dev

cd ../client
npm install
npm run dev
