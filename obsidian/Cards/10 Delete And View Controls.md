# Delete And View Controls

## Goal

Add controls for deleting transactions and switching between recent and full transaction views.

## Checklist

- [ ] Add a delete control to rendered transaction rows.
- [ ] Remove the matching transaction from state when delete is clicked.
- [ ] Re-render summaries, budgets, and rows after delete.
- [ ] Show only a compact set of recent transactions by default.
- [ ] Add a view-all or show-less toggle.
- [ ] Disable or hide the toggle when it is not useful.

## Notes

Use transaction IDs for delete behavior so duplicate descriptions do not cause mistakes.
