import { EXPENSES_CATEGORIES, INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
    formatDateToChartDate,
    getFutureDatesAxisX,
    getRangeAxisX,
    parseDateToISO,
    roundToTwoDecimal,
    sortTransactions,
    getDateRange, // Neue Funktion importiert
} from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { SummaryTooltip } from "../ui/graph-utils";
import { getTotalExpenses, getTotalIncomes } from "@/lib/calculations";

interface ChartData {
    name: string;
    expense: number;
    income: number;
}

function calculateFutureTrend(lastValue: number, futureDays: number, avg: number): number[] {
    const futureValues: number[] = [];
    futureValues.push(lastValue);

    for (let i = 1; i < futureDays; i++) {
        const nextValue = roundToTwoDecimal(futureValues[i - 1] + avg);
        futureValues.push(nextValue);
    }

    return futureValues;
}

export default function SummaryChart() {
    const { filteredTransactions, currency, selected } = useContext(AppContext);
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        console.log("Selected value updated:", selected); // Log the selected value


        // Filter und Sortierung von Ausgaben und Einnahmen
        const expenses = filteredTransactions!.filter((transaction) =>
            EXPENSES_CATEGORIES.includes(transaction.category)
        );
        const sortedExpenses = sortTransactions(expenses);

        const incomes = filteredTransactions!.filter((transaction) =>
            INCOMES_CATEGORIES.includes(transaction.category)
        );
        const sortedIncomes = sortTransactions(incomes);

        // Gesamtbeträge berechnen
        const totalExpenseValue = roundToTwoDecimal(getTotalExpenses(filteredTransactions!));
        const totalIncomeValue = roundToTwoDecimal(getTotalIncomes(filteredTransactions!));

        // Zeitraum der Transaktionen berechnen
        const dateRangeInDays = getDateRange(selected!);

        // Durchschnitt berechnen (Gesamtbetrag durch die Anzahl der Tage im Zeitraum)
        const avgExpense = dateRangeInDays > 0
            ? roundToTwoDecimal(totalExpenseValue / dateRangeInDays)
            : 0;

        const avgIncome = dateRangeInDays > 0
            ? roundToTwoDecimal(totalIncomeValue / dateRangeInDays)
            : 0;

        // Logge die berechneten Durchschnittswerte aus
        console.log("Avg Expense per day:", avgExpense);
        console.log("Avg Income per day:", avgIncome);
        console.log("selcted",selected)

        // Berechnung der zukünftigen Tage basierend auf 'selected'
        const datesAxisX = getFutureDatesAxisX(selected!);

        // Kombinierte Daten vorbereiten
        const combinedData: ChartData[] = datesAxisX.map((date) => ({
            name: date,
            expense: 0,
            income: 0,
        }));

        // Zukünftige Trends berechnen
        const futureExpenses = calculateFutureTrend(totalExpenseValue, datesAxisX.length, avgExpense);
        const futureIncomes = calculateFutureTrend(totalIncomeValue, datesAxisX.length, avgIncome);

        // Berechnete Werte in die kombinierten Daten einfügen
        combinedData.forEach((item, index) => {
            item.expense = futureExpenses[index] || 0;
            item.income = futureIncomes[index] || 0;
        });

        setData(combinedData);
    }, [filteredTransactions, selected]);

    const range = getRangeAxisX(selected!);

    return (
        <div className="w-full">
            {data.length !== 0 ? (
                <DashboardCard
                    title="Forecast"
                    description="Visualize the forecast of your expenses and incomes"
                >
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 30,
                                bottom: 0,
                            }}
                            className="font-mono tabular-nums text-sm"
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(str, index) => {
                                    if (index % range === 0 && index !== 0) {
                                        const date = parseDateToISO(str);
                                        return formatDateToChartDate(date);
                                    }
                                    return "";
                                }}
                            />
                            <YAxis
                                tickFormatter={(number) => `${currency}${number}`}
                                tickCount={6}
                            />
                            <Legend />
                            <Tooltip content={<SummaryTooltip currency={currency} />} />

                            {/* Gestrichelte Linie für Ausgaben */}
                            <Line
                                type="monotone"
                                dataKey="expense"
                                name="futureExpenses"
                                strokeWidth={2}
                                stroke="#3066BE"
                                strokeDasharray="5 5"
                                dot={false}
                            />

                            {/* Gestrichelte Linie für Einnahmen */}
                            <Line
                                type="monotone"
                                dataKey="income"
                                name="futureIncomes"
                                strokeWidth={2}
                                stroke="#047857"
                                strokeDasharray="5 5"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </DashboardCard>
            ) : (
                <DashboardNoDataCard
                    title="Expenses Evolution"
                    description="You have not generated any expense so far."
                />
            )}
        </div>
    );
}
