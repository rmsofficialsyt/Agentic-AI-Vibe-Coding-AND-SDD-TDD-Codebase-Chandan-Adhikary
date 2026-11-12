# FEAT-001 Acceptance Criteria (SAMPLE)

**Spec version:** 1.0.0 · **Status:** APPROVED (sample) · Header and history: [`feature.md`](feature.md)

### AC-FEAT001-01: Valid credentials create a session

- **Given** an active user of an active tenant
- **When** they submit a correct `email`, `password` and `tenant_id`
- **Then** the response is `200`, httpOnly session cookies are set and the profile includes the user's role
- **Covers:** FR-FEAT001-01, NFR-FEAT001-02

### AC-FEAT001-02: Invalid credentials are rejected generically

- **Given** an unknown email **or** a wrong password
- **When** the user submits the login form
- **Then** the response is `401` with the message `Invalid credentials`, identical for both cases, and no session cookie is set
- **Covers:** FR-FEAT001-02, NFR-FEAT001-03

### AC-FEAT001-03: Repeated failures lock the account

- **Given** a user with 4 consecutive failed attempts
- **When** a 5th failed attempt occurs
- **Then** the account is locked for 15 minutes, further attempts return `423` with a retry-after value, and an audit event `auth.lockout` is written
- **Covers:** FR-FEAT001-03

### AC-FEAT001-04: Inactive tenant users are refused

- **Given** a user whose tenant is inactive or deleted
- **When** they submit correct credentials
- **Then** the response is `403` and no session is created
- **Covers:** FR-FEAT001-04

### AC-FEAT001-05: Logout invalidates the refresh token

- **Given** a signed-in user
- **When** they log out and then call `/auth/refresh` with the old refresh token
- **Then** logout returns `204` and the refresh call returns `401`
- **Covers:** FR-FEAT001-05
