'use client';

import { Button } from '@/components/ui/button';
import { Heart, Activity, Moon, TrendingUp } from 'lucide-react';

interface Screen0Props {
  onNext: () => void;
}

export function Screen0({ onNext }: Screen0Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to <span className="text-teal-600">FitCoach AI</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Your personal AI-powered fitness coach that adapts to your sleep, recovery, and goals
        </p>
      </div>

      <div className="grid gap-4">
        {[
          {
            icon: Heart,
            title: 'Science-Backed Guidance',
            description: 'Evidence-based recommendations for training and nutrition',
          },
          {
            icon: Activity,
            title: 'Recovery Monitoring',
            description: 'Track HRV, sleep quality, and body battery',
          },
          {
            icon: Moon,
            title: 'Smart Training Plans',
            description: 'Adjust workouts based on your recovery state',
          },
          {
            icon: TrendingUp,
            title: 'Progress Tracking',
            description: 'Visualize trends in body metrics and performance',
          },
        ]?.map((feature, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="flex-shrink-0">
              <feature.icon className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{feature?.title}</h3>
              <p className="text-sm text-gray-600">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Button onClick={onNext} className="w-full" size="lg">
          Continue
        </Button>
        <p className="text-center text-sm text-gray-500">
          Takes about 5 minutes to complete
        </p>
      </div>
    </div>
  );
}
