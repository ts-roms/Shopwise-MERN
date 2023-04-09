import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeleft] = useState(calculateTimeLeft());

  function calculateTimeLeft(): Record<string, number> {
    const endTime: Date = new Date("2023-04-11");

    const difference: number =
      Date.parse(endTime.toString()) - Date.parse(new Date().toString());

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
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeleft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <span className="text-xl text-[#ff7d1a] font-semibold">
      {`${timeLeft.days == 0 ? "" : `${timeLeft.days} Days`} ${
        timeLeft.hours
      } hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
    </span>
  );
}
