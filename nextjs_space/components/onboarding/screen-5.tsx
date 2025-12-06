'use client';

import { OnboardingFormData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface Screen5Props {
  data: Partial<OnboardingFormData>;
  updateData: (data: Partial<OnboardingFormData>) => void;
}

export function Screen5({ data, updateData }: Screen5Props) {
  const eatingStyles = [
    { id: 'normal', name: 'Normal' },
    { id: 'high_protein', name: 'High Protein' },
    { id: 'low_carb', name: 'Low Carb' },
    { id: 'balanced', name: 'Balanced' },
  ];

  const restrictions = [
    { id: 'vegan', name: 'Vegan' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'pescatarian', name: 'Pescatarian' },
    { id: 'gluten_free', name: 'Gluten-Free' },
    { id: 'dairy_free', name: 'Dairy-Free' },
    { id: 'nut_allergy', name: 'Nut Allergy' },
    { id: 'other', name: 'Other' },
  ];

  const toggleRestriction = (restriction: string) => {
    const current = (data?.restrictions || []) as string[];
    const updated = current?.includes(restriction)
      ? current?.filter((r) => r !== restriction)
      : [...current, restriction];
    updateData({ restrictions: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Diet Preferences
        </h2>
        <p className="text-gray-600">
          Help us give you relevant food suggestions
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Eating style</Label>
        <div className="grid grid-cols-2 gap-3">
          {eatingStyles?.map((style) => (
            <button
              key={style.id}
              onClick={() => updateData({ eatingStyle: style.id })}
              className={cn(
                'py-3 px-4 rounded-xl border-2 font-medium transition-all',
                data?.eatingStyle === style.id
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Dietary restrictions (if any)</Label>
        <div className="grid grid-cols-2 gap-3">
          {restrictions?.map((restriction) => (
            <div key={restriction.id} className="flex items-center gap-2">
              <Checkbox
                checked={(data?.restrictions as string[])?.includes(restriction.id)}
                onCheckedChange={() => toggleRestriction(restriction.id)}
              />
              <Label className="text-sm">{restriction.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="dislikedFoods" className="mb-3 block">
          Any foods you strongly dislike? (optional)
        </Label>
        <Textarea
          id="dislikedFoods"
          placeholder="e.g., Brussels sprouts, cilantro"
          value={data?.dislikedFoods || ''}
          onChange={(e) => updateData({ dislikedFoods: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}
