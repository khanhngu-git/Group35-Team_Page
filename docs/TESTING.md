# Testing

## Test Layers

| Layer | Command | Tool | Firebase | Description |
|-------|---------|------|----------|-------------|
| Frontend unit | `pnpm run test:component` | Vitest + Testing Library | Mocked | Utils, hooks, components |
| Backend unit | `pnpm run test` | Vitest + supertest | Mocked | Route handlers, middleware |
| All | `pnpm run test:all` | — | — | Runs all layers |

There's no local emulator, so there's no integration-test layer against a real Firestore — all tests mock Firebase and never make real network calls.

## Running Tests

```bash
# Run all tests
pnpm run test:all

# Watch mode (frontend)
pnpm --filter frontend run test:watch

# Watch mode (backend)
pnpm --filter backend run test:watch

# Coverage
pnpm --filter frontend run test:coverage
pnpm --filter backend run test:coverage
```

## What to Test

### Frontend

- **Always test:** utility functions in `src/lib/`, Zod validation schemas, custom hooks
- **Skip:** shadcn `src/components/ui/` components (not hand-authored)
- **Skip:** `src/app/` page files (test via integration or E2E)
- Firebase is always mocked via `tests/setup.ts` — never call real Firebase in unit tests

### Backend

- **Unit tests:** Each route handler tested with supertest; Firebase Admin is mocked
- Every new route created via `/add-route` skill must have at minimum: 200/201 happy path + 401 without token

## Mocking Firebase

**Frontend** (`frontend/tests/setup.ts`):
```typescript
vi.mock('@/lib/firebase/client', () => ({ auth: ..., db: {} }))
vi.mock('@/lib/firebase/admin', () => ({ adminAuth: { verifySessionCookie: vi.fn() }, ... }))
```

**Backend** (`backend/tests/setup.ts`) mocks `src/lib/firebase` so the Admin SDK never initializes, and exports reusable auth mocks. Auth is injected per-app, not patched globally:

```typescript
import { createApp } from '../../../src/app'
import { mockVerifyToken, mockUser } from '../../setup'

const app = createApp({ verifyToken: mockVerifyToken })

// Authenticated request:
vi.mocked(mockVerifyToken).mockResolvedValue(mockUser)

// Unauthenticated request:
vi.mocked(mockVerifyToken).mockRejectedValue(new Error('invalid'))
```

## Manual Testing – Login to Team Page Flow

### Test 1: Valid Login

**Test Date:** 14 August 2026

**Steps:**
1. Opened the deployed application.
2. Created a new user account.
3. Attempted to sign in before email verification.
4. Sign-in was blocked and email verification was requested.
5. Opened the verification email and verified the account.
6. Signed in again using the verified account.

**Expected Result:**
A verified user should be able to sign in successfully.

**Actual Result:**
The application correctly required email verification before allowing sign-in. After verifying the email address, sign-in worked normally.

**Result:** PASS

### Test 2: Redirect to Team Page

**Steps:**
1. Opened the deployed application.
2. Signed in using a verified account.
3. Observed the page displayed immediately after successful login.

**Expected Result:**  
After successful login, the user should automatically be redirected to the Team Page.

**Actual Result:**  
After successful login, the application automatically redirected to the Team Page and loaded successfully.

**Result:** PASS

### Test 3: Required Team Page Content

**Steps:**
1. Opened the Team Page after successful login.
2. Checked the team name.
3. Checked all team member names.
4. Checked each member's role.
5. Checked each member's short blurb.
6. Checked whether each member's photo was displayed.

**Expected Result:**  
The Team Page should display the team name and each member's photo, name, role, and short blurb.

**Actual Result:**  
The team name, member names, roles, and blurbs are displayed correctly. However, individual member photos are not implemented. The page currently displays a generic profile icon for each member.
**Result:** FAIL / Requires Fix


### Test 4: Invalid Login

**Steps:**
1. Opened the deployed login page.
2. Entered an incorrect email address and attempted to sign in.
3. Entered a valid email address with an incorrect password and attempted to sign in.

**Expected Result:**  
Invalid credentials should be rejected and the user should remain on the login page.

**Actual Result:**  
Both the incorrect email and incorrect password attempts were rejected. The application displayed an "Invalid email or password" error message and did not allow access to the Team Page.

**Result:** PASS

### Test 5: Direct Team Page Access Without Login

**Steps:**
1. Opened the Team Page URL in an Incognito browser window.
2. Attempted to access the Team Page without being signed in.
3. The application redirected to the login page.
4. Entered valid login credentials.
5. Successfully accessed the Team Page after authentication.

**Expected Result:**  
An unauthenticated user should not be able to access the Team Page directly and should be redirected to the login page.

**Actual Result:**  
The application redirected the unauthenticated user to the login page and required valid login credentials before allowing access to the Team Page.

**Result:** PASS

### Test 6: Missing Photo Edge Case

**Steps:**
1. Opened the Team Page.
2. Checked how team member cards are displayed when no individual photo data is provided.
3. Verified that the cards use a default profile placeholder.

**Expected Result:**  
A missing photo should not break the Team Page layout and a fallback or placeholder should be displayed.

**Actual Result:**  
The application displayed a default profile icon for team members without individual photos. The cards remained aligned and the page layout was not affected.

**Result:** PASS

### Test 7: Unusually Long Blurb Edge Case

**Steps:**
1. Temporarily replaced one team member's original blurb with unusually long test text.
2. Ran the application locally.
3. Opened the Team Page.
4. Checked the affected member card and overall layout.
5. Restored the original blurb after completing the test.

**Expected Result:**  
An unusually long blurb should remain readable and contained within the member card without overlapping other content or breaking the page layout.

**Actual Result:**  
The unusually long test blurb remained contained within the team member card. It did not overlap other content, create horizontal scrolling, or break the overall page layout. The original blurb was restored after testing.

**Result:** PASS

### Bug Summary

One issue was identified during testing:

**Issue:** Individual team member photos are missing.

**Steps to Reproduce:**
1. Sign in to the application.
2. Navigate to the Team Page.
3. Review the profile section for each team member.

**Expected Result:**  
Each team member should have an individual photo displayed as required by the assignment.

**Actual Result:**  
A generic profile icon is displayed for every team member instead of individual photos.

The remaining tested flows and edge cases behaved as expected.