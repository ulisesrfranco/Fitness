import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Create test user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create onboarding data
  const onboarding = await prisma.onboardingData.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      dataSources: {
        appleHealth: { steps: true, hrv: true, sleep: true, calories: true },
        manualEntry: { steps: true, hrv: false, sleep: true, calories: false },
      },
      age: 32,
      gender: 'male',
      heightCm: 178,
      weightKg: 82,
      bodyFatPercent: 18,
      goal: 'lose',
      aggressiveness: 'moderate',
      priority: 'mix',
      priorityDetails: 'Balance between aesthetics and performance',
      worksOut: true,
      workoutTypes: ['weights', 'cardio'],
      workoutDaysPerWeek: 4,
      workoutFixedDays: ['monday', 'wednesday', 'friday', 'saturday'],
      workoutRoutine: 'Push/Pull/Legs split with cardio on off days',
      dailyStepsWorkdays: 'medium',
      dailyStepsDaysOff: 'high',
      weeklyActivityLevel: 'active',
      eatingStyle: 'high_protein',
      restrictions: [],
      dislikedFoods: 'Brussels sprouts, cilantro',
      usualBedtime: '23:00',
      usualWakeTime: '07:00',
      sleepHoursWorkdays: 7.5,
      sleepHoursDaysOff: 8.5,
      sleepStruggles: ['falling_asleep'],
      locationAccess: 'just_city',
      city: 'San Francisco',
      workdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      workStartTime: '09:00',
      workEndTime: '17:30',
      workType: 'sitting',
      morePhysicalDays: [],
      gymAccess: true,
      homeEquipment: ['dumbbells', 'pull_up_bar'],
      confidenceLevel: 'comfortable',
      talkStyle: 'mix',
      notifications: {
        water: true,
        sleep: true,
        recovery: true,
        macros: true,
      },
      healthConnected: false,
      locationEnabled: false,
      notificationsEnabled: true,
      dailyCalorieTarget: 2400,
      dailyProteinTarget: 180,
      dailyCarbsTarget: 240,
      dailyFatsTarget: 70,
    },
  });

  console.log('✅ Created onboarding data');

  // Create settings
  const settings = await prisma.settings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      notificationsEnabled: true,
      waterReminders: true,
      sleepWarnings: true,
      recoveryAlerts: true,
      macroCheckIns: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
      talkStyle: 'mix',
      weightUnit: 'kg',
      heightUnit: 'cm',
      hydrationUnit: 'oz',
    },
  });

  console.log('✅ Created settings');

  // Create subscription
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14-day trial

  const subscription = await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      status: 'free_trial',
      trialEndsAt,
    },
  });

  console.log('✅ Created subscription');

  // Create 30 days of health data
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate realistic variations
    const baseHRV = 55;
    const hrvVariation = randomInt(-10, 10);
    const hrv = Math.max(30, Math.min(80, baseHRV + hrvVariation));

    const baseRHR = 62;
    const rhrVariation = randomInt(-5, 5);
    const rhr = Math.max(50, Math.min(75, baseRHR + rhrVariation));

    // Better sleep on weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseSleep = isWeekend ? 510 : 450; // 8.5h vs 7.5h
    const sleepVariation = randomInt(-30, 30);
    const sleepDuration = Math.max(360, Math.min(600, baseSleep + sleepVariation));

    const deepSleep = Math.floor(sleepDuration * randomFloat(0.15, 0.25));
    const remSleep = Math.floor(sleepDuration * randomFloat(0.20, 0.28));
    const lightSleep = sleepDuration - deepSleep - remSleep;

    // Sleep quality based on duration and HRV
    let sleepQuality = 3;
    if (sleepDuration > 480 && hrv > 55) sleepQuality = 4;
    if (sleepDuration > 510 && hrv > 60) sleepQuality = 5;
    if (sleepDuration < 420 || hrv < 45) sleepQuality = 2;
    if (sleepDuration < 390) sleepQuality = 1;

    // Steps - more on weekends and workout days
    const baseSteps = isWeekend ? 12000 : 8000;
    const steps = baseSteps + randomInt(-2000, 3000);

    // Calories burned
    const baseCalories = 2200;
    const extraCalories = isWeekend ? randomInt(200, 400) : randomInt(0, 200);
    const caloriesBurned = baseCalories + extraCalories;

    // Body battery (influenced by sleep and HRV)
    const batteryBase = Math.floor((sleepQuality / 5) * 60 + (hrv / 80) * 40);
    const bodyBattery = Math.max(20, Math.min(100, batteryBase + randomInt(-10, 10)));

    // Stress (inverse of HRV and sleep)
    let stress = 3;
    if (hrv > 60 && sleepQuality >= 4) stress = 2;
    if (hrv > 65 && sleepQuality === 5) stress = 1;
    if (hrv < 50 || sleepQuality <= 2) stress = 4;
    if (hrv < 45 && sleepQuality === 1) stress = 5;

    // Recovery (based on sleep, HRV, and recent training load)
    let recovery = 3;
    if (hrv > 60 && sleepQuality >= 4 && bodyBattery > 70) recovery = 4;
    if (hrv > 65 && sleepQuality === 5 && bodyBattery > 80) recovery = 5;
    if (hrv < 50 || sleepQuality <= 2 || bodyBattery < 50) recovery = 2;
    if (hrv < 45 && sleepQuality === 1) recovery = 1;

    await prisma.healthData.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date,
        },
      },
      update: {},
      create: {
        userId: user.id,
        date,
        steps,
        caloriesBurned,
        activeMinutes: randomInt(30, 90),
        sleepDurationMinutes: sleepDuration,
        deepSleepMinutes: deepSleep,
        remSleepMinutes: remSleep,
        lightSleepMinutes: lightSleep,
        sleepQuality,
        restingHeartRate: rhr,
        heartRateVariability: hrv,
        respirationRate: randomFloat(12, 16),
        oxygenSaturation: randomFloat(96, 99),
        bodyBatteryScore: bodyBattery,
        stressScore: stress,
        recoveryScore: recovery,
        trainingLoad: randomInt(50, 150),
      },
    });
  }

  console.log('✅ Created 30 days of health data');

  // Create workout sessions
  const workoutDays = [1, 3, 5, 6]; // Mon, Wed, Fri, Sat

  for (let i = 20; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    if (workoutDays.includes(date.getDay())) {
      const isWeights = [1, 3, 5].includes(date.getDay());
      await prisma.workoutSession.create({
        data: {
          userId: user.id,
          date,
          type: isWeights ? 'weights' : 'cardio',
          durationMinutes: isWeights ? randomInt(50, 70) : randomInt(30, 45),
          intensity: isWeights ? randomInt(3, 5) : randomInt(3, 4),
          description: isWeights
            ? 'Full body strength training'
            : 'Moderate intensity cardio',
          caloriesBurned: isWeights ? randomInt(250, 350) : randomInt(300, 450),
          exercises: isWeights
            ? [
                { name: 'Bench Press', sets: 3, reps: 10, weight: 80 },
                { name: 'Squat', sets: 4, reps: 8, weight: 100 },
                { name: 'Deadlift', sets: 3, reps: 6, weight: 120 },
              ]
            : null,
        },
      });
    }
  }

  console.log('✅ Created workout sessions');

  // Create body metrics (weekly measurements)
  const startWeight = 82;
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 7);

    // Gradual weight loss trend
    const weightChange = -0.3 * (4 - i); // Losing ~0.3kg per week
    const weight = startWeight + weightChange;

    await prisma.bodyMetric.create({
      data: {
        userId: user.id,
        date,
        weightKg: Number(weight.toFixed(1)),
        bodyFatPercent: 18 - (4 - i) * 0.2, // Gradual body fat reduction
      },
    });
  }

  console.log('✅ Created body metrics');

  // Create hydration logs for last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Multiple logs per day
    for (let j = 0; j < randomInt(4, 8); j++) {
      const logDate = new Date(date);
      logDate.setHours(8 + j * 2, randomInt(0, 59), 0, 0);

      await prisma.hydrationLog.create({
        data: {
          userId: user.id,
          date: logDate,
          amountOz: [8, 12, 16][randomInt(0, 2)],
        },
      });
    }
  }

  console.log('✅ Created hydration logs');

  // Create some nutrition logs
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const meals = [
      {
        mealType: 'breakfast',
        calories: randomInt(450, 600),
        proteinGrams: randomInt(25, 35),
        carbsGrams: randomInt(50, 70),
        fatsGrams: randomInt(15, 25),
        description: 'Oatmeal with protein powder and berries',
      },
      {
        mealType: 'lunch',
        calories: randomInt(650, 800),
        proteinGrams: randomInt(45, 60),
        carbsGrams: randomInt(60, 80),
        fatsGrams: randomInt(20, 30),
        description: 'Grilled chicken with rice and vegetables',
      },
      {
        mealType: 'dinner',
        calories: randomInt(700, 850),
        proteinGrams: randomInt(50, 65),
        carbsGrams: randomInt(55, 75),
        fatsGrams: randomInt(25, 35),
        description: 'Salmon with sweet potato and salad',
      },
      {
        mealType: 'snack',
        calories: randomInt(200, 350),
        proteinGrams: randomInt(15, 25),
        carbsGrams: randomInt(20, 35),
        fatsGrams: randomInt(8, 15),
        description: 'Greek yogurt with nuts',
      },
    ];

    for (const [index, meal] of meals.entries()) {
      const mealDate = new Date(date);
      mealDate.setHours(8 + index * 3, 0, 0, 0);

      await prisma.nutritionLog.create({
        data: {
          userId: user.id,
          date: mealDate,
          ...meal,
        },
      });
    }
  }

  console.log('✅ Created nutrition logs');

  // Create some sample chat messages
  await prisma.chatMessage.create({
    data: {
      userId: user.id,
      role: 'user',
      content: 'How should I train today?',
      context: { recoveryScore: 4, sleepQuality: 4, bodyBattery: 78 },
    },
  });

  await prisma.chatMessage.create({
    data: {
      userId: user.id,
      role: 'assistant',
      content:
        "Based on your excellent recovery (4/5), good sleep (4/5), and high body battery (78/100), you're in great shape for a productive training session today! I'd recommend a moderate to high-intensity workout focusing on your scheduled muscle group. Your body is ready to push hard, so aim for progressive overload if you're lifting. Stay hydrated and fuel well post-workout!",
      context: { recoveryScore: 4, sleepQuality: 4, bodyBattery: 78 },
    },
  });

  console.log('✅ Created sample chat messages');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📧 Test account:');
  console.log('   Email: john@doe.com');
  console.log('   Password: johndoe123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
