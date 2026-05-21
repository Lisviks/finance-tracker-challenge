# Finance Tracker Project

## Summary

Finance Tracker is a beginner-to-early-intermediate practice project for recreating a small personal finance dashboard. The app lets a user add income and expense transactions, see totals update, review recent activity, track spending against category budgets, and keep data in the browser.

## Links

- [[BUILD_KANBAN]]
- [[BUILD_GUIDE]]

## How To Use These Notes

1. Read this project brief first.
2. Open [[BUILD_KANBAN]].
3. Move the next card into `In Progress`.
4. Open the linked card note.
5. Build only that feature.
6. Move the card to `Done` when the checklist passes.
7. Use [[BUILD_GUIDE]] as the full reference when more context is needed.

## Rules For The Learner

- Do not copy code from the finished app.
- Build each feature from the requirements.
- Commit after each completed card.
- Keep changes small.
- Test manually before moving a card to `Done`.
- Write notes when making a design or state-management decision.

## Core Decisions

- Recreate the same user-facing behavior, regardless of technology choice.
- Treat the plain HTML, CSS, and JavaScript reference app as one possible implementation, not the required stack.
- Keep the app client-side only.
- Persist transactions between sessions using an approach appropriate for the chosen stack.
- Keep form controls simple and accessible; the reference app uses native browser controls.
- Make category options depend on the selected transaction type.
- Treat the reference app as a behavior target, not as source code to copy.
- Prefer readable beginner-friendly logic over clever abstractions.

## Main User Flows

- A user opens the app and sees summary totals, budget progress, and recent transactions.
- A user selects income or expense and sees matching category choices.
- A user enters a description, amount, type, category, and date.
- A user submits the form and sees the dashboard update immediately.
- A user deletes a transaction and sees totals and budgets recalculate.
- A user refreshes the page and still sees saved transactions.

## Out Of Scope For Now

- User accounts or authentication.
- Backend database storage.
- Real bank integrations.
- Multi-currency support.
- Editable transactions.
- Importing or exporting CSV files.
- Charts or reporting dashboards.
- Custom dropdown components.

## Ideas / Maybe Later

- Add monthly filtering.
- Add transaction search.
- Add editable budget limits.
- Add charts for spending by category.
- Add a reset sample data button.
- Add dark mode.
- Add validation messages near form fields.
- Add recurring transaction templates.

## Implementation Notes

Use this section for decisions and discoveries while building:

- State management decisions.
- Data storage structure.
- UI behavior rules.
- Edge cases.
- Bugs and fixes.
- Design tradeoffs.
