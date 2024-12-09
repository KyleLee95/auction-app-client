import React, { useEffect, useState } from "react";

interface CountdownProps {
  endTime: string; // ISO datetime string
  isActive: boolean;
}
const Countdown: React.FC<CountdownProps> = ({ endTime, isActive }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end.getTime() - now.getTime();

      if (difference <= 0 && isActive === true) {
        setTimeLeft("Auction ended");
        return;
      }

      if (difference <= 0 && isActive === true) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [endTime, isActive]);

  return (
    <div>
      <h2 className="text-xl">{isActive ? "Time Left" : "Starts In"}:</h2>
      <p className="font-bold">{timeLeft}</p>
    </div>
  );
};

export { Countdown };
