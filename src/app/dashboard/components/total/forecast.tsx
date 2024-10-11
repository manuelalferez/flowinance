import { EXPENSES_CATEGORIES, INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
    formatDateToChartDate,
    getDatesAxisX,
    getFutureDatesAxisX,
    getRangeAxisX,
    parseDate,
    parseDateToISO,
    roundToTwoDecimal,
    sortTransactions,
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

interface ChartData {
    name: string;
    expense: number;
    income: number;
}

function calculateFutureTrend(lastValue: number, futureDays: number, growthFactor: number): number[] {
    const futureValues: number[] = [];

    // Setze den ersten zukünftigen Wert als den letzten bekannten Wert
    futureValues.push(lastValue);

    // Berechnung der zukünftigen Werte mit dem Wachstumsfaktor
    for (let i = 1; i < futureDays; i++) {
        const nextValue = roundToTwoDecimal(futureValues[i - 1] + growthFactor);
        futureValues.push(nextValue);
    }

    return futureValues;
}

export default function SummaryChart() {
    const { filteredTransactions, currency, selected } = useContext(AppContext);
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const expenses = filteredTransactions!.filter((transaction) =>
            EXPENSES_CATEGORIES.includes(transaction.category)
        );
        const shortedExpenses = sortTransactions(expenses);

        const incomes = filteredTransactions!.filter((transaction) =>
            INCOMES_CATEGORIES.includes(transaction.category)
        );
        const shortedIncomes = sortTransactions(incomes);

        // Den Gesamtwert der Ausgaben und Einnahmen finden
        const totalExpenseValue = shortedExpenses.length > 0
            ? roundToTwoDecimal(shortedExpenses.reduce((sum, trans) => sum + trans.amount, 0))
            : 0;

        const totalIncomeValue = shortedIncomes.length > 0
            ? roundToTwoDecimal(shortedIncomes.reduce((sum, trans) => sum + trans.amount, 0))
            : 0;

        // Durchschnitt berechnen
        const averageExpense =
            shortedExpenses.length > 0
                ? roundToTwoDecimal(
                    shortedExpenses.reduce((sum, trans) => sum + trans.amount, 0) /
                    shortedExpenses.length
                )
                : 0;

        const averageIncome =
            shortedIncomes.length > 0
                ? roundToTwoDecimal(
                    shortedIncomes.reduce((sum, trans) => sum + trans.amount, 0) /
                    shortedIncomes.length
                )
                : 0;

        // zukünftige Tage berechnen basierend auf 'selected'
        const datesAxisX = getFutureDatesAxisX(selected!);

        // Kombinierte Daten vorbereiten
        const combinedData: ChartData[] = datesAxisX.map((date) => ({
            name: date,
            expense: 0,
            income: 0,
        }));

        // Berechnung der zukünftigen Ausgaben und Einnahmen
        const futureExpenses = calculateFutureTrend(totalExpenseValue, datesAxisX.length, averageExpense);
        const futureIncomes = calculateFutureTrend(totalIncomeValue, datesAxisX.length, averageIncome);

        // Die berechneten zukünftigen Ausgaben und Einnahmen in die combinedData einfügen
        combinedData.forEach((item, index) => {
            item.expense = futureExpenses[index] || 0; // Wenn der Index nicht existiert, 0 setzen
            item.income = futureIncomes[index] || 0;   // Wenn der Index nicht existiert, 0 setzen
        });

        setData(combinedData);
    }, [filteredTransactions, selected]);


    const range = getRangeAxisX(selected!);

    return (
        <div className="w-full">
            {data.length !== 0 ? (
                <DashboardCard
                    title="Forecast"
                    description="Visualize the forceast of your expenses and incomes"
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
                            <Line
                                type="monotone"
                                dataKey="expense"
                                strokeWidth={2}
                                stroke="#3066BE"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="income"
                                strokeWidth={2}
                                stroke="#047857"
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
