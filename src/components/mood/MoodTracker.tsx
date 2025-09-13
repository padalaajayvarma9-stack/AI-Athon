import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Smile, Frown, Meh, Heart, Zap, AlertTriangle, Plus } from 'lucide-react';
import { ActivityType } from '../../types';

interface MoodTrackerProps {
  onSubmit: (data: {
    moodScore: number;
    energyLevel: number;
    stressLevel: number;
    activities: ActivityType[];
    notes: string;
  }) => void;
}

const moodEmojis = [
  { score: 1, emoji: '😢', label: 'Very Sad' },
  { score: 2, emoji: '😟', label: 'Sad' },
  { score: 3, emoji: '😐', label: 'Okay' },
  { score: 4, emoji: '🙂', label: 'Good' },
  { score: 5, emoji: '😊', label: 'Happy' },
  { score: 6, emoji: '😄', label: 'Very Happy' },
  { score: 7, emoji: '🥰', label: 'Excellent' },
  { score: 8, emoji: '😆', label: 'Amazing' },
  { score: 9, emoji: '🤩', label: 'Incredible' },
  { score: 10, emoji: '🌟', label: 'Perfect' }
];

const activityOptions: { type: ActivityType; label: string; icon: React.ReactNode }[] = [
  { type: 'exercise', label: 'Exercise', icon: <Zap className="w-5 h-5" /> },
  { type: 'work', label: 'Work', icon: <AlertTriangle className="w-5 h-5" /> },
  { type: 'social', label: 'Social', icon: <Heart className="w-5 h-5" /> },
  { type: 'relaxation', label: 'Relaxation', icon: <Smile className="w-5 h-5" /> },
  { type: 'hobbies', label: 'Hobbies', icon: <Plus className="w-5 h-5" /> },
  { type: 'outdoors', label: 'Outdoors', icon: <Plus className="w-5 h-5" /> },
  { type: 'creative', label: 'Creative', icon: <Plus className="w-5 h-5" /> },
  { type: 'learning', label: 'Learning', icon: <Plus className="w-5 h-5" /> }
];

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onSubmit }) => {
  const [moodScore, setMoodScore] = useState<number>(5);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([]);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmit({
      moodScore,
      energyLevel,
      stressLevel,
      activities: selectedActivities,
      notes
    });
  };

  const toggleActivity = (activity: ActivityType) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600" />
          Daily Mood Check-in
        </CardTitle>
        <p className="text-gray-600">How are you feeling today? Take a moment to reflect.</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mood Scale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Overall Mood (1-10)
          </label>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {moodEmojis.map(({ score, emoji, label }) => (
              <button
                key={score}
                onClick={() => setMoodScore(score)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  moodScore === score
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                title={label}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs text-gray-600">{score}</div>
              </button>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={moodScore}
            onChange={(e) => setMoodScore(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2">
            <span className="text-lg font-medium text-gray-700">
              {moodEmojis.find(m => m.score === moodScore)?.label}
            </span>
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level: <span className="font-bold text-green-600">{energyLevel}/5</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Level: <span className="font-bold text-orange-600">{stressLevel}/5</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What activities did you do today?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activityOptions.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => toggleActivity(type)}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                  selectedActivities.includes(type)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <Input
          label="Additional Notes (Optional)"
          placeholder="How was your day? Any thoughts or reflections..."
          value={notes}
          onChange={setNotes}
          rows={3}
        />

        <Button onClick={handleSubmit} className="w-full" size="lg">
          Save Mood Check-in
        </Button>
      </CardContent>
    </Card>
  );
};