# NextAuth Setup Instructions - SQLite Compatible

## 🐛 **Issue Fixed: SQLite Enum Support**

SQLite doesn't support native enums, so we've converted all enums to String types with constants for type safety.

## 📋 **Required Dependencies Installation**

### Step 1: Install NextAuth & Dependencies
```bash
npm install next-auth @auth/prisma-adapter zod
```

### Step 2: Install Missing ShadCN Components
```bash
npx shadcn@latest add alert checkbox badge progress
```

### Step 3: Create Folders
```bash
mkdir -p app/api/auth/\[...nextauth\]
mkdir -p app/\(auth\)/signin
mkdir -p types
```

## 📁 **Files Created/Modified**

### **Core NextAuth Files:**
1. ✅ `lib/auth-config.ts` - NextAuth configuration (updated for constants)
2. ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route
3. ✅ `middleware.ts` - Route protection (updated for constants)
4. ✅ `app/providers.tsx` - Session provider wrapper
5. ✅ `app/layout.tsx` - Updated with providers

### **Database Schema Changes:**
6. ✅ `prisma/schema.prisma` - **FIXED: Converted enums to String**
7. ✅ `lib/constants.ts` - **NEW: Type-safe constants replacing enums**
8. ✅ `lib/db-utils.ts` - Updated to use constants
9. ✅ `prisma/seed.ts` - Updated to use constants

### **Authentication API:**
10. ✅ `app/api/auth/register/route.ts` - Custom registration API (updated)

### **Pages & Components:**
11. ✅ `app/(auth)/signin/page.tsx` - Custom signin page
12. ✅ `components/auth/signin-form.tsx` - Updated login form
13. ✅ `components/auth/register-form.tsx` - Updated register form
14. ✅ `components/auth/signout-button.tsx` - Logout component

### **Protected Dashboards:**
15. ✅ `app/admin/layout.tsx` - Admin layout (updated for constants)
16. ✅ `app/admin/dashboard/page.tsx` - Admin dashboard
17. ✅ `app/customer/layout.tsx` - Customer layout (updated for constants)
18. ✅ `app/customer/dashboard/page.tsx` - Customer dashboard

### **Types & Utilities:**
19. ✅ `types/auth.ts` - NextAuth type declarations
20. ✅ `package.json` - Updated dependencies

## 🚀 **Setup Commands**

### Complete Setup (Run in Order):
```bash
# 1. Install new dependencies
npm install next-auth @auth/prisma-adapter zod

# 2. Install missing ShadCN components
npx shadcn@latest add alert checkbox badge progress

# 3. Setup database with updated schema
npm run db:setup

# 4. Start development server
npm run dev
```

## 🔧 **Key Changes Made**

### **Database Schema Changes:**
```diff
- enum Role { ADMIN, CUSTOMER }
+ role String @default("CUSTOMER")

- enum UserStatus { PENDING, ACTIVE, INACTIVE }  
+ status String @default("PENDING")

- enum NodeType { DISTRIBUTOR, CUSTOMER }
+ nodeType String

- enum SensorType { FLOW_METER, PRESSURE }
+ sensorType String

- enum PaymentStatus { PENDING, COMPLETED, REJECTED }
+ status String @default("PENDING")

- enum LeakSeverity { LOW, MEDIUM, HIGH }
+ severity String

- enum LeakStatus { DETECTED, RESOLVED, FALSE_ALARM }
+ status String @default("DETECTED")
```

### **Constants for Type Safety:**
```typescript
// lib/constants.ts
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
} as const

export const USER_STATUS = {
  PENDING: 'PENDING', 
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const

// TypeScript types derived from constants
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS]
```

### **Usage in Code:**
```typescript
// Before (with enums)
if (user.role !== Role.ADMIN) { ... }

// After (with constants)
import { USER_ROLES } from '@/lib/constants'
if (user.role !== USER_ROLES.ADMIN) { ... }
```

## 🔐 **Test Accounts**

### **Admin Account:**
- Email: `admin@pdam.com`
- Password: `admin123`
- Role: ADMIN
- Access: `/admin/dashboard`

### **Customer Accounts:**
- Email: `budi@gmail.com` / Password: `customer123`
  - Customer No: PDAM-001
  - Role: CUSTOMER
  - Access: `/customer/dashboard`

- Email: `sari@gmail.com` / Password: `customer123`
  - Customer No: PDAM-002
  - Role: CUSTOMER
  - Access: `/customer/dashboard`

## 🎯 **Authentication Flow**

### **Registration Process:**
1. User registers → Status: PENDING
2. Admin approves → Status: ACTIVE + CustomerNo assigned
3. Customer can login and access dashboard

### **Login Process:**
1. User enters credentials
2. NextAuth validates against database
3. Checks user status (must be ACTIVE)
4. Creates JWT session
5. Redirects to appropriate dashboard

### **Route Protection:**
- `/admin/*` → Requires ADMIN role
- `/customer/*` → Requires CUSTOMER role + ACTIVE status
- Middleware automatically protects routes

## 🔄 **Navigation Flow**

```
/ (Home) → /signin → Dashboard based on role
                  ↓
         ADMIN → /admin/dashboard
         CUSTOMER → /customer/dashboard
```

## ✨ **Features Implemented**

### ✅ **Database Compatibility:**
- **SQLite compatible** - No more enum errors
- **Type safety maintained** - Using constants with TypeScript types
- **All relationships working** - Foreign keys and relations intact
- **Seed data updated** - Uses new constant values

### ✅ **Authentication:**
- Login with email/password
- Registration with approval workflow
- Remember me functionality (30 days vs 7 days)
- Auto logout after session expires
- Route protection middleware

### ✅ **User Experience:**
- Loading states during authentication
- Error handling and user feedback
- Success messages for registration
- Automatic redirects based on role
- Responsive design

### ✅ **Admin Features:**
- Admin dashboard overview
- Sidebar navigation
- Quick actions panel
- System status monitoring
- User approval workflow (ready for implementation)

### ✅ **Customer Features:**
- Customer dashboard with water quota display
- Usage statistics and charts
- Low quota alerts
- Quick actions for top-up
- Account information display

## 🔧 **Next Development Steps**

1. **Admin Approval Pages** - Implement user/payment approval UI
2. **Real-time Data** - Connect to sensor data APIs
3. **Payment System** - Implement top-up functionality
4. **Settings Pages** - System configuration interface
5. **ESP32 Integration** - IoT device communication

## 🐛 **Troubleshooting**

### Common Issues:

1. **"Module not found" errors:**
   ```bash
   npm install next-auth @auth/prisma-adapter zod
   npx shadcn@latest add alert checkbox badge progress
   ```

2. **Database connection errors:**
   ```bash
   npm run db:setup
   ```

3. **Session not persisting:**
   - Check `.env` file has correct NEXTAUTH_SECRET
   - Verify database is running and seeded

4. **Route protection not working:**
   - Ensure middleware.ts is in project root
   - Check user role/status in database using constants

5. **Enum errors (FIXED):**
   - All enums converted to String with constants
   - SQLite now fully compatible
   - Type safety maintained through TypeScript

## ✅ **Verification Steps**

After setup, verify everything works:

```bash
# 1. Check database schema
npm run db:studio

# 2. Test authentication
# - Register new user → should be PENDING
# - Login as admin → should redirect to /admin/dashboard  
# - Login as customer → should redirect to /customer/dashboard

# 3. Test route protection
# - Try accessing /admin without login → should redirect to /signin
# - Try accessing /customer without login → should redirect to /signin
```

Authentication system is now **fully compatible with SQLite** and ready for development! 🎉