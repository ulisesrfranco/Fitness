'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Screen4Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen4({ data, updateData }: Screen4Props) {
  const workoutTypes = [
    { id: 'weights', name: 'Weights' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'classes', name: 'Classes' },
    { id: 'sports', name: 'Sports' },
    { id: 'other', name: 'Other' },
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIds = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const toggleWorkoutType = (type: string) => {
    const current = (data?.workoutTypes || []) as string[];
    const updated = current?.includes(type)
      ? current?.filter((t) => t !== type)
      : [...current, type];
    updateData({ workoutTypes: updated });
  };

  const toggleDay = (day: string) => {
    const current = (data?.workoutFixedDays || []) as string[];
    const updated = current?.includes(day)
      ? current?.filter((d) => d !== day)
      : [...current, day];
    updateData({ workoutFixedDays: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Current Activity
        </h2>
        <p className="text-gray-600">
          Tell us about your training routine
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Do you currently work out?</Label>
        <div className="flex gap-3">
          <button
            onClick={() => updateData({ worksOut: true })}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all',
              data?.worksOut
                ? 'border-teal-500 bg-teal-50 text-teal-700'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            Yes
          </button>
          <button
            onClick={() => updateData({ worksOut: false })}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all',
              data?.worksOut === false
                ? 'border-teal-500 bg-teal-50 text-teal-700'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            No
          </button>
        </div>
      </div>

      {data?.worksOut && (
        <>
          <div>
            <Label className="mb-3 block">Types of training</Label>
            <div className="grid grid-cols-3 gap-2">
              {workoutTypes?.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleWorkoutType(type.id)}
                  className={cn(
                    'py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all',
                    (data?.workoutTypes as string[])?.includes(type.id)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="daysPerWeek" className="mb-3 block">
              Days per week
            </Label>
            <Input
              id="daysPerWeek"
              type="number"
              min="1"
              max="7"
              placeholder="4"
              value={data?.workoutDaysPerWeek || ''}
              onChange={(e) =>
                updateData({ workoutDaysPerWeek: parseInt(e.target.value) || 0 })
              }
            />
          </div>

          <div>
            <Label className="mb-3 block">Which days? (optional)</Label>
            <div className="grid grid-cols-7 gap-2">
              {weekDays?.map((day, index) => (
                <button
                  key={day}
                  onClick={() => toggleDay(dayIds?.[index] || '')}
                  className={cn(
                    'py-2 rounded-lg border-2 text-sm font-medium transition-all',
                    (data?.workoutFixedDays as string[])?.includes(dayIds?.[index] || '')
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="routine" className="mb-3 block">
              Describe your routine (optional)
            </Label>
            <Textarea
              id="routine"
              placeholder="e.g., Push/Pull/Legs split, Running 3x per week"
              value={data?.workoutRoutine || ''}
              onChange={(e) => updateData({ workoutRoutine: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      <div>
        <Label className="mb-3 block">Weekly activity level</Label>
        <div className="space-y-2">
          {[
            { id: 'sedentary', name: 'Sedentary', desc: 'Little to no exercise' },
            { id: 'lightly_active', name: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
            { id: 'active', name: 'Active', desc: 'Moderate exercise 3-5 days/week' },
            { id: 'very_active', name: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
          ]?.map((level) => (
            <button
              key={level.id}
              onClick={() => updateData({ weeklyActivityLevel: level.id })}
              className={cn(
                'w-full p-3 rounded-xl border-2 text-left transition-all',
                data?.weeklyActivityLevel === level.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <p className="font-medium">{level.name}</p>
              <p className="text-sm text-gray-600">{level.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
