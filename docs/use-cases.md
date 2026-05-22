# Use Cases

## UC1: Register Account

Actor: Guest

Preconditions:
- User is not authenticated

Main Flow:
1. User enters username, email and password
2. System validates data
3. System creates account
4. System returns success response

Alternative Flows:
- Invalid email → 400
- Username already exists → 409

---

## UC2: Login

Actor: Registered user

Preconditions:
- User account exists

Main Flow:
1. User enters credentials
2. System validates credentials
3. JWT token is generated
4. User receives token

Alternative Flows:
- Wrong password → 401
- User not found → 404

---

## UC3: Create Post

Actor: Authenticated user

Preconditions:
- User authenticated

Main Flow:
1. User sends post content
2. System validates post
3. System creates post
4. System returns created post

Alternative Flows:
- Empty title → 400
- Unauthorized → 401