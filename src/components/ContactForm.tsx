'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ContactType = 'support' | 'privacy' | 'legal' | 'partners';

interface ContactFormProps {
  type: ContactType;
  title: string;
  description?: string;
}

export function ContactForm({ type, title, description }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}

      {status === 'success' ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            ✅ Message sent successfully! We'll get back to you within 24-48 hours.
          </p>
          <Button
            onClick={() => setStatus('idle')}
            variant="outline"
            className="mt-4"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor={`${type}-name`}>Name *</Label>
            <Input
              id={`${type}-name`}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={status === 'sending'}
              placeholder="Your name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`${type}-email`}>Email *</Label>
            <Input
              id={`${type}-email`}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={status === 'sending'}
              placeholder="your@email.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`${type}-subject`}>Subject *</Label>
            <Input
              id={`${type}-subject`}
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              disabled={status === 'sending'}
              placeholder="Brief subject line"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`${type}-message`}>Message *</Label>
            <textarea
              id={`${type}-message`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              disabled={status === 'sending'}
              rows={6}
              placeholder="Please provide details..."
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {status === 'sending' ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            We typically respond within 24-48 hours
          </p>
        </form>
      )}
    </div>
  );
}
