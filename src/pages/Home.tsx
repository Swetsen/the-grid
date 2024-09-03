/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import home from "/home.png";
import form from "/form.png";
import countdown from "/countdown.png";
import Odometer from "react-odometerjs";

function Home() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [shownCountdownBefore, setShownCountdownBefore] = useState(false);
  const iconSize = 2;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (showCountdown) {
      setShownCountdownBefore(true);
    }
  }, [showCountdown]);

  return (
    <div className="homepage">
      <p style={{ zIndex: 2 }}>The Grid</p>
      <div className="grid" style={{ zIndex: 1 }}>
        {
          // Create a 10x10 grid of cells
          Array.from({ length: 500 }, (_, i) => (
            <GridCell key={i} />
          ))
        }
      </div>
      <div className="dock" style={{ zIndex: 10000 }}>
        <TooltipProvider>
          <Dock magnification={47}>
            <DockIcon
              size={iconSize}
              className="bg-black/10 dark:bg-white/10 p-2"
            >
              <div onClick={() => setShowCountdown(false)}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img src={home}></img>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Front Page</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </DockIcon>
            <DockIcon
              size={iconSize}
              className="bg-black/10 dark:bg-white/10 p-2"
            >
              <div onClick={() => setShowCountdown(true)}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img src={countdown} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Release Countdown</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </DockIcon>

            <DockIcon
              size={iconSize}
              className="bg-black/10 dark:bg-white/10 p-2"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <img src={form} />
                </TooltipTrigger>
                <TooltipContent>
                  <span>Join</span>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>

      <div
        className={"countdown" + (showCountdown ? "" : " disabled")}
        style={{ zIndex: 100, display: shownCountdownBefore ? "flex" : "none" }}
      >
        <p>Releases...</p>
        <CountDown />
      </div>
    </div>
  );
}

function CountDown() {
  const [days1, setDays1] = useState(0);
  const [days2, setDays2] = useState(0);
  const [hours1, setHours1] = useState(0);
  const [hours2, setHours2] = useState(0);
  const [minutes1, setMinutes1] = useState(0);
  const [minutes2, setMinutes2] = useState(0);
  const [seconds1, setSeconds1] = useState(0);
  const [seconds2, setSeconds2] = useState(0);

  const releaseDate = new Date(2024, 9, 14);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      // Calculating the remaining time
      const currentTime = new Date();
      const remainingTime = releaseDate.getTime() - currentTime.getTime();

      // Calculating the remaining days, hours, minutes and seconds
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // Updating the state
      setDays1(Math.floor(days / 10));
      setDays2(days % 10);
      setHours1(Math.floor(hours / 10));
      setHours2(hours % 10);
      setMinutes1(Math.floor(minutes / 10));
      setMinutes2(minutes % 10);
      setSeconds1(Math.floor(seconds / 10));
      setSeconds2(seconds % 10);

      console.log("Countdown", days, hours, minutes, seconds);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-element">
      <Odometer value={days1} format="d" />
      <Odometer value={days2} format="d:" />
      <Odometer value={hours1} format="d" />
      <Odometer value={hours2} format="d:" />
      <Odometer value={minutes1} format="d" />
      <Odometer value={minutes2} format="d:" />
      <Odometer value={seconds1} format="d" />
      <span>{seconds2}</span>
    </div>
  );
}

function GridCell() {
  return <div></div>;
}

export default Home;
