import { useContext } from "react";
import { Toggle } from "../ui/toggle";
import { AppContext } from "@/lib/context";

export function Filter() {
  const options = ["This year", "This month", "This week"];
  const { selected, setSelected } = useContext(AppContext);

  return (
    <div className="flex gap-2">
      {options.map((option, index) => (
        <Toggle
          key={index}
          pressed={selected === index}
          onPressedChange={() => setSelected!(index)}
          className="w-max"
        >
          {option}
        </Toggle>
      ))}
    </div>
  );
}
