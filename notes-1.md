# PDAM Management System - Project Setup Guide

## 📋 Prerequisites

### Software Requirements
- **Node.js** v18.17.0 or higher
- **npm** v9.0.0 or higher
- **Git** v2.34.0 or higher
- **VS Code** (recommended IDE)

### VS Code Extensions (Recommended)
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prisma
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

### Online Accounts Needed
- **GitHub** account (for repository)
- **Fly.io** account (for deployment)

### Check Your Environment
```bash
# Verify installations
node --version    # Should be v18+
npm --version     # Should be v9+
git --version     # Should be v2.34+
```

---

## 🏗️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | NextJS 14 + React 18 | User Interface & Pages |
| **UI Components** | ShadCN/UI + Tailwind CSS | Modern, Accessible Components |
| **Backend** | NextJS API Routes | REST API Endpoints |
| **Database ORM** | Prisma | Type-safe Database Access |
| **Database** | SQLite | Lightweight Database |
| **Authentication** | NextAuth.js | User Authentication |
| **Validation** | Zod | Runtime Type Validation |
| **Charts** | Recharts | Data Visualization |
| **Deployment** | Fly.io | Cloud Hosting Platform |
| **Language** | TypeScript | Type Safety |

---

## 📁 Project Folder Structure (Folders Only)

```
pdam-management-system/
├── 📁 app/                              # NextJS App Router
│   ├── 📁 (auth)/                       # Route Group - Authentication
│   │   ├── 📁 login/                    # Login page folder
│   │   └── 📁 register/                 # Register page folder
│   ├── 📁 admin/                        # Admin Dashboard Routes
│   │   ├── 📁 dashboard/                # Admin dashboard home
│   │   ├── 📁 customers/                # Customer management
│   │   │   ├── 📁 [id]/                 # Dynamic customer detail
│   │   │   │   └── 📁 edit/             # Edit customer page
│   │   │   └── 📁 new/                  # Add new customer page
│   │   ├── 📁 monitoring/               # Real-time monitoring
│   │   │   └── 📁 sensors/              # Sensor data details
│   │   ├── 📁 reports/                  # Reports dashboard
│   │   │   ├── 📁 usage/                # Usage reports
│   │   │   └── 📁 leaks/                # Leak detection reports
│   │   └── 📁 settings/                 # System settings
│   ├── 📁 customer/                     # Customer Dashboard Routes
│   │   ├── 📁 dashboard/                # Customer dashboard home
│   │   ├── 📁 usage/                    # Usage history
│   │   │   └── 📁 details/              # Detailed usage view
│   │   ├── 📁 topup/                    # Water quota top-up
│   │   │   └── 📁 history/              # Top-up history
│   │   └── 📁 profile/                  # Customer profile
│   └── 📁 api/                          # Backend API Routes
│       ├── 📁 auth/                     # Authentication APIs
│       │   ├── 📁 login/                # Login API
│       │   ├── 📁 register/             # Register API
│       │   ├── 📁 logout/               # Logout API
│       │   └── 📁 me/                   # Get current user API
│       ├── 📁 customers/                # Customer management APIs
│       │   └── 📁 [id]/                 # Dynamic customer APIs
│       │       ├── 📁 usage/            # Customer usage API
│       │       └── 📁 quota/            # Customer quota API
│       ├── 📁 sensors/                  # Sensor data APIs
│       │   ├── 📁 [customerId]/         # Customer sensor data
│       │   ├── 📁 realtime/             # Real-time sensor data
│       │   └── 📁 status/               # Sensor status
│       ├── 📁 leaks/                    # Leak detection APIs
│       │   ├── 📁 detect/               # Leak detection process
│       │   └── 📁 [id]/                 # Specific leak data
│       │       └── 📁 resolve/          # Resolve leak issue
│       ├── 📁 payments/                 # Payment management APIs
│       │   ├── 📁 topup/                # Top-up payment
│       │   ├── 📁 history/              # Payment history
│       │   └── 📁 [id]/                 # Specific payment
│       │       └── 📁 confirm/          # Confirm payment
│       └── 📁 reports/                  # Reports APIs
│           ├── 📁 usage/                # Usage reports API
│           └── 📁 leaks/                # Leak reports API
├── 📁 components/                       # Reusable UI Components
│   ├── 📁 ui/                          # ShadCN UI Components
│   ├── 📁 dashboard/                    # Dashboard specific components
│   ├── 📁 forms/                       # Form components
│   ├── 📁 charts/                      # Chart components
│   └── 📁 layout/                      # Layout components
├── 📁 lib/                             # Utility Libraries
├── 📁 hooks/                           # Custom React Hooks
├── 📁 types/                           # TypeScript Type Definitions
├── 📁 prisma/                          # Database Schema & Migrations
│   └── 📁 migrations/                  # Database migration files
├── 📁 public/                          # Static Assets
│   ├── 📁 images/                      # Image files
│   └── 📁 icons/                       # Icon files
└── 📁 docs/                            # Project Documentation
```

---

## 🚀 GitBash Commands to Create Project Structure

### Step 1: Create Main Project Directory
```bash
mkdir pdam-management-system
cd pdam-management-system
```

### Step 2: Create All Frontend & Backend Folders
```bash
# Main app directory structure
mkdir -p app/{auth}/login
mkdir -p app/{auth}/register

# Admin routes
mkdir -p app/admin/dashboard
mkdir -p app/admin/customers/{id}/edit
mkdir -p app/admin/customers/new
mkdir -p app/admin/monitoring/sensors
mkdir -p app/admin/reports/usage
mkdir -p app/admin/reports/leaks
mkdir -p app/admin/settings

# Customer routes
mkdir -p app/customer/dashboard
mkdir -p app/customer/usage/details
mkdir -p app/customer/topup/history
mkdir -p app/customer/profile

# API routes (Backend)
mkdir -p app/api/auth/{login,register,logout,me}
mkdir -p app/api/customers/{id}/{usage,quota}
mkdir -p app/api/sensors/{customerId},{realtime,status}
mkdir -p app/api/leaks/{detect,{id}/resolve}
mkdir -p app/api/payments/{topup,history,{id}/confirm}
mkdir -p app/api/reports/{usage,leaks}
```

### Step 3: Create Component & Utility Folders
```bash
# Components structure
mkdir -p components/{ui,dashboard,forms,charts,layout}

# Utility folders
mkdir -p lib
mkdir -p hooks
mkdir -p types

# Database folder
mkdir -p prisma/migrations

# Static assets
mkdir -p public/{images,icons}

# Documentation
mkdir -p docs
```

### Step 4: Alternative Single Command (Create Everything at Once)
```bash
# Run this single command to create entire folder structure
mkdir -p pdam-management-system/{app/{auth}/{login,register},app/admin/{dashboard,customers/{id}/edit,customers/new,monitoring/sensors,reports/{usage,leaks},settings},app/customer/{dashboard,usage/details,topup/history,profile},app/api/{auth/{login,register,logout,me},customers/{id}/{usage,quota},sensors/{customerId,realtime,status},leaks/{detect,{id}/resolve},payments/{topup,history,{id}/confirm},reports/{usage,leaks}},components/{ui,dashboard,forms,charts,layout},lib,hooks,types,prisma/migrations,public/{images,icons},docs}

# Then navigate to project directory
cd pdam-management-system
```

### Step 5: Verify Folder Structure
```bash
# Check if all folders are created correctly
tree -d -L 4
# or if tree is not available, use:
find . -type d | sort
```

---

## 📋 Folder Purpose Explanation

### 🎨 Frontend Folders (`app/` directory)
- **`(auth)/`** - Authentication pages (login, register)
- **`admin/`** - Admin dashboard and management pages
- **`customer/`** - Customer dashboard and self-service pages

### 🔌 Backend Folders (`app/api/` directory)
- **`auth/`** - Authentication endpoints
- **`customers/`** - Customer management APIs
- **`sensors/`** - ESP32 sensor data handling
- **`leaks/`** - Leak detection and resolution
- **`payments/`** - Payment and top-up processing
- **`reports/`** - Data reporting and analytics

### 🧩 Component Folders
- **`components/ui/`** - ShadCN UI components (buttons, forms, etc.)
- **`components/dashboard/`** - Dashboard-specific components
- **`components/forms/`** - Form components for data input
- **`components/charts/`** - Data visualization components
- **`components/layout/`** - Layout wrappers and navigation

### 🛠️ Utility Folders
- **`lib/`** - Shared utilities, database connection, validation
- **`hooks/`** - Custom React hooks for state management
- **`types/`** - TypeScript type definitions
- **`prisma/`** - Database schema and migrations
- **`public/`** - Static assets (images, icons, etc.)
- **`docs/`** - Project documentation

---

## ✅ Next Steps After Creating Folders

1. **Initialize NextJS Project**
2. **Setup Prisma Database**
3. **Install ShadCN UI Components**
4. **Configure Tailwind CSS**
5. **Setup TypeScript Configuration**
6. **Create Basic Page Files**
7. **Setup Authentication**
8. **Connect ESP32 Integration**

---

## 📝 Important Notes

- **Dynamic Routes**: Folders with `[id]` are NextJS dynamic routes
- **Route Groups**: Folders with `(auth)` are route groups (don't affect URL)
- **API Routes**: Each API folder needs a `route.ts` file to handle requests
- **Page Routes**: Each page folder needs a `page.tsx` file to render content
- **Layout Files**: `layout.tsx` files wrap pages with common UI elements
│