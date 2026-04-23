# Profile API Testing Guide

## Prerequisites

1. **Supabase Setup**
   - Supabase project created
   - `profiles` table exists with correct schema
   - Environment variables configured

2. **Environment Variables**

Create `v3/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Create `backend/.env`:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Frontend Testing

### 1. Start Development Server

```bash
cd v3
npm install  # if not already done
npm run dev
```

The app should start at `http://localhost:3000`

### 2. Test Authentication Flow

1. Navigate to `http://localhost:3000/auth`
2. Sign up or log in with Google OAuth
3. After successful authentication, you should be redirected to `/profile`

### 3. Test Profile Loading

**Expected Behavior:**
- Loading spinner appears briefly
- Profile data loads from database
- If no profile exists, one is created automatically
- Profile displays:
  - Avatar (initials or image)
  - Name (or "User" if not set)
  - Username (if set)
  - Email address
  - Bio (if set)
  - Phone (if set)
  - Member since date

**Check Browser Console:**
```javascript
// Should see no errors
// Profile data should be logged
```

### 4. Test Profile Editing

1. Click "Edit Profile" button
2. Form fields should appear with current values
3. Update the following:
   - Name: "Test User"
   - Username: "testuser123"
   - Bio: "This is a test bio"
   - Phone: "+1234567890"
4. Click "Save Changes"

**Expected Behavior:**
- "Saving..." text appears on button
- Button is disabled during save
- Success: Profile updates and edit mode closes
- Error: Error message appears above form

### 5. Test Username Uniqueness

1. Click "Edit Profile"
2. Try to use a username that already exists
3. Click "Save Changes"

**Expected Behavior:**
- Error message: "Username already taken"
- Form remains in edit mode
- No changes saved

### 6. Test Cancel Button

1. Click "Edit Profile"
2. Make some changes
3. Click "Cancel"

**Expected Behavior:**
- Form closes
- Changes are discarded
- Original values remain

### 7. Test Referral Code

1. Check the "Refer & Earn" section
2. Referral code should show username or user ID
3. Click copy button

**Expected Behavior:**
- Checkmark appears briefly
- Referral link copied to clipboard
- Format: `https://unifesto.app/signup?ref=username`

### 8. Test Social Sharing

1. Click WhatsApp share button
2. Click Twitter share button
3. Click LinkedIn share button

**Expected Behavior:**
- Each opens respective platform with pre-filled message
- Message includes referral code and link

### 9. Test Logout

1. Click "Logout" button

**Expected Behavior:**
- User is logged out
- Redirected to home page (`/`)
- Accessing `/profile` redirects to `/auth`

## Backend Testing

### 1. Start Backend Server

```bash
cd backend
npm install  # if not already done
npm run start:dev
```

Server should start at `http://localhost:3000`

### 2. Get Authentication Token

**Option A: From Browser**
1. Login to the frontend
2. Open browser DevTools → Application → Local Storage
3. Find `supabase.auth.token`
4. Copy the `access_token` value

**Option B: From Supabase Dashboard**
1. Go to Supabase Dashboard → Authentication → Users
2. Click on a user
3. Copy the JWT token

### 3. Test GET /auth/me

```bash
TOKEN="your-jwt-token"

curl -X GET \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/auth/me
```

**Expected Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "name": "Test User",
    "username": "testuser123",
    "avatar_url": null,
    "bio": "This is a test bio",
    "phone": "+1234567890",
    "role": "attendee",
    "is_verified": false,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### 4. Test POST /auth/sync

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/auth/sync
```

**Expected Response:**
```json
{
  "message": "Profile synced successfully",
  "profile": { ... }
}
```

### 5. Test PATCH /auth/profile

```bash
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "username": "newusername",
    "bio": "Updated bio",
    "phone": "+9876543210"
  }' \
  http://localhost:3000/auth/profile
```

**Expected Response:**
```json
{
  "message": "Profile updated successfully",
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Updated Name",
    "username": "newusername",
    "bio": "Updated bio",
    "phone": "+9876543210",
    "role": "attendee",
    "is_verified": false,
    "is_active": true,
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### 6. Test Validation Errors

**Invalid Username (too short):**
```bash
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "ab"}' \
  http://localhost:3000/auth/profile
```

**Expected Response:** 400 Bad Request

**Invalid Username (special characters):**
```bash
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "user@name"}' \
  http://localhost:3000/auth/profile
```

**Expected Response:** 400 Bad Request

**Duplicate Username:**
```bash
# First, create a user with username "testuser"
# Then try to use the same username with a different user

curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser"}' \
  http://localhost:3000/auth/profile
```

**Expected Response:** 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Username already taken"
}
```

## Database Testing

### 1. Check Profile Creation

```sql
-- In Supabase SQL Editor
SELECT * FROM profiles WHERE email = 'your-test-email@example.com';
```

**Expected Result:**
- One row with user data
- `created_at` and `updated_at` timestamps
- Default values for role, is_verified, is_active, is_banned

### 2. Check Profile Updates

```sql
-- After updating profile via API
SELECT * FROM profiles WHERE id = 'your-user-id';
```

**Expected Result:**
- Updated fields reflect new values
- `updated_at` timestamp is more recent than `created_at`

### 3. Check Username Uniqueness

```sql
-- Try to insert duplicate username (should fail)
INSERT INTO profiles (id, username, email, role, is_verified, is_active, is_banned)
VALUES (
  gen_random_uuid(),
  'existingusername',
  'test@example.com',
  'attendee',
  false,
  true,
  false
);
```

**Expected Result:**
- Error: duplicate key value violates unique constraint "profiles_username_key"

## Common Issues and Solutions

### Issue: "Profile not found" error

**Solution:**
- Check if user is authenticated
- Verify JWT token is valid
- Check if profile exists in database
- Try calling `/auth/sync` to create profile

### Issue: "Username already taken" error

**Solution:**
- Choose a different username
- Check database for existing usernames:
  ```sql
  SELECT username FROM profiles WHERE username = 'desired-username';
  ```

### Issue: Profile not loading on frontend

**Solution:**
1. Check browser console for errors
2. Verify Supabase environment variables
3. Check network tab for API calls
4. Verify user is authenticated:
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   console.log(session);
   ```

### Issue: Changes not persisting

**Solution:**
1. Check if save operation succeeded (no errors in console)
2. Verify database was updated:
   ```sql
   SELECT * FROM profiles WHERE id = 'your-user-id';
   ```
3. Check `updated_at` timestamp
4. Try refreshing the page

### Issue: CORS errors

**Solution:**
- Ensure backend CORS is configured correctly
- Check if frontend URL is allowed
- Verify API endpoint URLs are correct

## Performance Testing

### 1. Profile Load Time

- Should load in < 1 second
- Check Network tab in DevTools
- Look for slow queries

### 2. Profile Update Time

- Should save in < 500ms
- Check for unnecessary re-renders
- Verify optimistic updates

### 3. Concurrent Updates

- Open profile in two browser tabs
- Update in both tabs simultaneously
- Verify last write wins
- Check for race conditions

## Security Testing

### 1. Test Unauthorized Access

```bash
# Try to access without token
curl -X GET http://localhost:3000/auth/me
```

**Expected Response:** 401 Unauthorized

### 2. Test Invalid Token

```bash
curl -X GET \
  -H "Authorization: Bearer invalid-token" \
  http://localhost:3000/auth/me
```

**Expected Response:** 401 Unauthorized

### 3. Test Cross-User Access

- User A tries to update User B's profile
- Should be prevented by authentication

## Automated Testing

### Frontend Unit Tests (Future)

```typescript
// Example test structure
describe('Profile API', () => {
  it('should fetch profile', async () => {
    const profile = await getProfile();
    expect(profile).toBeDefined();
    expect(profile?.email).toBe('test@example.com');
  });

  it('should update profile', async () => {
    const updated = await updateProfile({ name: 'New Name' });
    expect(updated?.name).toBe('New Name');
  });
});
```

### Backend Unit Tests (Future)

```typescript
// Example test structure
describe('AuthService', () => {
  it('should get profile by id', async () => {
    const profile = await service.getProfile(userId);
    expect(profile).toBeDefined();
  });

  it('should throw NotFoundException for invalid id', async () => {
    await expect(service.getProfile('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
```

## Checklist

- [ ] Frontend starts without errors
- [ ] Backend starts without errors
- [ ] User can login successfully
- [ ] Profile loads on /profile page
- [ ] Profile is created automatically if missing
- [ ] User can edit profile
- [ ] Changes are saved to database
- [ ] Username uniqueness is enforced
- [ ] Error messages display correctly
- [ ] Referral code works
- [ ] Social sharing links work
- [ ] Logout works correctly
- [ ] All API endpoints respond correctly
- [ ] Database constraints work
- [ ] No console errors
- [ ] No network errors

## Success Criteria

✅ All tests pass
✅ No errors in console
✅ Profile data persists across page reloads
✅ Updates reflect immediately
✅ Error handling works correctly
✅ Authentication is enforced
✅ Database constraints are respected

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify environment variables
3. Check Supabase dashboard for data
4. Review API_IMPLEMENTATION.md for details
5. Check network tab for failed requests
