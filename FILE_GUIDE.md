# 📁 Complete File Guide

## 🗂️ Root Directory Files

### Configuration Files
- **package.json** - Backend dependencies and scripts
- **.gitignore** - Files to ignore in git
- **.env.example** - Example environment variables

### Documentation Files
- **README.md** - Complete project documentation (READ FIRST)
- **QUICKSTART.md** - 5-minute setup guide
- **START_HERE.md** - Visual quick start guide
- **CODESANDBOX_DEPLOY.md** - Deployment instructions for CodeSandbox
- **PROJECT_SUMMARY.md** - Technical overview and architecture
- **FILE_GUIDE.md** - This file

---

## 🖥️ Server Directory (`/server/`)

### Backend Files
- **index.js** (1,200+ lines) - Main server file containing:
  - Express.js setup
  - SQLite database initialization
  - All API endpoints (auth, businesses, products, etc.)
  - Socket.IO real-time features
  - Market simulation logic
  - Authentication middleware

---

## 💻 Client Directory (`/client/`)

### Root Client Files
- **package.json** - Frontend dependencies
- **tailwind.config.js** - Tailwind CSS configuration

### Public Directory (`/client/public/`)
- **index.html** - Main HTML file

### Source Directory (`/client/src/`)

#### Main Files
- **index.js** - React entry point
- **index.css** - Global styles + Tailwind
- **App.js** - Main app component with routing and Socket.IO

#### Context (`/client/src/context/`)
- **AuthContext.js** - Global authentication state management
  - Login/logout functions
  - User state
  - Token management
  - Balance updates

#### Components (`/client/src/components/`)
- **Navigation.js** - Top navigation bar
  - Student/teacher menus
  - Balance display
  - User profile dropdown
  - Responsive mobile menu

#### Pages (`/client/src/pages/`)

**Public Pages:**
- **Landing.js** - Marketing landing page with features
- **Login.js** - User login form
- **Register.js** - User registration with role selection

**Student Pages:**
- **StudentDashboard.js** - Main student hub
  - Account overview
  - Quick actions
  - Business summary
  - Recent transactions
  - Investment P/L

- **CreateBusiness.js** - Business creation form
  - Name and branding
  - Industry selection
  - Color picker
  - Preview

- **MyBusinesses.js** - Business management
  - List all businesses
  - Add products/services
  - Manage inventory
  - Product modal

- **BusinessDetails.js** - Public business page
  - Business info
  - Product listings
  - Purchase functionality
  - Stock management

- **Marketplace.js** - Browse all businesses
  - Search and filters
  - Business cards
  - Industry categories
  - Live updates

- **Trading.js** - Stock and crypto trading
  - Market tabs (stocks/crypto)
  - Asset listings
  - Buy functionality
  - Portfolio display
  - P/L calculations
  - Real-time price updates

**Teacher Pages:**
- **TeacherDashboard.js** - Admin analytics
  - Statistics overview
  - Top businesses leaderboard
  - Top students ranking
  - Transaction history
  - Tabbed interface

---

## 📊 Database File

- **simulator.db** (Auto-generated) - SQLite database containing:
  - users table
  - businesses table
  - products table
  - transactions table
  - stocks table
  - crypto table
  - investments table

---

## 🎨 Styling

### Tailwind CSS
- Configured in `tailwind.config.js`
- Used throughout all components
- Custom classes in `index.css`

### Color Scheme
- Primary: Indigo (#4F46E5)
- Secondary: Purple (#7C3AED)
- Accent: Pink (#EC4899)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)

---

## 🔧 Key Features by File

### Authentication (AuthContext.js)
- JWT token management
- Login/register functions
- Protected routes
- User state

### Real-time Updates (App.js + server/index.js)
- Socket.IO connections
- Market price updates
- Transaction notifications
- New business alerts

### Database (server/index.js)
- SQLite initialization
- Sample data seeding
- CRUD operations
- Transaction integrity

### API Endpoints (server/index.js)
```
Auth:
- POST /api/auth/register
- POST /api/auth/login

User:
- GET /api/user/profile
- GET /api/user/balance

Business:
- POST /api/businesses
- GET /api/businesses
- GET /api/businesses/:id
- GET /api/my-businesses

Products:
- POST /api/products
- GET /api/businesses/:id/products

Transactions:
- POST /api/transactions
- GET /api/my-transactions

Markets:
- GET /api/market/stocks
- GET /api/market/crypto

Investments:
- POST /api/investments
- GET /api/my-investments

Admin:
- GET /api/admin/dashboard
```

---

## 📦 Dependencies

### Backend
- **express** - Web server
- **cors** - Cross-origin requests
- **better-sqlite3** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - Authentication
- **socket.io** - Real-time updates
- **uuid** - Unique IDs
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-dom** - React rendering
- **react-router-dom** - Routing
- **react-scripts** - Build tools
- **axios** - HTTP client
- **socket.io-client** - WebSocket client
- **recharts** - Charts (optional)
- **tailwindcss** - CSS framework

---

## 🎯 File Sizes

- **Largest:** server/index.js (~1,200 lines)
- **Medium:** Page components (~200-400 lines each)
- **Small:** Context/utility files (~100 lines)
- **Total:** ~3,500+ lines of code

---

## 🔍 What Each Page Does

### Student Pages
1. **Landing** - Introduce platform
2. **Register** - Create account
3. **Login** - Access account
4. **Dashboard** - Overview and quick actions
5. **CreateBusiness** - Launch new venture
6. **MyBusinesses** - Manage products
7. **Marketplace** - Browse and shop
8. **BusinessDetails** - View and purchase
9. **Trading** - Invest in markets

### Teacher Pages
1. **TeacherDashboard** - Monitor everything
   - Overview tab
   - Businesses tab
   - Students tab
   - Transactions tab

---

## 🚀 Adding New Features

### To Add a New Page:
1. Create component in `/client/src/pages/`
2. Add route in `App.js`
3. Add navigation link in `Navigation.js`

### To Add API Endpoint:
1. Add route in `server/index.js`
2. Create database queries
3. Call from frontend with axios

### To Add Database Table:
1. Add CREATE TABLE in `initDatabase()`
2. Add CRUD operations
3. Create API endpoints

---

## 📝 File Checklist

### Essential Files
- [x] server/index.js (backend)
- [x] client/src/App.js (routing)
- [x] client/src/index.js (entry)
- [x] All page components
- [x] AuthContext
- [x] Navigation component
- [x] Package.json files
- [x] Documentation

### Configuration Files
- [x] .gitignore
- [x] .env.example
- [x] tailwind.config.js
- [x] public/index.html

### Documentation
- [x] README.md
- [x] QUICKSTART.md
- [x] START_HERE.md
- [x] CODESANDBOX_DEPLOY.md
- [x] PROJECT_SUMMARY.md
- [x] FILE_GUIDE.md

---

## 🎓 Learning Path

### For Understanding the Code:
1. Start with **README.md** - Big picture
2. Read **PROJECT_SUMMARY.md** - Architecture
3. Look at **server/index.js** - Backend logic
4. Check **App.js** - Routing setup
5. Explore **page components** - UI implementation

### For Customization:
1. **Styling:** Edit Tailwind classes in components
2. **Features:** Add API endpoints in server/index.js
3. **Pages:** Create new components in pages/
4. **Database:** Modify schema in initDatabase()

---

## ✅ Everything Included

This project includes:
- ✅ Complete backend server
- ✅ Full React frontend
- ✅ Database setup and seeding
- ✅ Authentication system
- ✅ Real-time features
- ✅ Multiple user dashboards
- ✅ Marketplace functionality
- ✅ Trading simulation
- ✅ Comprehensive documentation
- ✅ Deployment guides
- ✅ Example data

**Ready to deploy and use!** 🚀

---

Need to understand a specific file? Open it and read the comments - every major section is documented!
