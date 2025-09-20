# Visual Architecture Diagrams

## 🏗️ High-Level System Architecture

```
                    ┌─────────────────────────────────────┐
                    │           USER INTERFACE            │
                    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
                    │  │  HTML   │ │   CSS   │ │   JS    │ │
                    │  │ Forms   │ │ Styles  │ │ Logic   │ │
                    │  └─────────┘ └─────────┘ └─────────┘ │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │         AI PROCESSING ENGINE        │
                    │  ┌─────────────────────────────────┐ │
                    │  │      TripPlanner Class          │ │
                    │  │  ┌─────────┐ ┌─────────────────┐ │ │
                    │  │  │   AI    │ │ Cost Calculator │ │ │
                    │  │  │ Engine  │ │                 │ │ │
                    │  │  └─────────┘ └─────────────────┘ │ │
                    │  └─────────────────────────────────┘ │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │           DATA LAYER                │
                    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
                    │  │Destinations│Activities│ Pricing │ │
                    │  │ Database │ Catalog  │ Models  │ │
                    │  └─────────┘ └─────────┘ └─────────┘ │
                    └─────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

```
User Input → Validation → AI Processing → Result Generation → Display → Booking
    │            │            │               │              │          │
    ▼            ▼            ▼               ▼              ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ ┌─────────┐
│Form     │ │Check    │ │Match        │ │Generate     │ │Show     │ │Payment  │
│- Dest   │ │Required │ │Preferences  │ │Itinerary    │ │Results  │ │Modal    │
│- Days   │ │Fields   │ │with         │ │- Days       │ │- Plan   │ │- Card   │
│- Budget │ │- Alert  │ │Activities   │ │- Activities │ │- Costs  │ │- Process│
│- Interests│ │Errors  │ │- Calculate  │ │- Costs      │ │- Book   │ │- Confirm│
└─────────┘ └─────────┘ │Costs        │ └─────────────┘ └─────────┘ └─────────┘
                        └─────────────┘
```

## 🧠 AI Algorithm Architecture

```
                    ┌─────────────────────────────────────┐
                    │         INPUT PROCESSING            │
                    │  ┌─────────────────────────────────┐ │
                    │  │ User Preferences Analysis       │ │
                    │  │ - Destination: String           │ │
                    │  │ - Duration: Number              │ │
                    │  │ - Budget: Number                │ │
                    │  │ - Interests: Array              │ │
                    │  └─────────────────────────────────┘ │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │       SMART MATCHING ENGINE         │
                    │  ┌─────────────────────────────────┐ │
                    │  │  Interest-Based Filtering       │ │
                    │  │  ┌─────────┐ ┌─────────────────┐ │ │
                    │  │  │Heritage │ │Adventure        │ │ │
                    │  │  │Culture  │ │Water Sports     │ │ │
                    │  │  │Temples  │ │Trekking         │ │ │
                    │  │  └─────────┘ └─────────────────┘ │ │
                    │  │  ┌─────────┐ ┌─────────────────┐ │ │
                    │  │  │Nightlife│ │Nature & Food    │ │ │
                    │  │  │Clubs    │ │Parks & Cuisine  │ │ │
                    │  │  │Bars     │ │Gardens & Local  │ │ │
                    │  │  └─────────┘ └─────────────────┘ │ │
                    │  └─────────────────────────────────┘ │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │      ITINERARY GENERATION           │
                    │  ┌─────────────────────────────────┐ │
                    │  │  Day-wise Planning Algorithm    │ │
                    │  │  - Distribute activities        │ │
                    │  │  - Assign time slots            │ │
                    │  │  - Calculate individual costs   │ │
                    │  │  - Optimize for budget          │ │
                    │  └─────────────────────────────────┘ │
                    └─────────────────────────────────────┘
```

## 💰 Cost Calculation Architecture

```
                    ┌─────────────────────────────────────┐
                    │         BUDGET DISTRIBUTION         │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │      Total Budget (User Input)      │
                    │              ₹25,000                │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │        SMART ALLOCATION             │
                    │  ┌─────────────────────────────────┐ │
                    │  │ Accommodation: 40% = ₹10,000   │ │
                    │  │ Transport:     20% = ₹5,000    │ │
                    │  │ Activities:    25% = ₹6,250    │ │
                    │  │ Food:          15% = ₹3,750    │ │
                    │  └─────────────────────────────────┘ │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │       REAL-TIME CALCULATION         │
                    │  - Per day cost distribution        │
                    │  - Activity-wise cost breakdown     │
                    │  - Dynamic pricing adjustments      │
                    └─────────────────────────────────────┘
```

## 🔄 State Management Architecture

```
                    ┌─────────────────────────────────────┐
                    │         APPLICATION STATE           │
                    └─────────────────┬───────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│ FORM STATE  │              │ITINERARY    │              │BOOKING      │
│             │              │STATE        │              │STATE        │
│- destination│              │             │              │             │
│- duration   │              │- generated  │              │- modal open │
│- budget     │              │- displayed  │              │- processing │
│- interests  │              │- costs      │              │- confirmed  │
│- validation │              │- booking    │              │- payment    │
└─────────────┘              └─────────────┘              └─────────────┘
        │                             │                             │
        └─────────────────────────────┼─────────────────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │         EVENT HANDLERS              │
                    │  - Form submission                  │
                    │  - Itinerary generation             │
                    │  - Booking flow                     │
                    │  - Payment processing               │
                    └─────────────────────────────────────┘
```

## 📱 Component Hierarchy

```
App (TripPlanner Class)
├── Header Component
├── Form Component
│   ├── Destination Selector
│   ├── Duration Picker
│   ├── Budget Selector
│   └── Interest Checkboxes
├── Loading Component
├── Itinerary Component
│   ├── Trip Header
│   ├── Day Items
│   │   └── Activity Items
│   └── Cost Breakdown
├── Booking Component
│   └── Book Button
└── Payment Modal
    ├── Payment Form
    ├── Confirm Button
    └── Cancel Button
```