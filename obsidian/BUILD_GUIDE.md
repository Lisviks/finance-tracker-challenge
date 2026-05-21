# Finance Tracker Build Guide

This guide describes how to recreate the Finance Tracker app from scratch without providing implementation code. It is organized by milestones, from core functionality to polish.

## Related Notes

- [[Finance Tracker Project]]
- [[BUILD_KANBAN]]

## Project Goal

Build a small finance tracker that helps a user record income and expenses, review recent transactions, understand current balance, and compare spending against simple category budgets. The project should be suitable for practicing UI structure, form handling, state management, derived calculations, conditional input options, and persistence.

## Recommended Build Order

### Milestone 1: Static Structure

Create the interface skeleton first. Include a header, summary section, transaction form, budget section, and recent transactions table. At this point the content can be static placeholder data.

Focus on clear structure, accessible labels, and a layout that will be easy to connect to behavior later.

### Milestone 2: Visual Layout

Style the app with a clean dashboard layout. Use responsive grids for summary cards and main panels. Make the form, table, budget rows, and status pills readable on desktop and mobile.

Do not worry about dynamic behavior yet. The goal is to make the static interface feel like a finished dashboard.

### Milestone 3: App State

Decide what a transaction object needs to contain. Track transactions in one simple collection. Use sample transactions so the dashboard has useful data before the user adds anything.

Keep the state shape simple enough to inspect while debugging.

### Milestone 4: Dynamic Rendering

Replace hard-coded summary values, budget values, and table rows with rendered values from state. The dashboard should recalculate totals whenever state changes.

At this stage, manually changing sample data in state should update the UI after the render or update step runs.

### Milestone 5: Form Submission

Connect the transaction form. Read the form values, validate that the description and amount are usable, create a new transaction, add it to state, reset the form, and re-render the dashboard.

The form should support both income and expense transactions.

### Milestone 6: Conditional Categories

Keep the category input simple and accessible, and update its options based on the selected transaction type. Income should show income categories. Expense should show expense categories.

Make sure the selected category never stays on an invalid value after the type changes.

### Milestone 7: Transaction Controls

Add delete behavior for individual transactions. Add a compact recent view and a view-all control for longer lists.

Totals, budget progress, and table rows should stay synchronized after every action.

### Milestone 8: Persistence And Polish

Save transactions using persistence appropriate for the chosen stack and load them when the app starts. Add small UI polish such as empty states, disabled controls when appropriate, and responsive checks.

Manual testing matters here because persistence bugs often appear only after restarting or reopening the app.

## Suggested Feature Priority

Build in this order if you want the smoothest path:

1. App shell and main sections.
2. Summary cards.
3. Transaction form.
4. Budget overview.
5. Recent transactions table.
6. Transaction state collection.
7. Summary and budget calculations.
8. Add transaction flow.
9. Conditional category options.
10. Delete and view controls.
11. Persistence.
12. Responsive and accessibility polish.

## User Stories

Use these as acceptance criteria.

- As a user, I can see my total balance, income, expenses, and savings at a glance.
- As a user, I can add a transaction with description, amount, type, category, and date.
- As a user, I only see categories that make sense for the selected transaction type.
- As a user, I can see recent transactions ordered by date.
- As a user, I can delete a transaction if I entered it by mistake.
- As a user, I can compare expense categories against simple budget limits.
- As a user, I can reopen the app and keep my saved transactions.
- As a user, I can use the app on a narrow mobile screen without broken layout.

## What To Avoid Early

Do not start with:

- Custom dropdown components.
- Authentication or user profiles.
- Charts and data visualizations.
- Editable transactions.
- Complex monthly filtering.
- Backend APIs.
- Build tools or frameworks.
- Advanced animations.

Those may be valid features, but they make the app harder before the core experience is solid.

## Final Definition Of Done

The app is complete when:

- The layout matches the intended dashboard structure.
- The transaction form can add income and expenses.
- Category options update when transaction type changes.
- Summary totals update after add and delete actions.
- Budget progress updates from expense transactions.
- Recent transactions render from application state.
- The view-all control works for longer transaction lists.
- Individual transactions can be deleted.
- Transactions persist after reopening the app.
- Empty and disabled states are handled clearly.
- The interface works at small and large screen sizes.
- The learner can explain the state shape and update flow without reading from the reference implementation.
