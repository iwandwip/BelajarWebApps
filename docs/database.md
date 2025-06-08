# Database Commands Documentation

## Overview

This document explains all database-related npm scripts in `package.json` and provides step-by-step workflows for common database operations.

## 📋 Available Database Commands

### Core Prisma Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run db:generate` | Generate Prisma client based on schema | After schema changes |
| `npm run db:push` | Push schema changes to database without migrations | Development only |
| `npm run db:migrate` | Create and apply migrations | Production workflow |
| `npm run db:migrate:init` | Create initial migration | First-time setup |
| `npm run db:seed` | Run seed script to populate initial data | After database setup |
| `npm run db:studio` | Open Prisma Studio (database GUI) | Database inspection |

### Custom Workflow Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run db:setup` | Generate + Push + Seed | **Quick development setup** |
| `npm run db:reset` | Force reset + Seed | **Development reset** |
| `npm run db:fresh` | Force reset + Generate + Seed | **Clean development reset** |
| `npm run db:migrate:reset` | Migration-based reset + Seed | **Production-like reset** |

## 🚀 Common Workflows

### 1. First Time Database Setup

**For Development (Recommended):**
```bash
# Option A: Quick setup
npm run db:setup

# Option B: Step by step
npm run db:generate
npm run db:push  
npm run db:seed
```

**For Production:**
```bash
# Step by step with migrations
npm run db:generate
npm run db:migrate:init
npm run db:seed
```

### 2. Transferring Database to Another Computer

**Method A: Schema Only (Recommended)**
```bash
# On new computer:
git clone <repository>
npm install
npm run db:setup
```

**Method B: With Migration Files**
```bash
# On new computer:
git clone <repository>
npm install
npm run db:generate
npm run db:migrate  # Apply existing migrations
npm run db:seed
```

**Method C: Copy Entire Database**
```bash
# Copy the database file
cp prisma/dev.db <destination>

# On new computer:
git clone <repository>
npm install
npm run db:generate
# Database is ready to use
```

### 3. Reset Database from Scratch

**Quick Reset (Development):**
```bash
npm run db:reset
# or
npm run db:fresh
```

**Complete Reset with Migrations:**
```bash
npm run db:migrate:reset
```

**Manual Complete Reset:**
```bash
# Delete database and migrations
rm -f prisma/dev.db
rm -rf prisma/migrations

# Recreate everything
npm run db:migrate:init
npm run db:seed
```

### 4. Schema Changes During Development

**Development Workflow:**
```bash
# Edit prisma/schema.prisma
npm run db:push       # Apply changes
npm run db:generate   # Update client
```

**Production Workflow:**
```bash
# Edit prisma/schema.prisma
npm run db:migrate    # Create migration
npm run db:generate   # Update client
```

### 5. Adding New Data/Updating Seed

```bash
# Edit prisma/seed.ts
npm run db:seed       # Run seed again (uses upsert)
```

## 🔧 Detailed Command Explanations

### `prisma generate`
- **Purpose**: Creates/updates Prisma Client based on schema
- **When**: After any schema changes
- **Files affected**: `node_modules/@prisma/client`

### `prisma db push`
- **Purpose**: Sync database with schema without creating migration files
- **When**: Development only
- **Pros**: Fast, simple
- **Cons**: No migration history

### `prisma migrate dev`
- **Purpose**: Create migration files and apply them
- **When**: Production workflow or when you need migration history
- **Files created**: `prisma/migrations/`

### `prisma db push --force-reset`
- **Purpose**: Delete all data and recreate schema
- **When**: Complete reset needed
- **⚠️ Warning**: Destroys all data

## 🗂️ File Structure

```
prisma/
├── schema.prisma      # Database schema definition
├── seed.ts           # Initial data population script
├── dev.db            # SQLite database file (development)
└── migrations/       # Migration files (if using migrations)
    └── 001_init/
        └── migration.sql
```

## 🎯 Workflow Recommendations

### For Solo Development
```bash
# Initial setup
npm run db:setup

# Daily work
npm run db:reset      # When you need fresh data
npm run db:push       # After schema changes
```

### For Team Development
```bash
# Initial setup
npm run db:migrate:init
npm run db:seed

# Daily work
npm run db:migrate    # After schema changes
npm run db:migrate:reset  # When you need fresh data
```

### For Production Deployment
```bash
# Never use db:push in production
npm run db:generate
npm run db:migrate    # Apply pending migrations
# Don't run seed in production unless needed
```

## 🚨 Common Issues & Solutions

### Issue: "Table does not exist"
```bash
# Solution: Ensure schema is applied
npm run db:push
# or
npm run db:migrate
```

### Issue: "Migration files missing after reset"
```bash
# Solution: Create initial migration
npm run db:migrate:init
```

### Issue: "Prisma client out of sync"
```bash
# Solution: Regenerate client
npm run db:generate
```

### Issue: "Database locked" (SQLite)
```bash
# Solution: Close all database connections
# Close Prisma Studio, stop dev server, then retry
```

## 📱 Environment Variables

Create `.env` file:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"
```

## 🔐 Default Login Credentials

After running seed:
```
👤 Admin: admin@gmail.com / admin123
👤 Customer 1: user1@gmail.com / admin123 (PDAM-001)
👤 Customer 2: user2@gmail.com / admin123 (PDAM-002)
```

## 🎨 Database GUI

Open Prisma Studio to inspect database:
```bash
npm run db:studio
```
Access at: http://localhost:5555

## 📝 Best Practices

1. **Always backup before major changes**
2. **Use migrations for production**
3. **Use db:push for rapid development**
4. **Commit migration files to git**
5. **Don't commit `dev.db` to git**
6. **Test migrations on staging before production**