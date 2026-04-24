# Phone Validation Fix

## Problem
When saving profile without a phone number, the backend returned error:
```
"phone must be a valid phone number"
```

## Root Cause
The backend DTO (`UpdateProfileDto`) was using `@IsPhoneNumber()` validator which was validating empty strings as invalid phone numbers. The `@IsOptional()` decorator doesn't skip validation for empty strings, only for `undefined` or `null`.

## Solution

### 1. Backend Fix (DTO Validation)
**File:** `backend/src/auth/dto/update-profile.dto.ts`

Added `@ValidateIf()` decorator to only validate phone when it has a value:

```typescript
@IsOptional()
@ValidateIf((o) => o.phone !== '' && o.phone !== null && o.phone !== undefined)
@IsPhoneNumber(undefined, {
  message: 'Phone must be a valid phone number (e.g., +1234567890 or +911234567890)',
})
phone?: string | null;
```

**How it works:**
- `@ValidateIf()` checks if phone has a value before applying validation
- Empty strings, null, and undefined skip phone validation
- Only validates when user provides an actual phone number

### 2. Frontend Fix (Profile Page)
**File:** `v3/src/app/profile/page.tsx`

**Change 1:** Send `null` instead of empty string
```typescript
const updated = await updateProfile({
  name: editedUser.name,
  bio: editedUser.bio,
  phone: editedUser.phone.trim() === "" ? null : editedUser.phone.trim(),
  username: editedUser.username,
});
```

**Change 2:** Added helpful placeholder and hint
```typescript
<input
  type="tel"
  placeholder="+1234567890 or +911234567890 (optional)"
/>
<p className="text-[10px] text-slate-500 mt-1">
  Include country code (e.g., +1 for US, +91 for India)
</p>
```

## Valid Phone Number Formats

The `@IsPhoneNumber()` validator accepts international phone numbers with country codes:

✅ **Valid formats:**
- `+1234567890` (US)
- `+911234567890` (India)
- `+442071234567` (UK)
- `+61412345678` (Australia)
- `+8613800138000` (China)

❌ **Invalid formats:**
- `1234567890` (missing country code)
- `+1 (234) 567-8900` (formatting not supported)
- `123-456-7890` (no country code)

## Testing

### Test 1: Save without phone number
1. Go to profile page
2. Click "Edit Profile"
3. Leave phone field empty
4. Click "Save Changes"
5. **Expected:** ✅ Saves successfully

### Test 2: Save with valid phone number
1. Go to profile page
2. Click "Edit Profile"
3. Enter: `+1234567890`
4. Click "Save Changes"
5. **Expected:** ✅ Saves successfully

### Test 3: Save with invalid phone number
1. Go to profile page
2. Click "Edit Profile"
3. Enter: `1234567890` (no country code)
4. Click "Save Changes"
5. **Expected:** ❌ Shows error: "Phone must be a valid phone number"

## Files Changed

1. `backend/src/auth/dto/update-profile.dto.ts` - Added ValidateIf decorator
2. `v3/src/app/profile/page.tsx` - Send null for empty phone, added hints

## Summary

✅ Phone field is now optional
✅ Empty phone numbers are accepted
✅ Valid phone numbers must include country code
✅ Better UX with placeholder and hints
✅ Validation only runs when phone is provided
