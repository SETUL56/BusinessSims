# 🚀 Quick Start Guide

## Setup (5 minutes)

1. **Install Dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

2. **Start the Application**

**Option A: Start both servers separately (recommended for development)**
```bash
# Terminal 1 - Start backend
npm start

# Terminal 2 - Start frontend
cd client && npm start
```

**Option B: Use the dev script (requires concurrently)**
```bash
npm run dev
```

3. **Open in Browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## First Steps

### Create a Student Account
1. Go to http://localhost:3000
2. Click "Register"
3. Choose "Student" role
4. Fill in your details
5. You'll get $10,000 to start!

### Create Your First Business
1. From dashboard, click "Create Business"
2. Name your business
3. Choose an industry
4. Pick a brand color
5. Add a tagline
6. Submit!

### Add Products
1. Go to "My Businesses"
2. Select your business
3. Click "Add Product"
4. Fill in:
   - Name
   - Description
   - Price
   - Stock (for products)
5. Your products are now live!

### Start Trading
1. Visit the "Marketplace"
2. Browse other businesses
3. Click on products to purchase
4. Or visit "Trading" to invest in stocks/crypto

### For Teachers
1. Register with "Teacher" role
2. Access Admin Dashboard
3. View all student activities
4. Track performance and generate reports

## Quick Tips

- **Balance**: Top right shows your current money
- **Revenue**: Earned when others buy your products
- **Investments**: Trade stocks and crypto for profit
- **Leaderboard**: Check teacher dashboard to see top performers
- **Real-time**: Market prices update every 30 seconds

## Common Commands

```bash
# Start backend only
npm start

# Start frontend only
cd client && npm start

# Install all dependencies
npm run install-all

# Build for production
npm run build
```

## Ports
- Frontend: 3000
- Backend: 3001
- Socket.IO: Auto-connects to backend

## Need Help?
Check README.md for full documentation!
