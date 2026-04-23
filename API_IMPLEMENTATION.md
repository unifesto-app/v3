# Profile API Implementation

This document describes the implementation of the user profile API that fetches and stores user data using the Supabase `profiles` table.

## Database Schema

The `profiles` table in Supabase has the following structure:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'attendee' CHECK (role IN ('attendee', 'super_admin', 'support')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Frontend Implementation (Next.js)

### API Functions

Location: `v3/src/lib/api/profile.ts`

#### `getProfile()`
Fetches the current user's profile from the `profiles` table.

```typescript
const profile = await getProfile();
```

Returns: `Profile | null`

#### `createProfileIfNotExists()`
Creates a profile for the current user if it doesn't exist. Automatically called on first login.

```typescript
const profile = await createProfileIfNotExists();
```

Returns: `Profile | null`

#### `updateProfile(updateDto)`
Updates the current user's profile with the provided data.

```typescript
const updated = await updateProfile({
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  phone: "+1234567890"
});
```

Parameters:
- `updateDto`: `UpdateProfileDto` object with optional fields:
  - `name?: string`
  - `username?: string`
  - `avatar_url?: string`
  - `bio?: string`
  - `phone?: string`

Returns: `Profile | null`

#### `isUsernameAvailable(username)`
Checks if a username is available.

```typescript
const available = await isUsernameAvailable("johndoe");
```

Returns: `boolean`

### Types

Location: `v3/src/types/profile.ts`

```typescript
export enum UserRole {
  ATTENDEE = "attendee",
  SUPER_ADMIN = "super_admin",
  SUPPORT = "support",
}

export interface Profile {
  id: string;
  name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileDto {
  name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
}
```

### Usage in Profile Page

The profile page (`v3/src/app/profile/page.tsx`) has been updated to:

1. **Load Profile on Mount**: Fetches the user's profile when the page loads
2. **Create Profile if Missing**: Automatically creates a profile if one doesn't exist
3. **Edit Profile**: Allows users to edit their name, username, bio, and phone
4. **Real-time Updates**: Updates are immediately reflected in the UI
5. **Error Handling**: Displays error messages for failed operations

## Backend Implementation (NestJS)

### Service Methods

Location: `backend/src/auth/auth.service.ts`

#### `getProfile(userId: string)`
Fetches a user profile by ID.

```typescript
const profile = await this.authService.getProfile(userId);
```

Returns: `Promise<Profile>`

Throws:
- `NotFoundException`: Profile not found
- `InternalServerErrorException`: Database error

#### `createProfileIfNotExists(user: RequestUser)`
Creates a profile if it doesn't exist (idempotent operation).

```typescript
const profile = await this.authService.createProfileIfNotExists(user);
```

Returns: `Promise<Profile>`

#### `updateProfile(userId: string, updateDto: UpdateProfileDto)`
Updates a user's profile.

```typescript
const profile = await this.authService.updateProfile(userId, {
  name: "John Doe",
  username: "johndoe"
});
```

Returns: `Promise<Profile>`

Throws:
- `NotFoundException`: Profile not found
- `ConflictException`: Username already taken
- `InternalServerErrorException`: Database error

#### `isUserBanned(userId: string)`
Checks if a user is banned.

```typescript
const banned = await this.authService.isUserBanned(userId);
```

Returns: `Promise<boolean>`

#### `isUserActive(userId: string)`
Checks if a user is active and not banned.

```typescript
const active = await this.authService.isUserActive(userId);
```

Returns: `Promise<boolean>`

### API Endpoints

Location: `backend/src/auth/auth.controller.ts`

#### `GET /auth/me`
Get current user profile.

**Authentication**: Required (Bearer token)

**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "name": "John Doe",
    "username": "johndoe",
    "avatar_url": "https://...",
    "bio": "Software developer",
    "phone": "+1234567890",
    "role": "attendee",
    "is_verified": false,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `POST /auth/sync`
Sync user profile (create if not exists).

**Authentication**: Required (Bearer token)

**Response**:
```json
{
  "message": "Profile synced successfully",
  "profile": { ... }
}
```

#### `PATCH /auth/profile`
Update user profile.

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "bio": "Software developer",
  "phone": "+1234567890"
}
```

**Response**:
```json
{
  "message": "Profile updated successfully",
  "profile": { ... }
}
```

**Validation**:
- `name`: 2-100 characters
- `username`: 3-30 characters, alphanumeric with underscores/hyphens only, unique
- `avatar_url`: Valid URL, max 500 characters
- `bio`: Max 500 characters
- `phone`: Valid phone number format

### DTO Validation

Location: `backend/src/auth/dto/update-profile.dto.ts`

The `UpdateProfileDto` uses class-validator decorators for validation:

```typescript
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/)
  username?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  avatar_url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
```

## Authentication Flow

1. **User Signs Up/Logs In**: User authenticates via Supabase Auth
2. **Profile Check**: Frontend checks if profile exists
3. **Profile Creation**: If no profile exists, `createProfileIfNotExists()` is called
4. **Profile Display**: Profile data is displayed on the profile page
5. **Profile Updates**: User can edit and save profile changes

## Security

- All API endpoints require authentication via Supabase JWT
- Username uniqueness is enforced at the database level
- Profile updates are validated using class-validator
- Users can only access and modify their own profile
- Service role key is used in backend for admin operations

## Error Handling

### Frontend
- Network errors are caught and displayed to the user
- Failed profile creation falls back to fetching existing profile
- Username conflicts show appropriate error messages

### Backend
- `NotFoundException`: 404 status code
- `ConflictException`: 409 status code (username taken)
- `InternalServerErrorException`: 500 status code
- All errors are logged for debugging

## Testing

### Frontend Testing
```bash
cd v3
npm run dev
```

1. Navigate to `/profile`
2. Verify profile loads correctly
3. Click "Edit Profile"
4. Update fields and save
5. Verify changes persist after page reload

### Backend Testing
```bash
cd backend
npm run start:dev
```

Test endpoints using curl or Postman:

```bash
# Get profile
curl -H "Authorization: Bearer <token>" http://localhost:3000/auth/me

# Update profile
curl -X PATCH \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","username":"johndoe"}' \
  http://localhost:3000/auth/profile
```

## Future Enhancements

- [ ] Avatar upload functionality
- [ ] Email verification flow
- [ ] Phone number verification
- [ ] Profile completion percentage
- [ ] Social media links
- [ ] Privacy settings
- [ ] Profile visibility controls
