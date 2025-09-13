import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MoodData {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}

interface MoodChartProps {
  data: MoodData[];
  timeRange: '7d' | '30d' | '90d';
}

export const MoodChart: React.FC<MoodChartProps> = ({ data, timeRange }) => {
  const maxValue = 10;
  const chartHeight = 200;
  
  // Calculate averages and trends
  const currentAvg = data.length > 0 ? data.reduce((sum, d) => sum + d.mood, 0) / data.length : 0;
  const previousAvg = data.length > 7 ? 
    data.slice(0, -7).reduce((sum, d) => sum + d.mood, 0) / (data.length - 7) : currentAvg;
  const trend = currentAvg - previousAvg;
  
  const getTrendIcon = () => {
    if (trend > 0.5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < -0.5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };
  
  const getTrendText = () => {
    if (trend > 0.5) return 'Improving';
    if (trend < -0.5) return 'Declining';
    return 'Stable';
  };
  
  const getTrendColor = () => {
    if (trend > 0.5) return 'text-green-600';
    if (trend < -0.5) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mood Trends</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon()}
            <span className={`font-medium ${getTrendColor()}`}>
              {getTrendText()}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No data available yet</p>
            <p className="text-sm mt-1">Start tracking your mood to see trends here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chart */}
            <div className="relative" style={{ height: chartHeight }}>
              <svg
                width="100%"
                height={chartHeight}
                className="overflow-visible"
              >
                {/* Grid lines */}
                {[0, 2.5, 5, 7.5, 10].map((value) => (
                  <g key={value}>
                    <line
                      x1="0"
                      y1={chartHeight - (value / maxValue) * chartHeight}
                      x2="100%"
                      y2={chartHeight - (value / maxValue) * chartHeight}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x="-10"
                      y={chartHeight - (value / maxValue) * chartHeight + 4}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                ))}
                
                {/* Mood line */}
                <polyline
                  points={data.map((d, i) => 
                    `${(i / (data.length - 1)) * 100}%,${chartHeight - (d.mood / maxValue) * chartHeight}`
                  ).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
                
                {/* Energy line */}
                <polyline
                  points={data.map((d, i) => 
                    `${(i / (data.length - 1)) * 100}%,${chartHeight - ((d.energy * 2) / maxValue) * chartHeight}`
                  ).join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                
                {/* Stress line */}
                <polyline
                  points={data.map((d, i) => 
                    `${(i / (data.length - 1)) * 100}%,${chartHeight - ((d.stress * 2) / maxValue) * chartHeight}`
                  ).join(' ')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
                
                {/* Data points */}
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={`${(i / (data.length - 1)) * 100}%`}
                    cy={chartHeight - (d.mood / maxValue) * chartHeight}
                    r="4"
                    fill="#3b82f6"
                    className="hover:r-6 transition-all cursor-pointer drop-shadow-sm"
                  />
                ))}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Mood</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-500 border-dashed border-green-500"></div>
                <span>Energy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-yellow-500 border-dashed border-yellow-500"></div>
                <span>Stress</span>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentAvg.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Avg Mood</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(data.reduce((sum, d) => sum + d.energy, 0) / data.length || 0).toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Avg Energy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {(data.reduce((sum, d) => sum + d.stress, 0) / data.length || 0).toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Avg Stress</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};