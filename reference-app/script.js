const STORAGE_KEY = "finance-tracker-transactions";

const budgets = {
  Housing: 1500,
  Food: 650,
  Transport: 300,
  Entertainment: 250,
};

const categoriesByType = {
  expense: ["Food", "Housing", "Transport", "Health", "Entertainment"],
  income: ["Salary", "Freelance", "Gift", "Interest", "Other income"],
};

function generateId() {
  if (globalThis.crypto && globalThis.crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const starterTransactions = [
  {
    id: generateId(),
    description: "Salary deposit",
    amount: 3600,
    type: "income",
    category: "Salary",
    date: "2026-05-20",
  },
  {
    id: generateId(),
    description: "Apartment rent",
    amount: 1200,
    type: "expense",
    category: "Housing",
    date: "2026-05-18",
  },
  {
    id: generateId(),
    description: "Market groceries",
    amount: 86.4,
    type: "expense",
    category: "Food",
    date: "2026-05-17",
  },
  {
    id: generateId(),
    description: "Metro pass",
    amount: 42,
    type: "expense",
    category: "Transport",
    date: "2026-05-15",
  },
];

const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const transactionsBody = document.querySelector("#transactions-body");
const toggleViewButton = document.querySelector("#toggle-view");

const balanceTotal = document.querySelector("#balance-total");
const balanceNote = document.querySelector("#balance-note");
const incomeTotal = document.querySelector("#income-total");
const incomeNote = document.querySelector("#income-note");
const expenseTotal = document.querySelector("#expense-total");
const expenseNote = document.querySelector("#expense-note");
const savingsTotal = document.querySelector("#savings-total");
const savingsNote = document.querySelector("#savings-note");
const currentMonth = document.querySelector("#current-month");
const currentYear = document.querySelector("#current-year");

let transactions = loadTransactions();
let showAllTransactions = false;

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function loadTransactions() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return starterTransactions;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return starterTransactions;
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function setCurrentDateLabels() {
  const today = new Date();
  currentMonth.textContent = today.toLocaleDateString("en-US", {
    month: "long",
  });
  currentYear.textContent = today.getFullYear();
  dateInput.value = today.toISOString().slice(0, 10);
}

function updateCategoryOptions() {
  const selectedType = typeInput.value;
  const availableCategories = categoriesByType[selectedType];
  const currentCategory = categoryInput.value;

  categoryInput.innerHTML = "";

  availableCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryInput.append(option);
  });

  if (availableCategories.includes(currentCategory)) {
    categoryInput.value = currentCategory;
  } else {
    categoryInput.value = availableCategories[0];
  }
}

function getTotals() {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === "income") {
        totals.income += transaction.amount;
        totals.incomeCount += 1;
      } else {
        totals.expenses += transaction.amount;
      }

      return totals;
    },
    { income: 0, expenses: 0, incomeCount: 0 },
  );
}

function updateSummary() {
  const totals = getTotals();
  const balance = totals.income - totals.expenses;
  const totalBudget = Object.values(budgets).reduce((sum, budget) => {
    return sum + budget;
  }, 0);
  const budgetPercent = totalBudget
    ? Math.round((totals.expenses / totalBudget) * 100)
    : 0;

  balanceTotal.textContent = moneyFormatter.format(balance);
  balanceNote.textContent =
    balance >= 0 ? "You are above zero" : "Spending is ahead of income";
  incomeTotal.textContent = moneyFormatter.format(totals.income);
  incomeNote.textContent = `${totals.incomeCount} payment${
    totals.incomeCount === 1 ? "" : "s"
  } received`;
  expenseTotal.textContent = moneyFormatter.format(totals.expenses);
  expenseNote.textContent = `${budgetPercent}% of monthly budget`;
  savingsTotal.textContent = moneyFormatter.format(Math.max(balance, 0));
  savingsNote.textContent =
    balance >= 0 ? "Income minus expenses" : "No savings yet";
}

function updateBudgets() {
  Object.entries(budgets).forEach(([category, budget]) => {
    const budgetItem = document.querySelector(
      `[data-budget-category="${category}"]`,
    );
    const spent = transactions
      .filter((transaction) => {
        return transaction.type === "expense" && transaction.category === category;
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const percent = Math.min(Math.round((spent / budget) * 100), 100);
    const label = budgetItem.querySelector("strong");
    const progress = budgetItem.querySelector(".progress");

    label.textContent = `${moneyFormatter.format(spent)} / ${moneyFormatter.format(
      budget,
    )}`;
    progress.style.width = `${percent}%`;
  });
}

function getPillClass(transaction) {
  if (transaction.type === "income") {
    return "income";
  }

  const categoryClass = {
    Housing: "housing-pill",
    Food: "food-pill",
    Transport: "transport-pill",
    Entertainment: "entertainment-pill",
  };

  return categoryClass[transaction.category] || "default-pill";
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function renderTransactions() {
  const orderedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const visibleTransactions = showAllTransactions
    ? orderedTransactions
    : orderedTransactions.slice(0, 4);

  transactionsBody.innerHTML = "";

  if (!visibleTransactions.length) {
    transactionsBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">No transactions yet.</td>
      </tr>
    `;
    return;
  }

  visibleTransactions.forEach((transaction) => {
    const row = document.createElement("tr");
    const amountPrefix = transaction.type === "income" ? "+" : "-";
    const amountClass =
      transaction.type === "income" ? "income-text" : "expense-text";

    row.innerHTML = `
      <td>
        <strong>${escapeHTML(transaction.description)}</strong>
        <span>${transaction.type === "income" ? "Money in" : "Money out"}</span>
      </td>
      <td><span class="pill ${getPillClass(transaction)}">${
        escapeHTML(transaction.category)
      }</span></td>
      <td>${dateFormatter.format(new Date(`${transaction.date}T00:00:00`))}</td>
      <td class="amount ${amountClass}">
        ${amountPrefix}${moneyFormatter.format(transaction.amount)}
        <button type="button" class="delete-button" data-id="${
          transaction.id
        }" aria-label="Delete ${escapeHTML(transaction.description)}">Delete</button>
      </td>
    `;

    transactionsBody.append(row);
  });
}

function render() {
  updateSummary();
  updateBudgets();
  renderTransactions();

  toggleViewButton.textContent = showAllTransactions ? "Show less" : "View all";
  toggleViewButton.disabled = transactions.length <= 4;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);

  if (!descriptionInput.value.trim() || !amount || amount <= 0) {
    return;
  }

  transactions.push({
    id: generateId(),
    description: descriptionInput.value.trim(),
    amount,
    type: typeInput.value,
    category: categoryInput.value,
    date: dateInput.value,
  });

  saveTransactions();
  form.reset();
  updateCategoryOptions();
  dateInput.value = new Date().toISOString().slice(0, 10);
  descriptionInput.focus();
  render();
});

typeInput.addEventListener("change", updateCategoryOptions);

transactionsBody.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) {
    return;
  }

  transactions = transactions.filter((transaction) => {
    return transaction.id !== deleteButton.dataset.id;
  });
  saveTransactions();
  render();
});

toggleViewButton.addEventListener("click", () => {
  showAllTransactions = !showAllTransactions;
  render();
});

setCurrentDateLabels();
updateCategoryOptions();
render();
