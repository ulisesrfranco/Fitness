'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle, Heart, Moon, Apple } from 'lucide-react';

interface Screen10Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen10({ data, updateData }: Screen10Props) {
  const talkStyles = [
    { id: 'direct', name: 'Direct', desc: 'Straight to the point', icon: MessageCircle },
    { id: 'supportive', name: 'Supportive', desc: 'Encouraging and motivating', icon: Heart },
    { id: 'educational', name: 'Educational', desc: 'Explain the science', icon: Moon },
    { id: 'mix', name: 'Mix', desc: 'Best of all styles', icon: Apple },
  ];

  const notificationTypes = [
    { id: 'water', name: 'Water reminders' },
    { id: 'sleep', name: 'Pre-bed wind-down warnings' },
    { id: 'recovery', name: 'Recovery alerts' },
    { id: 'macros', name: 'Macro check-ins' },
  ];

  const toggleNotification = (type: string) => {
    const current = data?.notifications || {};
    updateData({
      notifications: {
        ...current,
        [type]: !current?.[type as keyof typeof current],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          App Personality
        </h2>
        <p className="text-gray-600">
          Customize how your AI coach communicates
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Talk style</Label>
        <div className="space-y-2">
          {talkStyles?.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => updateData({ talkStyle: style.id })}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  data?.talkStyle === style.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{style.name}</p>
                    <p className="text-sm text-gray-600">{style.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Notifications</Label>
        <div className="space-y-3">
          {notificationTypes?.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
            >
              <Label className="text-sm">{type.name}</Label>
              <Checkbox
                checked={!!data?.notifications?.[type.id as keyof typeof data.notifications]}
                onCheckedChange={() => toggleNotification(type.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
