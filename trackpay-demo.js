/* Trackpay static demo — all data below is illustrative sample data. No network calls, no real money. */
(function () {
"use strict";

/* ---------------------------------------------------------------- helpers */
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }
function fmt(n) { return Math.round(n).toLocaleString('en-IN'); }
function inr(n) { return '₹' + fmt(n); }
function refreshIcons() { if (window.lucide) lucide.createIcons(); }

function toast(msg) {
  var root = qs('#toast-root');
  if (!root) return;
  var div = document.createElement('div');
  div.className = 'toast-item';
  div.innerHTML = '<span>' + msg + '</span>';
  root.appendChild(div);
  setTimeout(function () { div.remove(); }, 2600);
}

/* -------------------------------------------------------------------- data */
var CONTACTS = [
  { id: 'rk', name: 'Rakesh Kumar', number: '9876543210', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { id: 'mom', name: 'Mom', number: '9876543211', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'shop', name: 'Local Shop', number: '9876543212', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { id: 'priya', name: 'Priya Sharma', number: '9123456780', color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
  { id: 'arjun', name: 'Arjun Mehta', number: '9988776655', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'neha', name: 'Neha Kapoor', number: '9876501234', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' }
];

var FRIENDS = [
  { id: 'rk', name: 'Rakesh Kumar', upi: 'rakesh@okhdfcbank', color: 'bg-amber-100 text-amber-600', balance: 450 },
  { id: 'priya', name: 'Priya Sharma', upi: 'priya@okicici', color: 'bg-rose-100 text-rose-600', balance: -320 },
  { id: 'arjun', name: 'Arjun Mehta', upi: 'arjun@ybl', color: 'bg-blue-100 text-blue-600', balance: 0 },
  { id: 'neha', name: 'Neha Kapoor', upi: 'neha@okaxis', color: 'bg-indigo-100 text-indigo-600', balance: 180 }
];

var GROUPS_INITIAL = [
  { id: 'g1', name: 'Goa Trip', color: 'bg-indigo-100 text-indigo-600', members: ['rk', 'priya', 'arjun'], totalOwed: 2400 },
  { id: 'g2', name: 'Roommates', color: 'bg-rose-100 text-rose-600', members: ['priya', 'neha'], totalOwed: -650 },
  { id: 'g3', name: 'Office Lunch Club', color: 'bg-emerald-100 text-emerald-600', members: ['rk', 'arjun', 'neha'], totalOwed: 320 }
];

var FAMILY_MEMBERS = [
  { id: 'dad', name: 'Dad', status: 'accepted' },
  { id: 'mom2', name: 'Mom', status: 'accepted' },
  { id: 'sis', name: 'Sister', status: 'pending' }
];

var BILL_CATEGORIES = [
  { key: 'electricity', label: 'Electricity', icon: 'zap', color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
  { key: 'credit-card', label: 'Credit Card', icon: 'credit-card', color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  { key: 'postpaid', label: 'Postpaid', icon: 'smartphone', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  { key: 'broadband', label: 'Broadband', icon: 'wifi', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/20' },
  { key: 'water', label: 'Water', icon: 'droplets', color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/20' },
  { key: 'piped-gas', label: 'Piped Gas', icon: 'flame', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20' },
  { key: 'dth', label: 'DTH', icon: 'tv', color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/20' },
  { key: 'education', label: 'Education', icon: 'graduation-cap', color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/20' }
];

var BILL_DETAILS = {
  'electricity': { pending: 1650, lastMonth: 1435, diff: 15, billers: [{ name: 'Adani Electricity', sub: 'Mumbai', code: 'AD' }, { name: 'Tata Power', sub: 'Mumbai', code: 'TP' }, { name: 'MSEDCL', sub: 'Maharashtra', code: 'MS' }] },
  'credit-card': { pending: 24590, lastMonth: 21200, diff: 16, billers: [{ name: 'HDFC Bank', sub: 'Credit Card', code: 'HD' }, { name: 'SBI Card', sub: 'Credit Card', code: 'SBI' }, { name: 'ICICI Bank', sub: 'Credit Card', code: 'IC' }] },
  'postpaid': { pending: 799, lastMonth: 699, diff: 14, billers: [{ name: 'Jio Postpaid', sub: 'Reliance Jio', code: 'JIO' }, { name: 'Airtel Postpaid', sub: 'Bharti Airtel', code: 'AIR' }, { name: 'Vi Postpaid', sub: 'Vodafone Idea', code: 'VI' }] },
  'broadband': { pending: 1199, lastMonth: 1199, diff: 0, billers: [{ name: 'JioFiber', sub: 'Postpaid', code: 'JF' }, { name: 'Airtel Xstream', sub: 'Fixed Line', code: 'AX' }, { name: 'ACT Fibernet', sub: 'Broadband', code: 'ACT' }] },
  'water': { pending: 340, lastMonth: 310, diff: 10, billers: [{ name: 'MCGM Water', sub: 'Mumbai', code: 'MC' }, { name: 'Delhi Jal Board', sub: 'Delhi', code: 'DJB' }, { name: 'Bangalore Water', sub: 'BWSSB', code: 'BW' }] },
  'piped-gas': { pending: 520, lastMonth: 480, diff: 8, billers: [{ name: 'MGL', sub: 'Mahanagar Gas', code: 'MGL' }, { name: 'IGL', sub: 'Indraprastha Gas', code: 'IGL' }, { name: 'Adani Gas', sub: 'Gujarat', code: 'AG' }] },
  'dth': { pending: 399, lastMonth: 399, diff: 0, billers: [{ name: 'Tata Play', sub: 'DTH', code: 'TP' }, { name: 'Airtel Digital TV', sub: 'DTH', code: 'AD' }, { name: 'Dish TV', sub: 'DTH', code: 'DT' }] },
  'education': { pending: 15000, lastMonth: 15000, diff: 0, billers: [{ name: 'Ryan International', sub: 'School Fees', code: 'RS' }, { name: 'Delhi Public School', sub: 'School Fees', code: 'DPS' }, { name: 'Byjus Tuition', sub: 'Tuition', code: 'BY' }] }
};

var GOALS_INITIAL = [
  { id: 'go1', name: 'New Bike', target: 120000, progress: 78000, sip: 6000, date: '2026-04-01' },
  { id: 'go2', name: 'Emergency Fund', target: 300000, progress: 245000, sip: 10000, date: '2026-09-01' },
  { id: 'go3', name: 'Europe Trip', target: 450000, progress: 95000, sip: 15000, date: '2027-06-01' }
];

var OPPORTUNITIES_INITIAL = [
  { id: 'o1', title: 'Rs 12,400 sitting idle — move it to a 7.1% Smart Save', amount: 12400, icon: 'sparkles', wrap: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400', target: 'screen-smart-save' },
  { id: 'o2', title: 'Netflix Premium price hike detected — Rs 149 more per month', amount: 149, icon: 'refresh-cw', wrap: 'bg-purple-100 dark:bg-purple-900/30', color: 'text-purple-600 dark:text-purple-400', target: 'screen-home' },
  { id: 'o3', title: '3% cashback available on your electricity bill', amount: 49, icon: 'zap', wrap: 'bg-amber-100 dark:bg-amber-900/30', color: 'text-amber-600 dark:text-amber-400', billKey: 'electricity' },
  { id: 'o4', title: 'Your credit score jumped 12 points this month', amount: null, icon: 'trending-up', wrap: 'bg-emerald-100 dark:bg-emerald-900/30', color: 'text-emerald-600 dark:text-emerald-400', target: 'screen-home' }
];

var TRANSACTIONS = [
  { id: 't1', title: 'Rakesh Kumar', sub: 'UPI Transfer', amount: 500, type: 'debit', category: 'transfer', account: 'Federal Bank', source: 'app', period: 'today', date: '06 Aug 2026', time: '11:20 AM', receiverUpiId: 'rakesh.k@ybl', upiId: 'ashutosh.s7@ptyes', upiRefNo: '569868080531', billUploaded: false, note: '' },
  { id: 't2', title: 'Salary Credit', sub: 'Employer Ltd', amount: 85000, type: 'credit', category: 'salary', account: 'ICICI Bank', source: 'app', period: 'month', date: '01 Aug 2026', time: '9:02 AM', receiverUpiId: 'ashutosh.s7@ptyes', upiId: 'employerltd@icici', upiRefNo: '481027553902', billUploaded: false, note: '' },
  { id: 't3', title: 'Swiggy', sub: 'Food Order', amount: 486, type: 'debit', category: 'food', account: 'HDFC Regalia', source: 'app', period: 'week', date: '30 Jul 2026', time: '8:45 PM', receiverUpiId: 'swiggy@icici', upiId: 'ashutosh.s7@ptyes', upiRefNo: '220981736452', billUploaded: true, billName: 'Swiggy_Receipt_t3.pdf', note: '' },
  { id: 't4', title: 'Electricity Bill', sub: 'Adani Electricity', amount: 1650, type: 'debit', category: 'bills', account: 'Federal Bank', source: 'app', period: 'week', date: '29 Jul 2026', time: '6:10 PM', receiverUpiId: 'adani.electricity@hdfcbank', upiId: 'ashutosh.s7@ptyes', upiRefNo: '773645129087', billUploaded: false, note: '' },
  { id: 't5', title: 'Priya Sharma', sub: 'UPI Transfer', amount: 1200, type: 'credit', category: 'transfer', account: 'Federal Bank', source: 'app', period: 'week', date: '28 Jul 2026', time: '4:32 PM', receiverUpiId: 'ashutosh.s7@ptyes', upiId: 'priya@okicici', upiRefNo: '395810672233', billUploaded: false, note: '' },
  { id: 't6', title: 'Amazon', sub: 'Shopping', amount: 2340, type: 'debit', category: 'shopping', account: 'Amex Platinum', source: 'external', period: 'month', date: '27 Jul 2026', time: '1:15 PM', receiverUpiId: 'amazonpay@apl', upiId: 'ashutosh.s7@ptyes', upiRefNo: '118827364590', billUploaded: false, note: '' },
  { id: 't7', title: 'Netflix', sub: 'Subscription', amount: 649, type: 'debit', category: 'subscription', account: 'HDFC Regalia', source: 'app', period: 'month', date: '26 Jul 2026', time: '12:00 AM', receiverUpiId: 'netflix@axisbank', upiId: 'ashutosh.s7@ptyes', upiRefNo: '664521398870', billUploaded: false, note: '' },
  { id: 't8', title: 'Mom', sub: 'UPI Transfer', amount: 2000, type: 'debit', category: 'transfer', account: 'Federal Bank', source: 'app', period: 'month', date: '25 Jul 2026', time: '7:40 PM', receiverUpiId: 'mom@upi', upiId: 'ashutosh.s7@ptyes', upiRefNo: '552198734461', billUploaded: false, note: '' },
  { id: 't9', title: 'Jio Postpaid', sub: 'Mobile Recharge', amount: 799, type: 'debit', category: 'bills', account: 'Federal Bank', source: 'external', period: 'month', date: '24 Jul 2026', time: '10:05 AM', receiverUpiId: 'jio.postpaid@icici', upiId: 'ashutosh.s7@ptyes', upiRefNo: '904471256639', billUploaded: false, note: '' },
  { id: 't10', title: 'Arjun Mehta', sub: 'UPI Transfer', amount: 750, type: 'credit', category: 'transfer', account: 'State Bank of India', source: 'app', period: '3months', date: '22 Jul 2026', time: '3:22 PM', receiverUpiId: 'ashutosh.s7@ptyes', upiId: 'arjun@ybl', upiRefNo: '337765480291', billUploaded: false, note: '' }
];

var CATEGORY_META = {
  food: { label: 'Food', icon: 'coffee', color: '#fbbf24', text: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  cab: { label: 'Cab', icon: 'car', color: '#818cf8', text: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  shopping: { label: 'Shopping', icon: 'shopping-bag', color: '#f472b6', text: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  bills: { label: 'Bills', icon: 'zap', color: '#60a5fa', text: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  travel: { label: 'Travel', icon: 'plane', color: '#a78bfa', text: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  entertainment: { label: 'Entertainment', icon: 'film', color: '#34d399', text: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  subscription: { label: 'Subscription', icon: 'smartphone', color: '#c084fc', text: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  transfer: { label: 'Transfer', icon: 'send', color: '#94a3b8', text: 'text-slate-500', bg: 'bg-slate-100 dark:bg-neutral-800' },
  salary: { label: 'Salary', icon: 'landmark', color: '#34d399', text: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' }
};
var SELECTABLE_CATEGORIES = ['food', 'cab', 'shopping', 'bills', 'travel', 'entertainment'];
var ACCOUNT_OPTIONS = [
  { id: 'all', label: 'All Accounts' },
  { id: 'Federal Bank', label: 'Federal Bank (Savings)' },
  { id: 'ICICI Bank', label: 'ICICI Bank (Salary)' },
  { id: 'State Bank of India', label: 'State Bank of India' },
  { id: 'HDFC Regalia', label: 'HDFC Regalia Gold CC' },
  { id: 'Amex Platinum', label: 'Amex Platinum CC' }
];
var TIME_OPTIONS = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: '3months', label: 'Last 3 Months' }
];

var DEALS = [
  { title: 'SWIGGY', discount: '50% OFF', sub: 'Up to Rs 150 on food orders', color: 'from-orange-500 to-red-500' },
  { title: 'MYNTRA', discount: 'FLAT 30%', sub: 'On fashion & lifestyle', color: 'from-pink-500 to-rose-500' },
  { title: 'BIGBASKET', discount: 'Rs 200 OFF', sub: 'On orders above Rs 999', color: 'from-emerald-500 to-teal-600' }
];
var TIPS = [
  { tag: 'INVESTMENT', title: 'Move idle cash into Liquid Funds', description: 'You have Rs 12,400 sitting idle in savings. Liquid funds earn about 7.1% versus 3% in a savings account.' },
  { tag: 'BILLS', title: 'Switch to annual broadband billing', description: 'Paying broadband annually instead of monthly can save you up to Rs 1,200 a year.' }
];
var GIFTCARDS = [
  { icon: '🍕', brand: 'Dominos', value: 'Rs 100' },
  { icon: '📦', brand: 'Amazon Pay', value: 'Rs 250' },
  { icon: '🛵', brand: 'Swiggy', value: 'Rs 100' },
  { icon: '👗', brand: 'Myntra', value: 'Rs 500' }
];

var DEMO_MERCHANTS = [
  { name: "Domino's Pizza", brand: "Domino's", upi: 'dominos.pizza@hdfcbank', emoji: '🍕', color: 'bg-blue-600', discount: 12 },
  { name: 'Amazon Pay', brand: 'Amazon Pay', upi: 'amazonpay@apl', emoji: '📦', color: 'bg-orange-500', discount: 8 },
  { name: 'Swiggy', brand: 'Swiggy', upi: 'swiggy@icici', emoji: '🛵', color: 'bg-orange-600', discount: 15 },
  { name: 'Croma', brand: 'Croma', upi: 'croma@hdfcbank', emoji: '🛒', color: 'bg-teal-600', discount: 6 },
  { name: 'Myntra', brand: 'Myntra', upi: 'myntra@axisbank', emoji: '👗', color: 'bg-pink-500', discount: 20 }
];

var TAGS = [
  { id: 'food', label: 'Food', icon: 'coffee', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { id: 'cab', label: 'Cab', icon: 'car', color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { id: 'shopping', label: 'Shop', icon: 'shopping-bag', color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { id: 'bills', label: 'Bill', icon: 'zap', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 'travel', label: 'Travel', icon: 'plane', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' }
];

var PROFILE_MENU = [
  { icon: 'coins', label: 'Financial Profile', stub: true },
  { icon: 'landmark', label: 'Tax Center', stub: true },
  { icon: 'target', label: 'Goals', screen: 'screen-goals' },
  { icon: 'bell', label: 'Notifications', screen: 'screen-notifications' },
  { icon: 'lock', label: 'Lock with Face ID', stub: true },
  { icon: 'help-circle', label: 'Support & Community', stub: true }
];

var CHAT_QA = [
  { keys: ['cut back', 'save more', 'spending', 'where can i save'], reply: "Looking at your last 30 days: dining out is your biggest discretionary category at Rs 6,240 (18% of spend), followed by shopping at Rs 4,890. If you trimmed dining out by just 2 orders a week, that is about Rs 1,800/month back in your pocket — enough to fully fund your Emergency Fund goal 3 months sooner." },
  { keys: ['sip', 'invest', 'portfolio', 'allocation'], reply: "For a balanced profile, a good starting SIP split is 60% equity index funds, 25% flexi-cap, 15% debt/liquid funds for stability. On Rs 15,000/month that is roughly Rs 9,000 equity index, Rs 3,750 flexi-cap, and Rs 2,250 debt. Want me to build a goal-linked plan for this?" },
  { keys: ['tax', 'regime', '80c'], reply: "Based on typical salaried income with home loan interest and 80C investments, the Old Regime usually wins once your deductions cross about Rs 3.5L/year. Without significant deductions, the New Regime's lower slabs tend to win. I would need your Form 16 details to give you an exact number — that is handled in the Tax Center in the full app." },
  { keys: ['afford', 'trip', 'travel', 'vacation'], reply: "Based on your current savings rate of about Rs 18,500/month and your existing goals, a Rs 60,000 trip is comfortably affordable within 4 months without touching your Emergency Fund. I would suggest setting up a dedicated Goal for it so it does not eat into other savings." },
  { keys: ['credit card', 'best card', 'reward'], reply: "Given your monthly spend pattern (groceries, dining, and online shopping being top categories), a card with strong cashback on those categories plus no/low annual fee would net you an estimated Rs 8,000-11,000/year in rewards. The full app compares live offers across issuers for this." },
  { keys: ['loan', 'emi', 'prepay'], reply: "On a Rs 10,00,000 loan at 9% for 5 years, your EMI works out to about Rs 20,760/month with total interest of about Rs 2,45,600. Prepaying even Rs 50,000 in year 1 can cut close to 4 months off your tenure and save meaningful interest." },
  { keys: ['insurance', 'cover', 'term'], reply: "A common rule of thumb is 10-15x your annual income in term cover. If your goals include dependents or a home loan, lean toward the higher end. Health cover is usually recommended at a minimum of Rs 10L per person in a metro city, ideally as a family floater." },
  { keys: ['goal', 'plan', 'retire'], reply: "You currently have 3 active goals totalling about Rs 4,18,000 saved toward Rs 8,70,000 in targets. At your current combined SIP of Rs 31,000/month, you are broadly on track — the Europe Trip goal is the one slightly behind pace and could use an extra Rs 2,000/month to stay on schedule." },
  { keys: ['hello', 'hi', 'hey'], reply: "Hey! I'm ArthaAI, your money assistant inside Trackpay. Ask me about your spending, savings, goals, taxes, or anything else — in the full app I read your real transaction history to answer these live." }
];
var CHAT_SUGGESTIONS = [
  'Where can I cut back?',
  'Build me a SIP plan',
  'Old vs new tax regime?',
  'Can I afford a Rs 60,000 trip?'
];

/* ------------------------------------------------------------------- state */
var state = {
  navStack: ['screen-home'],
  username: 'Ashutosh',
  showBalance: false,
  activeOpportunities: OPPORTUNITIES_INITIAL.slice(),
  historyOpportunities: [],
  notifTab: 'active',
  socialTab: 'friends',
  socialSearch: '',
  groups: GROUPS_INITIAL.slice(),
  showCreateGroup: false,
  newGroupName: '',
  newGroupMembers: [],
  goals: GOALS_INITIAL.map(function (g) { return Object.assign({}, g); }),
  currentGoalId: null,
  currentContact: null,
  currentAmount: 0,
  currentBillKey: null,
  currentFriendId: null,
  chatFriendMessages: {},
  selectedTag: null,
  lastSuccess: null,
  procTimer: null,
  qpMerchant: null,
  qpNudge: null,
  split: { mode: 'individual', desc: '', amount: '', selectedFriends: [], selectedGroup: null, excludedGroupMembers: [], selectedFamily: [] },
  wealth: { tab: 'overview', timeframe: '1Y' },
  chatMessages: [],
  history: {
    view: 'list', source: 'app', selectedTxId: null,
    filters: { type: 'all', category: 'all', time: 'all', account: 'all' },
    tempFilters: { type: 'all', category: 'all', time: 'all', account: 'all' },
    showCategorySelector: false, noteText: '', fetchingBill: false, pasteText: ''
  },
  profileFacts: [
    { key: 'f1', emoji: '🎯', text: 'Saving for a trip to Europe by mid-2027.' },
    { key: 'f2', emoji: '💼', text: 'Gets salary credited via NEFT on the 1st of every month.' },
    { key: 'f3', emoji: '⚠️', text: 'Prefers no-cost EMI over paying in full for purchases above Rs 20,000.' }
  ]
};

var BANK_BALANCE = 49484;

/* ----------------------------------------------------------- nav / status */
var HIDE_NAV_SCREENS = ['screen-send-amount', 'screen-send-pin', 'screen-send-processing', 'screen-send-success', 'screen-scan', 'screen-quickpay', 'screen-ai-chat', 'screen-payment-failed', 'screen-social-chat', 'screen-goal-new'];
var FORCE_WHITE_SCREENS = ['screen-send-pin', 'screen-scan'];
var NAV_ITEMS = [
  { label: 'Home', icon: 'home', screen: 'screen-home' },
  { label: 'Smart Save', icon: 'sparkles', screen: 'screen-smart-save' },
  { label: 'Bills', icon: 'receipt', screen: 'screen-bills' },
  { label: 'History', icon: 'history', screen: 'screen-history' }
];

var RENDER_ON_ENTER = {
  'screen-home': renderHome,
  'screen-notifications': renderNotifications,
  'screen-social': renderSocial,
  'screen-bills': renderBills,
  'screen-goals': renderGoals,
  'screen-wealth': renderWealth,
  'screen-smart-save': renderSmartSave,
  'screen-history': renderHistory,
  'screen-profile': renderProfile,
  'screen-ai-chat': function () {
    if (state.chatMessages.length === 0) resetChat();
    else { renderChatLog(); renderChatSuggestions(); }
  }
};

function navigate(id, opts) {
  opts = opts || {};
  var push = opts.push !== false;
  var target = document.getElementById(id);
  if (!target) return;
  qsa('.screen.active').forEach(function (s) { s.classList.remove('active'); });
  target.classList.add('active');
  if (push) state.navStack.push(id);
  var vp = qs('#viewport');
  if (vp) vp.scrollTop = 0;
  updateStatusBarTheme(id);
  updateBottomNav(id);
  if (RENDER_ON_ENTER[id]) RENDER_ON_ENTER[id]();
  refreshIcons();
}

function goBack() {
  if (state.navStack.length > 1) {
    state.navStack.pop();
    var prev = state.navStack[state.navStack.length - 1];
    navigate(prev, { push: false });
  } else {
    navigate('screen-home', { push: false });
  }
}

function updateStatusBarTheme(id) {
  var bar = qs('#status-bar');
  var indicator = qs('#home-indicator');
  var forceWhite = FORCE_WHITE_SCREENS.indexOf(id) !== -1;
  if (bar) bar.classList.toggle('force-white', forceWhite);
  if (indicator) indicator.classList.toggle('force-white', forceWhite);
}

function updateBottomNav(id) {
  var root = qs('#bottom-nav-root');
  if (!root) return;
  if (HIDE_NAV_SCREENS.indexOf(id) !== -1) { root.innerHTML = ''; return; }
  var activeIdx = -1;
  NAV_ITEMS.forEach(function (it, i) { if (it.screen === id) activeIdx = i; });
  var badge = state.activeOpportunities.length;
  var itemsHtml = NAV_ITEMS.map(function (it, i) {
    var active = i === activeIdx;
    return '<button onclick="TP.navigate(\'' + it.screen + '\')" class="flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-[1.8rem] transition-colors ' + (active ? 'bg-slate-100 dark:bg-neutral-800' : '') + '">' +
      '<i data-lucide="' + it.icon + '" style="width:20px;height:20px;" class="' + (active ? 'text-blue-600 dark:text-white' : 'text-slate-500 dark:text-neutral-400') + '"></i>' +
      '<span class="text-[9px] font-extrabold tracking-tight ' + (active ? 'text-blue-600 dark:text-white' : 'text-slate-500 dark:text-neutral-500') + '">' + it.label + '</span></button>';
  }).join('');
  root.innerHTML =
    '<div class="flex-1 max-w-[230px] bg-white/80 dark:bg-[#121212]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] h-[72px] p-2 shadow-2xl flex items-center">' +
      '<div class="w-full h-full flex items-center gap-1">' + itemsHtml + '</div></div>' +
    '<div class="flex flex-col items-center gap-2.5">' +
      '<button onclick="TP.navigate(\'screen-ai-chat\')" class="relative w-11 h-11 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-lg active:scale-95 transition">' +
        '<i data-lucide="message-square-text" style="width:19px;height:19px;"></i>' +
        (badge > 0 ? '<span class="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white dark:ring-[#121212]">' + (badge > 9 ? '9+' : badge) + '</span>' : '') +
      '</button>' +
      '<button onclick="TP.navigate(\'screen-scan\')" class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 active:scale-95 transition border border-white/20">' +
        '<i data-lucide="scan-line" style="width:26px;height:26px;"></i></button>' +
    '</div>';
  refreshIcons();
}

/* ---------------------------------------------------------------- SESSION */
function resetDemo() {
  toast('Resetting demo...');
  setTimeout(function () { location.reload(); }, 350);
}

/* ---------------------------------------------------------------- HOME */
function toggleBalance() {
  state.showBalance = !state.showBalance;
  qsa('.bal-eye-icon').forEach(function (icon) { icon.setAttribute('data-lucide', state.showBalance ? 'eye-off' : 'eye'); });
  qs('#bal-federal-hidden').classList.toggle('hidden', state.showBalance);
  qs('#bal-federal-shown').classList.toggle('hidden', !state.showBalance);
  qs('#bal-sbi-hidden').classList.toggle('hidden', state.showBalance);
  qs('#bal-sbi-shown').classList.toggle('hidden', !state.showBalance);
  refreshIcons();
}

function oppRowHtml(o) {
  return '<button onclick="TP.oppAction(\'' + o.id + '\')" class="w-full flex items-center gap-3 p-2.5 -mx-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition text-left">' +
    '<div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ' + o.wrap + '"><i data-lucide="' + o.icon + '" style="width:16px;height:16px;" class="' + o.color + '"></i></div>' +
    '<div class="flex-1 min-w-0"><div class="text-xs font-semibold text-slate-900 dark:text-white truncate">' + o.title + '</div></div>' +
    (o.amount != null ? '<span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">' + inr(o.amount) + '</span>' : '') +
  '</button>';
}

function renderHome() {
  var wrap = qs('#home-for-you');
  if (state.activeOpportunities.length === 0) {
    wrap.innerHTML = '<div class="text-center py-4 text-xs text-slate-400">All caught up — nothing new right now.</div>';
  } else {
    wrap.innerHTML = state.activeOpportunities.slice(0, 2).map(oppRowHtml).join('');
  }
  var badge = qs('#home-bell-badge');
  var count = state.activeOpportunities.length;
  badge.textContent = count > 9 ? '9+' : String(count);
  badge.classList.toggle('hidden', count === 0);

  var totalProgress = state.goals.reduce(function (s, g) { return s + g.progress; }, 0);
  var totalTarget = state.goals.reduce(function (s, g) { return s + g.target; }, 0);
  qs('#home-goals-summary').innerHTML = inr(totalProgress) + ' <span class="text-xs font-sans font-medium text-slate-500 dark:text-neutral-400">of ' + inr(totalTarget) + ' &middot; ' + state.goals.length + ' active</span>';
  refreshIcons();
}

/* ----------------------------------------------------------- NOTIFICATIONS */
function setNotifTab(tab) {
  state.notifTab = tab;
  qs('#notif-tab-active').className = 'flex-1 py-2 rounded-xl text-xs font-bold transition capitalize ' + (tab === 'active' ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-neutral-400');
  qs('#notif-tab-history').className = 'flex-1 py-2 rounded-xl text-xs font-bold transition capitalize ' + (tab === 'history' ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-neutral-400');
  renderNotifications();
}

function notifCardHtml(o, muted) {
  return '<div class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-4 shadow-sm ' + (muted ? 'opacity-60' : '') + '">' +
    '<div class="flex items-start gap-3">' +
      '<div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ' + o.wrap + '"><i data-lucide="' + o.icon + '" style="width:18px;height:18px;" class="' + o.color + '"></i></div>' +
      '<div class="flex-1 min-w-0"><div class="text-sm font-bold text-slate-900 dark:text-white">' + o.title + '</div>' +
        (o.amount != null ? '<div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">Impact: ' + inr(o.amount) + '</div>' : '') +
      '</div></div>' +
    (!muted ? '<div class="flex gap-2 mt-3">' +
      '<button onclick="TP.oppAction(\'' + o.id + '\')" class="flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">View</button>' +
      '<button onclick="TP.oppSnooze(\'' + o.id + '\')" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 text-xs font-bold">Snooze</button>' +
      '<button onclick="TP.oppDismiss(\'' + o.id + '\')" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-400 text-xs font-bold"><i data-lucide="x" style="width:14px;height:14px;"></i></button>' +
    '</div>' : '') +
  '</div>';
}

function renderNotifications() {
  var list = state.notifTab === 'active' ? state.activeOpportunities : state.historyOpportunities;
  var root = qs('#notif-list');
  if (list.length === 0) {
    root.innerHTML = '<div class="text-center py-16">' +
      '<div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-3"><i data-lucide="sparkles" style="width:24px;height:24px;" class="text-emerald-500"></i></div>' +
      '<p class="text-sm font-semibold text-slate-700 dark:text-neutral-300">' + (state.notifTab === 'active' ? 'All caught up' : 'Nothing here yet') + '</p>' +
      (state.notifTab === 'active' ? '<p class="text-xs text-slate-400 dark:text-neutral-500 mt-1">ArthaAI is watching your money 24x7</p>' : '') +
    '</div>';
  } else {
    root.innerHTML = list.map(function (o) { return notifCardHtml(o, state.notifTab === 'history'); }).join('');
  }
  refreshIcons();
}

function findOpp(id) {
  var idx = -1;
  state.activeOpportunities.forEach(function (o, i) { if (o.id === id) idx = i; });
  return idx;
}
function oppAction(id) {
  var idx = findOpp(id);
  if (idx === -1) return;
  var o = state.activeOpportunities[idx];
  if (o.billKey) { openBillDetails(o.billKey); return; }
  if (o.target) { navigate(o.target); return; }
  toast('Opens the relevant screen in the full app');
}
function oppDismiss(id) {
  var idx = findOpp(id);
  if (idx === -1) return;
  var o = state.activeOpportunities.splice(idx, 1)[0];
  state.historyOpportunities.unshift(o);
  toast('Dismissed');
  renderNotifications(); renderHome(); updateBottomNav(state.navStack[state.navStack.length - 1]);
}
function oppSnooze(id) {
  var idx = findOpp(id);
  if (idx === -1) return;
  var o = state.activeOpportunities.splice(idx, 1)[0];
  state.historyOpportunities.unshift(o);
  toast('Snoozed for a week');
  renderNotifications(); renderHome(); updateBottomNav(state.navStack[state.navStack.length - 1]);
}

/* ----------------------------------------------------------------- BILLS */
function renderBills() {
  var suggested = BILL_CATEGORIES.slice(0, 4);
  qs('#bills-suggested').innerHTML = '<div class="grid grid-cols-4 gap-4">' + suggested.map(function (c) {
    return '<div onclick="TP.openBillDetails(\'' + c.key + '\')" class="flex flex-col items-center gap-2 cursor-pointer group">' +
      '<div class="w-12 h-12 rounded-2xl bg-slate-100/50 dark:bg-neutral-800/50 backdrop-blur-md flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-neutral-700 transition border border-white/30 dark:border-white/5"><i data-lucide="' + c.icon + '" style="width:24px;height:24px;" class="' + c.color + '"></i></div>' +
      '<span class="text-[10px] font-medium text-center text-slate-600 dark:text-neutral-300 leading-tight">' + c.label + '</span></div>';
  }).join('') + '</div>';

  qs('#bills-all').innerHTML = BILL_CATEGORIES.map(function (c) {
    return '<div onclick="TP.openBillDetails(\'' + c.key + '\')" class="flex flex-col items-center gap-2 cursor-pointer group">' +
      '<div class="w-14 h-14 rounded-full border border-slate-300/50 dark:border-neutral-700/50 flex items-center justify-center group-hover:border-blue-400 transition bg-white/20 dark:bg-black/20 backdrop-blur-sm"><i data-lucide="' + c.icon + '" style="width:24px;height:24px;" class="text-slate-700 dark:text-white"></i></div>' +
      '<span class="text-[11px] font-medium text-center text-slate-500 dark:text-neutral-400">' + c.label + '</span></div>';
  }).join('') + '<div onclick="TP.toast(\'That is the full list of demo categories\')" class="flex flex-col items-center gap-2 cursor-pointer group">' +
    '<div class="w-14 h-14 rounded-full border border-slate-300/50 dark:border-neutral-700/50 flex items-center justify-center group-hover:border-blue-400 transition bg-white/20 dark:bg-black/20 backdrop-blur-sm"><i data-lucide="globe" style="width:24px;height:24px;" class="text-slate-700 dark:text-white"></i></div>' +
    '<span class="text-[11px] font-medium text-center text-slate-500 dark:text-neutral-400">More</span></div>';
  refreshIcons();
}

function openBillDetails(key) {
  var cat = null;
  BILL_CATEGORIES.forEach(function (c) { if (c.key === key) cat = c; });
  if (!cat) cat = BILL_CATEGORIES[0];
  var det = BILL_DETAILS[key] || { pending: 500, lastMonth: 500, diff: 0, billers: [] };
  state.currentBillKey = key;

  qs('#bd-title').textContent = cat.label;
  qs('#bd-icon-wrap').className = 'w-20 h-20 rounded-3xl flex items-center justify-center mb-4 shadow-lg ' + cat.bg;
  var iconEl = qs('#bd-icon');
  iconEl.setAttribute('data-lucide', cat.icon);
  iconEl.setAttribute('class', cat.color);
  qs('#bd-amount').textContent = inr(det.pending);
  qs('#bd-diff').textContent = det.diff > 0 ? (det.diff + '% higher than last month') : (det.diff < 0 ? (Math.abs(det.diff) + '% lower than last month') : 'Same as last month');
  qs('#bd-lastmonth').textContent = 'Last month bill: ' + inr(det.lastMonth);
  qs('#bd-billers').innerHTML = det.billers.map(function (b, i) {
    return '<div onclick="TP.linkBiller(' + i + ')" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-neutral-800/50 border border-slate-100 dark:border-neutral-800 hover:border-blue-500 transition cursor-pointer group">' +
      '<div class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition">' + b.code + '</div>' +
      '<div class="flex-1"><div class="text-sm font-bold">' + b.name + '</div><div class="text-xs text-slate-500">' + b.sub + '</div></div></div>';
  }).join('') + '<button onclick="TP.toast(\'Adding a new biller is available in the full app\')" class="w-full py-3 text-center text-blue-600 dark:text-blue-400 text-sm font-bold mt-2">+ Add New Biller</button>';
  navigate('screen-bill-details');
}
function linkBiller(idx) {
  var det = BILL_DETAILS[state.currentBillKey];
  var b = det && det.billers[idx];
  toast(b ? (b.name + ' linked (demo)') : 'Linked (demo)');
}
function payBillNow() {
  var cat = null;
  BILL_CATEGORIES.forEach(function (c) { if (c.key === state.currentBillKey) cat = c; });
  var det = BILL_DETAILS[state.currentBillKey] || { pending: 0 };
  showSuccess({ name: cat ? cat.label : 'Bill', number: '' }, det.pending);
  navigate('screen-send-success');
}

/* ------------------------------------------------------------- SPLIT BILL */
function friendById(id) { var f = null; FRIENDS.forEach(function (x) { if (x.id === id) f = x; }); return f; }
function groupById(id) { var g = null; state.groups.forEach(function (x) { if (x.id === id) g = x; }); return g; }

function openSplitBill(prefill) {
  state.split = { mode: 'individual', desc: '', amount: '', selectedFriends: [], selectedGroup: null, excludedGroupMembers: [], selectedFamily: [] };
  if (prefill) { state.split.desc = prefill.title || ''; state.split.amount = String(prefill.amount || ''); }
  renderSplit();
  navigate('screen-split-bill');
}
function setSplitDesc(v) { state.split.desc = v; }
function setSplitAmount(v) { state.split.amount = v; updateSplitSummary(); }

function getSplitParticipants() {
  var s = state.split;
  if (s.mode === 'individual') {
    return s.selectedFriends.map(function (id) { var f = friendById(id); return { name: f.name, color: f.color }; });
  }
  if (s.mode === 'group') {
    var g = s.selectedGroup ? groupById(s.selectedGroup) : null;
    if (!g) return [];
    return g.members.filter(function (id) { return s.excludedGroupMembers.indexOf(id) === -1; }).map(function (id) { var f = friendById(id); return { name: f ? f.name : 'Member', color: f ? f.color : 'bg-slate-100 text-slate-600' }; });
  }
  if (s.mode === 'family') {
    return s.selectedFamily.map(function (id) { var m = null; FAMILY_MEMBERS.forEach(function (x) { if (x.id === id) m = x; }); return { name: m ? m.name : 'Member', color: 'bg-rose-100 text-rose-600' }; });
  }
  return [];
}

function setSplitMode(mode) {
  state.split.mode = mode;
  qsa('.split-mode-btn').forEach(function (btn) {
    var active = btn.getAttribute('data-mode') === mode;
    btn.className = 'split-mode-btn flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ' + (active ? 'bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-neutral-500');
  });
  refreshSplitParticipants();
  updateSplitSummary();
}
function toggleSplitFriend(id) {
  var arr = state.split.selectedFriends;
  var i = arr.indexOf(id);
  if (i === -1) arr.push(id); else arr.splice(i, 1);
  refreshSplitParticipants(); updateSplitSummary();
}
function selectSplitGroup(id) {
  state.split.selectedGroup = id; state.split.excludedGroupMembers = [];
  refreshSplitParticipants(); updateSplitSummary();
}
function clearSplitGroup() {
  state.split.selectedGroup = null;
  refreshSplitParticipants(); updateSplitSummary();
}
function toggleGroupMember(id) {
  var arr = state.split.excludedGroupMembers;
  var i = arr.indexOf(id);
  if (i === -1) arr.push(id); else arr.splice(i, 1);
  refreshSplitParticipants(); updateSplitSummary();
}
function toggleSplitFamily(id) {
  var arr = state.split.selectedFamily;
  var i = arr.indexOf(id);
  if (i === -1) arr.push(id); else arr.splice(i, 1);
  refreshSplitParticipants(); updateSplitSummary();
}

function participantRowHtml(name, color, subtitle, selected, onclick) {
  return '<div onclick="' + onclick + '" class="flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ' + (selected ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-neutral-900 border-transparent hover:border-slate-200') + '">' +
    '<div class="flex items-center gap-4"><div class="w-10 h-10 rounded-full flex items-center justify-center font-bold ' + color + '">' + name.charAt(0) + '</div>' +
    '<div><div class="text-sm font-bold text-slate-900 dark:text-white">' + name + '</div>' + (subtitle ? '<div class="text-[10px] text-slate-500">' + subtitle + '</div>' : '') + '</div></div>' +
    (selected ? '<div class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"><i data-lucide="check" style="width:14px;height:14px;" class="text-white"></i></div>' : '<div class="w-6 h-6 rounded-full border-2 border-slate-200"></div>') +
  '</div>';
}

function refreshSplitParticipants() {
  var s = state.split;
  var el = qs('#split-participants');
  if (!el) return;
  var html = '';
  if (s.mode === 'individual') {
    html += FRIENDS.map(function (f) { return participantRowHtml(f.name, f.color, f.upi, s.selectedFriends.indexOf(f.id) !== -1, "TP.toggleSplitFriend('" + f.id + "')"); }).join('');
  } else if (s.mode === 'group') {
    if (!s.selectedGroup) {
      html += '<h3 class="text-xs font-bold text-slate-400 uppercase mb-1 px-2">Pick a group</h3>' + state.groups.map(function (g) {
        return '<div onclick="TP.selectSplitGroup(\'' + g.id + '\')" class="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-transparent hover:border-indigo-200 cursor-pointer transition mb-2">' +
          '<div class="w-11 h-11 rounded-2xl flex items-center justify-center font-bold ' + g.color + '"><i data-lucide="users" style="width:20px;height:20px;"></i></div>' +
          '<div><div class="text-sm font-bold">' + g.name + '</div><div class="text-[10px] text-slate-500">' + g.members.length + ' members</div></div></div>';
      }).join('');
    } else {
      var g = groupById(s.selectedGroup);
      html += '<div class="flex items-center justify-between mb-3 px-2"><h3 class="text-xs font-bold text-slate-400 uppercase">' + g.name + ' &middot; everyone below</h3><button onclick="TP.clearSplitGroup()" class="text-[10px] font-bold text-indigo-600">Change</button></div>';
      html += g.members.map(function (id) {
        var f = friendById(id);
        var included = s.excludedGroupMembers.indexOf(id) === -1;
        return participantRowHtml(f ? f.name : 'Member', f ? f.color : 'bg-slate-100 text-slate-600', f ? f.upi : '', included, "TP.toggleGroupMember('" + id + "')");
      }).join('');
    }
  } else if (s.mode === 'family') {
    html += FAMILY_MEMBERS.map(function (m) { return participantRowHtml(m.name, 'bg-rose-100 text-rose-600', m.status === 'pending' ? 'Invite pending' : undefined, s.selectedFamily.indexOf(m.id) !== -1, "TP.toggleSplitFamily('" + m.id + "')"); }).join('');
  }
  el.innerHTML = html || '<div class="text-center py-8 px-4 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800"><p class="text-xs text-slate-400">Nothing to show here.</p></div>';
  refreshIcons();
}

function updateSplitSummary() {
  var s = state.split;
  var total = Number(s.amount) || 0;
  var participants = getSplitParticipants();
  var totalPeople = participants.length + 1;
  var share = totalPeople > 0 ? total / totalPeople : 0;
  var summaryEl = qs('#split-summary');
  if (summaryEl) {
    if (total > 0) {
      summaryEl.innerHTML = '<div class="flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">' +
        '<div class="text-left"><div class="text-[10px] font-bold text-slate-400 uppercase">Share per person (' + totalPeople + ')</div><div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">' + inr(share) + '</div></div>' +
        '<div class="flex -space-x-3"><div class="w-10 h-10 rounded-full bg-slate-200 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-xs font-bold">ME</div>' +
        participants.slice(0, 4).map(function (p) { return '<div class="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center text-xs font-bold ' + p.color + '">' + p.name.charAt(0) + '</div>'; }).join('') +
        '</div></div>';
    } else { summaryEl.innerHTML = ''; }
  }
  var btn = qs('#split-submit-btn');
  if (btn) {
    var canSubmit = s.desc.trim() && total > 0 && participants.length > 0;
    btn.disabled = !canSubmit;
    btn.className = 'w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 ' + (canSubmit ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-300 dark:bg-neutral-700 cursor-not-allowed');
    btn.textContent = 'Request ' + inr(share) + ' from ' + participants.length + ' ' + (participants.length === 1 ? 'person' : 'people');
  }
  refreshIcons();
}

function renderSplit() {
  var s = state.split;
  var body = qs('#split-body');
  body.innerHTML =
    '<div class="bg-white dark:bg-neutral-900 rounded-[2rem] p-6 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-4">' +
      '<div><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">What was it for?</label>' +
      '<input id="split-desc-input" oninput="TP.setSplitDesc(this.value)" type="text" placeholder="e.g. Dinner at Toit" value="' + s.desc.replace(/"/g, '&quot;') + '" class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500" /></div>' +
      '<div><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Total Amount</label>' +
      '<div class="flex items-center bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl px-4"><span class="text-2xl font-black text-slate-400 mr-1">Rs</span>' +
      '<input id="split-amount-input" oninput="TP.setSplitAmount(this.value)" type="number" placeholder="0" value="' + s.amount + '" class="w-full bg-transparent py-3 text-2xl font-black focus:outline-none" /></div></div>' +
      '<div id="split-summary"></div>' +
    '</div>' +
    '<div class="flex bg-slate-100/70 dark:bg-neutral-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">' +
      '<button data-mode="individual" onclick="TP.setSplitMode(\'individual\')" class="split-mode-btn flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400"><i data-lucide="user" style="width:13px;height:13px;"></i> Individual</button>' +
      '<button data-mode="group" onclick="TP.setSplitMode(\'group\')" class="split-mode-btn flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-slate-500 dark:text-neutral-500"><i data-lucide="users" style="width:13px;height:13px;"></i> Group</button>' +
      '<button data-mode="family" onclick="TP.setSplitMode(\'family\')" class="split-mode-btn flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-slate-500 dark:text-neutral-500"><i data-lucide="heart" style="width:13px;height:13px;"></i> Family</button>' +
    '</div>' +
    '<div id="split-participants" class="space-y-2"></div>' +
    '<div class="flex items-start gap-3 bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">' +
      '<i data-lucide="info" style="width:16px;height:16px;" class="text-indigo-500 shrink-0 mt-0.5"></i>' +
      '<p class="text-[11px] text-indigo-700 dark:text-indigo-400 leading-relaxed">You are recorded as having paid the full amount. Everyone else gets requested for their equal share.</p></div>' +
    '<button id="split-submit-btn" onclick="TP.submitSplit()" disabled class="w-full py-4 rounded-2xl font-bold text-white bg-slate-300 dark:bg-neutral-700 cursor-not-allowed transition-all active:scale-95">Request</button>';
  refreshSplitParticipants();
  updateSplitSummary();
}

function submitSplit() {
  var s = state.split;
  var participants = getSplitParticipants();
  var total = Number(s.amount) || 0;
  var share = total / (participants.length + 1);
  qs('#split-body').innerHTML = '<div class="flex flex-col items-center justify-center text-center py-16">' +
    '<div class="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"><i data-lucide="check" style="width:36px;height:36px;stroke-width:3;" class="text-white"></i></div>' +
    '<h1 class="text-xl font-bold text-slate-900 dark:text-white mb-1">Expense split!</h1>' +
    '<p class="text-slate-500 dark:text-neutral-400 text-sm">' + inr(share) + ' requested from ' + participants.length + ' ' + (participants.length === 1 ? 'person' : 'people') + '.</p></div>';
  refreshIcons();
  setTimeout(function () { navigate('screen-social', { push: false }); }, 1500);
}

/* ---------------------------------------------------------------- SOCIAL */
function setSocialTab(tab) {
  state.socialTab = tab;
  qs('#social-tab-friends').className = 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ' + (tab === 'friends' ? 'bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-neutral-500');
  qs('#social-tab-groups').className = 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ' + (tab === 'groups' ? 'bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-neutral-500');
  renderSocial();
}

function renderSocial() {
  var search = (qs('#social-search') ? qs('#social-search').value : state.socialSearch || '').toLowerCase();
  state.socialSearch = search;
  var content = qs('#social-content');
  if (state.socialTab === 'friends') {
    var friends = FRIENDS.filter(function (f) { return f.name.toLowerCase().indexOf(search) !== -1; });
    content.innerHTML = '<div class="space-y-3">' + friends.map(function (f) {
      var balanceHtml = f.balance !== 0
        ? '<div class="text-xs font-black ' + (f.balance > 0 ? 'text-emerald-500' : 'text-rose-500') + '">' + (f.balance > 0 ? 'Receivable' : 'Payable') + '<div class="text-base">' + inr(Math.abs(f.balance)) + '</div></div>'
        : '<span class="text-[10px] font-bold text-slate-400 uppercase">Settled</span>';
      return '<div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-3xl p-4 shadow-sm hover:bg-white/60 dark:hover:bg-neutral-800/60 transition group cursor-pointer" onclick="TP.openFriendChat(\'' + f.id + '\')">' +
        '<div class="flex items-center justify-between mb-4"><div class="flex items-center gap-4">' +
          '<div class="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ' + f.color + ' shadow-sm group-hover:scale-105 transition-transform">' + f.name.charAt(0) + '</div>' +
          '<div><div class="font-bold text-slate-900 dark:text-white">' + f.name + '</div><div class="text-[10px] text-slate-500 dark:text-neutral-500 font-medium tracking-wide uppercase">UPI: ' + f.upi + '</div></div>' +
        '</div><div class="text-right">' + balanceHtml + '</div></div>' +
        '<div class="flex gap-2">' +
          '<button onclick="event.stopPropagation();TP.openFriendChat(\'' + f.id + '\')" class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100/50 dark:bg-white/5 text-slate-600 dark:text-neutral-400 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition"><i data-lucide="message-circle" style="width:14px;height:14px;"></i> Chat</button>' +
          '<button onclick="event.stopPropagation();TP.openSendAmountForFriend(\'' + f.id + '\')" class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100/50 dark:bg-white/5 text-slate-600 dark:text-neutral-400 text-xs font-bold hover:bg-emerald-50 hover:text-emerald-600 transition"><i data-lucide="send" style="width:14px;height:14px;"></i> Pay</button>' +
          '<button onclick="event.stopPropagation();TP.toast(\'Request sent (demo)\')" class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100/50 dark:bg-white/5 text-slate-600 dark:text-neutral-400 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition"><i data-lucide="arrow-down-left" style="width:14px;height:14px;"></i> Request</button>' +
        '</div></div>';
    }).join('') + '</div>';
  } else {
    var groups = state.groups.filter(function (g) { return g.name.toLowerCase().indexOf(search) !== -1; });
    var createHtml = state.showCreateGroup
      ? '<div class="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4">' +
          '<div class="flex items-center justify-between"><h3 class="font-bold text-sm">New Group</h3><button onclick="TP.toggleCreateGroup(false)" class="p-1 text-slate-400 hover:text-slate-600"><i data-lucide="x" style="width:18px;height:18px;"></i></button></div>' +
          '<input id="new-group-name" oninput="TP.setNewGroupName(this.value)" type="text" placeholder="Group name, e.g. Goa Trip" value="' + state.newGroupName.replace(/"/g, '&quot;') + '" class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500" />' +
          '<div><div class="text-[10px] font-bold text-slate-400 uppercase mb-2">Members</div><div id="new-group-members" class="space-y-2 max-h-40 overflow-y-auto"></div></div>' +
          '<button id="create-group-btn" onclick="TP.createGroup()" disabled class="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm opacity-50">Create Group</button>' +
        '</div>'
      : '<button onclick="TP.toggleCreateGroup(true)" class="w-full flex items-center gap-4 p-4 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all">' +
          '<div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><i data-lucide="plus" style="width:24px;height:24px;"></i></div>' +
          '<div class="text-left"><div class="font-black text-sm">Create New Group</div><div class="text-[10px] text-white/70 font-bold uppercase tracking-widest">Split expenses easily</div></div></button>';
    var groupsHtml = groups.map(function (g) {
      return '<div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-3xl p-5 shadow-sm hover:bg-white/60 transition group cursor-pointer" onclick="TP.openSplitBillForGroup(\'' + g.id + '\')">' +
        '<div class="flex items-center justify-between"><div class="flex items-center gap-4">' +
          '<div class="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ' + g.color + ' shadow-sm group-hover:scale-110 transition-transform"><i data-lucide="users" style="width:28px;height:28px;"></i></div>' +
          '<div><div class="font-black text-slate-900 dark:text-white text-lg">' + g.name + '</div><div class="text-[10px] text-slate-500 dark:text-neutral-500 font-bold uppercase tracking-wider">' + g.members.length + ' Members &middot; Active</div></div>' +
        '</div><div class="text-right"><div class="text-sm font-black ' + (g.totalOwed > 0 ? 'text-emerald-500' : 'text-rose-500') + '">' + (g.totalOwed > 0 ? 'Group owes you' : 'You owe Group') + '<div class="text-xl">' + inr(Math.abs(g.totalOwed)) + '</div></div></div></div>' +
        '<button class="w-full mt-4 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition">View Details &amp; Settle</button></div>';
    }).join('');
    content.innerHTML = '<div class="space-y-4">' + createHtml + '<div class="space-y-3">' + groupsHtml + '</div></div>';
  }
  refreshIcons();
  if (state.showCreateGroup) refreshNewGroupMembers();
}

function toggleCreateGroup(show) {
  state.showCreateGroup = show;
  if (!show) { state.newGroupName = ''; state.newGroupMembers = []; }
  renderSocial();
}
function setNewGroupName(v) { state.newGroupName = v; }
function toggleNewGroupMember(id) {
  var arr = state.newGroupMembers;
  var i = arr.indexOf(id);
  if (i === -1) arr.push(id); else arr.splice(i, 1);
  refreshNewGroupMembers();
}
function refreshNewGroupMembers() {
  var el = qs('#new-group-members');
  if (!el) return;
  el.innerHTML = FRIENDS.map(function (f) {
    var selected = state.newGroupMembers.indexOf(f.id) !== -1;
    return '<div onclick="TP.toggleNewGroupMember(\'' + f.id + '\')" class="flex items-center justify-between p-2.5 rounded-xl cursor-pointer border ' + (selected ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'border-transparent hover:bg-slate-50 dark:hover:bg-neutral-800') + '">' +
      '<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ' + f.color + '">' + f.name.charAt(0) + '</div><span class="text-xs font-bold">' + f.name + '</span></div>' +
      (selected ? '<i data-lucide="check" style="width:14px;height:14px;" class="text-indigo-600"></i>' : '') + '</div>';
  }).join('');
  var btn = qs('#create-group-btn');
  if (btn) {
    var can = state.newGroupName.trim() && state.newGroupMembers.length > 0;
    btn.disabled = !can;
    btn.className = 'w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm ' + (can ? '' : 'opacity-50');
  }
  refreshIcons();
}
function createGroup() {
  if (!state.newGroupName.trim() || state.newGroupMembers.length === 0) return;
  var colors = ['bg-indigo-100 text-indigo-600', 'bg-rose-100 text-rose-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600'];
  state.groups.push({ id: 'g' + (state.groups.length + 1) + '_' + Date.now(), name: state.newGroupName.trim(), color: colors[state.groups.length % colors.length], members: state.newGroupMembers.slice(), totalOwed: 0 });
  state.showCreateGroup = false; state.newGroupName = ''; state.newGroupMembers = [];
  toast('Group created');
  renderSocial();
}
function openSplitBillForGroup(id) {
  var g = groupById(id);
  state.split = { mode: 'group', desc: '', amount: '', selectedFriends: [], selectedGroup: id, excludedGroupMembers: [], selectedFamily: [] };
  renderSplit();
  navigate('screen-split-bill');
}

/* ------------------------------------------------------------ FRIEND CHAT */
var CHAT_SEED = [
  { from: 'them', text: 'Hey! Settling up for dinner last week?' },
  { from: 'me', text: 'Yes, sending it now' },
  { from: 'them', text: 'No rush, whenever works!' }
];
function openFriendChat(id) {
  state.currentFriendId = id;
  var f = friendById(id);
  qs('#chat-friend-name').textContent = f.name;
  var av = qs('#chat-friend-avatar');
  av.className = 'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ' + f.color;
  av.textContent = f.name.charAt(0);
  if (!state.chatFriendMessages[id]) state.chatFriendMessages[id] = CHAT_SEED.slice();
  renderFriendChatLog();
  navigate('screen-social-chat');
}
function renderFriendChatLog() {
  var msgs = state.chatFriendMessages[state.currentFriendId] || [];
  qs('#chat-messages').innerHTML = msgs.map(function (m) {
    return m.from === 'me'
      ? '<div class="flex justify-end"><div class="bg-indigo-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[75%]">' + m.text + '</div></div>'
      : '<div class="flex justify-start"><div class="bg-white dark:bg-neutral-800 text-slate-900 dark:text-white text-sm px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[75%] shadow-sm">' + m.text + '</div></div>';
  }).join('');
  var log = qs('#chat-messages'); log.scrollTop = log.scrollHeight;
}
var FRIEND_REPLIES = ['Sounds good!', 'Got it, thanks!', 'Perfect 👍', 'Cool, see you soon.'];
function sendFriendMessage() {
  var input = qs('#chat-input');
  var text = input.value.trim();
  if (!text) return;
  var msgs = state.chatFriendMessages[state.currentFriendId];
  msgs.push({ from: 'me', text: text });
  input.value = '';
  renderFriendChatLog();
  setTimeout(function () {
    msgs.push({ from: 'them', text: FRIEND_REPLIES[Math.floor(Math.random() * FRIEND_REPLIES.length)] });
    renderFriendChatLog();
  }, 700);
}
function payFriendFromChat() {
  var f = friendById(state.currentFriendId);
  openSendAmountForFriend(f.id);
}
function openSendAmountForFriend(friendId) {
  var f = friendById(friendId);
  var contact = { name: f.name, number: '98' + String(1000000 + Math.floor(Math.random() * 8999999)).slice(0, 8), color: f.color };
  openSendAmountWithContact(contact);
}

/* ---------------------------------------------------------- SEND MONEY */
function openSendContact() { navigate('screen-send-contact'); renderContacts(); }
function renderContacts() {
  var term = (qs('#contact-search').value || '').toLowerCase();
  var list = CONTACTS.filter(function (c) { return c.name.toLowerCase().indexOf(term) !== -1 || c.number.indexOf(term) !== -1; });
  qs('#contact-list').innerHTML = list.map(function (c) {
    return '<div onclick="TP.openSendAmount(\'' + c.id + '\')" class="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-neutral-900 transition cursor-pointer active:scale-[0.99]">' +
      '<div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ' + c.color + '">' + c.name.charAt(0) + '</div>' +
      '<div class="flex-1 border-b border-slate-100 dark:border-neutral-800/50 pb-3"><div class="font-bold text-slate-900 dark:text-white">' + c.name + '</div><div class="text-xs text-slate-500 dark:text-neutral-500 mt-0.5">' + c.number + '</div></div></div>';
  }).join('');
}
function openSendAmount(contactId) {
  var c = null; CONTACTS.forEach(function (x) { if (x.id === contactId) c = x; });
  if (!c) return;
  openSendAmountWithContact(c);
}
function openSendAmountWithContact(c) {
  state.currentContact = c;
  qs('#sa-avatar').className = 'w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-3xl shadow-lg ' + c.color;
  qs('#sa-avatar').textContent = c.name.charAt(0);
  qs('#sa-name').textContent = 'Paying ' + c.name;
  qs('#sa-number').textContent = c.number ? ('+91 ' + c.number) : '';
  qs('#sa-banking-name').textContent = 'Banking Name: ' + c.name.toUpperCase();
  qs('#sa-amount').value = '';
  onAmountInput();
  navigate('screen-send-amount');
  setTimeout(function () { qs('#sa-amount').focus(); }, 250);
}
function onAmountInput() {
  var val = qs('#sa-amount').value;
  var num = Number(val);
  var low = val !== '' && num > BANK_BALANCE;
  qs('#sa-low-balance').classList.toggle('hidden', !low);
  var btn = qs('#sa-pay-btn');
  if (!val) {
    btn.className = 'w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 bg-slate-200 dark:bg-neutral-800 text-slate-400 dark:text-neutral-600';
    btn.textContent = 'Pay Rs 0';
  } else if (low) {
    btn.className = 'w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 bg-red-500 text-white shadow-red-500/30';
    btn.textContent = 'Proceed with ' + inr(num);
  } else {
    btn.className = 'w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 bg-blue-600 text-white shadow-blue-500/30';
    btn.textContent = 'Pay ' + inr(num);
  }
}
function proceedFromAmount() {
  var val = qs('#sa-amount').value;
  if (!val || Number(val) <= 0) return;
  state.currentAmount = Number(val);
  qs('#pin-bank').textContent = 'FEDERAL BANK';
  qs('#pin-mask').textContent = 'XX2597';
  qs('#pin-name').textContent = state.currentContact.name;
  qs('#pin-amount').textContent = inr(state.currentAmount);
  renderPin();
  navigate('screen-send-pin');
}

var pinValue = '';
function renderPin() {
  pinValue = '';
  updatePinDots();
  var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var html = keys.map(function (n) { return '<button onclick="TP.pinDigit(' + n + ')" class="h-16 flex items-center justify-center text-2xl font-medium rounded-full hover:bg-white/10 active:bg-white/20 transition-colors">' + n + '</button>'; }).join('');
  html += '<button onclick="TP.pinDelete()" class="h-16 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"><i data-lucide="delete" style="width:28px;height:28px;"></i></button>';
  html += '<button onclick="TP.pinDigit(0)" class="h-16 flex items-center justify-center text-2xl font-medium rounded-full hover:bg-white/10 active:bg-white/20 transition-colors">0</button>';
  html += '<button id="pin-submit-btn" onclick="TP.submitPin()" disabled class="h-16 flex items-center justify-center rounded-full transition-all bg-neutral-800 text-neutral-500"><i data-lucide="arrow-left" style="width:28px;height:28px;transform:rotate(180deg);"></i></button>';
  qs('#pin-keypad').innerHTML = html;
  refreshIcons();
}
function updatePinDots() {
  var dotsHtml = '';
  for (var i = 0; i < 4; i++) {
    dotsHtml += '<div class="w-4 h-4 rounded-full transition-all duration-200 ' + (i < pinValue.length ? 'bg-white scale-110 shadow-[0_0_10px_white]' : 'bg-neutral-700') + '"></div>';
  }
  qs('#pin-dots').innerHTML = dotsHtml;
  var btn = qs('#pin-submit-btn');
  if (btn) {
    var ready = pinValue.length === 4;
    btn.disabled = !ready;
    btn.className = 'h-16 flex items-center justify-center rounded-full transition-all ' + (ready ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 active:scale-95' : 'bg-neutral-800 text-neutral-500');
  }
}
function pinDigit(n) { if (pinValue.length < 4) { pinValue += String(n); updatePinDots(); } }
function pinDelete() { pinValue = pinValue.slice(0, -1); updatePinDots(); }
function submitPin() {
  if (pinValue.length !== 4) return;
  navigate('screen-send-processing');
  startProcessing();
}

var PROC_STEPS = ['Payment request received', 'Amount debited from account', 'Receiver account fetched', 'Paid to receiver account'];
function startProcessing() {
  qs('#proc-subtitle').textContent = inr(state.currentAmount) + ' to ' + state.currentContact.name;
  var step = 0;
  renderProcSteps(step);
  if (state.procTimer) clearInterval(state.procTimer);
  var autoFail = state.currentAmount === 999;
  state.procTimer = setInterval(function () {
    step++;
    renderProcSteps(step);
    if (autoFail && step === 2) {
      clearInterval(state.procTimer);
      setTimeout(function () { showFailure('Bank Policy Check Failed'); }, 900);
      return;
    }
    if (step >= PROC_STEPS.length) {
      clearInterval(state.procTimer);
      setTimeout(function () {
        showSuccess(state.currentContact, state.currentAmount);
        navigate('screen-send-success', { push: false });
      }, 450);
    }
  }, 1100);
}
function renderProcSteps(currentStep) {
  qs('#proc-steps').innerHTML = PROC_STEPS.map(function (label, i) {
    var completed = i < currentStep, current = i === currentStep;
    var iconHtml = completed
      ? '<i data-lucide="check-circle-2" style="width:24px;height:24px;" class="text-green-500"></i>'
      : current ? '<i data-lucide="loader-2" class="animate-spin" style="width:20px;height:20px;" class="text-blue-500"></i>' : '<div class="w-2 h-2 rounded-full bg-slate-200 dark:bg-neutral-700"></div>';
    var textClass = completed ? 'text-slate-900 dark:text-white' : current ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-neutral-600';
    return '<div class="flex items-center gap-4"><div class="w-6 h-6 flex items-center justify-center shrink-0">' + iconHtml + '</div><div class="text-sm font-medium ' + textClass + '">' + label + '</div></div>';
  }).join('');
  refreshIcons();
}
function simulateFailure() {
  var reasons = ['Internet Connection Lost', 'Payee Bank Server Timeout', 'UPI Network Congestion', 'Daily Transaction Limit Exceeded', 'Bank Server Unavailable'];
  if (state.procTimer) clearInterval(state.procTimer);
  showFailure(reasons[Math.floor(Math.random() * reasons.length)]);
}
function showFailure(reason) {
  qs('#fail-reason').textContent = reason;
  qs('#fail-amount').textContent = state.currentContact ? (inr(state.currentAmount) + ' to ' + state.currentContact.name) : '';
  navigate('screen-payment-failed', { push: false });
}

function showSuccess(contact, amount) {
  state.lastSuccess = { contact: contact, amount: amount };
  var remaining = BANK_BALANCE - amount;
  qs('#success-balance-left').textContent = inr(remaining);
  qs('#success-debit').textContent = '-' + inr(amount);
  qs('#success-to').textContent = 'to ' + contact.name;
  qs('#success-amount').textContent = inr(amount);
  var now = new Date();
  qs('#success-date').textContent = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  qs('#success-ref').textContent = 'UPI Transaction ID: ' + Math.floor(100000000000 + Math.random() * 900000000000);
  state.selectedTag = null;
  qs('#success-tag-msg').classList.add('hidden');
  qs('#success-tags').innerHTML = TAGS.map(function (t) {
    return '<button onclick="TP.selectTag(\'' + t.id + '\')" data-tag="' + t.id + '" class="flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400">' +
      '<i data-lucide="' + t.icon + '" style="width:14px;height:14px;"></i><span class="text-xs font-bold">' + t.label + '</span></button>';
  }).join('');
  refreshIcons();
}
function selectTag(id) {
  state.selectedTag = id;
  var tag = null; TAGS.forEach(function (t) { if (t.id === id) tag = t; });
  qsa('#success-tags [data-tag]').forEach(function (btn) {
    var active = btn.getAttribute('data-tag') === id;
    var t = null; TAGS.forEach(function (x) { if (x.id === btn.getAttribute('data-tag')) t = x; });
    btn.className = 'flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 ' + (active ? (t.bg + ' ' + t.color + ' border-current shadow-lg scale-105') : 'bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400');
  });
  var msg = qs('#success-tag-msg');
  msg.textContent = 'Saved as ' + tag.label;
  msg.classList.remove('hidden');
}
function openSplitFromSuccess() {
  if (!state.lastSuccess) { openSplitBill(); return; }
  openSplitBill({ title: 'Payment to ' + state.lastSuccess.contact.name, amount: state.lastSuccess.amount });
}

/* ------------------------------------------------------------- SCAN & PAY */
function initScanCamera() {
  var video = qs('#scan-video');
  var noCam = qs('#scan-no-camera');
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { noCam.classList.remove('hidden'); return; }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .catch(function () { return navigator.mediaDevices.getUserMedia({ video: true }); })
    .then(function (stream) {
      video.srcObject = stream;
      video.classList.remove('hidden');
      noCam.classList.add('hidden');
    })
    .catch(function () { noCam.classList.remove('hidden'); });
}
function renderScanMerchants() {
  qs('#scan-merchants').innerHTML = DEMO_MERCHANTS.map(function (m, i) {
    return '<button onclick="TP.smartScan(' + i + ')" class="flex flex-col items-center min-w-[56px] gap-1 shrink-0 group">' +
      '<div class="w-12 h-12 rounded-full ' + m.color + ' flex items-center justify-center text-2xl group-active:scale-90 transition shadow-md">' + m.emoji + '</div>' +
      '<span class="text-[10px] mt-1 truncate w-14 text-center text-gray-300">' + m.name.split(' ')[0] + '</span></button>';
  }).join('');
}
function smartScan(idx) {
  var m = DEMO_MERCHANTS[idx];
  state.qpMerchant = m;
  qs('#scan-detect-icon').className = 'w-20 h-20 rounded-2xl ' + m.color + ' flex items-center justify-center text-4xl shadow-2xl';
  qs('#scan-detect-icon').textContent = m.emoji;
  qs('#scan-detect-name').textContent = m.name;
  qs('#scan-detect-upi').textContent = m.upi;
  qs('#scan-detecting').classList.remove('hidden');
  setTimeout(function () {
    qs('#scan-detecting').classList.add('hidden');
    openQuickPay(m);
  }, 900);
}

/* --------------------------------------------------------------- QUICKPAY */
function openQuickPay(merchant) {
  state.qpMerchant = merchant || null;
  qs('#qp-entry').classList.remove('hidden');
  qs('#qp-success').classList.add('hidden');
  qs('#qp-amount').value = '';
  qs('#qp-nudge').classList.add('hidden');
  qs('#qp-giftcard-btn').classList.add('hidden');
  var normalBtn = qs('#qp-normal-btn');
  normalBtn.className = 'w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 bg-slate-200 dark:bg-neutral-800 text-slate-400 dark:text-neutral-600';
  normalBtn.textContent = 'Pay';
  var mWrap = qs('#qp-merchant');
  if (merchant) {
    qs('#qp-subtitle').textContent = 'Scanned — smart savings applied';
    mWrap.classList.remove('hidden');
    mWrap.innerHTML = '<div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ' + merchant.color + '">' + merchant.emoji + '</div>' +
      '<div class="text-center"><h2 class="text-lg font-bold">Paying ' + merchant.name + '</h2><p class="text-xs text-slate-400 dark:text-neutral-500 font-medium">' + merchant.upi + '</p>' +
      '<div class="inline-flex items-center gap-1 mt-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-bold"><i data-lucide="shield-check" style="width:11px;height:11px;"></i> Verified merchant QR</div></div>';
  } else {
    qs('#qp-subtitle').textContent = 'Smart savings before you pay';
    mWrap.classList.add('hidden');
    mWrap.innerHTML = '';
  }
  navigate('screen-quickpay');
  setTimeout(function () { qs('#qp-amount').focus(); }, 250);
  refreshIcons();
}
var qpDebounce = null;
function onQuickPayInput() {
  var amount = Number(qs('#qp-amount').value);
  clearTimeout(qpDebounce);
  if (!amount || amount < 100) {
    state.qpNudge = null;
    qs('#qp-nudge').classList.add('hidden');
    qs('#qp-giftcard-btn').classList.add('hidden');
    updateQuickPayNormalBtn(amount, null);
    return;
  }
  qpDebounce = setTimeout(function () {
    var discount = state.qpMerchant ? state.qpMerchant.discount : 10;
    var youPay = Math.round(amount * (1 - discount / 100));
    var youSave = amount - youPay;
    state.qpNudge = { discount: discount, original: amount, youPay: youPay, youSave: youSave };
    renderQuickPayNudge();
    updateQuickPayNormalBtn(amount, state.qpNudge);
  }, 220);
}
function renderQuickPayNudge() {
  var n = state.qpNudge;
  var headline = state.qpMerchant ? ('Pay via ' + state.qpMerchant.brand + ' gift card and save ' + n.discount + '%') : ('Save ' + n.discount + '% with a matching gift card');
  qs('#qp-nudge').classList.remove('hidden');
  qs('#qp-nudge').innerHTML = '<div class="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-neutral-900 border border-emerald-200/70 dark:border-emerald-900/50 p-5 shadow-lg shadow-emerald-500/5">' +
    '<div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-3"><i data-lucide="sparkles" style="width:13px;height:13px;"></i> Smart Pay Nudge</div>' +
    '<div class="flex items-start gap-3 mb-4"><div class="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0"><i data-lucide="gift" style="width:20px;height:20px;" class="text-emerald-600 dark:text-emerald-400"></i></div>' +
    '<div class="min-w-0"><div class="font-bold text-slate-900 dark:text-white text-sm leading-snug">' + headline + '</div><p class="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">Route this payment through a discounted gift card instead of paying directly.</p></div></div>' +
    '<div class="grid grid-cols-3 gap-2 bg-white/70 dark:bg-neutral-950/60 rounded-2xl p-3">' +
    '<div class="text-center"><div class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">You would pay</div><div class="text-sm font-bold text-slate-400 line-through mt-0.5">' + inr(n.original) + '</div></div>' +
    '<div class="text-center border-x border-slate-200 dark:border-neutral-800"><div class="text-[10px] text-emerald-500 uppercase tracking-wide font-bold">Cost via card</div><div class="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">' + inr(n.youPay) + '</div></div>' +
    '<div class="text-center"><div class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">You save</div><div class="text-base font-black text-slate-900 dark:text-white mt-0.5">' + inr(n.youSave) + '</div></div></div></div>';
  var giftBtn = qs('#qp-giftcard-btn');
  giftBtn.classList.remove('hidden');
  giftBtn.innerHTML = 'Pay ' + inr(n.youPay) + ' with gift card <span class="text-[11px] font-extrabold bg-white/20 rounded-full px-2 py-0.5 ml-2">save ' + inr(n.youSave) + '</span>';
  refreshIcons();
}
function updateQuickPayNormalBtn(amount, nudge) {
  var btn = qs('#qp-normal-btn');
  if (!amount || amount <= 0) {
    btn.disabled = true;
    btn.className = 'w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 bg-slate-200 dark:bg-neutral-800 text-slate-400 dark:text-neutral-600 cursor-not-allowed';
    btn.textContent = 'Pay';
    return;
  }
  btn.disabled = false;
  if (nudge) {
    btn.className = 'w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300';
    btn.textContent = 'Pay ' + inr(amount) + ' normally';
  } else {
    btn.className = 'w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-500';
    btn.textContent = 'Pay ' + inr(amount);
  }
}
function payQuickPayNormal() {
  var amount = Number(qs('#qp-amount').value);
  if (!amount || amount <= 0) return;
  showQuickPaySuccess(amount, 0, false);
}
function payQuickPayGiftCard() {
  if (!state.qpNudge) return;
  showQuickPaySuccess(state.qpNudge.youPay, state.qpNudge.youSave, true);
}
function showQuickPaySuccess(paidAmount, saved, viaGiftCard) {
  qs('#qp-entry').classList.add('hidden');
  qs('#qp-success').classList.remove('hidden');
  qs('#qp-success-title').textContent = 'Paid ' + inr(paidAmount);
  if (viaGiftCard) {
    qs('#qp-success-sub').innerHTML = '<span class="text-emerald-600 dark:text-emerald-400 font-bold text-lg block mb-1">You saved ' + inr(saved) + ' 🎉</span>Paid via gift card instead of paying directly — an instant discount.';
  } else {
    var leftOnTable = state.qpNudge ? state.qpNudge.youSave : 0;
    qs('#qp-success-sub').textContent = leftOnTable > 0 ? ('Paid the full amount. You left ' + inr(leftOnTable) + ' of gift-card savings on the table.') : 'Payment complete.';
  }
  refreshIcons();
}
function resetQuickPay() {
  qs('#qp-entry').classList.remove('hidden');
  qs('#qp-success').classList.add('hidden');
  qs('#qp-amount').value = '';
  onQuickPayInput();
  setTimeout(function () { qs('#qp-amount').focus(); }, 200);
}

/* ------------------------------------------------------------------ GOALS */
function ringPath(percent, size, stroke) {
  var r = (size - stroke) / 2;
  var c = 2 * Math.PI * r;
  var offset = c - (Math.min(100, percent) / 100) * c;
  return { r: r, c: c, offset: offset };
}
function renderGoals() {
  var root = qs('#goals-list');
  if (state.goals.length === 0) {
    root.innerHTML = '<div class="text-center py-16"><div class="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4"><i data-lucide="target" style="width:28px;height:28px;" class="text-blue-600 dark:text-blue-400"></i></div>' +
      '<h2 class="font-bold text-lg mb-2">No goals yet</h2><p class="text-sm text-slate-500 dark:text-neutral-400 mb-6 max-w-xs mx-auto">Set a target and get a SIP plan built for you.</p>' +
      '<button onclick="TP.navigate(\'screen-goal-new\')" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-bold">Create your first goal</button></div>';
    refreshIcons();
    return;
  }
  root.innerHTML = state.goals.map(function (g) {
    var pct = Math.round((g.progress / g.target) * 100);
    var ring = ringPath(pct, 64, 6);
    return '<button onclick="TP.openGoalDetail(\'' + g.id + '\')" class="w-full text-left bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-white/10 p-5 shadow-lg flex items-center gap-4">' +
      '<svg width="64" height="64" viewBox="0 0 64 64" class="shrink-0"><circle cx="32" cy="32" r="' + ring.r + '" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-200 dark:text-neutral-800" />' +
      '<circle cx="32" cy="32" r="' + ring.r + '" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + ring.c + '" stroke-dashoffset="' + ring.offset + '" class="text-blue-600 dark:text-blue-400 -rotate-90 origin-center transition-all duration-700" />' +
      '<text x="32" y="36" text-anchor="middle" class="fill-slate-900 dark:fill-white text-[13px] font-bold">' + pct + '%</text></svg>' +
      '<div class="flex-1 min-w-0"><div class="flex items-center justify-between mb-1"><h3 class="font-bold text-sm truncate">' + g.name + '</h3></div>' +
      '<p class="text-xs text-slate-500 dark:text-neutral-400">' + inr(g.progress) + ' of ' + inr(g.target) + '</p>' +
      '<p class="text-[10px] text-slate-400 dark:text-neutral-500 mt-1">' + inr(g.sip) + '/mo &middot; by ' + new Date(g.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) + '</p></div></button>';
  }).join('');
  refreshIcons();
}
function createGoal() {
  var name = qs('#gn-name').value.trim();
  var target = Number(qs('#gn-target').value);
  var date = qs('#gn-date').value;
  if (!name || !target || !date) { toast('Fill in all fields'); return; }
  var months = Math.max(1, Math.round((new Date(date) - new Date()) / (1000 * 60 * 60 * 24 * 30)));
  var sip = Math.round(target / months);
  state.goals.push({ id: 'go' + Date.now(), name: name, target: target, progress: 0, sip: sip, date: date });
  toast('Goal created — SIP of ' + inr(sip) + '/mo suggested');
  qs('#gn-name').value = ''; qs('#gn-target').value = ''; qs('#gn-date').value = '';
  qs('#gn-preview').classList.add('hidden');
  navigate('screen-goals', { push: false });
}
function openGoalDetail(id) {
  state.currentGoalId = id;
  renderGoalDetail();
  navigate('screen-goal-detail');
}
function renderGoalDetail() {
  var g = null; state.goals.forEach(function (x) { if (x.id === state.currentGoalId) g = x; });
  if (!g) return;
  var pct = Math.min(100, Math.round((g.progress / g.target) * 100));
  var ring = ringPath(pct, 160, 14);
  qs('#gd-name').textContent = g.name;
  qs('#gd-ring').setAttribute('stroke-dasharray', ring.c);
  qs('#gd-ring').setAttribute('stroke-dashoffset', ring.offset);
  qs('#gd-pct').textContent = pct + '%';
  qs('#gd-progress').textContent = inr(g.progress) + ' of ' + inr(g.target);
  qs('#gd-sip').textContent = inr(g.sip) + '/mo &middot; target ' + new Date(g.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  qs('#gd-sip').innerHTML = inr(g.sip) + '/mo &middot; target ' + new Date(g.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
function addGoalMoney() {
  var g = null; state.goals.forEach(function (x) { if (x.id === state.currentGoalId) g = x; });
  if (!g) return;
  g.progress = Math.min(g.target, g.progress + 5000);
  renderGoalDetail();
  toast('Rs 5,000 added to your goal');
}

/* ---------------------------------------------------------- WEALTH MANAGEMENT */
var WEALTH_CHART_DATA = {
  '1M': [{ label: 'W1', value: 980000 }, { label: 'W2', value: 1010000 }, { label: 'W3', value: 1045000 }, { label: 'W4', value: 1085420 }],
  '6M': [{ label: 'Jan', value: 850000 }, { label: 'Feb', value: 890000 }, { label: 'Mar', value: 930000 }, { label: 'Apr', value: 980000 }, { label: 'May', value: 1030000 }, { label: 'Jun', value: 1085420 }],
  '1Y': [{ label: 'Jul', value: 700000 }, { label: 'Sep', value: 760000 }, { label: 'Nov', value: 830000 }, { label: 'Jan', value: 900000 }, { label: 'Mar', value: 970000 }, { label: 'May', value: 1040000 }, { label: 'Jun', value: 1085420 }],
  '3Y': [{ label: '2023', value: 420000 }, { label: '2024', value: 650000 }, { label: '2025', value: 850000 }, { label: '2026', value: 1085420 }],
  'ALL': [{ label: '2021', value: 120000 }, { label: '2022', value: 280000 }, { label: '2023', value: 420000 }, { label: '2024', value: 650000 }, { label: '2025', value: 850000 }, { label: '2026', value: 1085420 }]
};
var WEALTH_TIMEFRAMES = ['1M', '6M', '1Y', '3Y', 'ALL'];
var WEALTH_ALLOCATION = [
  { name: 'Mutual Funds', value: 420000, color: '#F59E0B' },
  { name: 'Bank Balance', value: 177934, color: '#10B981' },
  { name: 'EPF', value: 210000, color: '#8B5CF6' },
  { name: 'Fixed Deposits', value: 150000, color: '#A855F7' },
  { name: 'Direct Stocks', value: 127486, color: '#3B82F6' }
];
var WEALTH_SIPS = [
  { fund: 'HDFC Flexi Cap Fund', tag: 'Equity', date: '1st of month', amount: 8000, returns: '16.4%' },
  { fund: 'SBI Nifty 50 Index Fund', tag: 'Index', date: '5th of month', amount: 6000, returns: '13.1%' },
  { fund: 'ICICI Prudential Liquid Fund', tag: 'Debt', date: '10th of month', amount: 4000, returns: '6.8%' }
];
var WEALTH_STOCKS = [
  { symbol: 'BAJFINSV', name: 'Bajaj Finserv Ltd', shares: 12, avgPrice: 1850, ltp: 2054, total: 24648, change: '+11.0%' },
  { symbol: 'BAJAJHFL', name: 'Bajaj Housing Finance', shares: 60, avgPrice: 135, ltp: 158.4, total: 9504, change: '+17.3%' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', shares: 5, avgPrice: 3900, ltp: 4210, total: 21050, change: '+7.9%' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', shares: 43, avgPrice: 1600, ltp: 1681, total: 72283, change: '+5.1%' }
];
var WEALTH_TABS = [
  { id: 'overview', label: 'All Assets', icon: 'layers' },
  { id: 'sips', label: 'SIPs & MF', icon: 'target' },
  { id: 'stocks', label: 'Stocks', icon: 'trending-up' },
  { id: 'accounts', label: 'Bank & FDs', icon: 'landmark' }
];

function buildAreaChartSvg(data) {
  var w = 340, h = 150, padTop = 12, padBottom = 24;
  var values = data.map(function (d) { return d.value; });
  var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  var range = (max - min) || 1;
  var stepX = data.length > 1 ? w / (data.length - 1) : 0;
  var points = data.map(function (d, i) {
    var x = i * stepX;
    var y = padTop + (h - padTop - padBottom) * (1 - (d.value - min) / range);
    return { x: x, y: y };
  });
  var linePath = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
  var areaPath = linePath + ' L' + w + ',' + h + ' L0,' + h + ' Z';
  var labelsHtml = data.map(function (d, i) {
    return '<span style="position:absolute;left:' + (w ? (points[i].x / w * 100) : 0) + '%;transform:translateX(-50%);" class="text-[9px] text-indigo-200/70 font-medium">' + d.label + '</span>';
  }).join('');
  return '<div style="height:150px;">' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" class="w-full" style="height:126px;" preserveAspectRatio="none">' +
      '<defs><linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stop-color="#F59E0B" stop-opacity="0.45"/><stop offset="95%" stop-color="#F59E0B" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + areaPath + '" fill="url(#wealthGrad)" stroke="none"/>' +
      '<path d="' + linePath + '" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>' +
    '<div style="position:relative;height:20px;">' + labelsHtml + '</div>' +
  '</div>';
}

function renderWealth() {
  renderWealthTimeframes();
  renderWealthChart();
  renderWealthAllocation();
  renderWealthTabs();
  renderWealthTabContent();
  refreshIcons();
}
function setWealthTimeframe(tf) { state.wealth.timeframe = tf; renderWealthTimeframes(); renderWealthChart(); }
function renderWealthTimeframes() {
  qs('#wealth-timeframes').innerHTML = WEALTH_TIMEFRAMES.map(function (tf) {
    var active = state.wealth.timeframe === tf;
    return '<button onclick="TP.setWealthTimeframe(\'' + tf + '\')" class="px-3 py-1 rounded-xl text-xs font-bold transition ' + (active ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white') + '">' + tf + '</button>';
  }).join('');
}
function renderWealthChart() {
  qs('#wealth-chart').innerHTML = buildAreaChartSvg(WEALTH_CHART_DATA[state.wealth.timeframe]);
}
function renderWealthAllocation() {
  var total = WEALTH_ALLOCATION.reduce(function (s, a) { return s + a.value; }, 0);
  qs('#wealth-alloc-bar').innerHTML = WEALTH_ALLOCATION.map(function (a) {
    var pct = (a.value / total) * 100;
    return '<div style="width:' + pct.toFixed(2) + '%;background-color:' + a.color + ';" class="h-full transition-all duration-500" title="' + a.name + ': ' + pct.toFixed(1) + '%"></div>';
  }).join('');
  qs('#wealth-alloc-legend').innerHTML = WEALTH_ALLOCATION.map(function (a) {
    var pct = Math.round((a.value / total) * 100);
    return '<div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color:' + a.color + ';"></div>' +
      '<div class="overflow-hidden"><div class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">' + a.name + '</div><div class="text-[10px] text-slate-500 dark:text-neutral-400">' + inr(a.value) + ' (' + pct + '%)</div></div></div>';
  }).join('');
}
function setWealthTab(tab) { state.wealth.tab = tab; renderWealthTabs(); renderWealthTabContent(); refreshIcons(); }
function renderWealthTabs() {
  qs('#wealth-tabs').innerHTML = WEALTH_TABS.map(function (t) {
    var active = state.wealth.tab === t.id;
    return '<button onclick="TP.setWealthTab(\'' + t.id + '\')" class="flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ' + (active ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-white/10' : 'text-slate-500 dark:text-neutral-400') + '"><i data-lucide="' + t.icon + '" style="width:14px;height:14px;" class="' + (active ? 'text-amber-500' : '') + '"></i><span class="truncate">' + t.label + '</span></button>';
  }).join('');
}
function renderWealthTabContent() {
  var tab = state.wealth.tab;
  var html = '';
  if (tab === 'overview' || tab === 'sips') {
    html += '<div class="space-y-3">' +
      '<div class="flex justify-between items-center px-1"><h2 class="text-sm font-extrabold tracking-tight uppercase text-slate-500 dark:text-neutral-400">Active Monthly SIPs</h2>' +
      '<button onclick="TP.toast(\'SIP setup is available in the full app\')" class="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1"><i data-lucide="plus" style="width:14px;height:14px;"></i> Setup New SIP</button></div>' +
      '<div class="grid gap-3">' + WEALTH_SIPS.map(function (sip) {
        return '<div class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 flex justify-between items-center hover:border-amber-500/40 transition">' +
          '<div class="flex items-center gap-3.5"><div class="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-500/20"><i data-lucide="target" style="width:18px;height:18px;"></i></div>' +
          '<div><div class="flex items-center gap-2"><h4 class="font-bold text-sm text-slate-900 dark:text-white">' + sip.fund + '</h4><span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 font-semibold">' + sip.tag + '</span></div>' +
          '<p class="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1"><i data-lucide="calendar" style="width:12px;height:12px;"></i> Auto-debit: ' + sip.date + '</p></div></div>' +
          '<div class="text-right"><div class="font-extrabold text-sm text-slate-900 dark:text-white">' + inr(sip.amount) + '/mo</div><div class="text-xs font-bold text-emerald-600 dark:text-emerald-400">' + sip.returns + ' XIRR</div></div></div>';
      }).join('') + '</div>' +
      '<div class="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">' +
        '<div class="p-2 bg-amber-500 text-white rounded-xl shadow-md shrink-0 mt-0.5"><i data-lucide="award" style="width:18px;height:18px;"></i></div>' +
        '<div><h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">SIP Health Score: 92/100</h4>' +
        '<p class="text-xs text-slate-600 dark:text-neutral-300 mt-1 leading-relaxed">Your SIP consistency has unlocked Tier-1 loyalty rewards. Increasing your monthly SIP by just ' + inr(5000) + ' can help you reach your ' + inr(5000000) + ' milestone 2.4 years earlier.</p></div></div>' +
    '</div>';
  }
  if (tab === 'overview' || tab === 'stocks') {
    html += '<div class="space-y-3 pt-2">' +
      '<div class="flex justify-between items-center px-1"><h2 class="text-sm font-extrabold tracking-tight uppercase text-slate-500 dark:text-neutral-400">Direct Equity &amp; Holdings</h2>' +
      '<span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">Market Open</span></div>' +
      '<div class="space-y-3">' + WEALTH_STOCKS.map(function (s) {
        return '<div onclick="TP.toast(\'' + s.name.replace(/'/g, '') + ' detail view is available in the full app\')" class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 flex justify-between items-center cursor-pointer">' +
          '<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center border border-blue-500/20 text-[10px]">' + s.symbol.slice(0, 4) + '</div>' +
          '<div><h4 class="font-bold text-sm text-slate-900 dark:text-white">' + s.name + '</h4><p class="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">' + s.shares + ' Qty &middot; Avg ' + inr(s.avgPrice) + ' &middot; LTP ' + inr(s.ltp) + '</p></div></div>' +
          '<div class="text-right"><div class="font-extrabold text-sm text-slate-900 dark:text-white">' + inr(s.total) + '</div><div class="text-xs font-bold text-emerald-600 dark:text-emerald-400">' + s.change + '</div></div></div>';
      }).join('') + '</div>' +
    '</div>';
  }
  if (tab === 'overview' || tab === 'accounts') {
    html += '<div class="space-y-3 pt-2">' +
      '<h2 class="text-sm font-extrabold tracking-tight uppercase text-slate-500 dark:text-neutral-400 px-1">Linked Bank Accounts &amp; Reserves</h2>' +
      '<div class="grid sm:grid-cols-2 gap-3">' +
        '<div class="bg-gradient-to-br from-[#004A99] to-[#002244] text-white p-4 rounded-2xl shadow-md border border-blue-400/20">' +
          '<div class="flex justify-between items-start"><span class="text-[10px] uppercase font-bold text-blue-200">Savings Account</span><i data-lucide="landmark" style="width:16px;height:16px;" class="text-blue-200"></i></div>' +
          '<div class="text-lg font-bold mt-2">Federal Bank</div><div class="text-xl font-extrabold mt-1">' + inr(49484) + '</div><div class="text-[10px] text-blue-200 mt-2">&bull;&bull;&bull;&bull; 2597 &middot; Linked for UPI</div></div>' +
        '<div class="bg-gradient-to-br from-[#005696] to-[#002A4A] text-white p-4 rounded-2xl shadow-md border border-cyan-400/20">' +
          '<div class="flex justify-between items-start"><span class="text-[10px] uppercase font-bold text-cyan-200">Salary Account</span><i data-lucide="building-2" style="width:16px;height:16px;" class="text-cyan-200"></i></div>' +
          '<div class="text-lg font-bold mt-2">State Bank of India</div><div class="text-xl font-extrabold mt-1">' + inr(128450) + '</div><div class="text-[10px] text-cyan-200/80 mt-2">&bull;&bull;&bull;&bull; 4102 &middot; Auto-sweep active</div></div>' +
        '<div class="bg-gradient-to-br from-amber-900/80 to-stone-900 text-white p-4 rounded-2xl shadow-md border border-amber-500/20 sm:col-span-2 flex justify-between items-center">' +
          '<div><span class="text-[10px] uppercase font-bold text-amber-200">Fixed Deposit + EPF</span><div class="text-lg font-extrabold mt-0.5">' + inr(150000) + ' <span class="text-xs font-normal text-amber-200">FD + ' + inr(210000) + ' EPF</span></div></div>' +
          '<div class="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold backdrop-blur-md">7.1% p.a.</div></div>' +
        '<div class="bg-gradient-to-br from-rose-900/80 to-stone-900 text-white p-4 rounded-2xl shadow-md border border-rose-500/20 sm:col-span-2 flex justify-between items-center">' +
          '<div><span class="text-[10px] uppercase font-bold text-rose-200">HDFC Regalia Gold &mdash; Credit Card Due</span><div class="text-lg font-extrabold mt-0.5">-' + inr(24590) + '</div></div>' +
          '<button onclick="TP.openBillDetails(\'credit-card\')" class="px-3 py-1.5 rounded-xl bg-white/90 text-rose-900 text-xs font-bold">Pay Bill</button></div>' +
      '</div>' +
    '</div>';
  }
  qs('#wealth-tab-content').innerHTML = html;
  refreshIcons();
}
function scrollToWealthAllocation() {
  var el = qs('#wealth-allocation-card');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function syncWealth() {
  var icon = qs('#wealth-sync-icon');
  icon.classList.add('animate-spin');
  toast('Refreshing live market valuations...');
  setTimeout(function () {
    icon.classList.remove('animate-spin');
    toast('Valuations updated just now');
  }, 1200);
}

/* -------------------------------------------------------------- SMART SAVE */
function renderSmartSave() {
  qs('#ss-deals').innerHTML = DEALS.map(function (d) {
    return '<div class="shrink-0 w-64 h-36 rounded-3xl bg-gradient-to-br ' + d.color + ' p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">' +
      '<div><div class="text-white/80 text-xs font-bold uppercase">' + d.title + '</div><div class="text-2xl font-black text-white">' + d.discount + '</div></div>' +
      '<div class="text-white/90 text-[10px] font-medium">' + d.sub + '</div></div>';
  }).join('');
  qs('#ss-tips').innerHTML = TIPS.map(function (t) {
    return '<div class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-sm">' +
      '<div class="flex justify-between items-start mb-2"><span class="text-[10px] font-bold px-2 py-0.5 rounded ' + (t.tag === 'INVESTMENT' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400') + '">' + t.tag + '</span></div>' +
      '<h3 class="font-bold text-slate-900 dark:text-white mb-1">' + t.title + '</h3><p class="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">' + t.description + '</p></div>';
  }).join('');
  qs('#ss-giftcards').innerHTML = GIFTCARDS.map(function (c) {
    return '<div onclick="TP.toast(\'Gift card store is available in the full app\')" class="bg-white/40 dark:bg-neutral-800/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 dark:border-white/5 flex flex-col items-center gap-2 hover:bg-white/60 transition cursor-pointer">' +
      '<div class="text-3xl mb-1">' + c.icon + '</div><div class="text-center"><div class="text-xs font-bold">' + c.brand + '</div><div class="text-[10px] text-slate-500 dark:text-neutral-500">Starts at ' + c.value + '</div></div></div>';
  }).join('');
  refreshIcons();
}

/* ------------------------------------------------------------------ HISTORY */
function txById(id) { var t = null; TRANSACTIONS.forEach(function (x) { if (x.id === id) t = x; }); return t; }

function renderHistory() {
  var h = state.history;
  qs('#hist-view-list').className = 'p-1.5 rounded-lg transition-all ' + (h.view === 'list' ? 'bg-white dark:bg-neutral-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-neutral-500');
  qs('#hist-view-analytics').className = 'p-1.5 rounded-lg transition-all ' + (h.view === 'analytics' ? 'bg-white dark:bg-neutral-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-neutral-500');
  qs('#hist-source-app').className = 'flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 ' + (h.source === 'app' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-neutral-400');
  qs('#hist-source-all').className = 'flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 ' + (h.source === 'all' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-neutral-400');
  qs('#hist-source-caption').innerHTML = h.source === 'app'
    ? 'Direct app transactions <span class="text-emerald-600 dark:text-emerald-400 font-bold">(No bank aggregator used)</span>'
    : 'Consolidated view across all linked bank accounts &amp; external UPI apps';
  qs('#hist-search-row').classList.toggle('hidden', h.view !== 'list');

  var isFilterActive = h.filters.type !== 'all' || h.filters.category !== 'all' || h.filters.time !== 'all' || h.filters.account !== 'all';
  qs('#hist-filter-btn').className = 'relative p-2.5 rounded-2xl border transition flex items-center gap-1.5 text-xs font-bold ' + (isFilterActive ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' : 'bg-slate-100/60 dark:bg-neutral-900/60 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-white/10');
  qs('#hist-filter-dot').classList.toggle('hidden', !isFilterActive);

  if (h.view === 'analytics') renderHistoryAnalytics();
  else renderHistoryList();
  refreshIcons();
}

function getFilteredTransactions() {
  var h = state.history;
  var searchEl = qs('#history-search');
  var term = (searchEl ? searchEl.value : '').toLowerCase();
  return TRANSACTIONS.filter(function (t) {
    var matchesSearch = t.title.toLowerCase().indexOf(term) !== -1 || String(t.amount).indexOf(term) !== -1 || t.account.toLowerCase().indexOf(term) !== -1;
    var matchesSource = h.source === 'all' || t.source === 'app';
    var matchesType = h.filters.type === 'all' || t.type === h.filters.type;
    var matchesCategory = h.filters.category === 'all' || t.category === h.filters.category;
    var matchesAccount = h.filters.account === 'all' || t.account === h.filters.account;
    var matchesTime = h.filters.time === 'all' || t.period === h.filters.time;
    return matchesSearch && matchesSource && matchesType && matchesCategory && matchesAccount && matchesTime;
  });
}

function renderHistoryList() {
  var list = getFilteredTransactions();
  var root = qs('#history-body');
  var h = state.history;
  if (list.length === 0) {
    var isFilterActive = h.filters.type !== 'all' || h.filters.category !== 'all' || h.filters.time !== 'all' || h.filters.account !== 'all';
    root.innerHTML = '<div class="text-center py-12 bg-white/40 dark:bg-neutral-900/40 rounded-3xl border border-slate-200/60 dark:border-white/5 p-6">' +
      '<i data-lucide="clock" style="width:36px;height:36px;" class="mx-auto text-slate-300 dark:text-neutral-700 mb-3"></i>' +
      '<h3 class="font-bold text-slate-700 dark:text-neutral-300 text-base">No transactions found</h3>' +
      '<p class="text-xs text-slate-500 mt-1">Try adjusting your filters or search term</p>' +
      (isFilterActive ? '<button onclick="TP.resetHistoryFilters()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">Clear Filters</button>' : '') +
      '</div>';
    refreshIcons();
    return;
  }
  root.innerHTML = '<div class="space-y-3 mt-1 pb-2">' + list.map(function (t) {
    var isCC = t.account.indexOf('Regalia') !== -1 || t.account.indexOf('Amex') !== -1;
    return '<div onclick="TP.openTxDetail(\'' + t.id + '\')" class="flex justify-between items-center p-4 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl hover:border-blue-500/40 transition cursor-pointer active:scale-[0.99] shadow-sm">' +
      '<div class="flex items-center gap-3.5 overflow-hidden">' +
        '<div class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-lg font-extrabold shadow-sm border border-white/20 ' + (t.type === 'credit' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300') + '">' + t.title.charAt(0) + '</div>' +
        '<div class="overflow-hidden"><div class="font-bold text-slate-900 dark:text-white text-sm truncate">' + t.title + '</div>' +
        '<div class="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1.5 flex-wrap">' +
          '<span>' + t.date + '</span>' +
          '<span class="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-neutral-300 flex items-center gap-1"><i data-lucide="' + (isCC ? 'credit-card' : 'landmark') + '" style="width:10px;height:10px;" class="' + (isCC ? 'text-purple-500' : 'text-blue-500') + '"></i>' + t.account + '</span>' +
          (t.billUploaded ? '<span class="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[10px] font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1"><i data-lucide="file-check" style="width:10px;height:10px;"></i> Receipt</span>' : '') +
        '</div></div></div>' +
      '<div class="text-right shrink-0 ml-2">' +
        '<div class="font-black text-base tracking-tight ' + (t.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white') + '">' + (t.type === 'credit' ? '+' : '') + inr(t.amount) + '</div>' +
        '<div class="text-[10px] font-bold mt-1 text-slate-400 dark:text-neutral-500 uppercase tracking-wider">' + (t.source === 'app' ? '<span class="text-blue-600 dark:text-blue-400">Trackpay</span>' : '<span>Ext Mode</span>') + '</div>' +
      '</div></div>';
  }).join('') + '</div>';
  refreshIcons();
}

function renderHistoryAnalytics() {
  var debitTx = TRANSACTIONS.filter(function (t) { return t.type === 'debit' && t.category !== 'transfer'; });
  var totalSpent = debitTx.reduce(function (s, t) { return s + t.amount; }, 0);
  var totals = {};
  debitTx.forEach(function (t) { totals[t.category] = (totals[t.category] || 0) + t.amount; });
  var data = Object.keys(totals).map(function (cat) { return { name: cat, value: totals[cat] }; }).sort(function (a, b) { return b.value - a.value; });

  var gradientParts = [];
  var acc = 0;
  data.forEach(function (d) {
    var meta = CATEGORY_META[d.name] || CATEGORY_META.transfer;
    var pct = totalSpent > 0 ? (d.value / totalSpent) * 100 : 0;
    gradientParts.push(meta.color + ' ' + acc.toFixed(2) + '% ' + (acc + pct).toFixed(2) + '%');
    acc += pct;
  });
  var donutBg = gradientParts.length ? ('conic-gradient(' + gradientParts.join(', ') + ')') : '#e2e8f0';

  var categoriesHtml = data.map(function (d) {
    var meta = CATEGORY_META[d.name] || CATEGORY_META.transfer;
    var pct = totalSpent > 0 ? Math.round((d.value / totalSpent) * 100) : 0;
    return '<div class="flex items-center justify-between p-3 bg-white/30 dark:bg-neutral-800/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5">' +
      '<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm" style="background-color:' + meta.color + '"><i data-lucide="' + meta.icon + '" style="width:14px;height:14px;"></i></div>' +
      '<div><div class="text-sm font-bold text-slate-900 dark:text-white">' + meta.label + '</div><div class="text-[10px] text-slate-500 dark:text-neutral-500">' + pct + '% of spending</div></div></div>' +
      '<div class="text-right"><div class="text-sm font-bold text-slate-900 dark:text-white">' + inr(d.value) + '</div><div class="w-16 h-1.5 bg-slate-200 dark:bg-neutral-700 rounded-full mt-1 overflow-hidden"><div class="h-full rounded-full" style="width:' + pct + '%;background-color:' + meta.color + '"></div></div></div>' +
      '</div>';
  }).join('');

  qs('#history-body').innerHTML = '<div class="space-y-6 pb-4">' +
    '<div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] p-6 shadow-lg shadow-black/5 flex flex-col items-center">' +
      '<h3 class="text-sm font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wide mb-6">Spending Breakdown</h3>' +
      '<div class="relative w-[180px] h-[180px]"><div class="absolute inset-0 rounded-full" style="background:' + donutBg + '"></div>' +
        '<div class="absolute donut-hole rounded-full flex flex-col items-center justify-center" style="inset:28px;">' +
          '<span class="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Total Spent</span><span class="text-xl font-bold text-slate-900 dark:text-white">' + inr(totalSpent) + '</span>' +
        '</div></div>' +
      '<div class="mt-6 w-full space-y-3">' +
        '<div class="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl p-3 flex items-start gap-3">' +
          '<div class="p-1.5 bg-blue-100 dark:bg-blue-800/40 rounded-full text-blue-600 dark:text-blue-400 shrink-0"><i data-lucide="trending-up" style="width:14px;height:14px;"></i></div>' +
          '<div><p class="text-xs font-bold text-slate-700 dark:text-neutral-200">Spending Alert</p><p class="text-[10px] text-slate-500 dark:text-neutral-400 leading-relaxed">You have spent <span class="font-bold text-blue-500">15% more</span> on Food compared to last month.</p></div></div>' +
        '<div class="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-xl p-3 flex items-start gap-3">' +
          '<div class="p-1.5 bg-amber-100 dark:bg-amber-800/40 rounded-full text-amber-600 dark:text-amber-400 shrink-0"><i data-lucide="zap" style="width:14px;height:14px;"></i></div>' +
          '<div><p class="text-xs font-bold text-slate-700 dark:text-neutral-200">Bill Insight</p><p class="text-[10px] text-slate-500 dark:text-neutral-400 leading-relaxed">Your <span class="font-bold text-slate-900 dark:text-white">Electricity Bill</span> is <span class="font-bold text-red-500">15% higher</span> than usual.</p></div></div>' +
      '</div></div>' +
    '<div class="space-y-3 px-1"><h3 class="text-xs font-bold text-slate-500 dark:text-neutral-500 uppercase tracking-wide px-2">Top Categories</h3>' + categoriesHtml + '</div></div>';
  refreshIcons();
}

function setHistoryView(v) { state.history.view = v; renderHistory(); }
function setHistorySource(s) { state.history.source = s; renderHistory(); }

/* ---- Filters sheet ---- */
function openHistoryFilters() {
  state.history.tempFilters = Object.assign({}, state.history.filters);
  renderFilterSheetBody();
  qs('#hist-filters-overlay').classList.remove('hidden');
}
function closeHistoryFilters() { qs('#hist-filters-overlay').classList.add('hidden'); }
function setTempFilter(key, value) { state.history.tempFilters[key] = value; renderFilterSheetBody(); }
function applyHistoryFilters() { state.history.filters = Object.assign({}, state.history.tempFilters); closeHistoryFilters(); renderHistory(); }
function resetHistoryFilters() {
  var reset = { type: 'all', category: 'all', time: 'all', account: 'all' };
  state.history.filters = reset;
  state.history.tempFilters = Object.assign({}, reset);
  closeHistoryFilters();
  renderHistory();
}
function renderFilterSheetBody() {
  var tf = state.history.tempFilters;
  function chip(active, label, onclick, iconHtml) {
    return '<button onclick="' + onclick + '" class="py-2 px-3 rounded-xl border text-xs font-bold text-center transition flex items-center justify-center gap-1.5 ' + (active ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' : 'bg-slate-50 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-700') + '">' + (iconHtml || '') + '<span class="truncate">' + label + '</span></button>';
  }
  var html = '<div class="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-neutral-800">' +
    '<h2 class="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2"><i data-lucide="filter" style="width:18px;height:18px;" class="text-blue-600"></i> Filter Transactions</h2>' +
    '<button onclick="TP.closeHistoryFilters()" class="p-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-500"><i data-lucide="x" style="width:16px;height:16px;"></i></button></div>' +
    '<div class="space-y-2"><label class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Linked Bank / CC Account</label>' +
    '<div class="grid grid-cols-2 gap-2">' + ACCOUNT_OPTIONS.map(function (a) {
      var isCC = a.id.indexOf('Regalia') !== -1 || a.id.indexOf('Amex') !== -1;
      return chip(tf.account === a.id, a.label, "TP.setTempFilter('account','" + a.id + "')", '<i data-lucide="' + (isCC ? 'credit-card' : 'landmark') + '" style="width:12px;height:12px;"></i>');
    }).join('') + '</div></div>' +
    '<div class="space-y-2"><label class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Time Period</label>' +
    '<div class="flex flex-wrap gap-2">' + TIME_OPTIONS.map(function (t) { return chip(tf.time === t.id, t.label, "TP.setTempFilter('time','" + t.id + "')"); }).join('') + '</div></div>' +
    '<div class="space-y-2"><label class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Transaction Type</label>' +
    '<div class="grid grid-cols-3 gap-2">' +
      chip(tf.type === 'all', 'All Types', "TP.setTempFilter('type','all')") +
      chip(tf.type === 'credit', 'Received (+)', "TP.setTempFilter('type','credit')") +
      chip(tf.type === 'debit', 'Paid (-)', "TP.setTempFilter('type','debit')") +
    '</div></div>' +
    '<div class="space-y-2"><label class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Category</label>' +
    '<div class="grid grid-cols-3 gap-2">' + chip(tf.category === 'all', 'All Categories', "TP.setTempFilter('category','all')") +
      SELECTABLE_CATEGORIES.map(function (c) {
        var meta = CATEGORY_META[c];
        return chip(tf.category === c, meta.label, "TP.setTempFilter('category','" + c + "')", '<i data-lucide="' + meta.icon + '" style="width:12px;height:12px;"></i>');
      }).join('') + '</div></div>' +
    '<div class="flex gap-3 pt-3 border-t border-slate-100 dark:border-neutral-800">' +
      '<button onclick="TP.resetHistoryFilters()" class="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-sm font-bold flex items-center justify-center gap-2"><i data-lucide="rotate-ccw" style="width:15px;height:15px;"></i> Reset</button>' +
      '<button onclick="TP.applyHistoryFilters()" class="flex-1 py-3 px-4 rounded-2xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">Apply Filters</button>' +
    '</div>';
  qs('#hist-filters-body').innerHTML = html;
  refreshIcons();
}

/* ---- Transaction detail ---- */
function openTxDetail(id) {
  var t = txById(id);
  if (!t) return;
  state.history.selectedTxId = id;
  state.history.showCategorySelector = false;
  state.history.noteText = t.note || '';
  qs('#tx-detail-title').textContent = t.type === 'credit' ? 'Money Received' : 'Sent Successfully';
  renderTxDetailBody();
  qs('#tx-detail-overlay').classList.remove('hidden');
  qs('#tx-detail-overlay').scrollTop = 0;
}
function closeTxDetail() { qs('#tx-detail-overlay').classList.add('hidden'); }
function toggleCategorySelector() { state.history.showCategorySelector = !state.history.showCategorySelector; renderTxDetailBody(); }
function selectTxCategory(cat) {
  var t = txById(state.history.selectedTxId);
  if (!t) return;
  t.category = cat;
  toast('Category updated to ' + CATEGORY_META[cat].label);
  state.history.showCategorySelector = false;
  renderTxDetailBody();
  if (!qs('#tx-detail-overlay').classList.contains('hidden')) renderHistoryList();
}
function setTxNote(v) { state.history.noteText = v; }
function saveTxNote() {
  var t = txById(state.history.selectedTxId);
  if (!t) return;
  t.note = state.history.noteText;
  toast('Note successfully saved!');
}
function copyRef(text) { toast('Copied: ' + text); }
function splitFromHistory(id) {
  var t = txById(id);
  if (!t) return;
  closeTxDetail();
  openSplitBill({ title: t.title + ' - ' + t.sub, amount: t.amount });
}
function payAgainFromHistory(id) {
  var t = txById(id);
  if (!t) return;
  closeTxDetail();
  openSendAmountWithContact({ name: t.title, number: '', color: 'bg-blue-100 text-blue-600' });
}

/* ---- Receipt attach flow ---- */
function autoFetchReceipt() {
  var t = txById(state.history.selectedTxId);
  if (!t || state.history.fetchingBill) return;
  state.history.fetchingBill = true;
  renderTxDetailBody();
  var autoMatch = t.category === 'food' || t.category === 'shopping' || t.category === 'subscription';
  setTimeout(function () {
    state.history.fetchingBill = false;
    if (autoMatch) {
      t.billUploaded = true;
      t.billName = t.title.replace(/\s+/g, '') + '_Receipt_' + t.id + '.pdf';
      toast('Receipt fetched from ' + t.title + '!');
      renderTxDetailBody();
      renderHistoryList();
    } else {
      renderTxDetailBody();
      openPasteReceipt();
    }
  }, 1100);
}
function openPasteReceipt() {
  state.history.pasteText = '';
  renderPasteReceiptBody();
  qs('#paste-receipt-overlay').classList.remove('hidden');
}
function closePasteReceipt() { qs('#paste-receipt-overlay').classList.add('hidden'); }
function setPasteText(v) { state.history.pasteText = v; }
function renderPasteReceiptBody() {
  qs('#paste-receipt-body').innerHTML =
    '<div class="flex justify-between items-center mb-3"><h3 class="font-bold text-sm text-slate-900 dark:text-white">Paste receipt or email text</h3><button onclick="TP.closePasteReceipt()"><i data-lucide="x" style="width:18px;height:18px;" class="text-slate-400"></i></button></div>' +
    '<p class="text-xs text-slate-400 mb-3">No merchant match found for auto-fetch. Paste the receipt or order-confirmation text and we will extract the details.</p>' +
    '<textarea id="paste-receipt-input" oninput="TP.setPasteText(this.value)" rows="5" placeholder="Order #123 -- Total: Rs 4,999..." class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"></textarea>' +
    '<button onclick="TP.submitPasteReceipt()" class="w-full mt-3 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold">Extract Receipt</button>';
  refreshIcons();
}
function submitPasteReceipt() {
  var t = txById(state.history.selectedTxId);
  if (!t || !state.history.pasteText.trim()) return;
  toast('Extracting...');
  setTimeout(function () {
    t.billUploaded = true;
    t.billName = t.title.replace(/\s+/g, '') + '_Receipt_' + t.id + '.pdf';
    closePasteReceipt();
    toast('Receipt parsed successfully!');
    renderTxDetailBody();
    renderHistoryList();
  }, 700);
}

function renderTxDetailBody() {
  var t = txById(state.history.selectedTxId);
  if (!t) return;
  var h = state.history;
  var catMeta = CATEGORY_META[t.category] || CATEGORY_META.transfer;
  var attachSection = t.billUploaded
    ? '<div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-center justify-between">' +
        '<div class="flex items-center gap-2.5 overflow-hidden"><div class="p-2 rounded-xl bg-emerald-500 text-white shrink-0"><i data-lucide="file-check" style="width:16px;height:16px;"></i></div>' +
        '<div class="truncate"><div class="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"><span>Attached Receipt</span><span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded">DEMO</span></div>' +
        '<div class="text-[11px] font-medium text-slate-500 dark:text-neutral-400 truncate mt-0.5 font-mono">' + t.billName + '</div></div></div>' +
        '<button onclick="TP.toast(\'Receipt preview is available in the full app\')" class="px-2.5 py-1.5 bg-white dark:bg-neutral-800 text-slate-700 dark:text-white rounded-xl text-xs font-bold shadow-sm border border-slate-200 dark:border-white/10 shrink-0 ml-2">View</button></div>'
    : '<div class="space-y-2">' +
        '<button onclick="TP.autoFetchReceipt()" class="w-full py-3 px-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 transition shadow-sm active:scale-[0.99]">' +
          '<div class="flex items-center gap-2.5"><i data-lucide="file-text" style="width:16px;height:16px;" class="text-indigo-500 shrink-0"></i><span>Auto-fetch GST Bill / Invoice</span></div>' +
          '<span class="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-extrabold flex items-center gap-1 shrink-0 ml-2">' + (h.fetchingBill ? '<i data-lucide="loader-2" class="animate-spin" style="width:12px;height:12px;"></i>' : 'Fetch') + '</span></button>' +
        '<button onclick="TP.openPasteReceipt()" class="w-full py-2.5 px-4 bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 dark:text-neutral-300"><i data-lucide="clipboard-paste" style="width:14px;height:14px;"></i> Paste receipt / email text</button></div>';

  var html = '<div class="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm">' +
    '<div class="flex flex-col items-center mb-6"><div class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Amount</div>' +
      '<div class="flex items-center gap-3"><span class="text-4xl font-black text-slate-900 dark:text-white">' + inr(t.amount) + '</span><i data-lucide="check-circle-2" style="width:30px;height:30px;" class="text-emerald-500"></i></div></div>' +
    '<div class="grid grid-cols-3 gap-2 mb-4">' +
      '<button onclick="TP.splitFromHistory(\'' + t.id + '\')" class="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-xs font-bold hover:bg-slate-100 transition truncate"><i data-lucide="users" style="width:14px;height:14px;" class="text-indigo-500 shrink-0"></i> Split</button>' +
      '<button onclick="TP.toggleCategorySelector()" class="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition truncate ' + (h.showCategorySelector ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300') + '"><i data-lucide="tag" style="width:14px;height:14px;" class="' + (h.showCategorySelector ? 'text-white' : 'text-blue-500') + ' shrink-0"></i><span class="truncate">' + catMeta.label + '</span></button>' +
      '<button onclick="TP.autoFetchReceipt()" class="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-100 transition truncate">' + (h.fetchingBill ? '<i data-lucide="loader-2" class="animate-spin" style="width:14px;height:14px;"></i>' : '<i data-lucide="upload" style="width:14px;height:14px;"></i>') + '<span>Attach</span></button>' +
    '</div>' +
    (h.showCategorySelector ? '<div class="bg-slate-50 dark:bg-neutral-800 p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 grid grid-cols-3 gap-2 mb-4">' +
      SELECTABLE_CATEGORIES.map(function (c) {
        var meta = CATEGORY_META[c];
        var active = t.category === c;
        return '<button onclick="TP.selectTxCategory(\'' + c + '\')" class="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-[11px] font-bold transition-all ' + (active ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300') + '"><i data-lucide="' + meta.icon + '" style="width:16px;height:16px;" class="' + (active ? 'text-white' : meta.text) + '"></i><span>' + meta.label + '</span></button>';
      }).join('') + '</div>' : '') +
    '<div class="mb-4 p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/20">' +
      '<label class="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1.5">Transaction Notes</label>' +
      '<div class="flex gap-2"><input id="tx-note-input" oninput="TP.setTxNote(this.value)" type="text" placeholder="Add a note..." value="' + (h.noteText || '').replace(/"/g, '&quot;') + '" class="flex-1 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-900 dark:text-white" />' +
      '<button onclick="TP.saveTxNote()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition active:scale-95 shadow-sm">Save</button></div></div>' +
    '<div class="mb-2">' + attachSection + '</div></div>' +
    '<div class="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6 mt-4">' +
      '<div class="flex justify-between items-start"><div><h3 class="text-xs font-bold text-slate-400 uppercase mb-2">' + (t.type === 'credit' ? 'From' : 'To') + '</h3>' +
        '<div class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">' + t.title + ' <i data-lucide="check-circle-2" style="width:15px;height:15px;" class="text-blue-500"></i></div>' +
        '<div class="text-xs text-slate-500 mt-0.5">UPI ID: ' + t.receiverUpiId + '</div></div>' +
        '<div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">' + t.title.substring(0, 2).toUpperCase() + '</div></div>' +
      '<div class="flex gap-3"><button onclick="TP.payAgainFromHistory(\'' + t.id + '\')" class="flex-1 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50/50 dark:bg-blue-900/10">Pay Again</button>' +
        '<button onclick="TP.closeTxDetail()" class="flex-1 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50/50 dark:bg-blue-900/10">Back to History</button></div>' +
      '<div class="border-t border-slate-100 dark:border-neutral-800 pt-5"><h3 class="text-xs font-bold text-slate-400 uppercase mb-2">From</h3>' +
        '<div class="font-bold text-base text-slate-900 dark:text-white">' + state.username + '</div>' +
        '<div class="text-xs text-slate-500 mt-0.5">UPI ID: ' + t.upiId + '</div>' +
        '<div class="text-xs text-slate-500 mt-0.5">' + t.account + '</div>' +
        '<div class="mt-4 text-[11px] text-slate-500 font-medium">Paid at ' + t.time + ', ' + t.date + '<br/>UPI Ref No: ' + t.upiRefNo + ' <button onclick="TP.copyRef(\'' + t.upiRefNo + '\')" class="text-blue-500 font-bold ml-1">Copy</button></div></div>' +
    '</div>' +
    '<div class="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-slate-200 dark:border-neutral-800 flex items-center justify-between mt-4">' +
      '<span class="text-sm font-bold text-slate-700 dark:text-neutral-300">Did you find this page useful?</span>' +
      '<div class="flex gap-3"><button onclick="TP.toast(\'Thanks for the feedback!\')" class="p-2 bg-slate-50 dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:text-blue-500 transition"><i data-lucide="thumbs-up" style="width:16px;height:16px;"></i></button>' +
      '<button onclick="TP.toast(\'Thanks, we will use this to improve\')" class="p-2 bg-slate-50 dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:text-red-500 transition"><i data-lucide="thumbs-down" style="width:16px;height:16px;"></i></button></div></div>';
  qs('#tx-detail-body').innerHTML = html;
  refreshIcons();
}

/* ------------------------------------------------------------------ PROFILE */
function renderProfile() {
  qs('#profile-facts').innerHTML = state.profileFacts.map(function (f) {
    return '<div class="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-neutral-800/50 border border-slate-200/50 dark:border-white/5">' +
      '<span class="text-base leading-none mt-0.5">' + f.emoji + '</span><span class="flex-1 text-xs text-slate-700 dark:text-neutral-200 leading-relaxed min-w-0">' + f.text + '</span>' +
      '<button onclick="TP.forgetFact(\'' + f.key + '\')" class="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition shrink-0"><i data-lucide="x" style="width:14px;height:14px;"></i></button></div>';
  }).join('') + (state.profileFacts.length === 0 ? '<p class="text-xs text-slate-400 text-center py-2">Nothing remembered right now.</p>' : '');

  qs('#profile-menu').innerHTML = PROFILE_MENU.map(function (m) {
    var action = m.screen ? "TP.navigate('" + m.screen + "')" : "TP.toast('That section is available in the full Trackpay app')";
    return '<div onclick="' + action + '" class="flex items-center justify-between p-5 border-b border-slate-200/50 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition cursor-pointer">' +
      '<div class="flex items-center gap-4"><i data-lucide="' + m.icon + '" style="width:20px;height:20px;" class="text-slate-500 dark:text-neutral-400"></i><span class="font-bold text-sm">' + m.label + '</span></div>' +
      '<i data-lucide="chevron-right" style="width:18px;height:18px;" class="text-slate-400 dark:text-neutral-600"></i></div>';
  }).join('');
  syncThemeUI();
  refreshIcons();
}
function forgetFact(key) {
  state.profileFacts = state.profileFacts.filter(function (f) { return f.key !== key; });
  renderProfile();
}
function toggleDarkMode() {
  var isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('trackpay-demo-dark', isDark ? '1' : '0'); } catch (e) {}
  syncThemeUI();
}
function syncThemeUI() {
  var isDark = document.documentElement.classList.contains('dark');
  var icon = qs('#theme-icon');
  if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
  var track = qs('#theme-switch-track');
  var dot = qs('#theme-switch-dot');
  if (track && dot) {
    track.style.background = isDark ? '#2563eb' : '';
    dot.style.transform = isDark ? 'translateX(20px)' : 'translateX(0)';
  }
  refreshIcons();
}

/* -------------------------------------------------------------------- AI CHAT */
var CHAT_DEMO_SEED = [
  { role: 'assistant', text: "Hi, I'm ArthaAI — your money assistant inside Trackpay. I read your real transactions, goals and bills to give live advice. Here's a sample of how a conversation with me looks:" },
  { role: 'user', text: 'Should I buy the new iPhone 17 right now?' },
  { role: 'assistant', text: "Let's check the numbers first. Your Federal Bank savings sits at &#8377;49,484 with about &#8377;35,880 left after this month's essentials, and your Emergency Fund goal is at 82% (&#8377;2,45,000 of &#8377;3,00,000). The iPhone 17 (128GB) is priced at &#8377;79,900 on Apple's store &mdash; buying it outright today would eat almost 60% of your free cash and stall that goal by about 2 months.<br/><br/>My take: it's affordable, but not urgent. I'd wait a few weeks and pay through card offers instead of savings. Want me to find the cheapest way to get it?" },
  { role: 'user', text: 'Yes, where can I get it the cheapest?' },
  { role: 'assistant', text: "Here's what I'm seeing across channels:<br/>&bull; Apple Store: &#8377;79,900 flat<br/>&bull; Amazon with HDFC Regalia instant discount: &#8377;74,900<br/>&bull; Croma via Trackpay Smart Pay gift card (12% off): effectively &#8377;70,300<br/>&bull; Trade in your old iPhone (~&#8377;18,000 exchange bonus): brings it closer to &#8377;52,000 out of pocket<br/><br/>Cheapest realistic route: <b>Croma + Smart Pay gift card + exchange</b> &mdash; about &#8377;27,900 less than buying outright today." },
  { role: 'user', text: "Okay, what's the plan to actually buy it then?" },
  { role: 'assistant', text: "Here's a 4-step plan:<br/>1. Set up an “iPhone 17” Goal so the money is ring-fenced and never touches your Emergency Fund.<br/>2. Redirect this month's &#8377;4,250 Smart Save potential into that goal instead of letting it sit idle.<br/>3. Trade in your old phone at Croma for the ~&#8377;18,000 exchange bonus.<br/>4. Pay the remaining balance through Smart Pay's gift card route for the extra 12% off.<br/><br/>At that pace it's fully funded in about 3 weeks &mdash; no debt, no dent in savings.<br/><br/><button onclick=\"TP.navigate('screen-goal-new')\" class=\"inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition active:scale-95\">Create &quot;iPhone 17&quot; Goal <i data-lucide=\"arrow-right\" style=\"width:12px;height:12px;\"></i></button>" }
];
function resetChat() {
  state.chatMessages = CHAT_DEMO_SEED.map(function (m) { return Object.assign({}, m); });
  renderChatLog();
  renderChatSuggestions();
}
function renderChatLog() {
  var log = qs('#chat-log');
  log.innerHTML = state.chatMessages.map(function (m) {
    if (m.role === 'assistant') {
      return '<div class="flex gap-2.5"><div class="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><i data-lucide="sparkles" style="width:14px;height:14px;" class="text-white"></i></div>' +
        '<div class="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed max-w-[85%] shadow-sm">' + m.text + '</div></div>';
    }
    return '<div class="flex justify-end"><div class="bg-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-3 text-sm max-w-[85%] shadow-sm">' + m.text + '</div></div>';
  }).join('');
  if (state.chatTyping) {
    log.innerHTML += '<div class="flex gap-2.5"><div class="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"><i data-lucide="sparkles" style="width:14px;height:14px;" class="text-white"></i></div>' +
      '<div class="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">' +
      '<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse"></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style="animation-delay:.15s"></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style="animation-delay:.3s"></span></div></div>';
  }
  log.scrollTop = log.scrollHeight;
  refreshIcons();
}
function renderChatSuggestions() {
  qs('#chat-suggestions').innerHTML = CHAT_SUGGESTIONS.map(function (s, i) {
    return '<button onclick="TP.sendAiPreset(' + i + ')" class="shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">' + s + '</button>';
  }).join('');
}
function sendAiPreset(i) {
  qs('#ai-input').value = CHAT_SUGGESTIONS[i];
  sendAiMessage();
}
function getAiReply(text) {
  var lower = text.toLowerCase();
  for (var i = 0; i < CHAT_QA.length; i++) {
    var qa = CHAT_QA[i];
    for (var j = 0; j < qa.keys.length; j++) {
      if (lower.indexOf(qa.keys[j]) !== -1) return qa.reply;
    }
  }
  return "This is a static demo, so I cannot read live account data here — but in the full Trackpay app I would pull your real transactions to answer that precisely. Here is the kind of insight I would give: your top spending category this month is dining out, and moving idle savings into a higher-yield option could add roughly Rs 4,000/month.";
}
function sendAiMessage() {
  var input = qs('#ai-input');
  var text = input.value.trim();
  if (!text) return;
  state.chatMessages.push({ role: 'user', text: text });
  input.value = '';
  state.chatTyping = true;
  renderChatLog();
  setTimeout(function () {
    state.chatTyping = false;
    state.chatMessages.push({ role: 'assistant', text: getAiReply(text) });
    renderChatLog();
  }, 800 + Math.random() * 500);
}

/* --------------------------------------------------------------------- init */
function updatePhoneScale() {
  var screenEl = qs('.phone-screen');
  var canvas = qs('#design-canvas');
  if (!screenEl || !canvas) return;
  var w = screenEl.clientWidth;
  if (!w) return;
  canvas.style.transform = 'scale(' + (w / 390) + ')';
}

function init() {
  refreshIcons();
  try { if (localStorage.getItem('trackpay-demo-dark') === '1') document.documentElement.classList.add('dark'); } catch (e) {}
  syncThemeUI();
  updatePhoneScale();
  window.addEventListener('resize', updatePhoneScale);
  renderScanMerchants();
  var video = qs('#scan-video');
  if (video) {
    var vpEl = qs('#viewport');
    var observer = new MutationObserver(function () {
      if (qs('#screen-scan').classList.contains('active') && !video.dataset.started) {
        video.dataset.started = '1';
        initScanCamera();
      }
    });
    observer.observe(qs('#screen-scan'), { attributes: true, attributeFilter: ['class'] });
  }
  navigate('screen-home', { push: false });
  state.navStack = ['screen-home'];
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* --------------------------------------------------------------- exports */
window.TP = {
  navigate: navigate, goBack: goBack, toast: toast,
  resetDemo: resetDemo,
  toggleBalance: toggleBalance,
  oppAction: oppAction, oppDismiss: oppDismiss, oppSnooze: oppSnooze,
  setNotifTab: setNotifTab,
  openBillDetails: openBillDetails, linkBiller: linkBiller, payBillNow: payBillNow,
  openSplitBill: openSplitBill, setSplitDesc: setSplitDesc, setSplitAmount: setSplitAmount,
  setSplitMode: setSplitMode, toggleSplitFriend: toggleSplitFriend, selectSplitGroup: selectSplitGroup,
  clearSplitGroup: clearSplitGroup, toggleGroupMember: toggleGroupMember, toggleSplitFamily: toggleSplitFamily,
  submitSplit: submitSplit,
  setSocialTab: setSocialTab, renderSocial: renderSocial, toggleCreateGroup: toggleCreateGroup, setNewGroupName: setNewGroupName,
  toggleNewGroupMember: toggleNewGroupMember, createGroup: createGroup, openSplitBillForGroup: openSplitBillForGroup,
  openFriendChat: openFriendChat, sendFriendMessage: sendFriendMessage, payFriendFromChat: payFriendFromChat,
  openSendAmountForFriend: openSendAmountForFriend,
  openSendContact: openSendContact, renderContacts: renderContacts, openSendAmount: openSendAmount,
  onAmountInput: onAmountInput, proceedFromAmount: proceedFromAmount,
  pinDigit: pinDigit, pinDelete: pinDelete, submitPin: submitPin, simulateFailure: simulateFailure,
  selectTag: selectTag, openSplitFromSuccess: openSplitFromSuccess,
  smartScan: smartScan,
  openQuickPay: openQuickPay, onQuickPayInput: onQuickPayInput, payQuickPayNormal: payQuickPayNormal,
  payQuickPayGiftCard: payQuickPayGiftCard, resetQuickPay: resetQuickPay,
  openGoalDetail: openGoalDetail, createGoal: createGoal, addGoalMoney: addGoalMoney,
  renderWealth: renderWealth, setWealthTimeframe: setWealthTimeframe, setWealthTab: setWealthTab,
  scrollToWealthAllocation: scrollToWealthAllocation, syncWealth: syncWealth,
  renderHistory: renderHistory, setHistoryView: setHistoryView, setHistorySource: setHistorySource,
  openHistoryFilters: openHistoryFilters, closeHistoryFilters: closeHistoryFilters, setTempFilter: setTempFilter,
  applyHistoryFilters: applyHistoryFilters, resetHistoryFilters: resetHistoryFilters,
  openTxDetail: openTxDetail, closeTxDetail: closeTxDetail, toggleCategorySelector: toggleCategorySelector,
  selectTxCategory: selectTxCategory, setTxNote: setTxNote, saveTxNote: saveTxNote, copyRef: copyRef,
  splitFromHistory: splitFromHistory, payAgainFromHistory: payAgainFromHistory,
  autoFetchReceipt: autoFetchReceipt, openPasteReceipt: openPasteReceipt, closePasteReceipt: closePasteReceipt,
  setPasteText: setPasteText, submitPasteReceipt: submitPasteReceipt,
  forgetFact: forgetFact, toggleDarkMode: toggleDarkMode,
  resetChat: resetChat, sendAiMessage: sendAiMessage, sendAiPreset: sendAiPreset
};

/* HTML markup calls these by bare name (onclick="navigate(...)" etc) — mirror
   every exported function onto the global scope so both TP.x() and x() work. */
Object.keys(window.TP).forEach(function (k) { window[k] = window.TP[k]; });

})();
