'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { TrendingDown, Minus, TrendingUp, Target, Zap, Dumbbell } from 'lucide-react';

interface Screen3Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen3({ data, updateData }: Screen3Props) {
  const goals = [
    { id: 'lose', name: 'Lose Weight', icon: TrendingDown, color: 'text-red-500' },
    { id: 'maintain', name: 'Maintain', icon: Minus, color: 'text-blue-500' },
    { id: 'gain', name: 'Gain Muscle', icon: TrendingUp, color: 'text-green-500' },
  ];

  const aggressiveness = [
    { id: 'very_slow', name: 'Very Slow', desc: '~0.25kg per week' },
    { id: 'moderate', name: 'Moderate', desc: '~0.5kg per week' },
    { id: 'fast', name: 'Fast', desc: '~0.7kg per week', warning: true },
  ];

  const priorities = [
    { id: 'looks', name: 'Aesthetics', icon: Target },
    { id: 'strength', name: 'Strength', icon: Dumbbell },
    { id: 'energy', name: 'Energy', icon: Zap },
    { id: 'mix', name: 'Balanced', icon: Minus },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Goals & Priorities
        </h2>
        <p className="text-gray-600">
          What are you working towards?
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Primary Goal</Label>
        <div className="grid grid-cols-3 gap-3">
          {goals?.map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => updateData({ goal: goal.id as any })}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  data?.goal === goal.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${goal.color}`} />
                <p className="text-sm font-medium">{goal.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {(data?.goal === 'lose' || data?.goal === 'gain') && (
        <div>
          <Label className="mb-3 block">Pace</Label>
          <div className="space-y-2">
            {aggressiveness?.map((level) => (
              <button
                key={level.id}
                onClick={() => updateData({ aggressiveness: level.id as any })}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all text-left',
                  data?.aggressiveness === level.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{level.name}</p>
                    <p className="text-sm text-gray-600">{level.desc}</p>
                  </div>
                  {level?.warning && (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      Aggressive
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label className="mb-3 block">What matters most?</Label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {priorities?.map((priority) => {
            const Icon = priority.icon;
            return (
              <button
                key={priority.id}
                onClick={() => updateData({ priority: priority.id as any })}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all',
                  data?.priority === priority.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <Icon className="w-6 h-6 text-teal-600 mb-2" />
                <p className="text-sm font-medium">{priority.name}</p>
              </button>
            );
          })}
        </div>
        <Textarea
          placeholder="Any specific details? (optional)"
          value={data?.priorityDetails || ''}
          onChange={(e) => updateData({ priorityDetails: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  );
}
