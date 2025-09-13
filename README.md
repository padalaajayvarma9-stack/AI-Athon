# MindWell - Mental Health Platform

A comprehensive mental health platform that empowers users to track their daily moods, journal their thoughts with AI sentiment analysis, receive personalized wellness recommendations, and visualize their mental health trends over time.

## Features

### 🎯 Core Functionality
- **Daily Mood Check-ins**: Multiple input methods including emoji scales, sliders, and quick notes
- **AI-Powered Journaling**: Write reflections with automatic sentiment analysis for emotional insights
- **Personalized Wellness**: Receive tailored recommendations based on mood patterns and history
- **Visual Analytics**: Interactive dashboard showing mood trends, sentiment analysis, and progress
- **Secure Authentication**: User accounts with encrypted data storage using Supabase
- **Accessibility**: Screen reader support, keyboard navigation, and customizable interface

### 🎨 Design Elements
- Calming color palette with soft blues and gentle greens
- Clean, minimal interface with subtle animations
- Responsive design for desktop, tablet, and mobile
- Interactive data visualizations and progress indicators
- Accessible typography with adjustable font sizes

### 🛠 Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **AI/ML**: Custom sentiment analysis (expandable to OpenAI)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18 or higher
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mindwell-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Click the "Connect to Supabase" button in the app to set up your database schema, or manually create the required tables:
   
   - `profiles` - User profiles and preferences
   - `mood_entries` - Daily mood check-ins
   - `journal_entries` - Journal entries with sentiment data
   - `wellness_recommendations` - Personalized recommendations
   - `mood_trends` - Aggregated trend data

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard and analytics
│   ├── journal/         # Journaling functionality
│   ├── layout/          # Navigation and layout
│   ├── mood/            # Mood tracking components
│   └── ui/              # Base UI components
├── lib/                 # Utilities and services
│   ├── supabase.ts      # Supabase client and auth
│   └── ai-sentiment.ts  # Sentiment analysis
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

## Key Features Implementation

### Mood Tracking
- Interactive emoji-based mood scale (1-10)
- Energy and stress level sliders
- Activity selection with predefined categories
- Optional notes for additional context

### Sentiment Analysis
- Real-time analysis of journal entries
- Confidence scoring and emotional labeling
- Historical sentiment trends
- Integration ready for OpenAI API

### Wellness Recommendations
- AI-generated suggestions based on mood patterns
- Categorized by type (exercise, meditation, activities, tips)
- Progress tracking and completion status
- Personalized difficulty levels

### Data Visualization
- Interactive mood trend charts
- Sentiment analysis over time
- Progress indicators and statistics
- Export and sharing capabilities

## Security & Privacy

- **HIPAA/GDPR Compliant**: Secure data handling and user privacy controls
- **End-to-End Encryption**: All sensitive data encrypted in transit and at rest
- **Role-Based Access**: Granular permissions and access controls
- **Privacy Settings**: User-controlled data sharing and visibility options

## Accessibility

- **Screen Reader Support**: Full ARIA labeling and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliant color ratios
- **Font Scaling**: Adjustable text sizes and reading modes
- **Motion Controls**: Reduced motion options for sensitive users

## Deployment

The application is ready for deployment on modern platforms:

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel, Netlify, or similar static hosting
   - Ensure environment variables are configured
   - Set up Supabase production database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Follow the established code style and component patterns
5. Test accessibility and responsive design
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the component examples in `/src/components`

---

**MindWell** - Empowering mental health through technology 💙