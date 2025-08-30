import { testTimerAtom } from "@/atom/atom";
import { useAtom } from "jotai";
import { useEffect } from "react"

export default function Timer() {

  const [time, setTime] = useAtom(testTimerAtom);

  useEffect(() => {
    const totalSeconds =
      time.hour * 3600 + time.minute * 60 + time.second;

    if (totalSeconds <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        const prevTotal = prev.hour * 3600 + prev.minute * 60 + prev.second;
        const newTotal = prevTotal - 1;

        if (newTotal <= 0) {
          clearInterval(interval);
          return { hour: 0, minute: 0, second: 0 };
        }

        const h = Math.floor(newTotal / 3600);
        const m = Math.floor((newTotal % 3600) / 60);
        const s = newTotal % 60;

        return { hour: h, minute: m, second: s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);


  return (
    <div className="text-center py-4 ">
      {/* Timer Display */}
      <div className="flex justify-center items-center space-x-2">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.hour.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">H</div>
        </div>
        <div className="text-2xl font-bold text-gray-400">:</div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.minute.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">M</div>
        </div>
        <div className="text-2xl font-bold text-gray-400">:</div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.second.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">S</div>
        </div>
      </div>
    </div>
  );
}
