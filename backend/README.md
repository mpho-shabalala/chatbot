# 🏡 Property Chatbot Backend

This project is a **Node.js + Express** backend for a **real estate chatbot assistant**. It integrates **Google Gemini AI** with **Firebase Firestore** to provide users with dynamic property-related assistance, including available locations, agent contacts, and scheduling options.  

---

## 🚀 Features

- 🤖 AI-powered responses using **Google Gemini** (`@google/genai`)  
- 🗂️ Dynamic property data fetched from **Firestore**  
- 🏙️ Real-time city/location suggestions based on database entries  
- 📅 Assistance with booking calls, visits, or online chats  
- 📧 Smart fallback with agent contact links (email, WhatsApp, and web form)  
- 🔒 Secure environment configuration with **dotenv**  

---

## 🛠️ Tech Stack

| Tool / Library        | Purpose |
|------------------------|---------|
| [Express](https://expressjs.com/) | Web framework for handling API routes |
| [CORS](https://www.npmjs.com/package/cors) | Enables cross-origin requests |
| [Body-Parser](https://www.npmjs.com/package/body-parser) | Parses incoming JSON request bodies |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Manages environment variables |
| [@google/genai](https://www.npmjs.com/package/@google/genai) | Connects to Google Gemini AI models |
| [firebase-admin](https://firebase.google.com/docs/admin/setup) | Admin SDK for Firestore integration |
| [Firestore](https://firebase.google.com/docs/firestore) | Cloud NoSQL database for property data |

---

## 📂 Project Structure

```
backend/
│── firebase.cjs        # Firebase Admin SDK initialization
│── server.js           # Express server with chatbot logic
│── .env                # Environment variables (ignored in Git)
│── package.json
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/property-chatbot-backend.git
   cd property-chatbot-backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root:  
   ```env
   PORT=3000
   GOOGLE_API_KEY=your_google_gemini_api_key
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   ```

4. **Run the server**  
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### **POST** `/chat`  
Handles user queries and returns AI-generated responses.  

#### Request Body  
```json
{
  "input": "Show me available properties in Cape Town"
}
```

#### Response Example  
```json
{
  "reply": "We have properties available in Cape Town. Would you like to book a visit between 9 AM - 4 PM (Mon-Sat)?"
}
```

---

## 🔑 AI Prompting Logic

The chatbot:  
- Uses **Gemini AI** to respond contextually.  
- Pulls dynamic **city/location** data from Firestore.  
- Provides fallback with **agent contact links** when unsure.  

---

## 📞 Contact Agent Links

If the AI cannot assist, it directs users to:  

- 📧 [Email Agent](mailto:agent@propertysite.com)  
- 💬 [WhatsApp](https://wa.me/27661234567)  
- 📝 [Main Contact Form](https://propertysite.com/main-form)  

---

## 🏗️ Future Improvements

- 🔐 JWT authentication for secured endpoints  
- 📊 Property recommendation engine  
- 🌍 Multi-language support  
- 🧑‍💼 CRM integration for leads  

---

## 👨‍💻 Author

Developed by **Mpho @ URACLINE TECH-SPACE**  
