# 🏗️ System Architecture

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           React Frontend (Port 3000)                       │ │
│  │                                                             │ │
│  │  Landing → Register/Login → Dashboards → Features         │ │
│  │                                                             │ │
│  │  Context: AuthContext (Global State)                       │ │
│  │  Routing: React Router                                     │ │
│  │  Styling: Tailwind CSS                                     │ │
│  └──────────────┬────────────────────────────┬────────────────┘ │
└─────────────────┼────────────────────────────┼──────────────────┘
                  │                            │
            HTTP/REST                    WebSocket
          (axios calls)                 (Socket.IO)
                  │                            │
                  ↓                            ↓
┌─────────────────────────────────────────────────────────────────┐
│           Node.js + Express Server (Port 3001)                  │
│                                                                  │
│  ┌─────────────────────┐         ┌──────────────────────────┐  │
│  │   REST API          │         │   Socket.IO Server       │  │
│  │   - Auth Routes     │         │   - Market Updates       │  │
│  │   - Business CRUD   │         │   - Transaction Events   │  │
│  │   - Products        │         │   - New Business Alerts  │  │
│  │   - Transactions    │         └──────────────────────────┘  │
│  │   - Markets         │                                        │
│  │   - Admin           │                                        │
│  └─────────┬───────────┘                                        │
│            │                                                     │
│            ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SQLite Database                            │   │
│  │              (simulator.db)                              │   │
│  │                                                           │   │
│  │  Tables:                                                  │   │
│  │  • users         - Student & teacher accounts            │   │
│  │  • businesses    - Student ventures                      │   │
│  │  • products      - Products & services                   │   │
│  │  • transactions  - Purchase history                      │   │
│  │  • stocks        - Market data                           │   │
│  │  • crypto        - Cryptocurrency data                   │   │
│  │  • investments   - User portfolios                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### User Registration
```
Browser → POST /api/auth/register → Server
                                      ↓
                              Hash Password (bcrypt)
                                      ↓
                              Insert to Database
                                      ↓
                              Generate JWT Token
                                      ↓
Browser ← Return Token + User ← Server
```

### Create Business
```
Browser → POST /api/businesses → Server
                                   ↓
                          Validate Auth (JWT)
                                   ↓
                          Insert to Database
                                   ↓
                          Emit Socket Event
                                   ↓
All Connected Clients ← 'new_business' ← Server
```

### Purchase Product
```
Browser → POST /api/transactions → Server
                                     ↓
                            Get Product Details
                                     ↓
                            Check Stock & Funds
                                     ↓
                            Start Transaction
                                     ↓
                            - Deduct buyer balance
                            - Add to seller balance
                            - Update business revenue
                            - Reduce stock
                            - Record transaction
                                     ↓
                            Commit Transaction
                                     ↓
                            Emit Socket Event
                                     ↓
All Connected Clients ← 'transaction_completed' ← Server
```

### Market Updates
```
Server Timer (every 30s)
         ↓
    Update Prices
         ↓
    Save to Database
         ↓
    Emit Socket Event
         ↓
All Connected Clients ← 'market_update' ← Server
```

---

## 🎯 Component Hierarchy

```
App.js (Main Router)
│
├── AuthProvider (Context)
│   │
│   ├── Landing Page
│   │   └── Links to Login/Register
│   │
│   ├── Login Page
│   │
│   ├── Register Page
│   │
│   └── Protected Routes
│       │
│       ├── Student Routes
│       │   ├── StudentDashboard
│       │   │   ├── Navigation
│       │   │   └── Dashboard Components
│       │   │
│       │   ├── CreateBusiness
│       │   │   └── Business Form
│       │   │
│       │   ├── MyBusinesses
│       │   │   ├── Business List
│       │   │   └── Product Modal
│       │   │
│       │   ├── Marketplace
│       │   │   └── Business Cards
│       │   │
│       │   ├── BusinessDetails
│       │   │   └── Product Cards
│       │   │
│       │   └── Trading
│       │       ├── Market Tabs
│       │       └── Asset Cards
│       │
│       └── Teacher Routes
│           └── TeacherDashboard
│               ├── Navigation
│               └── Analytics Tabs
│
└── Socket.IO Client
    └── Event Listeners
```

---

## 🔐 Security Architecture

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ 1. Login with credentials
       ↓
┌──────────────┐
│   Server     │ 2. Verify password (bcrypt)
└──────┬───────┘
       │
       │ 3. Generate JWT token
       ↓
┌──────────────┐
│   Browser    │ 4. Store token in localStorage
└──────┬───────┘
       │
       │ 5. Include token in headers
       ↓
┌──────────────┐
│   Server     │ 6. Verify token on each request
└──────────────┘
```

### Protected Routes
- Middleware checks JWT token
- Decodes user ID and role
- Allows/denies based on role
- Student routes require student role
- Teacher routes require teacher role

---

## 💾 Database Schema

```
users
├── id (PK)
├── username (UNIQUE)
├── email (UNIQUE)
├── password (hashed)
├── role (student/teacher)
├── balance
└── created_at

businesses
├── id (PK)
├── user_id (FK → users.id)
├── name
├── description
├── industry
├── logo_color
├── tagline
├── revenue
└── created_at

products
├── id (PK)
├── business_id (FK → businesses.id)
├── name
├── description
├── price
├── stock
├── type (product/service)
└── created_at

transactions
├── id (PK)
├── buyer_id (FK → users.id)
├── seller_id (FK → users.id)
├── business_id (FK → businesses.id)
├── product_id (FK → products.id)
├── amount
├── quantity
└── created_at

stocks
├── id (PK)
├── symbol (UNIQUE)
├── name
├── price
├── change_percent
└── last_updated

crypto
├── id (PK)
├── symbol (UNIQUE)
├── name
├── price
├── change_percent
└── last_updated

investments
├── id (PK)
├── user_id (FK → users.id)
├── asset_type (stock/crypto)
├── asset_id (FK → stocks.id OR crypto.id)
├── quantity
├── purchase_price
└── created_at
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register   - Create new user
POST   /api/auth/login      - Login user
```

### User Management
```
GET    /api/user/profile    - Get user profile (protected)
GET    /api/user/balance    - Get current balance (protected)
```

### Business Operations
```
POST   /api/businesses           - Create business (protected)
GET    /api/businesses           - Get all businesses
GET    /api/businesses/:id       - Get business details
GET    /api/my-businesses        - Get user's businesses (protected)
```

### Product Management
```
POST   /api/products                  - Add product (protected)
GET    /api/businesses/:id/products   - Get business products
```

### Transactions
```
POST   /api/transactions      - Make purchase (protected)
GET    /api/my-transactions   - Get user's purchases (protected)
```

### Trading
```
GET    /api/market/stocks     - Get stock prices
GET    /api/market/crypto     - Get crypto prices
POST   /api/investments       - Buy asset (protected)
GET    /api/my-investments    - Get portfolio (protected)
```

### Admin (Teachers)
```
GET    /api/admin/dashboard   - Get analytics (protected, teacher only)
```

---

## ⚡ Real-time Events

### Server → Client
```javascript
// New business created
socket.emit('new_business', businessData)

// Purchase completed
socket.emit('transaction_completed', transactionData)

// Market prices updated
socket.emit('market_update', { stocks, crypto })
```

### Client → Server
```javascript
// Connection established
socket.on('connect')

// Listen for events
socket.on('new_business', handleNewBusiness)
socket.on('transaction_completed', handleTransaction)
socket.on('market_update', handleMarketUpdate)
```

---

## 🔄 State Management

### Global State (AuthContext)
```javascript
{
  user: {
    id: string,
    username: string,
    email: string,
    role: 'student' | 'teacher',
    balance: number
  },
  login: function,
  register: function,
  logout: function,
  updateBalance: function
}
```

### Local State (Component Level)
- Form inputs
- Loading states
- Modal visibility
- Filter/search values
- Temporary data

---

## 🚀 Deployment Flow

```
Development
    ↓
Local Testing
    ↓
Git Repository
    ↓
CodeSandbox Import
    ↓
Automatic Build
    ↓
Public URL Generated
    ↓
Share with Students
```

---

## 📦 Build Process

### Development
```
npm start (backend)     → Runs server on port 3001
cd client && npm start  → Runs React dev server on port 3000
```

### Production
```
cd client && npm run build  → Creates optimized build
npm start                   → Serves build + API
```

---

## 🔧 Technology Stack Summary

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - WebSocket client
- **Tailwind CSS** - Styling
- **React Context** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **better-sqlite3** - Database
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Development
- **Create React App** - React tooling
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart (optional)

---

## 🎯 Performance Considerations

### Optimizations
- SQLite prepared statements for efficiency
- JWT for stateless authentication
- WebSocket for real-time (not polling)
- React component memoization where needed
- Indexed database queries
- Pagination ready architecture

### Scalability
- Modular code structure
- Easy to add features
- Database can handle 100+ students
- Socket.IO scales horizontally
- Stateless API design

---

This architecture provides a solid foundation for educational use while remaining simple enough for students to understand and modify!
