# 🌍 AI Trip Planner - Google Hackathon MVP

An AI-powered personalized trip planner that creates dynamic itineraries tailored to individual budgets, interests, and preferences for destinations across India.

## 🚀 Quick Start

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd google_hackathon
```

### 2. Configure API Keys
```bash
# Copy the config template
cp config.example.js config.js

# Edit config.js and add your API keys:
# - Get Gemini API key: https://makersuite.google.com/app/apikey
# - Get Maps API key: https://console.cloud.google.com/
```

### 3. Run the App
```bash
# Option 1: Direct browser
open index.html

# Option 2: Local server (recommended)
python simple-server.py
# Then open: http://localhost:8000
```

## ✨ Features

### 🤖 AI-Powered Itinerary Generation
- Real Google Gemini AI integration
- Personalized recommendations based on interests
- Smart budget allocation across categories

### 🎯 Interactive Customization
- 6 Indian destinations (Delhi, Mumbai, Goa, Rajasthan, Kerala, Himachal)
- Flexible duration (2-7 days)
- Budget tiers (₹10K, ₹25K, ₹50K)
- Multiple interest categories

### 💳 Booking Simulation
- Real-time cost breakdown
- One-click booking workflow
- Payment processing simulation

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini API
- **Maps**: Google Maps API
- **Design**: Responsive, mobile-first
- **Architecture**: Client-side, no build process

## 🔧 Configuration

### API Keys Required
1. **Gemini AI**: Free tier available
2. **Google Maps**: $200 monthly credit
3. **Firebase**: Optional for data persistence

### Feature Flags
```javascript
FEATURES: {
    USE_REAL_AI: true,     // Enable Gemini AI
    USE_MAPS_API: true,    // Enable Maps integration  
    DEMO_MODE: false       // Disable hardcoded data
}
```

## 🧪 Testing

### Test Real AI Integration
```bash
# Open test pages:
open working-gemini-test.html
open quick-test.html
```

### Demo Mode
- Works without API keys
- Uses hardcoded attraction database
- Perfect for presentations

## 📱 Demo

### Live Demo
- **Demo Mode**: Works immediately without setup
- **AI Mode**: Add API keys for real AI responses
- **Fallback**: Graceful degradation if APIs fail

### Sample Usage
1. Select destination (e.g., Goa)
2. Choose duration (3 days)
3. Set budget (₹25,000)
4. Pick interests (Adventure + Nightlife)
5. Generate AI itinerary
6. Review and book

## 🏗️ Architecture

```
Frontend (Browser)
├── HTML/CSS/JS
├── Google Gemini AI
├── Google Maps API
└── Demo Fallback
```

## 🔐 Security

- ✅ API keys in gitignored config.js
- ✅ Template config for GitHub
- ✅ Demo mode for public demos
- ⚠️ Client-side keys (OK for hackathon)

## 🚀 Deployment

### GitHub Pages
```bash
# Push to GitHub (API keys excluded)
git add .
git commit -m "Add AI Trip Planner MVP"
git push origin main

# Enable GitHub Pages in repo settings
```

### Local Development
```bash
# Start local server
python simple-server.py
```

## 🏆 Hackathon Ready

- ✅ **Working MVP** with core features
- ✅ **Real AI integration** with Google Gemini
- ✅ **Demo mode** for reliable presentations
- ✅ **Responsive design** for all devices
- ✅ **Complete user journey** from planning to booking

## 📄 License

MIT License - Feel free to use for hackathons and learning!

---

**Built for Google Hackathon 2024** 🚀