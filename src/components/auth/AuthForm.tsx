import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { auth } from '../../lib/supabase';
import { Heart, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        
        const { error } = await auth.signUp(formData.email, formData.password, formData.name);
        if (error) throw error;
      } else {
        const { error } = await auth.signIn(formData.email, formData.password);
        if (error) throw error;
      }
      
      onAuthSuccess();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to MindWell
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Create your account to begin your wellness journey' : 'Sign in to continue your wellness journey'}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                required
              />
            )}
            
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {isSignUp && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                required
              />
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};