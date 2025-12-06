'use client';

import { OnboardingFormData } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Smartphone, Watch, Activity, Heart } from 'lucide-react';

interface Screen1Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen1({ data, updateData }: Screen1Props) {
  const sources = [
    { id: 'appleHealth', name: 'Apple Health', icon: Smartphone },
    { id: 'googleFit', name: 'Google Fit', icon: Activity },
    { id: 'samsungHealth', name: 'Samsung Health', icon: Heart },
    { id: 'fitbit', name: 'Fitbit', icon: Watch },
    { id: 'garmin', name: 'Garmin', icon: Watch },
    { id: 'manualEntry', name: 'Manual Entry', icon: Activity },
  ];

  const dataTypes = [
    { id: 'steps', name: 'Steps' },
    { id: 'hrv', name: 'Heart Rate / HRV' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'calories', name: 'Calories Burned' },
  ];

  const toggleSource = (sourceId: string) => {
    const current = data?.dataSources || {};
    const updated = { ...current };
    
    if (updated?.[sourceId]) {
      delete updated[sourceId];
    } else {
      updated[sourceId] = { steps: false, hrv: false, sleep: false, calories: false };
    }
    
    updateData({ dataSources: updated });
  };

  const toggleDataType = (sourceId: string, dataType: string) => {
    const current = data?.dataSources || {};
    const updated = {
      ...current,
      [sourceId]: {
        ...(current?.[sourceId] || {}),
        [dataType]: !(current?.[sourceId]?.[dataType as keyof typeof current[typeof sourceId]]),
      },
    };
    updateData({ dataSources: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Sources
        </h2>
        <p className="text-gray-600">
          Select where you'll track your health data
        </p>
      </div>

      <div className="space-y-4">
        {sources?.map((source) => {
          const isSelected = !!data?.dataSources?.[source.id];
          const Icon = source.icon;

          return (
            <div
              key={source.id}
              className="border-2 rounded-xl p-4 transition-colors"
              style={{
                borderColor: isSelected ? '#14b8a6' : '#e5e7eb',
              }}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSource(source.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <Label className="font-semibold text-gray-900">
                      {source.name}
                    </Label>
                  </div>

                  {isSelected && (
                    <div className="grid grid-cols-2 gap-2">
                      {dataTypes?.map((type) => (
                        <div key={type.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={
                              !!data?.dataSources?.[source.id]?.[type.id as keyof typeof data.dataSources[typeof source.id]]
                            }
                            onCheckedChange={() =>
                              toggleDataType(source.id, type.id)
                            }
                          />
                          <Label className="text-sm text-gray-700">
                            {type.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
