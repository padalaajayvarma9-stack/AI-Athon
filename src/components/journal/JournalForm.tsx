import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { BookOpen, Save, Loader } from 'lucide-react';

interface JournalFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    isPrivate: boolean;
  }) => Promise<void>;
}

export const JournalForm: React.FC<JournalFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim() || 'Untitled Entry',
        content: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPrivate
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setTags('');
    } catch (error) {
      console.error('Error submitting journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          New Journal Entry
        </CardTitle>
        <p className="text-gray-600">Express your thoughts and feelings. AI will analyze the sentiment to help track your emotional patterns.</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Entry Title (Optional)"
            placeholder="Give your entry a title..."
            value={title}
            onChange={setTitle}
          />
          
          <Input
            label="Your Thoughts"
            placeholder="What's on your mind today? How are you feeling? What happened today that you'd like to remember or reflect on?"
            value={content}
            onChange={setContent}
            rows={8}
            required
          />
          
          <Input
            label="Tags (Optional)"
            placeholder="work, family, anxiety, gratitude (separate with commas)"
            value={tags}
            onChange={setTags}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="private" className="text-sm font-medium text-gray-700">
                Keep this entry private
              </label>
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setTags('');
                }}
                disabled={loading}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={loading || !content.trim()}
                icon={loading ? Loader : Save}
              >
                {loading ? 'Analyzing & Saving...' : 'Save Entry'}
              </Button>
            </div>
          </div>
          
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Analyzing your entry...</p>
                  <p className="text-xs text-blue-700">Our AI is processing the sentiment and emotional patterns in your writing.</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};