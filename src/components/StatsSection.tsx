import { useEffect, useState, useRef } from 'react';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
}

const AnimatedStat = ({ number, label, suffix = '' }: StatProps) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000; // 2 seconds
          const steps = 60;
          const stepValue = number / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= number) {
              setDisplayNumber(number);
              clearInterval(timer);
            } else {
              setDisplayNumber(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [number, hasAnimated]);

  return (
    <div ref={ref} className="text-center animate-counter">
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
        {displayNumber.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-muted-foreground max-w-48 mx-auto">
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: 2847, label: "people helped this month" },
    { number: 16, label: "shelter beds available tonight" },
    { number: 89, label: "food resources updated today" },
    { number: 24, label: "multilingual support available", suffix: "/7" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Impact,{' '}
            <span className="hope-gradient-text">Real Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform connects you instantly with verified resources across San Francisco
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;