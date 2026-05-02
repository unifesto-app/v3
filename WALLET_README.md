# Wallet Feature - v3 Web Application

## Overview

The wallet feature provides users with a comprehensive view of their Unifesto wallet, including balance, transaction history, and referral system. This implementation matches the mobile app's functionality and design.

## Features

### 🎨 "Pocket by unifesto" Branding
- Yellow gradient "Pocket" logo
- Consistent with mobile app branding
- Professional and recognizable design

### 💰 Wallet Balance
- Large, prominent balance display
- Blue gradient card design
- Real-time balance updates
- Currency display (Uni Coins)

### 📊 Wallet Statistics
- **Total Earned**: All coins earned through events and referrals
- **Total Spent**: All coins spent on tickets and purchases
- **Total Transactions**: Complete transaction count

### 📝 Transaction History
- Complete list of all transactions
- Color-coded amounts:
  - 🟢 Green for earned/received
  - 🔴 Red for spent/paid
- Transaction details:
  - Type (earned, spent, referral_bonus, event_reward, etc.)
  - Amount
  - Description
  - Date
- Icon indicators for transaction type
- Formatted dates (e.g., "April 10, 2026")
- Empty state with helpful message

### 🎁 Referral System
- **Referral Code Display**
  - Large, gradient-styled code
  - Copy to clipboard button
  - Visual feedback on copy (checkmark)
- **Referral Statistics**
  - Total referrals count
  - Total coins earned from referrals
- **Referral History**
  - List of all referrals
  - Status badges:
    - 🟡 Pending - Referral not yet completed
    - 🔵 Completed - Referral completed, awaiting reward
    - 🟢 Rewarded - Coins awarded
  - Reward amounts
  - Referral dates

### 🔄 Tab Navigation
- **Transaction History Tab**: View all transactions
- **Referral History Tab**: View all referrals
- Smooth tab switching
- Active tab indicator with gradient underline

## Pages

### `/wallet` - Dedicated Wallet Page
Full-featured wallet page with all functionality.

**Sections:**
1. Header with "Pocket by unifesto" branding
2. Wallet balance card
3. Wallet statistics cards
4. Referral program section
5. Tabbed content (Transactions / Referrals)

### `/profile` - Profile Page
Quick wallet overview with link to full wallet page.

**Wallet Section:**
- Balance display
- "View Wallet" button → links to `/wallet`
- "Earn More Coins" tips

## API Integration

### Endpoints Used

All endpoints use `NEXT_PUBLIC_API_URL` environment variable.

```typescript
// Wallet Balance & Stats
GET  /wallet                    // Get balance
GET  /wallet/stats              // Get statistics
GET  /wallet/transactions       // Get transactions (paginated)

// Referrals
GET  /wallet/referral           // Get referral info
GET  /wallet/referral/history   // Get referral history
POST /wallet/referral/apply     // Apply referral code

// Wallet Passcode (API ready, UI not implemented)
GET  /auth/wallet/has-passcode
POST /auth/wallet/verify-passcode
POST /auth/wallet/set-passcode
POST /auth/wallet/request-otp
POST /auth/wallet/verify-otp
```

### API Module

Location: `src/lib/api/wallet.ts`

**Functions:**
```typescript
// Balance & Transactions
getWalletBalance(): Promise<WalletBalance>
getWalletStats(): Promise<WalletStats>
getTransactions(limit, offset): Promise<{transactions, count}>

// Referrals
getReferralInfo(): Promise<ReferralInfo>
getReferralHistory(): Promise<{referrals, count}>
applyReferralCode(code): Promise<{message, referral}>

// Passcode (API ready)
hasWalletPasscode(): Promise<{hasPasscode}>
verifyWalletPasscode(passcode): Promise<{valid, message}>
setWalletPasscode(passcode, otpToken): Promise<{message}>
requestWalletOtp(email): Promise<{message}>
verifyWalletOtp(email, otp): Promise<{message, token}>
```

**TypeScript Interfaces:**
```typescript
interface WalletBalance {
  balance: number;
  currency: string;
}

interface WalletStats {
  balance: number;
  currency: string;
  total_earned: number;
  total_spent: number;
  total_transactions: number;
}

interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'refund' | 'referral_bonus' | 'event_reward' | 'purchase';
  amount: number;
  balance_after: number;
  description: string;
  metadata: Record<string, any>;
  created_at: string;
}

interface ReferralInfo {
  code: string;
  link: string;
  total_referrals: number;
  total_rewards: number;
  pending_referrals: number;
  completed_referrals: number;
}

interface ReferralHistoryItem {
  id: string;
  referral_code: string;
  status: 'pending' | 'completed' | 'rewarded';
  reward_amount: number;
  rewarded_at: string | null;
  created_at: string;
}
```

## Usage

### Accessing the Wallet

**From Profile Page:**
```
1. Navigate to /profile
2. Click "View Wallet" button in wallet section
3. Redirects to /wallet
```

**Direct Access:**
```
Navigate to /wallet
```

**Authentication:**
- User must be logged in
- Redirects to `/auth` if not authenticated

### Copying Referral Code

```typescript
// Automatic clipboard copy
navigator.clipboard.writeText(referralInfo.link)

// Visual feedback
- Shows checkmark icon for 2 seconds
- Then returns to copy icon
```

### Loading States

All data fetching shows loading indicators:
- Spinner animation
- "Loading..." text
- Prevents interaction during load

### Empty States

When no data is available:
- Helpful message displayed
- Suggestions for earning coins
- Encouragement to share referral code

## Styling

### Brand Colors
```typescript
// Primary gradient (from lib/styles.ts)
brandGradient = "linear-gradient(to right, #3491ff, #0062ff)"

// Pocket branding
pocketGradient = "linear-gradient(to right, #fff462, #ffb700)"
```

### Color Coding
- 🟢 **Green (#10b981)**: Earned, received, positive
- 🔴 **Red (#ef4444)**: Spent, paid, negative
- 🔵 **Blue (#3491ff)**: Primary actions, links
- 🟡 **Yellow (#fff462)**: Pocket branding
- ⚪ **White/Slate**: Text, borders, backgrounds

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- Grid layouts adapt to screen size
- Touch-friendly button sizes

## Error Handling

### API Errors
```typescript
try {
  const data = await getWalletBalance();
  setWalletBalance(data);
} catch (error) {
  console.error('Error loading wallet data:', error);
  // User sees empty state or error message
}
```

### Authentication Errors
```typescript
// Automatic redirect to auth page
if (!session) {
  router.push("/auth");
}
```

### Network Errors
- Graceful degradation
- Error messages in console
- Empty states shown to user
- Retry on page refresh

## Performance

### Data Loading
- Parallel API calls using `Promise.all()`
- Loads balance, stats, transactions, referrals simultaneously
- Reduces total loading time

### Optimization
- Client-side rendering for dynamic data
- Efficient state management
- Minimal re-renders
- Debounced interactions

## Security

### Authentication
- All API calls require valid session token
- Token automatically included in headers
- Session validation on page load
- Redirect to auth if session expired

### Data Protection
- No sensitive data in localStorage
- Session tokens managed by Supabase
- HTTPS-only API calls
- CORS protection

## Future Enhancements

### High Priority
1. **Wallet Passcode Modal**
   - Create web version of mobile passcode modal
   - 6-digit passcode input
   - OTP verification flow
   - Biometric option (Web Authentication API)

2. **Add Coins Feature**
   - Payment gateway integration
   - Multiple payment methods
   - Transaction confirmation
   - Receipt generation

3. **Redeem Coins Feature**
   - Redemption marketplace
   - Available rewards catalog
   - Redemption history
   - Confirmation flow

### Medium Priority
1. **Transaction Filters**
   - Filter by type (earned/spent)
   - Date range picker
   - Amount range filter
   - Search by description

2. **Export Functionality**
   - Export to CSV
   - Export to PDF
   - Email transaction history
   - Custom date ranges

3. **Referral Analytics**
   - Referral performance charts
   - Conversion rates
   - Top referrers leaderboard
   - Referral timeline

### Low Priority
1. **Real-time Updates**
   - WebSocket integration
   - Live balance updates
   - Transaction notifications
   - Referral alerts

2. **Wallet Insights**
   - Spending patterns
   - Earning trends
   - Recommendations
   - Savings goals

## Testing

### Manual Testing Checklist
- [ ] Page loads without errors
- [ ] Authentication guard works
- [ ] Wallet balance displays correctly
- [ ] Statistics show accurate numbers
- [ ] Transactions list all items
- [ ] Referral code copies to clipboard
- [ ] Tab switching works smoothly
- [ ] Loading states appear
- [ ] Empty states show when no data
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

### API Testing
- [ ] All endpoints return correct data
- [ ] Error handling works
- [ ] Authentication headers included
- [ ] Pagination works for transactions
- [ ] Referral code validation works

## Troubleshooting

### Issue: Wallet page shows loading forever
**Solution:** Check API endpoint configuration in `.env.local`
```env
NEXT_PUBLIC_API_URL=https://api.unifesto.app
```

### Issue: "No active session" error
**Solution:** User needs to log in again
- Redirect to `/auth`
- Session may have expired

### Issue: Transactions not showing
**Solution:** Check API response format
- Verify backend returns correct structure
- Check console for errors
- Verify transaction data exists in database

### Issue: Referral code not copying
**Solution:** Check clipboard permissions
- Browser may block clipboard access
- Try HTTPS instead of HTTP
- Check browser console for errors

## Support

For issues or questions:
1. Check console for error messages
2. Verify API endpoints are accessible
3. Check authentication status
4. Review network tab in DevTools
5. Contact backend team if API issues persist

## License

Part of Unifesto v3 Web Application
