# Lab 2 — Practice Task Observations

## Task 1 — Flexbox (`justify-content` on `.skills-container`)

| Value | Observation |
|---|---|
| `center` | The four skill boxes sit together in the middle of the row; leftover space is split outside the group. |
| `space-between` | First box touches the left edge, last box touches the right edge, equal gaps only *between* boxes. |
| `space-around` | Each box gets an equal share of space on both sides, so the outer gaps look about half the size of the inner gaps. |
| `space-evenly` | Every gap — including the two outer ones — is exactly the same width. |

Note: because `.skill-box` uses `flex: 1 1 200px`, the boxes grow to fill the row,
so the difference is clearest when the boxes are narrowed or one is removed.

## Task 2 — Flex Direction

Adding `flex-direction: column;` stacks the skill boxes vertically, one per line.
The main axis becomes vertical, so `justify-content` now controls vertical
spacing and `align-items` controls horizontal alignment — the two axes swap roles.
Returning to `flex-direction: row;` restores the horizontal layout.

## Task 3 — Positioning

Changing `.online-badge` from `position: absolute;` to `position: relative;`
moves the badge out of the corner of the image and back into the normal document
flow — it appears *below* the image instead of on top of it.

**Why:** an absolutely positioned element is removed from normal flow and placed
against its nearest positioned ancestor (`.profile-image-container`, which is
`position: relative`), so `bottom` / `right` anchor it to the image corner.
A relatively positioned element stays in normal flow and keeps its original
space; `bottom` / `right` only nudge it visually from where it would already be.

## Task 4 — Pseudo-element

Changing `.profile-card::before` to `.profile-card::after` keeps the blue
"PROFILE" label in the same visual place, because `top: -12px; left: 25px;` with
`position: absolute` pins it regardless of source order.
Remove the positioning properties and the difference is obvious:
`::before` renders the text at the very start of the card content,
`::after` renders it at the very end.

## Task 5 — Filter

- `filter: blur(3px);` — the second project image becomes soft and out of focus.
- `filter: brightness(70%);` — the image darkens to 70% of its normal brightness.
- On hover the `.grayscale:hover img` rule resets the filter, so the image snaps
  back to normal. The change is instant here because `filter` is not listed in
  the `transition` property — only `transform` is.

## Task 6 — Transform

`transform: translateY(-10px);` lifts the project card straight up by 10px on hover.
`transform: scale(1.05);` instead enlarges the whole card to 105% of its size,
growing outward from its centre. Both animate smoothly because of
`transition: transform 0.3s ease;`.

## Task 7 — Bootstrap Flex

| Class | Equivalent CSS | Observation |
|---|---|---|
| `justify-content-between` | `justify-content: space-between` | Items pushed to the two ends of the white panel. |
| `justify-content-center` | `justify-content: center` | Items grouped in the middle of the panel. |
| `justify-content-around` | `justify-content: space-around` | Equal space around each item; outer gaps look half-size. |
| `justify-content-evenly` | `justify-content: space-evenly` | All gaps identical, including the outer ones. |

Key point: these utility classes do exactly what the custom CSS in
`.skills-container` does — Bootstrap just ships them pre-written.
