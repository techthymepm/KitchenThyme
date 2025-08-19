'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Set launch date (30 days from now)
    const launchDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
          <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">00</div>
            <div className="text-gray-300 text-sm">{unit}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-3xl font-bold text-white">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-gray-300 text-sm">Days</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-3xl font-bold text-white">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-gray-300 text-sm">Hours</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-3xl font-bold text-white">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-gray-300 text-sm">Minutes</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-3xl font-bold text-white">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-gray-300 text-sm">Seconds</div>
      </div>
    </div>
  );
}