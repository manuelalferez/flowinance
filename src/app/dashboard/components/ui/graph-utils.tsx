import { formatDateToReadable, formatNumberWithTwoDecimals } from "@/lib/utils";

export function CustomTooltip({ active, payload, label, currency }: any) {
  if (active) {
    return (
      <div className="bg-emerald-700 text-white p-4 rounded-md shadow-xl">
        <h4 className="text-lg mb-2">
          {formatNumberWithTwoDecimals(payload[0].value)}
          {currency}
        </h4>
        <p className="text-sm font-sans">{formatDateToReadable(label)}</p>
      </div>
    );
  }
  return null;
}

export function PieChartTooltip({ active, payload, currency }: any) {
  if (active) {
    return (
      <div className="bg-emerald-700 text-white p-4 rounded-md shadow-xl">
        <h4 className="text-lg mb-2">
          {formatNumberWithTwoDecimals(payload[0].value)}
          {currency}
        </h4>
        <p className="text-sm font-sans">{payload[0].name}</p>
      </div>
    );
  }
  return null;
}

export function SummaryTooltip({ active, payload, label, currency }: any) {
  if (active) {
    return (
      <div className="bg-emerald-700 text-white p-4 rounded-md shadow-xl">
        <h4 className="text-lg">
          Income:
          {formatNumberWithTwoDecimals(payload[0].payload.income)}
          {currency}
        </h4>
        <h4 className="text-lg mb-2">
          Expense:
          {formatNumberWithTwoDecimals(payload[0].payload.expense)}
          {currency}
        </h4>
        <p className="text-sm font-sans">{formatDateToReadable(label)}</p>
      </div>
    );
  }
  return null;
}
