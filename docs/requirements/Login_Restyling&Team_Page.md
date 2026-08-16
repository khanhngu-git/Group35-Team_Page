# Login Restyling & Team Page: Requirements

**Project:** AI Travel Assistant for Accessible Aviation (Team A)

**Task:** Task 2: Mock Sprint

**Prepared by:** Wen Bin Liang (BA)

---

## 1. Purpose & Scope

This document defines the requirements for the two deliverables in this sprint:

1. Restyling the existing boilerplate login page
2. Building a new Team Page

It is the single source of truth for UX and Development, no design or build decisions should be made outside of what is documented here without checking back with the BA.

---

## 2. Login Page: Requirements

### 2.1 Scope statement (read first)

> **This task is STYLING ONLY.** No changes are permitted to authentication logic, form validation, session handling, redirect behavior, or error handling. Every requirement below concerns visual presentation, not functional behavior.

### 2.2 What may change

- **Colors**: background, button, input border, text, focus states
- **Typography**: font family, size, weight, line height
- **Spacing**: padding, margins, layout alignment
- **Component styling**: button shape, input field appearance, card/container styling
- **Adding brand elements**: logo, app name, tagline (static content only)

### 2.3 What must NOT change

- Field names, IDs, or the data submitted by the form
- Validation rules or error message logic (error message wording/placement styling is fine; the logic that triggers them is not)
- Authentication flow (sign-in, sign-up, redirect-after-login behavior)
- Session/cookie handling
- Any existing test coverage: all current auth tests must still pass unmodified

### 2.4 Elements present on the page (for design reference)

| Element              | Current state       | Styling notes                                                       |
| -------------------- | ------------------- | ------------------------------------------------------------------- |
| Email input          | Present, functional | Restyle only, keep placeholder text `you@example.com`               |
| Password input       | Present, functional | Restyle only, keep masked input behavior                            |
| Sign in button       | Present, functional | Restyle only, keep label "Sign in"                                  |
| Continue with Google | Present, functional | Restyle only, must remain visually distinct as a third-party option |
| "Create one" link    | Present, functional | Restyle only, keep linking to sign-up                               |

---

## 3. Team Page: Requirements

### 3.1 Purpose

A new page, reachable after login, that displays the five members of Team A.

### 3.2 Content fields per team member

| Field       | Type  | Validation / display rules                                                                     |
| ----------- | ----- | ---------------------------------------------------------------------------------------------- |
| Name        | Text  | Full name as provided by the member                                                            |
| Role        | Text  | One of: PM, BA, UX, Dev                                                                        |
| Photo       | Image | Profile photo provided by the member. See [edge case](#35-edge-cases-to-design-for) if missing |
| Blurb / bio | Text  | Short bio/description, 100 character max                                                       |

### 3.3 The five team members

- **Daniel Francisco**: PM
- **Khanh Nguyen**: Dev
- **Aindrila Das Prapti**: Dev
- **Ryan Lim**: UX
- **Wen Bin Liang**: BA

### 3.4 Display & layout rules

- **Layout:** card-style grid, one card per member
- **Ordering:** by role: PM first, then BA, then UX, then Dev(s), matching how the assignment sheet lists roles
- Each card shows, top to bottom: photo, name, role label, blurb
- Role should be visually distinguished (e.g. a small colored tag/badge), not just plain text
- Page should have a short heading, e.g. "Meet the Team" or the project name

### 3.5 Edge cases to design for

These describe how the team page should look when a member's data isn't the typical case. The page should still display cleanly in these situations.

- **Missing photo**: show a placeholder avatar, never a broken image icon
- **Missing blurb**: hide the blurb section entirely for that member; do not leave visible empty space
- **Missing role**: default to no badge shown, rather than displaying blank/undefined text
- **Responsive behavior**: cards should reflow (e.g. grid to single column) on smaller screens
