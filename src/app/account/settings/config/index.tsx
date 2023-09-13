import { CurrencyConfig } from "./currency";
import { DelimiterConfig } from "./delimiter";

export default function SettingsConfig() {
  return (
    <div className="flex flex-col gap-4">
      <CurrencyConfig />
      <DelimiterConfig />
    </div>
  );
}
