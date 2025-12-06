// Additional TypeScript types for the application

export interface OnboardingFormData {
  // Screen 1: Data sources
  dataSources: {
    [key: string]: {
      steps?: boolean;
      hrv?: boolean;
      sleep?: boolean;
      calories?: boolean;
    };
  };

  // Screen 2: Basic profile
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  bodyFatPercent?: number;

  // Screen 3: Goals
  goal: 'lose' | 'maintain' | 'gain';
  aggressiveness: 'very_slow' | 'moderate' | 'fast';
  priority: 'looks' | 'strength' | 'energy' | 'mix';
  priorityDetails?: string;

  // Screen 4: Activity
  worksOut: boolean;
  workoutTypes?: string[];
  workoutDaysPerWeek?: number;
  workoutFixedDays?: string[];
  workoutRoutine?: string;
  dailyStepsWorkdays?: string;
  dailyStepsDaysOff?: string;
  weeklyActivityLevel: string;

  // Screen 5: Diet
  eatingStyle: string;
  restrictions: string[];
  dislikedFoods?: string;

  // Screen 6: Sleep
  usualBedtime: string;
  usualWakeTime: string;
  sleepHoursWorkdays: number;
  sleepHoursDaysOff: number;
  sleepStruggles: string[];

  // Screen 7: Location
  locationAccess: string;
  city?: string;

  // Screen 8: Work
  workdays: string[];
  workStartTime: string;
  workEndTime: string;
  workType: string;
  morePhysicalDays?: string[];
  morePhysicalDetails?: string;

  // Screen 9: Equipment
  gymAccess: boolean;
  homeEquipment: string[];
  confidenceLevel: string;

  // Screen 10: Personality
  talkStyle: string;
  notifications: {
    water?: boolean;
    sleep?: boolean;
    recovery?: boolean;
    macros?: boolean;
  };

  // Screen 11: Permissions
  healthConnected?: boolean;
  locationEnabled?: boolean;
  notificationsEnabled?: boolean;
}

export interface HealthMetrics {
  date: Date;
  steps?: number;
  caloriesBurned?: number;
  sleepDurationMinutes?: number;
  sleepQuality?: number;
  heartRateVariability?: number;
  restingHeartRate?: number;
  bodyBatteryScore?: number;
  stressScore?: number;
  recoveryScore?: number;
}

export interface ChatContext {
  goal?: string;
  recoveryScore?: number;
  sleepQuality?: number;
  bodyBattery?: number;
  weather?: any;
}
