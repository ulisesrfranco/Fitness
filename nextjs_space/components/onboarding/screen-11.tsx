'use client';

import { OnboardingFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, Smartphone, MapPin, Bell } from 'lucide-react';

interface Screen11Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function Screen11({ data, updateData, onSubmit, loading }: Screen11Props) {
  const permissions = [
    {
      id: 'healthConnected',
      icon: Smartphone,
      name: 'Health Data',
      desc: 'Connect to track metrics automatically',
      enabled: data?.healthConnected || false,
    },
    {
      id: 'locationEnabled',
      icon: MapPin,
      name: 'Location',
      desc: 'For weather-based recommendations',
      enabled: data?.locationEnabled || false,
    },
    {
      id: 'notificationsEnabled',
      icon: Bell,
      name: 'Notifications',
      desc: 'Get reminders and alerts',
      enabled: data?.notificationsEnabled || false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Final Setup
        </h2>
        <p className="text-gray-600">
          Grant permissions to unlock all features
        </p>
      </div>

      <div className="space-y-3">
        {permissions?.map((permission) => {
          const Icon = permission.icon;
          return (
            <div
              key={permission.id}
              className="border-2 rounded-xl p-4 transition-colors"
              style={{
                borderColor: permission.enabled ? '#14b8a6' : '#e5e7eb',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{permission.name}</p>
                    <p className="text-sm text-gray-600">{permission.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    updateData({ [permission.id]: !permission.enabled })
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    permission.enabled
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {permission.enabled ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Enabled</span>
                    </div>
                  ) : (
                    'Enable'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
        <p className="text-sm text-teal-900">
          <strong>Note:</strong> You can adjust these permissions later in Settings.
          Health data connections are placeholders for now.
        </p>
      </div>

      <Button
        onClick={onSubmit}
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Building your plan...
          </>
        ) : (
          'Finish & Start Training'
        )}
      </Button>
    </div>
  );
}
