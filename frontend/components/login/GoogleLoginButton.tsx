'use client';

import { GoogleLogin } from '@react-oauth/google';
import { api } from '@/apiClient/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';

export default function GoogleLoginButton() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      const token = credentialResponse.credential;

      // Send token to backend for verification
      const response = await api.post('/google-login', { token });

      if (response.data.token) {
        // Store the token from backend
        localStorage.setItem('token', response.data.token);
        document.cookie = `token=${response.data.token}; path=/`;

        // Invalidate user query to refetch user data
        queryClient.invalidateQueries({ queryKey: ['user'] });

        toast.success('Login successful!');
        
        // Reload to update user state globally
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Google login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed');
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap
      />
    </div>
  );
}
