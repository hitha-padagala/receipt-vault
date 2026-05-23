export const summaryCards = [
  { label: "Total receipts", value: "1,284", delta: "+12.4%" },
  { label: "Monthly spending", value: "$18,240", delta: "+4.1%" },
  { label: "Warranty alerts", value: "17", delta: "-3" },
  { label: "Categories tracked", value: "12", delta: "+2" },
];

export const monthlyExpenses = [
  { month: "Jan", value: 9200 },
  { month: "Feb", value: 11300 },
  { month: "Mar", value: 12850 },
  { month: "Apr", value: 10400 },
  { month: "May", value: 14250 },
  { month: "Jun", value: 15200 },
];

export const categoryBreakdown = [
  { name: "Travel", value: 38 },
  { name: "Office", value: 24 },
  { name: "Software", value: 18 },
  { name: "Meals", value: 12 },
  { name: "Other", value: 8 },
];

export const receipts = [
  { id: "r1", merchant: "Apex Electronics", amount: "$249.99", category: "Hardware", date: "2026-05-21", warranty: "Active", status: "success" },
  { id: "r2", merchant: "CloudNine", amount: "$89.00", category: "Software", date: "2026-05-19", warranty: "Expires in 14 days", status: "warning" },
  { id: "r3", merchant: "Nova Travel", amount: "$1,120.40", category: "Travel", date: "2026-05-17", warranty: "N/A", status: "outline" },
];

export const detailReceipt = {
  merchant: "Apex Electronics",
  amount: "$249.99",
  date: "2026-05-21",
  tax: "$19.99",
  category: "Hardware",
  warranty: "Active until 2028-05-21",
  notes: "Bulk purchase for team peripherals and docking station replacement.",
  ocr: "Apex Electronics Receipt\nInvoice #A-24819\nDocking Station x2\nUSB-C Hub x1\nTotal: $249.99",
  items: [
    { name: "Docking Station", qty: 2, price: "$89.99" },
    { name: "USB-C Hub", qty: 1, price: "$69.99" },
  ],
};

export const recentActivity = [
  "Receipt uploaded from Gmail attachment",
  "Warranty reminder created for Apex Electronics",
  "Monthly spending report exported to CSV",
  "New category added: Subscriptions",
];
