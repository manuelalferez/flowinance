import { Transaction, TransactionSupabase } from "@/app/types/global";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as CryptoJS from "crypto-js";
import dayjs from "dayjs";
import { format, parseISO } from "date-fns";
import moment from "moment";
import { EXPENSES_CATEGORIES } from "./categories";
import { currencies } from "./constants";

const DEFAULT_DELIMITER = ";";
const DEFAULT_CURRENCY = currencies.at(0)!.name;
const TRANSACTIONS_TABLE = "transactions";
const DELETED_USERS_TABLE = "deleted_users";
const SETTINGS_TABLE = "settings";
const BUGS_TABLE = "bugs";

export enum LocalStorage {
  currency = "currency",
  delimiter = "delimiter",
  transactions = "transactions",
  settingsUpdated = "settings-updated",
  transactionsTimeStamp = "transactions-timestamp",
  transactionsChanged = "transactions-changed",
}

export enum headersOrderIndexs {
  date = 0,
  concept = 1,
  amount = 2,
  category = 3,
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNumColumns(matrix: string[][]) {
  if (matrix.length === 0) {
    return 0;
  }

  return matrix[0].length;
}

export function getNumRows(matrix: string[][]) {
  return matrix.length;
}

function hasEmptyStringExceptFirst(arr: string[]): boolean {
  return arr.slice(1).some((item) => item === "");
}

export function roundToTwoDecimal(num: number) {
  return Math.round(num * 100) / 100;
}

export function formatNumberWithTwoDecimals(num: number) {
  const formattedNumber = num.toFixed(2);
  return formattedNumber;
}

export function deleteEmptyRowsAndColumns(matrix: string[][]): string[][] {
  const nonEmptyRows = matrix.filter((row) =>
    row.some((cell) => cell.trim() !== "")
  );

  if (nonEmptyRows.length === 0) return nonEmptyRows;

  const transposeMatrix = (matrix: string[][]) =>
    matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

  const filteredColumns = transposeMatrix(nonEmptyRows).filter((column) =>
    column.some((cell) => cell.trim() !== "")
  );

  return transposeMatrix(filteredColumns);
}

export function calculatePercentageWithCondition(
  matrix: string[][],
  columnIndex: number,
  condition: (value: string) => boolean
): number {
  if (matrix.length === 0) {
    return 0;
  }

  const totalRows = matrix.length;
  const rowsSatisfyingCondition = matrix.filter((row) =>
    condition(row[columnIndex])
  ).length;
  return (rowsSatisfyingCondition / totalRows) * 100;
}

export function formatDateStringToDdMmYyyy(dateString: string): string {
  if (isDateInFormatDdMmYyyy(dateString)) {
    return dateString;
  }
  const parsedDate = dayjs(dateString);
  return parsedDate.format("DD/MM/YYYY");
}

export function isValidDate(dateString: string): boolean {
  if (isNumberCondition(dateString)) return false;
  const parsedDate = dayjs(dateString);
  if (parsedDate.isValid()) {
    return true;
  }
  if (isDateInFormatDdMmYyyy(dateString)) {
    return true;
  }
  return false;
}

function isDateInFormatDdMmYyyy(value: string): boolean {
  if (!value) return false;
  const dateParts = value.split("/");

  if (dateParts.length !== 3) {
    return false;
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  const jsMonth = month - 1;

  const date = new Date(year, jsMonth, day);

  return !isNaN(date.getTime());
}

export function isNumberCondition(value: string): boolean {
  return !isNaN(Number(value));
}

export function switchColumns(
  matrix: string[][],
  col1: number,
  col2: number
): string[][] {
  if (
    col1 < 0 ||
    col1 >= matrix[0].length ||
    col2 < 0 ||
    col2 >= matrix[0].length
  ) {
    throw new Error("Column indices are out of bounds.");
  }

  return matrix.map((row) => {
    const temp = row[col1];
    row[col1] = row[col2];
    row[col2] = temp;
    return row;
  });
}

export function stringToNestedArray(inputString: string): string[][] {
  const lines = inputString.split("\n");
  const result = lines
    .map((line) => line.split("|").map((item) => item.trim()))
    .filter((subArray) => subArray.length > 1)
    .filter((_, index) => index !== 1);

  return result;
}

export function extractFields(lines: string[]): string[][] {
  let fields: string[][] = [];
  const delimiter = getDelimiterFromLocalStorage();
  lines.forEach((line) => {
    const splittedLine = line.split(delimiter ?? DEFAULT_DELIMITER);
    if (!hasEmptyStringExceptFirst(splittedLine)) {
      fields.push(splittedLine);
    }
  });
  return fields;
}

export async function getNewTransactions(
  supabase: SupabaseClient<any, "public", any>,
  transactions: string[][]
) {
  const copy = transactions.map((row) => [...row]);
  const userId = await getUserId(supabase);
  if (!userId) return transactions;
  const data = await getTransactions(supabase);
  if (!data) return transactions;
  const desencryptedTransactions = decryptTransactions(data, userId);
  const newTransactions = copy.filter((row) => {
    return !desencryptedTransactions.some(
      ({ date, amount, concept }) =>
        date === row[headersOrderIndexs.date] &&
        amount ===
          Math.abs(
            roundToTwoDecimal(parseFloat(row[headersOrderIndexs.amount]))
          ) &&
        concept === row[headersOrderIndexs.concept]
    );
  });

  return newTransactions;
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";
  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export async function getUserId(supabase: SupabaseClient<any, "public", any>) {
  const userId = await (await supabase.auth.getSession()).data.session?.user.id;
  return userId;
}

export async function getUserEmail(
  supabase: SupabaseClient<any, "public", any>
) {
  const email = await (
    await supabase.auth.getSession()
  ).data.session?.user.email;
  return email;
}

export async function getTransactionsFromSupabase(
  supabase: SupabaseClient<any, "public", any>
): Promise<TransactionSupabase[] | undefined> {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .select()
    .eq("user_id", userId);
  if (error) {
    console.log(`Error getting transactions for the user ${userId}: `, error);
    return;
  }
  return data;
}

export async function getTransactionsFromId(
  supabase: SupabaseClient<any, "public", any>, id:string
): Promise<TransactionSupabase[] | undefined> {
  const { data, error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .select()
    .eq("id", id);
  if (error) {
    console.log(`Error getting transactions for the id ${id}: `, error);
    return;
  }
  return data;
}

export async function uploadTransactionsToSupabase(
  supabase: SupabaseClient<any, "public", any>,
  transactions: TransactionSupabase[]
) {
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .insert(transactions);
  if (error) {
    console.log("Error uploading transactions: ", error);
  }
}

export async function deleteTransactionFromSupabase(
  supabase: SupabaseClient<any, "public", any>,
  id: string
) {
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .delete()
    .eq("id", id);
  if (error) {
    console.log("Error deleting transaction: ", error);
  } else {
    revalidateTransactions();
  }
}

export async function addTransactionToSupabase(
  supabase: SupabaseClient<any, "public", any>,
  transaction: TransactionSupabase
) {
  const transactionEncrypted = encryptTransactions(
    transaction,
    transaction.user_id
  );
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .insert(transactionEncrypted);
  if (error) {
    console.log("Error uploading transaction: ", error);
  } else {
    revalidateTransactions();
  }
}

export async function updateTransactionToSupabase(
  supabase: SupabaseClient<any, "public", any>,
  transaction: TransactionSupabase,
  id: string
) {
  const transactionEncrypted = encryptTransactions(
    transaction,
    transaction.user_id
  );
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .update(transactionEncrypted)
    .eq("id",id)
  if (error) {
    console.log("Error updating transaction: ", error);
  } else {
    revalidateTransactions();
  }
}

function revalidateTransactions() {
  localStorage.setItem(LocalStorage.transactionsChanged, "true");
}

async function deleteAllTransactionsFromSupabase(
  supabase: SupabaseClient<any, "public", any>
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .delete()
    .eq("user_id", userId);
  if (error) {
    console.log("Error deleting transactions: ", error);
  }
  console.log("All Transactions deleted for user: ", userId);
}

export async function uploadBugToSupabase(
  supabase: SupabaseClient<any, "public", any>,
  bugDescription: string
) {
  const { error } = await supabase
    .from(BUGS_TABLE)
    .insert({ description: bugDescription });
  if (error) {
    console.log("Error uploading bugs: ", error);
  } else {
    revalidateTransactions();
  }
}

async function deleteLocalStorage() {
  localStorage.removeItem(LocalStorage.transactions);
  localStorage.removeItem(LocalStorage.transactionsTimeStamp);
  localStorage.removeItem(LocalStorage.transactionsChanged);
}

async function deleteUserFromSupabase(
  supabase: SupabaseClient<any, "public", any>
) {
  const userId = await getUserId(supabase);
  const userEmail = await getUserEmail(supabase);
  if (!userId || !userEmail) {
    return;
  }
  const { error } = await supabase
    .from(DELETED_USERS_TABLE)
    .insert({ user_id: userId, email: userEmail });
  if (error) {
    console.log("Error deleting user: ", error);
  } else {
    console.log("User deleted successfully");
  }
}

export async function deleteAccountFromSupabase(
  supabase: SupabaseClient<any, "public", any>
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }

  await deleteAllTransactionsFromSupabase(supabase);
  deleteLocalStorage();
  await deleteUserFromSupabase(supabase);
}

export async function userHasBeenDeleted(
  supabase: SupabaseClient<any, "public", any>
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from(DELETED_USERS_TABLE)
    .select()
    .eq("user_id", userId);
  if (error) {
    console.log("Error getting deleted users: ", error);
    return;
  }
  if (data && data.length > 0) {
    return true;
  } else {
    return false;
  }
}

function encryptTransactions(transaction: TransactionSupabase, key: string) {
  const amountEncrypt = encryptData(transaction.amount, key);
  const transactionEncrypted = {
    ...transaction,
    amount: amountEncrypt,
    category: encryptData(transaction.category, key),
    concept: encryptData(transaction.concept, key),
    date: encryptData(transaction.date, key),
  };
  return transactionEncrypted;
}

export function encryptData(text: string | number, key: string) {
  const data = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
  return data;
}

export function decryptData(text: string | number, key: string) {
  const bytes = CryptoJS.AES.decrypt(text.toString(), key);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
}

export function decryptTransactions(
  transactions: TransactionSupabase[],
  key: string
): Transaction[] {
  const transactionsDecrypted = transactions.map(
    (transaction: TransactionSupabase) => {
      const amountDecrypt = decryptData(transaction.amount, key);
      const amountWithTwoDecimals = roundToTwoDecimal(
        parseFloat(amountDecrypt)
      );

      return {
        ...transaction,
        amount: amountWithTwoDecimals,
        category: decryptData(transaction.category, key),
        concept: decryptData(transaction.concept, key),
        date: decryptData(transaction.date, key),
      };
    }
  );
  return transactionsDecrypted;
}

export function sortTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    if (!dateA || !dateB) {
      return 0;
    }

    return dateA.getTime() - dateB.getTime();
  });
}

export function sortTransactionsTable(
  transactions: Transaction[]
): Transaction[] {
  return transactions.sort((a, b) => {
    return parseDateToISO(b.date).getTime() - parseDateToISO(a.date).getTime();
  });
}

export function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split("/").map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

export function getWeek(date: Date) {
  const week = moment(date).format("W");
  return week;
}

export function createDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
    const adjustedMonth = month - 1;
    return new Date(year, adjustedMonth, day);
  } else {
    throw new Error("Invalid date format");
  }
}

function isTransactionsExpired() {
  const timestamp = localStorage.getItem(LocalStorage.transactionsTimeStamp);
  if (!timestamp) {
    return true;
  }

  const date = new Date(timestamp);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const oneHourInMilliseconds = 1000 * 60 * 60;

  if (timeDifference > oneHourInMilliseconds) {
    return true;
  }

  return false;
}

function getTransactionsFromLocalStorage() {
  const transactions = localStorage.getItem(LocalStorage.transactions);
  const timestamp = localStorage.getItem(LocalStorage.transactionsTimeStamp);
  const transactionsChanged = localStorage.getItem(
    LocalStorage.transactionsChanged
  );

  if (!!transactions && !!timestamp && transactionsChanged) {
    return null;
  }
  if (isTransactionsExpired()) {
    return null;
  } else {
    return JSON.parse(transactions!) as TransactionSupabase[];
  }
}

function saveTransactionsToLocalStorage(transactions: TransactionSupabase[]) {
  localStorage.setItem(LocalStorage.transactions, JSON.stringify(transactions));
  localStorage.setItem(
    LocalStorage.transactionsTimeStamp,
    new Date().toString()
  );
  localStorage.setItem(LocalStorage.transactionsChanged, "false");
}

export async function getTransactions(
  supabase: SupabaseClient<any, "public", any>
): Promise<TransactionSupabase[] | null> {
  const transactions = getTransactionsFromLocalStorage();
  if (transactions) {
    return transactions;
  } else {
    const data = await getTransactionsFromSupabase(supabase);
    if (!data) {
      return null;
    }
    saveTransactionsToLocalStorage(data);
    return data;
  }
}

async function getDelimiterFromSupabase(
  supabase: SupabaseClient<any, "public", any>
): Promise<string | undefined> {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select("delimiter")
    .eq("user_id", userId);
  if (error) {
    console.log(`Error getting transactions for the user ${userId}: `, error);
    return;
  }
  if (!data || data.length === 0) {
    return;
  }
  return data[0].delimiter;
}

export function saveDelimiterInLocalStorage(delimiter: string) {
  localStorage.setItem(LocalStorage.delimiter, delimiter);
}

export function saveCurrencyInLocalStorage(currency: string) {
  localStorage.setItem(LocalStorage.currency, currency);
}

async function createSettings(supabase: SupabaseClient<any, "public", any>) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { error } = await supabase.from(SETTINGS_TABLE).insert({
    user_id: userId,
    currency: DEFAULT_CURRENCY,
    delimiter: DEFAULT_DELIMITER,
  });
  if (error) {
    console.log("Error creating settings: ", error);
  }
}

export async function getDelimiter(
  supabase: SupabaseClient<any, "public", any>
) {
  const delimiterFromLocalStorage = getDelimiterFromLocalStorage();
  if (!!delimiterFromLocalStorage && !isSettingsUpdated()) {
    return delimiterFromLocalStorage;
  }
  const delimiter = await getDelimiterFromSupabase(supabase);

  if (!delimiter) {
    saveDelimiterInLocalStorage(DEFAULT_DELIMITER);
    await createSettings(supabase);
    return DEFAULT_DELIMITER;
  }
  saveDelimiterInLocalStorage(delimiter);
  return delimiter;
}

export async function getCurrency(
  supabase: SupabaseClient<any, "public", any>
) {
  const currencyFromLocalStorage = getCurrencyFromLocalStorage();
  if (!!currencyFromLocalStorage && !isSettingsUpdated()) {
    return currencyFromLocalStorage;
  }
  const currency = await getCurrencyFromSupabase(supabase);
  if (!currency) {
    createSettings(supabase);
    saveCurrencyInLocalStorage(DEFAULT_CURRENCY);
    return DEFAULT_CURRENCY;
  }
  saveCurrencyInLocalStorage(currency);
  return currency;
}

async function getCurrencyFromSupabase(
  supabase: SupabaseClient<any, "public", any>
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select("currency")
    .eq("user_id", userId);
  if (error) {
    console.log(`Error getting currency for the user ${userId}: `, error);
    return;
  }
  if (!data || data.length === 0) {
    return;
  }
  return data[0].currency;
}

function getDelimiterFromLocalStorage() {
  const delimiter = localStorage.getItem(LocalStorage.delimiter);
  return delimiter;
}

function isSettingsUpdated() {
  return localStorage.getItem(LocalStorage.settingsUpdated);
}

function getCurrencyFromLocalStorage() {
  const currency = localStorage.getItem(LocalStorage.currency);
  return currency;
}

function revalidateSettings() {
  localStorage.setItem(LocalStorage.settingsUpdated, "true");
}

export async function updateCurrencyInSupabase(
  supabase: SupabaseClient<any, "public", any>,
  currency: string
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { error } = await supabase
    .from(SETTINGS_TABLE)
    .update({ currency: currency })
    .eq("user_id", userId);
  if (error) {
    console.log(`Error setting currency for the user ${userId}: `, error);
    return;
  }
  revalidateSettings();
}

export async function updateDelimiterInSupabase(
  supabase: SupabaseClient<any, "public", any>,
  delimiter: string
) {
  const userId = await getUserId(supabase);
  if (!userId) {
    return;
  }
  const { error } = await supabase
    .from(SETTINGS_TABLE)
    .update({ delimiter: delimiter })
    .eq("user_id", userId);
  if (error) {
    console.log(`Error setting delimiter for the user ${userId}: `, error);
    return;
  }
  revalidateSettings();
}

export function formatDateToReadable(dateString: string) {
  const date = parseDate(dateString);
  if (!date) {
    return "";
  }
  return format(parseISO(date.toISOString()), "eeee, d MMM, yyyy");
}

export function parseDateToISO(dateString: string) {
  const date = parseDate(dateString);
  return parseISO(date!.toISOString());
}

export function getDay(dateString: string) {
  const date = parseDate(dateString);
  return date!.getDate();
}

export function formatDateToChartDate(date: Date) {
  return format(date, "MMM d");
}

export function getDates(period: number): string[] {
  const datesArray = [];

  for (let i = 0; i < period; i++) {
    const date = new Date();
    const nextDate = new Date(date.setDate(date.getDate() - i));
    datesArray.push(nextDate);
  }
  return datesArray.map((date) => formatDateToString(date));
}

export function sumTransactionsByDate(data: any[]): any[] {
  let result: any[] = [];
  data.forEach((entry) => {
    const existingEntry = result.find((item) => {
      return item.name === entry.name;
    });
    if (existingEntry) {
      existingEntry.spent += entry.spent;
    } else {
      result.push(entry);
    }
  });

  return result;
}

export function getDatesAxisX(selec: number) {
  if (isWeekSelected(selec)) {
    return getDates(7);
  } else if (isMonthSelected(selec)) {
    return getDates(30);
  } else if (isLastThreeMonthsSelected(selec)) {
    return getDates(90);
  }
  return getDates(365);
}

function isWeekSelected(selec: number) {
  return selec === 3;
}

function isLastThreeMonthsSelected(selec: number) {
  return selec === 1;
}

function isMonthSelected(selec: number) {
  return selec === 2;
}

export function getRangeAxisX(selec: number) {
  if (isWeekSelected(selec)) {
    return 2;
  } else if (isMonthSelected(selec)) {
    return 7;
  } else if (isLastThreeMonthsSelected(selec)) {
    return 15;
  } else {
    return 30;
  }
}

export function isExpense(category: string) {
  return EXPENSES_CATEGORIES.some((expense) => expense === category);
}
