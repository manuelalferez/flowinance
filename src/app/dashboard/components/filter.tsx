import { useContext } from "react";
import { Toggle } from "../../components/ui/toggle";
import { AppContext } from "@/lib/context";

export function Filter() {
  const options = ["This year", "Last 3 months", "Last 30 days", "Last 7 days"];
  const { selected, setSelected } = useContext(AppContext);

  return (
    <div className="flex flex-wrap w-2/3 mx-auto md:w-full justify-center gap-2">
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
