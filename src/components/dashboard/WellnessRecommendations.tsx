import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Heart, 
  Brain, 
  Activity, 
  Sunrise, 
  Check, 
  Clock,
  ArrowRight
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'exercise' | 'meditation' | 'activity' | 'tip';
  title: string;
  description: string;
  duration?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface WellnessRecommendationsProps {
  recommendations: Recommendation[];
  onComplete: (id: string) => void;
  onViewAll: () => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'exercise':
      return <Activity className="w-5 h-5" />;
    case 'meditation':
      return <Brain className="w-5 h-5" />;
    case 'activity':
      return <Heart className="w-5 h-5" />;
    default:
      return <Sunrise className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'exercise':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'meditation':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'activity':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'hard':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const WellnessRecommendations: React.FC<WellnessRecommendationsProps> = ({
  recommendations,
  onComplete,
  onViewAll
}) => {
  const pendingRecommendations = recommendations.filter(r => !r.completed);
  const completedToday = recommendations.filter(r => r.completed).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-600" />
            Wellness Recommendations
          </CardTitle>
          <div className="text-sm text-gray-600">
            {completedToday}/{recommendations.length} completed today
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {pendingRecommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Done!</h3>
            <p className="text-gray-600 mb-4">You've completed all your wellness recommendations for today.</p>
            <Button variant="outline" onClick={onViewAll}>
              View All Activities
            </Button>
          </div>
        ) : (
          <>
            {pendingRecommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border ${getTypeColor(rec.type)}`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className={`text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {rec.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{rec.duration} min</span>
                          </div>
                        )}
                        <span className="capitalize">{rec.type}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => onComplete(rec.id)}
                        className="text-xs"
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingRecommendations.length > 3 && (
              <Button
                variant="outline"
                onClick={onViewAll}
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                View {pendingRecommendations.length - 3} More Recommendations
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};