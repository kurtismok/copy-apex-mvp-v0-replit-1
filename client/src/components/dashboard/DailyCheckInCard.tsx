import { useState } from "react";
import { TacticalCard, CardHeader, CardTitle, CardContent } from "@/components/ui/TacticalCard";
import { Button } from "@/components/ui/button";

export function DailyCheckInCard() {
  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState("Neutral");
  const [soreness, setSoreness] = useState(3);
  const [cycleDay, setCycleDay] = useState(1);

  const handleSubmit = () => {
    console.log({
      energy,
      mood,
      soreness,
      cycleDay
    });

    alert("Check-in saved!");
  };

  return (
    <TacticalCard>
      <CardHeader>
        <CardTitle>Daily Check-In</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Energy */}
        <div>
          <label className="text-sm font-medium">Energy: {energy}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="text-sm font-medium">Mood</label>
          <div className="flex gap-2 mt-1">
            {["Happy", "Neutral", "Tired"].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-1 rounded ${
                  mood === m ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Soreness */}
        <div>
          <label className="text-sm font-medium">Soreness: {soreness}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={soreness}
            onChange={(e) => setSoreness(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Cycle Day */}
        <div>
          <label className="text-sm font-medium">Cycle Day</label>
          <input
            type="number"
            min="1"
            max="28"
            value={cycleDay}
            onChange={(e) => setCycleDay(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 mt-1"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Save Check-In
        </Button>
      </CardContent>
    </TacticalCard>
  );
}
