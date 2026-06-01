export type CategoryType =
  | "Food"
  | "Travel"
  | "Fuel"
  | "Shopping"
  | "Entertainment"
  | "Healthcare"
  | "Education"
  | "Utilities"
  | "Miscellaneous"
  | string;

export interface Category {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
}
