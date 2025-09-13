// Mock AI sentiment analysis - in production, this would connect to OpenAI or similar
export const analyzeSentiment = async (text: string): Promise<{
  score: number; // -1 to 1
  label: 'positive' | 'neutral' | 'negative';
  confidence: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Simple mock sentiment analysis based on keywords
  const positiveWords = ['happy', 'joy', 'love', 'excited', 'grateful', 'peaceful', 'amazing', 'wonderful', 'great', 'good', 'better', 'progress', 'achievement'];
  const negativeWords = ['sad', 'angry', 'frustrated', 'anxious', 'worried', 'depressed', 'terrible', 'awful', 'bad', 'worse', 'difficult', 'struggle', 'pain'];
  
  const words = text.toLowerCase().split(/\W+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  const totalWords = words.length;
  const netSentiment = (positiveCount - negativeCount) / Math.max(totalWords, 1);
  
  let score = Math.max(-1, Math.min(1, netSentiment * 5)); // Scale to -1 to 1
  let label: 'positive' | 'neutral' | 'negative';
  
  if (score > 0.1) label = 'positive';
  else if (score < -0.1) label = 'negative';
  else label = 'neutral';
  
  const confidence = Math.min(0.95, Math.abs(score) + 0.3);
  
  return { score, label, confidence };
};

export const generateWellnessRecommendations = async (
  moodScore: number,
  stressLevel: number,
  energyLevel: number,
  recentActivities: string[]
): Promise<string[]> => {
  // Mock wellness recommendations based on current state
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const recommendations: string[] = [];
  
  if (moodScore < 5) {
    recommendations.push("Try a 5-minute breathing exercise to center yourself");
    recommendations.push("Consider going for a short walk in nature");
    recommendations.push("Write down three things you're grateful for today");
  }
  
  if (stressLevel > 3) {
    recommendations.push("Practice progressive muscle relaxation");
    recommendations.push("Take breaks every hour to stretch and breathe");
    recommendations.push("Consider meditation or mindfulness exercises");
  }
  
  if (energyLevel < 3) {
    recommendations.push("Ensure you're getting 7-8 hours of sleep");
    recommendations.push("Try light exercise like yoga or walking");
    recommendations.push("Stay hydrated and eat nutritious meals");
  }
  
  if (!recentActivities.includes('social')) {
    recommendations.push("Reach out to a friend or family member");
    recommendations.push("Join a community activity or group");
  }
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
};