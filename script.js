// AI Trip Planner MVP - Enhanced with Google AI
class TripPlanner {
    constructor() {
        this.initializeEventListeners();
        this.itineraryData = null;
        this.googleAI = new GoogleAIService();
        this.firebase = new FirebaseService();
        this.checkAPIStatus();
    }

    checkAPIStatus() {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'api-status';
        
        if (CONFIG.FEATURES.USE_REAL_AI && CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            statusDiv.innerHTML = '🤖 <strong>Google Gemini AI</strong> - REAL AI Active';
            statusDiv.style.background = '#d4edda';
            statusDiv.style.color = '#155724';
        } else {
            statusDiv.innerHTML = '⚡ <strong>Demo Mode</strong> - Using hardcoded data (Add real API keys for AI)';
            statusDiv.style.background = '#fff3cd';
            statusDiv.style.color = '#856404';
        }
        
        statusDiv.style.padding = '10px';
        statusDiv.style.margin = '10px 0';
        statusDiv.style.borderRadius = '5px';
        statusDiv.style.textAlign = 'center';
        statusDiv.style.fontWeight = 'bold';
        
        document.querySelector('.planner-form').prepend(statusDiv);
    }

    initializeEventListeners() {
        document.getElementById('tripForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateItinerary();
        });

        document.getElementById('bookNowBtn').addEventListener('click', () => {
            this.showBookingModal();
        });

        document.getElementById('confirmPayment').addEventListener('click', () => {
            this.processPayment();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideBookingModal();
        });
    }

    async generateItinerary() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            alert('Please fill all required fields');
            return;
        }

        this.showLoading();
        
        try {
            let itinerary;
            
            // Debug: Show what mode we're using
            console.log('=== TRIP PLANNER DEBUG ===');
            console.log('USE_REAL_AI:', CONFIG.FEATURES.USE_REAL_AI);
            console.log('API Key configured:', CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE');
            console.log('API Key (first 20 chars):', CONFIG.GEMINI_API_KEY.substring(0, 20) + '...');
            
            // Use REAL Gemini AI if enabled and configured
            if (CONFIG.FEATURES.USE_REAL_AI && CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
                console.log('🤖 USING REAL GEMINI AI - Calling API...');
                this.updateLoadingMessage('Calling Google Gemini AI...');
                try {
                    itinerary = await this.generateRealAIItinerary(formData);
                    console.log('✅ Real AI Response received:', itinerary);
                } catch (apiError) {
                    console.error('❌ Real AI failed, falling back to demo:', apiError);
                    this.updateLoadingMessage('AI failed, using demo data...');
                    itinerary = this.googleAI.generateDemoItinerary(formData);
                }
            } else {
                console.log('⚡ USING DEMO MODE - Hardcoded data');
                this.updateLoadingMessage('Using demo data...');
                itinerary = this.googleAI.generateDemoItinerary(formData);
                console.log('✅ Demo data generated:', itinerary);
            }
            
            // Save to Firebase if enabled
            await this.firebase.saveItinerary('demo-user', itinerary);
            
            this.displayItinerary(itinerary);
        } catch (error) {
            console.error('Error generating itinerary:', error);
            // Fallback to demo mode on error
            const fallbackItinerary = this.googleAI.generateDemoItinerary(formData);
            this.displayItinerary(fallbackItinerary);
        }
        
        this.hideLoading();
    }

    // NEW: Real Gemini AI Integration with multiple endpoint fallbacks
    async generateRealAIItinerary(formData) {
        const prompt = `Create a detailed ${formData.duration}-day travel itinerary for ${formData.destination}, India.

User Preferences:
- Budget: ₹${formData.budget}
- Interests: ${formData.interests.join(', ')}
- Duration: ${formData.duration} days

Provide a JSON response with this EXACT structure:
{
  "destination": "${formData.destination}",
  "duration": ${formData.duration},
  "budget": ${formData.budget},
  "days": [
    {
      "day": 1,
      "title": "Day 1 - Specific title",
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Specific activity name",
          "description": "Detailed description",
          "cost": 1500
        }
      ]
    }
  ],
  "costs": {
    "accommodation": ${Math.floor(formData.budget * 0.4)},
    "transport": ${Math.floor(formData.budget * 0.2)},
    "activities": ${Math.floor(formData.budget * 0.25)},
    "food": ${Math.floor(formData.budget * 0.15)},
    "total": ${formData.budget}
  }
}

IMPORTANT: Return ONLY the JSON object, no additional text.`;

        // Try multiple API endpoints with correct model names
        const endpoints = [
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent',
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
        ];

        let lastError;
        
        for (const endpoint of endpoints) {
            try {
                console.log(`🔄 Trying endpoint: ${endpoint}`);
                
                const response = await fetch(`${endpoint}?key=${CONFIG.GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 2048
                        }
                    })
                });

                console.log(`📡 Response status: ${response.status}`);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ API Response received:', data);
                    
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    
                    // Parse JSON from AI response
                    try {
                        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            const itinerary = JSON.parse(jsonMatch[0]);
                            this.itineraryData = itinerary;
                            console.log('🎯 Parsed itinerary:', itinerary);
                            return itinerary;
                        }
                    } catch (parseError) {
                        console.error('Error parsing AI response:', parseError);
                        console.log('Raw AI response:', aiResponse);
                    }
                } else {
                    const errorText = await response.text();
                    console.error(`❌ API Error ${response.status}:`, errorText);
                    lastError = new Error(`API ${response.status}: ${errorText}`);
                }
            } catch (error) {
                console.error(`❌ Network error for ${endpoint}:`, error);
                lastError = error;
            }
        }
        
        throw lastError || new Error('All API endpoints failed');
    }

    getFormData() {
        const interests = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        return {
            destination: document.getElementById('destination').value,
            duration: parseInt(document.getElementById('duration').value),
            budget: parseInt(document.getElementById('budget').value),
            interests: interests
        };
    }

    validateForm(data) {
        return data.destination && data.duration && data.budget && data.interests.length > 0;
    }

    // Legacy method - now handled by GoogleAIService
    createAIItinerary(data) {
        // This method is now deprecated in favor of GoogleAIService
        return this.googleAI.generateDemoItinerary(data);
    }

    calculateCosts(data) {
        const budgetPerDay = data.budget / data.duration;
        
        return {
            accommodation: Math.floor(data.budget * 0.4),
            transport: Math.floor(data.budget * 0.2),
            activities: Math.floor(data.budget * 0.25),
            food: Math.floor(data.budget * 0.15),
            total: data.budget
        };
    }

    displayItinerary(itinerary) {
        const container = document.getElementById('itineraryContent');
        
        let html = `<div class="trip-header">
            <h3>🎯 ${itinerary.destination} - ${itinerary.duration} Days Trip</h3>
            <p>Personalized itinerary crafted by AI based on your preferences</p>
        </div>`;

        itinerary.days.forEach(day => {
            html += `
                <div class="day-item">
                    <div class="day-title">${day.title}</div>
                    ${day.activities.map(activity => `
                        <div class="activity">
                            <strong>${activity.time}</strong> - ${activity.activity}
                            <p>${activity.description}</p>
                            <small>Estimated cost: ₹${activity.cost}</small>
                        </div>
                    `).join('')}
                </div>
            `;
        });

        container.innerHTML = html;

        // Display cost breakdown
        this.displayCostBreakdown(itinerary.costs);
        
        document.getElementById('itineraryResult').classList.remove('hidden');
    }

    displayCostBreakdown(costs) {
        const container = document.getElementById('costBreakdown');
        
        const html = `
            <div class="cost-breakdown">
                <h4>💰 Cost Breakdown</h4>
                <div class="cost-item">
                    <span>🏨 Accommodation:</span>
                    <span>₹${costs.accommodation.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🚗 Transport:</span>
                    <span>₹${costs.transport.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🎯 Activities:</span>
                    <span>₹${costs.activities.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span>🍽️ Food:</span>
                    <span>₹${costs.food.toLocaleString()}</span>
                </div>
                <div class="cost-item total-cost">
                    <span>Total Amount:</span>
                    <span>₹${costs.total.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    showBookingModal() {
        if (!this.itineraryData) return;
        
        document.getElementById('totalAmount').textContent = 
            `₹${this.itineraryData.costs.total.toLocaleString()}`;
        document.getElementById('bookingModal').classList.remove('hidden');
    }

    hideBookingModal() {
        document.getElementById('bookingModal').classList.add('hidden');
    }

    async processPayment() {
        // Simulate payment processing
        const confirmBtn = document.getElementById('confirmPayment');
        confirmBtn.textContent = 'Processing...';
        confirmBtn.disabled = true;

        await this.delay(2000);

        alert('🎉 Payment Successful! Your trip has been booked. Confirmation details will be sent to your email.');
        this.hideBookingModal();
        
        confirmBtn.textContent = 'Confirm Payment';
        confirmBtn.disabled = false;
    }

    showLoading() {
        document.getElementById('loadingDiv').classList.remove('hidden');
        document.getElementById('itineraryResult').classList.add('hidden');
    }

    updateLoadingMessage(message) {
        const loadingText = document.querySelector('#loadingDiv p');
        if (loadingText) {
            loadingText.textContent = message;
        }
    }

    hideLoading() {
        document.getElementById('loadingDiv').classList.add('hidden');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the trip planner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TripPlanner();
});

// Demo data for quick testing
window.fillDemoData = () => {
    document.getElementById('destination').value = 'Goa';
    document.getElementById('duration').value = '3';
    document.getElementById('budget').value = '25000';
    document.querySelector('input[value="adventure"]').checked = true;
    document.querySelector('input[value="nightlife"]').checked = true;
};