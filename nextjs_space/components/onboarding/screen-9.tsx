'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Dumbbell, Home, TrendingUp } from 'lucide-react';

interface Screen9Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen9({ data, updateData }: Screen9Props) {
  const equipment = [
    { id: 'dumbbells', name: 'Dumbbells' },
    { id: 'barbell', name: 'Barbell' },
    { id: 'bands', name: 'Resistance Bands' },
    { id: 'pull_up_bar', name: 'Pull-up Bar' },
    { id: 'cardio_machine', name: 'Cardio Machine' },
    { id: 'none', name: 'None' },
  ];

  const confidenceLevels = [
    { id: 'beginner', name: 'Beginner', desc: 'New to structured training', icon: Home },
    { id: 'comfortable', name: 'Comfortable', desc: 'Know the basics well', icon: Dumbbell },
    { id: 'advanced', name: 'Advanced', desc: 'Years of experience', icon: TrendingUp },
  ];

  const toggleEquipment = (eq: string) => {
    const current = (data?.homeEquipment || []) as string[];
    const updated = current?.includes(eq)
      ? current?.filter((e) => e !== eq)
      : [...current, eq];
    updateData({ homeEquipment: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Equipment & Training
        </h2>
        <p className="text-gray-600">
          Helps us recommend suitable workouts
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Do you have gym access?</Label>
        <div className="flex gap-3">
          <button
            onClick={() => updateData({ gymAccess: true })}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all',
              data?.gymAccess
                ? 'border-teal-500 bg-teal-50 text-teal-700'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            Yes
          </button>
          <button
            onClick={() => updateData({ gymAccess: false })}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all',
              data?.gymAccess === false
                ? 'border-teal-500 bg-teal-50 text-teal-700'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            No
          </button>
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Home equipment</Label>
        <div className="grid grid-cols-2 gap-3">
          {equipment?.map((eq) => (
            <div key={eq.id} className="flex items-center gap-2">
              <Checkbox
                checked={(data?.homeEquipment as string[])?.includes(eq.id)}
                onCheckedChange={() => toggleEquipment(eq.id)}
              />
              <Label className="text-sm">{eq.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Training confidence</Label>
        <div className="space-y-2">
          {confidenceLevels?.map((level) => {
            const Icon = level.icon;
            return (
              <button
                key={level.id}
                onClick={() => updateData({ confidenceLevel: level.id })}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  data?.confidenceLevel === level.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{level.name}</p>
                    <p className="text-sm text-gray-600">{level.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
