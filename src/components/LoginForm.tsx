
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { DEFAULT_CUSTOMER_ID } from '@/types/auth';
import { Mail, Lock, LogIn } from 'lucide-react';

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { login, error, loading } = useAuth();
  
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password, DEFAULT_CUSTOMER_ID);
      toast({
        title: "Welcome back!",
        description: `You've logged in successfully to the bookline.AI team portal.`,
      });
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-[#E5DEFF]">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/550aab05-c6c5-4d4a-8ef2-665352be8d2e.png" 
          alt="bookline.AI Logo" 
          className="h-16 w-16 object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center text-[#1A1F2C]">Team Access Portal</h1>
      <p className="text-center text-[#8E9196] mb-6">Sign in to access your bookline.AI dashboard</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#9b87f5]" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="bg-[#F1F0FB] border-[#E5DEFF]"
                    {...field} 
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-[#9b87f5]" />
                  Password
                </FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-[#F1F0FB] border-[#E5DEFF]"
                    {...field} 
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors mt-2" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <span className="mr-2">Signing in</span>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
