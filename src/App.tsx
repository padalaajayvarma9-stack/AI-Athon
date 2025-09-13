import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { MoodTracker } from './components/mood/MoodTracker';
import { JournalForm } from './components/journal/JournalForm';
import { auth, supabase } from './lib/supabase';
import { analyzeSentiment, generateWellnessRecommendations } from './lib/ai-sentiment';
import { User } from '@supabase/supabase-js';
import { ActivityType } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // User state will be updated by the auth listener
  };

  const handleSignOut = async () => {
    await auth.signOut();
    setCurrentView('dashboard');
  };

  const handleMoodSubmit = async (data: {
    moodScore: number;
    energyLevel: number;
    stressLevel: number;
    activities: ActivityType[];
    notes: string;
  }) => {
    try {
      // In a real app, save to database
      console.log('Mood entry submitted:', data);
      
      // Generate AI recommendations based on mood data
      const recommendations = await generateWellnessRecommendations(
        data.moodScore,
        data.stressLevel,
        data.energyLevel,
        data.activities
      );
      
      console.log('Generated recommendations:', recommendations);
      
      // Show success message and redirect to dashboard
      alert('Mood check-in saved successfully!');
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Error saving mood entry:', error);
      alert('Error saving mood entry. Please try again.');
    }
  };

  const handleJournalSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
    isPrivate: boolean;
  }) => {
    try {
      // Analyze sentiment
      const sentiment = await analyzeSentiment(data.content);
      console.log('Sentiment analysis:', sentiment);
      
      // In a real app, save to database
      const journalEntry = {
        ...data,
        sentiment_score: sentiment.score,
        sentiment_label: sentiment.label,
        user_id: user?.id,
        created_at: new Date().toISOString()
      };
      
      console.log('Journal entry submitted:', journalEntry);
      
      // Show success message and redirect to dashboard
      alert(`Journal entry saved! Sentiment detected: ${sentiment.label} (${Math.round(sentiment.confidence * 100)}% confidence)`);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Error saving journal entry. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'mood':
        return <MoodTracker onSubmit={handleMoodSubmit} />;
      case 'journal':
        return <JournalForm onSubmit={handleJournalSubmit} />;
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">User preferences and settings coming soon...</p>
          </div>
        );
      default:
        return (
          <Dashboard
            onNewMoodEntry={() => setCurrentView('mood')}
            onNewJournalEntry={() => setCurrentView('journal')}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        onSignOut={handleSignOut}
        userName={user.user_metadata?.name || user.email}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}

export default App;