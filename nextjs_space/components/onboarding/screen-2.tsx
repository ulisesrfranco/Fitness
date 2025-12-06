'use client';

import { useState } from 'react';
import { OnboardingFormData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Screen2Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen2({ data, updateData }: Screen2Props) {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [knowBodyFat, setKnowBodyFat] = useState(!!data?.bodyFatPercent);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Basic Profile
        </h2>
        <p className="text-gray-600">
          Help us understand your current state
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={data?.age || ''}
              onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={data?.gender || ''}
              onChange={(e) => updateData({ gender: e.target.value })}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Height</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={heightUnit === 'cm' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('cm')}
              >
                cm
              </Button>
              <Button
                size="sm"
                variant={heightUnit === 'ft' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('ft')}
              >
                ft
              </Button>
            </div>
          </div>
          <Input
            type="number"
            placeholder={heightUnit === 'cm' ? '175' : '5.9'}
            value={data?.heightCm || ''}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              updateData({
                heightCm: heightUnit === 'ft' ? val * 30.48 : val,
              });
            }}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Weight</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={weightUnit === 'kg' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('kg')}
              >
                kg
              </Button>
              <Button
                size="sm"
                variant={weightUnit === 'lb' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('lb')}
              >
                lb
              </Button>
            </div>
          </div>
          <Input
            type="number"
            placeholder={weightUnit === 'kg' ? '75' : '165'}
            value={data?.weightKg || ''}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              updateData({
                weightKg: weightUnit === 'lb' ? val / 2.205 : val,
              });
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="knowBodyFat"
              checked={knowBodyFat}
              onChange={(e) => {
                setKnowBodyFat(e.target.checked);
                if (!e.target.checked) {
                  updateData({ bodyFatPercent: undefined });
                }
              }}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <Label htmlFor="knowBodyFat">I know my body fat %</Label>
          </div>
          {knowBodyFat && (
            <Input
              type="number"
              placeholder="18"
              value={data?.bodyFatPercent || ''}
              onChange={(e) =>
                updateData({ bodyFatPercent: parseFloat(e.target.value) })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
