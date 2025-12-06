'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface Screen8Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen8({ data, updateData }: Screen8Props) {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIds = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const workTypes = [
    { id: 'sitting', name: 'Mostly Sitting', desc: 'Desk job' },
    { id: 'walking', name: 'Walking', desc: 'On your feet' },
    { id: 'physical', name: 'Physical Labor', desc: 'Heavy lifting' },
    { id: 'mixed', name: 'Mixed', desc: 'Varies day to day' },
  ];

  const toggleWorkday = (day: string) => {
    const current = (data?.workdays || []) as string[];
    const updated = current?.includes(day)
      ? current?.filter((d) => d !== day)
      : [...current, day];
    updateData({ workdays: updated });
  };

  const togglePhysicalDay = (day: string) => {
    const current = (data?.morePhysicalDays || []) as string[];
    const updated = current?.includes(day)
      ? current?.filter((d) => d !== day)
      : [...current, day];
    updateData({ morePhysicalDays: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Schedule
        </h2>
        <p className="text-gray-600">
          Helps us understand your daily energy demands
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Work days</Label>
        <div className="grid grid-cols-7 gap-2">
          {weekDays?.map((day, index) => (
            <button
              key={day}
              onClick={() => toggleWorkday(dayIds?.[index] || '')}
              className={cn(
                'py-2 rounded-lg border-2 text-sm font-medium transition-all',
                (data?.workdays as string[])?.includes(dayIds?.[index] || '')
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="workStart">Work start time</Label>
          <Input
            id="workStart"
            type="time"
            value={data?.workStartTime || ''}
            onChange={(e) => updateData({ workStartTime: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="workEnd">Work end time</Label>
          <Input
            id="workEnd"
            type="time"
            value={data?.workEndTime || ''}
            onChange={(e) => updateData({ workEndTime: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Work type</Label>
        <div className="space-y-2">
          {workTypes?.map((type) => (
            <button
              key={type.id}
              onClick={() => updateData({ workType: type.id })}
              className={cn(
                'w-full p-3 rounded-xl border-2 text-left transition-all',
                data?.workType === type.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <p className="font-medium">{type.name}</p>
              <p className="text-sm text-gray-600">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {data?.workType === 'mixed' && (
        <div>
          <Label className="mb-3 block">More physical on these days:</Label>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {weekDays?.map((day, index) => (
              <button
                key={day}
                onClick={() => togglePhysicalDay(dayIds?.[index] || '')}
                className={cn(
                  'py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  (data?.morePhysicalDays as string[])?.includes(dayIds?.[index] || '')
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                {day}
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Any details? (optional)"
            value={data?.morePhysicalDetails || ''}
            onChange={(e) => updateData({ morePhysicalDetails: e.target.value })}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
