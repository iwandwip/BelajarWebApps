# PDAM Auth Template

Complete authentication system built with Vue 3, TypeScript, Express.js, and Prisma SQLite.

## Features

- ✅ **User Authentication** (Login, Register, Logout)
- ✅ **Password Reset** (Forgot password via email)
- ✅ **Email Verification** (Account verification)
- ✅ **Protected Routes** (Route guards)
- ✅ **Form Validation** (Zod schemas)
- ✅ **State Management** (Pinia)
- ✅ **Database** (Prisma + SQLite)
- ✅ **UI Components** (ShadCN + Tailwind CSS)
- ✅ **TypeScript** (Full type safety)

## Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN Vue** - Beautiful UI components
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Vee-Validate + Zod** - Form validation

### Backend
- **Express.js** - Web framework for Node.js
- **Prisma** - Next-generation ORM
- **SQLite** - Lightweight database
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing

## Project Structure

```
pdam-auth-template/
├── api/                    # Express.js backend (will be created)
├── database/              # SQLite database files
├── prisma/               # Database schema
├── scripts/              # Setup scripts
├── src/                  # Vue.js frontend
│   ├── components/       # Reusable components
│   ├── composables/      # Vue composables
│   ├── lib/             # Utilities and configurations
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript types
│   └── views/           # Page components
└── package.json         # Dependencies and scripts
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd pdam-auth-template
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the following values:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Create database and tables
npm run db:push

# Initialize database
npm run setup
```

### 4. Gmail SMTP Setup (for email features)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `SMTP_PASS`

### 5. Start Development Server

```bash
# Start frontend only
npm run dev:vue

# Start both frontend and backend (when backend is ready)
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
npm run dev:vue          # Start Vue.js development server
npm run dev:api          # Start Express.js development server
npm run dev              # Start both frontend and backend
npm run build            # Build for production
npm run preview          # Preview production build

npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
npm run setup            # Complete database setup
```

## Routes

### Public Routes
- `/` - Home page
- `/login` - Sign in
- `/register` - Create account
- `/forgot-password` - Request password reset
- `/reset-password/:token` - Reset password form

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

### Special Routes
- `/verify-email/:token` - Email verification

## Authentication Flow

1. **Registration**: User creates account → Email verification sent
2. **Email Verification**: User clicks link → Account activated
3. **Login**: User signs in → JWT token issued
4. **Protected Access**: Token validated on protected routes
5. **Password Reset**: User requests reset → Email sent → New password set

## Development Notes

### State Management
- User authentication state is managed by Pinia store (`src/stores/auth.ts`)
- Automatic token validation on app initialization
- Route guards protect authenticated routes

### Form Validation
- Zod schemas for type-safe validation (`src/lib/validation.ts`)
- Client-side validation with helpful error messages
- Server-side validation (to be implemented in backend)

### API Communication
- Axios-based API client with interceptors (`src/lib/api.ts`)
- Automatic token handling
- Error handling and redirects

## Next Steps

1. **Backend Implementation**: Create Express.js API endpoints
2. **Email Service**: Implement Nodemailer for email features
3. **Testing**: Add unit and integration tests
4. **Deployment**: Set up production deployment
5. **Additional Features**: 2FA, social login, etc.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details