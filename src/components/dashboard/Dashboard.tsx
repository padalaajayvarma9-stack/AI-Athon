import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { MoodChart } from './MoodChart';
import { WellnessRecommendations } from './WellnessRecommendations';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Award, 
  Plus,
  BookOpen,
  Smile
} from 'lucide-react';

interface DashboardProps {
  onNewMoodEntry: () => void;
  onNewJournalEntry: () => void;
}

// Mock data - in a real app, this would come from your backend
const mockMoodData = [
  { date: '2025-01-01', mood: 6, energy: 4, stress: 3 },
  { date: '2025-01-02', mood: 7, energy: 3, stress: 4 },
  { date: '2025-01-03', mood: 5, energy: 2, stress: 5 },
  { date: '2025-01-04', mood: 8, energy: 4, stress: 2 },
  { date: '2025-01-05', mood: 7, energy: 5, stress: 2 },
  { date: '2025-01-06', mood: 6, energy: 3, stress: 3 },
  { date: '2025-01-07', mood: 8, energy: 4, stress: 2 }
];

const mockRecommendations = [
  {
    id: '1',
    type: 'meditation' as const,
    title: 'Morning Mindfulness',
    description: 'Start your day with a 5-minute breathing exercise to center yourself.',
    duration: 5,
    difficulty: 'easy' as const,
    completed: false
  },
  {
    id: '2',
    type: 'exercise' as const,
    title: 'Take a Walk',
    description: 'A short walk can boost your mood and energy levels.',
    duration: 15,
    difficulty: 'easy' as const,
    completed: false
  },
  {
    id: '3',
    type: 'activity' as const,
    title: 'Gratitude Practice',
    description: 'Write down three things you\'re grateful for today.',
    duration: 10,
    difficulty: 'easy' as const,
    completed: true
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ onNewMoodEntry, onNewJournalEntry }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentStreak = 7; // Mock streak data
  const totalEntries = 24; // Mock total entries
  const avgMood = 6.8; // Mock average mood

  const handleCompleteRecommendation = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, completed: true } : rec
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600 mb-4">{today}</p>
            <p className="text-sm text-blue-700">
              You're on a {currentStreak}-day check-in streak! Keep up the great work.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={onNewMoodEntry} icon={Smile}>
              Quick Check-in
            </Button>
            <Button onClick={onNewJournalEntry} variant="outline" icon={BookOpen}>
              New Journal Entry
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{avgMood}/10</div>
              <div className="text-sm text-gray-600">Avg Mood</div>
            </div>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalEntries}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {recommendations.filter(r => r.completed).length}
              </div>
              <div className="text-sm text-gray-600">Goals Today</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Chart */}
        <div className="lg:col-span-1">
          <MoodChart data={mockMoodData} timeRange={timeRange} />
        </div>
        
        {/* Wellness Recommendations */}
        <div className="lg:col-span-1">
          <WellnessRecommendations
            recommendations={recommendations}
            onComplete={handleCompleteRecommendation}
            onViewAll={() => {}}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
              onClick={onNewMoodEntry}
            >
              <Smile className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Mood Check-in</div>
                <div className="text-xs text-gray-500">Track your mood</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
              onClick={onNewJournalEntry}
            >
              <BookOpen className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Journal Entry</div>
                <div className="text-xs text-gray-500">Write & reflect</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <TrendingUp className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-xs text-gray-500">See your progress</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};