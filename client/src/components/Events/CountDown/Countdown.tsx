import { useState, useEffect } from "react";

type Props = {
  endDate: Date;
  startDate: Date;
};

export default function Countdown({ endDate, startDate }: Props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showStartCountdown, setShowStartCountdown] = useState(false);
  const [startTimer, setStartTimer] = useState<any>(null);
  const [timeUp, setTimeUp] = useState(false);

  function calculateTimeLeft(): Record<string, number> {
    const endTime: Date = new Date(endDate);
    const difference: number = Date.parse(endTime.toString()) - Date.now();

    let seconds: string = Math.floor((difference / 1000) % 60).toString();
    let minutes: string = Math.floor((difference / 1000 / 60) % 60).toString();
    let hours: string = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ).toString();
    let days: string = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ).toString();

    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = { days, hours, minutes, seconds };
    } else {
      timeLeft = { hours: "00", minutes: "00", seconds: "00" };
      setTimeUp(true);
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);

    if (startDateTime === today) {
      setShowStartCountdown(true);
    } else {
      setShowStartCountdown(false);

      const timer = setInterval(() => {
        const timeUntilStart = calculateTimeLeft();
        setTimeLeft(timeUntilStart);

        const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
        const currentTime = new Date().setHours(0, 0, 0, 0);

        if (currentTime >= startDateTime) {
          setShowStartCountdown(true);
          clearInterval(timer);
        }
      }, 1000);

      setStartTimer(timer);
    }

    return () => {
      if (startTimer) {
        clearInterval(startTimer);
      }
    };
  }, []);

  return (
    <span className="text-xl text-[#ff7d1a] font-semibold">
      {showStartCountdown ? (
        timeUp ? (
          "Time's Up"
        ) : (
          `Ending in ${timeLeft.days == 0 ? "" : `${timeLeft.days} Days`} ${
            timeLeft.hours
          } hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`
        )
      ) : (
        <>
          Time until start: {timeLeft.hours} hours {timeLeft.minutes} minutes{" "}
          {timeLeft.seconds} seconds
        </>
      )}
    </span>
  );
}
