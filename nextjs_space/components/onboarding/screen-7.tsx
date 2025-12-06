'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface Screen7Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen7({ data, updateData }: Screen7Props) {
  const locationOptions = [
    { id: 'just_city', name: 'Just City', desc: 'For weather data' },
    { id: 'precise', name: 'Precise', desc: 'For location-based features' },
    { id: 'manual', name: 'Manual', desc: 'Enter city name' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Location & Weather
        </h2>
        <p className="text-gray-600">
          We use this for weather-based training recommendations
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Location access</Label>
        <div className="space-y-2">
          {locationOptions?.map((option) => (
            <button
              key={option.id}
              onClick={() => updateData({ locationAccess: option.id })}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                data?.locationAccess === option.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{option.name}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {data?.locationAccess === 'manual' && (
        <div>
          <Label htmlFor="city">City name</Label>
          <Input
            id="city"
            type="text"
            placeholder="San Francisco"
            value={data?.city || ''}
            onChange={(e) => updateData({ city: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
