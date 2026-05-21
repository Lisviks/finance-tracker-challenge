# Render And Recalculate

## Goal

Render dashboard values from state and recalculate them whenever transactions change.

## Checklist

- [ ] Calculate total income.
- [ ] Calculate total expenses.
- [ ] Calculate balance and savings.
- [ ] Calculate spending per budget category.
- [ ] Render summary card values.
- [ ] Render budget progress values.
- [ ] Render transaction rows from state.
- [ ] Keep one clear render flow.

## Notes

When state changes, the UI should update from the current state instead of manually patching unrelated values.
