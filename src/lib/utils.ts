import { Transaction, TransactionSupabase } from "@/app/types/global";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as CryptoJS from "crypto-js";

const DELIMITER = ";";
const TRANSACTIONS_TABLE = "transactions";
const DELETED_USERS_TABLE = "deleted_users";

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

export function extractFields(lines: string[]): string[][] {
  let fields: string[][] = [];

  lines.forEach((line) => {
    const splittedLine = line.split(DELIMITER);
    if (!hasEmptyStringExceptFirst(splittedLine)) {
      fields.push(splittedLine);
    }
  });
  return fields;
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

async function getUserEmail(supabase: SupabaseClient<any, "public", any>) {
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

function revalidateTransactions() {
  localStorage.setItem("transactions-changed", "true");
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
async function deleteLocalStorage() {
  localStorage.removeItem("transactions");
  localStorage.removeItem("transactions-timestamp");
  localStorage.removeItem("transactions-changed");
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

function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split("/").map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

export function getWeek(date: Date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
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
  const timestamp = localStorage.getItem("transactions-timestamp");
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
  const transactions = localStorage.getItem("transactions");
  const timestamp = localStorage.getItem("transactions-timestamp");
  const transactionsChanged = localStorage.getItem("transactions-changed");

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
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("transactions-timestamp", new Date().toString());
  localStorage.setItem("transactions-changed", "false");
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
