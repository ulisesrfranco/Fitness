'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface Screen6Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen6({ data, updateData }: Screen6Props) {
  const sleepIssues = [
    { id: 'falling_asleep', name: 'Falling asleep' },
    { id: 'staying_asleep', name: 'Staying asleep' },
    { id: 'waking_tired', name: 'Waking up tired' },
    { id: 'none', name: 'No issues' },
  ];

  const toggleSleepIssue = (issue: string) => {
    const current = (data?.sleepStruggles || []) as string[];
    const updated = current?.includes(issue)
      ? current?.filter((i) => i !== issue)
      : [...current, issue];
    updateData({ sleepStruggles: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sleep Profile
        </h2>
        <p className="text-gray-600">
          Sleep is crucial for recovery and performance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedtime">Usual bedtime</Label>
          <Input
            id="bedtime"
            type="time"
            value={data?.usualBedtime || ''}
            onChange={(e) => updateData({ usualBedtime: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="waketime">Usual wake time</Label>
          <Input
            id="waketime"
            type="time"
            value={data?.usualWakeTime || ''}
            onChange={(e) => updateData({ usualWakeTime: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sleepWorkdays">Sleep hours (workdays)</Label>
          <Input
            id="sleepWorkdays"
            type="number"
            step="0.5"
            placeholder="7.5"
            value={data?.sleepHoursWorkdays || ''}
            onChange={(e) =>
              updateData({ sleepHoursWorkdays: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        <div>
          <Label htmlFor="sleepDaysOff">Sleep hours (days off)</Label>
          <Input
            id="sleepDaysOff"
            type="number"
            step="0.5"
            placeholder="8.5"
            value={data?.sleepHoursDaysOff || ''}
            onChange={(e) =>
              updateData({ sleepHoursDaysOff: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Sleep struggles (if any)</Label>
        <div className="grid grid-cols-2 gap-3">
          {sleepIssues?.map((issue) => (
            <div key={issue.id} className="flex items-center gap-2">
              <Checkbox
                checked={(data?.sleepStruggles as string[])?.includes(issue.id)}
                onCheckedChange={() => toggleSleepIssue(issue.id)}
              />
              <Label className="text-sm">{issue.name}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
