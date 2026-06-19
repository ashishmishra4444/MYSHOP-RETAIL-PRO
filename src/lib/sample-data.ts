export const PRODUCTS = [
  { code: "P1001", barcode: "8901234567890", name: "Whole Wheat Atta 5KG", group: "Grocery", subGroup: "Atta/Flour", brand: "Annapurna", mrp: 260, rate: 245, stock: 125, unit: "PCS", reorder: 10, hsn: "110100", gst: 5 },
  { code: "P1002", barcode: "8901234561252", name: "Basmati Rice 1KG", group: "Grocery", subGroup: "Rice", brand: "Royal", mrp: 120, rate: 115, stock: 85, unit: "PCS", reorder: 10, hsn: "100630", gst: 5 },
  { code: "P1003", barcode: "8901003701234", name: "Sunflower Oil 1L", group: "Grocery", subGroup: "Cooking Oil", brand: "Sundrop", mrp: 165, rate: 155, stock: 7, unit: "PCS", reorder: 10, hsn: "151211", gst: 18 },
  { code: "P1004", barcode: "8901050004008", name: "Iodised Salt 1KG", group: "Grocery", subGroup: "Salt", brand: "Tata", mrp: 20, rate: 18, stock: 45, unit: "PCS", reorder: 10, hsn: "250100", gst: 0 },
  { code: "P1005", barcode: "8901234005678", name: "Instant Noodles 70g", group: "Grocery", subGroup: "Noodles", brand: "Maggi", mrp: 14, rate: 12, stock: 12, unit: "PCS", reorder: 15, hsn: "190230", gst: 12 },
  { code: "P1006", barcode: "8901396321111", name: "Glucose Biscuits 100g", group: "Grocery", subGroup: "Biscuits", brand: "Parle", mrp: 10, rate: 9, stock: 32, unit: "PCS", reorder: 10, hsn: "190531", gst: 12 },
  { code: "P1007", barcode: "8901063112004", name: "Refined Sugar 1KG", group: "Grocery", subGroup: "Sugar", brand: "Madhur", mrp: 45, rate: 42, stock: 18, unit: "PCS", reorder: 10, hsn: "170199", gst: 5 },
  { code: "P1008", barcode: "8908001768025", name: "Green Tea 25 Bags", group: "Beverages", subGroup: "Tea", brand: "Lipton", mrp: 160, rate: 150, stock: 22, unit: "PCS", reorder: 10, hsn: "090230", gst: 5 },
  { code: "P1009", barcode: "8901030610217", name: "Toned Milk 1L", group: "Dairy", subGroup: "Milk", brand: "Amul", mrp: 58, rate: 54, stock: 30, unit: "PCS", reorder: 10, hsn: "040120", gst: 0 },
  { code: "P1010", barcode: "8901030520013", name: "Butter 100g", group: "Dairy", subGroup: "Butter", brand: "Amul", mrp: 62, rate: 58, stock: 8, unit: "PCS", reorder: 10, hsn: "040510", gst: 12 },
  { code: "P1011", barcode: "8901030813233", name: "Toothpaste 100g", group: "Personal Care", subGroup: "Dental", brand: "Colgate", mrp: 85, rate: 80, stock: 15, unit: "PCS", reorder: 10, hsn: "330610", gst: 18 },
  { code: "P1012", barcode: "8901030835675", name: "Bath Soap 125g", group: "Personal Care", subGroup: "Soap", brand: "Lux", mrp: 40, rate: 38, stock: 28, unit: "PCS", reorder: 10, hsn: "340111", gst: 18 },
  { code: "P1013", barcode: "8901248800010", name: "Detergent Powder 1KG", group: "Home Care", subGroup: "Detergent", brand: "Surf", mrp: 150, rate: 142, stock: 6, unit: "PCS", reorder: 10, hsn: "340220", gst: 18 },
  { code: "P1014", barcode: "8906023490012", name: "Antiseptic Liquid 250ml", group: "Personal Care", subGroup: "Health", brand: "Dettol", mrp: 130, rate: 122, stock: 9, unit: "PCS", reorder: 10, hsn: "380894", gst: 18 },
  { code: "P1015", barcode: "8901262001001", name: "Gram Flour 1KG", group: "Grocery", subGroup: "Flour", brand: "Rajdhani", mrp: 70, rate: 66, stock: 25, unit: "PCS", reorder: 10, hsn: "110610", gst: 5 },
];

export const CART_INITIAL = [
  { ...PRODUCTS[0], qty: 1, disc: 0 },
  { ...PRODUCTS[1], qty: 2, disc: 0 },
  { ...PRODUCTS[2], qty: 1, disc: 0 },
  { ...PRODUCTS[3], qty: 1, disc: 0 },
  { ...PRODUCTS[4], qty: 3, disc: 0 },
  { ...PRODUCTS[5], qty: 2, disc: 0 },
];

export const CUSTOMERS = [
  { code: "CUST001", name: "Rahul Kumar",   mobile: "9876543210", city: "Indore", opening: 12750, limit: 25000, status: "Active" },
  { code: "CUST002", name: "Shyam Store",   mobile: "9827001234", city: "Indore", opening: 8650,  limit: 20000, status: "Active" },
  { code: "CUST003", name: "Kirana Mart",   mobile: "9755544332", city: "Indore", opening: 6250,  limit: 15000, status: "Active" },
  { code: "CUST004", name: "Om Traders",    mobile: "8889990011", city: "Dewas",  opening: 5320,  limit: 15000, status: "Active" },
  { code: "CUST005", name: "Mahesh Provision", mobile: "9826003344", city: "Indore", opening: 4890, limit: 10000, status: "Active" },
  { code: "CUST006", name: "Pooja Kirana",  mobile: "9039948890", city: "Indore", opening: 3200,  limit: 10000, status: "Active" },
  { code: "CUST007", name: "Agarwal Store", mobile: "9893123456", city: "Dewas",  opening: 2150,  limit: 10000, status: "Active" },
  { code: "CUST008", name: "New Bombay Store", mobile: "9340123456", city: "Indore", opening: 1875, limit: 10000, status: "Active" },
  { code: "CUST009", name: "Patel Provision", mobile: "9993211234", city: "Indore", opening: 1450, limit: 5000, status: "Active" },
  { code: "CUST010", name: "Gupta General Store", mobile: "9712345678", city: "Indore", opening: 950, limit: 5000, status: "Active" },
];

export const SUPPLIERS = [
  { code: "SUPP001", name: "Devgiri Traders",   city: "Indore", balance: 18860, limit: 100000 },
  { code: "SUPP002", name: "Shree Distributors", city: "Bhopal", balance: 12450, limit: 75000 },
  { code: "SUPP003", name: "Global Foods",      city: "Indore", balance: 9750,  limit: 50000 },
  { code: "SUPP004", name: "Kamal Agencies",    city: "Ujjain", balance: 6230,  limit: 50000 },
  { code: "SUPP005", name: "Nationwide Suppliers", city: "Indore", balance: 5980, limit: 50000 },
];

export const SALES_TREND = [
  { d: "01", v: 12000 }, { d: "03", v: 15000 }, { d: "05", v: 22000 },
  { d: "07", v: 18000 }, { d: "09", v: 25000 }, { d: "11", v: 21000 },
  { d: "13", v: 28000 }, { d: "15", v: 19000 }, { d: "17", v: 35000 },
];

export const TOP_SELLING = [
  { name: "Whole Wheat Atta 5KG", qty: 125, amount: 29625 },
  { name: "Basmati Rice 1KG", qty: 85, amount: 9775 },
  { name: "Sunflower Oil 1L", qty: 55, amount: 8525 },
  { name: "Iodised Salt 1KG", qty: 120, amount: 2160 },
  { name: "Instant Noodles 70g", qty: 200, amount: 2400 },
];

export const EXPENSES = [
  { date: "01/06/2024", category: "Rent",     amount: 25000, notes: "Shop rent June" },
  { date: "03/06/2024", category: "Electricity", amount: 4800, notes: "May bill" },
  { date: "05/06/2024", category: "Staff Salary", amount: 32000, notes: "Salaries May" },
  { date: "08/06/2024", category: "Transport", amount: 2200, notes: "Loading charges" },
  { date: "12/06/2024", category: "Internet", amount: 999, notes: "Broadband" },
  { date: "15/06/2024", category: "Maintenance", amount: 1800, notes: "AC servicing" },
];

export const CASH_BOOK = [
  { time: "09:00", type: "Opening", particulars: "Opening Balance", inflow: 5000, outflow: 0 },
  { time: "10:24", type: "Sale",    particulars: "Cash Sale - INV/142", inflow: 1850, outflow: 0 },
  { time: "11:10", type: "Sale",    particulars: "Cash Sale - INV/143", inflow: 720, outflow: 0 },
  { time: "12:15", type: "Expense", particulars: "Tea / Snacks",        inflow: 0, outflow: 240 },
  { time: "13:40", type: "Receipt", particulars: "Rahul Kumar Receipt", inflow: 5000, outflow: 0 },
  { time: "15:22", type: "Payment", particulars: "Paid to Devgiri Tr.", inflow: 0, outflow: 10000 },
  { time: "16:48", type: "Sale",    particulars: "Cash Sale - INV/144", inflow: 2340, outflow: 0 },
];

export const LEDGER = [
  { date: "01/05/2024", voucher: "INV/112/24-25", type: "Sales Invoice", narration: "Invoice for Grocery Items", debit: 5320, credit: 0, balance: 18070 },
  { date: "04/05/2024", voucher: "INV/117/24-25", type: "Sales Invoice", narration: "Invoice for Daily Items",   debit: 3200, credit: 0, balance: 21270 },
  { date: "07/05/2024", voucher: "RCPT/45/24-25", type: "Receipt",       narration: "Payment Received - Cash",   debit: 0, credit: 5000, balance: 16270 },
  { date: "10/05/2024", voucher: "INV/125/24-25", type: "Sales Invoice", narration: "Invoice for Household",     debit: 2150, credit: 0, balance: 18420 },
  { date: "15/05/2024", voucher: "RCPT/52/24-25", type: "Receipt",       narration: "Payment Received - UPI",    debit: 0, credit: 3670, balance: 14750 },
  { date: "20/05/2024", voucher: "INV/131/24-25", type: "Sales Invoice", narration: "Invoice for Grocery Items", debit: 4890, credit: 0, balance: 19640 },
  { date: "25/05/2024", voucher: "RCPT/60/24-25", type: "Receipt",       narration: "Payment Received - Cash",   debit: 0, credit: 6000, balance: 13640 },
  { date: "01/06/2024", voucher: "INV/141/24-25", type: "Sales Invoice", narration: "Invoice for Daily Items",   debit: 950, credit: 0, balance: 14590 },
  { date: "05/06/2024", voucher: "RCPT/68/24-25", type: "Receipt",       narration: "Payment Received - UPI",    debit: 0, credit: 1840, balance: 12750 },
];

export const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
