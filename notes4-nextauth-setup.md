# NextAuth Setup Instructions

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
1. ✅ `lib/auth-config.ts` - NextAuth configuration
2. ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route
3. ✅ `middleware.ts` - Route protection
4. ✅ `app/providers.tsx` - Session provider wrapper
5. ✅ `app/layout.tsx` - Updated with providers

### **Authentication API:**
6. ✅ `app/api/auth/register/route.ts` - Custom registration API

### **Pages & Components:**
7. ✅ `app/(auth)/signin/page.tsx` - Custom signin page
8. ✅ `components/auth/signin-form.tsx` - Updated login form
9. ✅ `components/auth/register-form.tsx` - Updated register form
10. ✅ `components/auth/signout-button.tsx` - Logout component

### **Protected Dashboards:**
11. ✅ `app/admin/layout.tsx` - Admin layout with auth
12. ✅ `app/admin/dashboard/page.tsx` - Admin dashboard
13. ✅ `app/customer/layout.tsx` - Customer layout with auth
14. ✅ `app/customer/dashboard/page.tsx` - Customer dashboard

### **Types & Utilities:**
15. ✅ `types/auth.ts` - NextAuth type declarations
16. ✅ `package.json` - Updated dependencies

## 🚀 **Setup Commands**

### Complete Setup (Run in Order):
```bash
# 1. Install new dependencies
npm install next-auth @auth/prisma-adapter zod

# 2. Install missing ShadCN components
npx shadcn@latest add alert checkbox badge progress

# 3. Generate Prisma client (if not done yet)
npm run db:setup

# 4. Start development server
npm run dev
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
   - Check user role/status in database

Authentication system is now fully integrated and ready for development! 🎉