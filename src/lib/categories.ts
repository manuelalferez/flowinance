export enum ExpensesCategories {
  Home = "Home",
  Groceries = "Groceries",
  Transportation = "Transportation",
  Subscriptions = "Subscriptions",
  Trips = "Trips",
  Hobbies = "Hobbies",
  Health = "Health",
  BarCafeRestaurant = "Bar. cafe. restaurant",
  ClothesShoes = "Clothes & shoes",
  Internet = "Internet",
  Others = "Others",
  OnlineShopping = "Online shopping",
  DonationsGifts = "Donations & Gifts",
  Rent = "Rent",
}

export enum IncomesCategories {
  Salary = "Salary",
  Refunds = "Refunds / Reimbursements",
}

export enum SpecialCategories {
  Savings = "Savings",
  Investing = "Investing",
  Uncategorized = "Uncategorized",
}

export const EXPENSES_CATEGORIES: string[] = Object.values(ExpensesCategories);
export const INCOMES_CATEGORIES: string[] = Object.values(IncomesCategories);
export const ESPECIAL_CATEGORIES: string[] = Object.values(SpecialCategories);

export const ALL_CATEGORIES: string[] = [
  ...EXPENSES_CATEGORIES,
  ...INCOMES_CATEGORIES,
  ...ESPECIAL_CATEGORIES,
];
