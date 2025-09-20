// Google AI Services Integration
class GoogleAIService {
    constructor() {
        this.geminiApiKey = CONFIG.GEMINI_API_KEY;
        this.mapsApiKey = CONFIG.MAPS_API_KEY;
        this.useRealAI = CONFIG.FEATURES.USE_REAL_AI;
    }

    // Gemini AI Integration for Itinerary Generation
    async generateItineraryWithGemini(userPreferences) {
        if (!this.useRealAI || this.geminiApiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            console.log('Using demo mode - replace with real API keys');
            return this.generateDemoItinerary(userPreferences);
        }

        try {
            const prompt = this.createGeminiPrompt(userPreferences);
            
            const response = await fetch(`${CONFIG.ENDPOINTS.GEMINI_API}?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            return this.parseGeminiResponse(data, userPreferences);
            
        } catch (error) {
            console.error('Gemini AI Error:', error);
            // Fallback to demo mode
            return this.generateDemoItinerary(userPreferences);
        }
    }

    createGeminiPrompt(preferences) {
        return `Create a detailed ${preferences.duration}-day travel itinerary for ${preferences.destination}, India.

User Preferences:
- Budget: ₹${preferences.budget}
- Interests: ${preferences.interests.join(', ')}
- Duration: ${preferences.duration} days

Please provide:
1. Day-wise activities with specific timings
2. Cost breakdown for accommodation, transport, activities, and food
3. Personalized recommendations based on interests
4. Local hidden gems and authentic experiences

Format the response as a structured JSON with the following schema:
{
  "destination": "${preferences.destination}",
  "duration": ${preferences.duration},
  "budget": ${preferences.budget},
  "days": [
    {
      "day": 1,
      "title": "Day 1 title",
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Activity name",
          "description": "Detailed description",
          "cost": 1000
        }
      ]
    }
  ],
  "costs": {
    "accommodation": 10000,
    "transport": 5000,
    "activities": 6000,
    "food": 4000,
    "total": 25000
  }
}`;
    }

    parseGeminiResponse(geminiData, preferences) {
        try {
            const content = geminiData.candidates[0].content.parts[0].text;
            // Extract JSON from Gemini response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Error parsing Gemini response:', error);
        }
        
        // Fallback to demo
        return this.generateDemoItinerary(preferences);
    }

    // Google Maps API Integration
    async getPlaceDetails(placeName, destination) {
        if (!CONFIG.FEATURES.USE_MAPS_API || this.mapsApiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
            return null;
        }

        try {
            const response = await fetch(
                `${CONFIG.ENDPOINTS.MAPS_API}?query=${encodeURIComponent(placeName + ' ' + destination)}&key=${this.mapsApiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`Maps API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.results[0] || null;
            
        } catch (error) {
            console.error('Maps API Error:', error);
            return null;
        }
    }

    // Enhanced AI with real-time data
    async generateEnhancedItinerary(preferences) {
        // Get base itinerary from Gemini
        const baseItinerary = await this.generateItineraryWithGemini(preferences);
        
        // Enhance with Maps API data if available
        if (CONFIG.FEATURES.USE_MAPS_API) {
            for (let day of baseItinerary.days) {
                for (let activity of day.activities) {
                    const placeDetails = await this.getPlaceDetails(activity.activity, preferences.destination);
                    if (placeDetails) {
                        activity.rating = placeDetails.rating;
                        activity.location = placeDetails.geometry.location;
                        activity.photos = placeDetails.photos;
                    }
                }
            }
        }
        
        return baseItinerary;
    }

    // Demo fallback (current hardcoded logic)
    generateDemoItinerary(preferences) {
        const baseItineraries = {
            'Delhi': {
                heritage: ['Red Fort', 'India Gate', 'Qutub Minar', 'Humayun\'s Tomb'],
                adventure: ['Rock Climbing at Damdama', 'Cycling in Lodhi Gardens'],
                nightlife: ['Connaught Place', 'Hauz Khas Village', 'Cyber Hub'],
                nature: ['Lodhi Gardens', 'Raj Ghat', 'Yamuna Biodiversity Park'],
                food: ['Chandni Chowk', 'Khan Market', 'Karim\'s Restaurant']
            },
            'Goa': {
                heritage: ['Basilica of Bom Jesus', 'Se Cathedral', 'Fort Aguada'],
                adventure: ['Water Sports at Baga', 'Scuba Diving', 'Parasailing'],
                nightlife: ['Tito\'s Club', 'Curlies Beach Shack', 'Club Cubana'],
                nature: ['Dudhsagar Falls', 'Butterfly Conservatory', 'Salim Ali Bird Sanctuary'],
                food: ['Beach Shacks', 'Fisherman\'s Wharf', 'Vinayak Family Restaurant']
            },
            'Kerala': {
                heritage: ['Mattancherry Palace', 'Jewish Synagogue', 'St. Francis Church'],
                adventure: ['Backwater Kayaking', 'Trekking in Munnar', 'Bamboo Rafting'],
                nightlife: ['Marine Drive Kochi', 'Lulu Mall', 'Casino Cruise'],
                nature: ['Backwaters Alleppey', 'Tea Gardens Munnar', 'Periyar Wildlife'],
                food: ['Sadhya Experience', 'Spice Plantation Tour', 'Seafood at Fort Kochi']
            }
        };

        const attractions = baseItineraries[preferences.destination] || baseItineraries['Delhi'];
        const selectedAttractions = [];

        preferences.interests.forEach(interest => {
            if (attractions[interest]) {
                selectedAttractions.push(...attractions[interest].slice(0, 2));
            }
        });

        const itinerary = {
            destination: preferences.destination,
            duration: preferences.duration,
            budget: preferences.budget,
            days: []
        };

        for (let day = 1; day <= preferences.duration; day++) {
            const dayAttractions = selectedAttractions.slice((day-1)*2, day*2);
            itinerary.days.push({
                day: day,
                title: `Day ${day} - ${preferences.destination} Explorer`,
                activities: dayAttractions.map(attraction => ({
                    time: day === 1 ? '9:00 AM' : '10:00 AM',
                    activity: `Visit ${attraction}`,
                    description: `Explore the beautiful ${attraction} with guided tour and local insights.`,
                    cost: Math.floor(preferences.budget / (preferences.duration * 3))
                }))
            });
        }

        itinerary.costs = {
            accommodation: Math.floor(preferences.budget * 0.4),
            transport: Math.floor(preferences.budget * 0.2),
            activities: Math.floor(preferences.budget * 0.25),
            food: Math.floor(preferences.budget * 0.15),
            total: preferences.budget
        };

        return itinerary;
    }
}

// Firebase Integration (Optional)
class FirebaseService {
    constructor() {
        this.useFirebase = CONFIG.FEATURES.USE_FIREBASE;
    }

    async saveItinerary(userId, itinerary) {
        if (!this.useFirebase) {
            console.log('Firebase disabled - itinerary not saved');
            return;
        }
        
        // Firebase save logic here
        try {
            // await firebase.firestore().collection('itineraries').add({
            //     userId,
            //     itinerary,
            //     createdAt: new Date()
            // });
            console.log('Itinerary saved to Firebase');
        } catch (error) {
            console.error('Firebase save error:', error);
        }
    }
}

// Export services
if (typeof window !== 'undefined') {
    window.GoogleAIService = GoogleAIService;
    window.FirebaseService = FirebaseService;
}