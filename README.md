# 🚀 Entrepreneur Simulator

A comprehensive educational business building and launch simulation platform designed for students to learn entrepreneurship through hands-on experience in a risk-free environment.

## ✨ Features

### For Students
- **Business Creation**: Build and customize your business with branding, products, and services
- **Global Marketplace**: Browse and purchase from other student businesses
- **Product Management**: Add products/services, set prices, manage inventory
- **Trading Platform**: Invest in simulated stocks and cryptocurrency markets
- **Real-time Updates**: Live market prices and transaction notifications via WebSockets
- **Play Money System**: Start with $10,000 in simulated currency
- **Portfolio Tracking**: Monitor your business revenue and investment performance

### For Teachers
- **Admin Dashboard**: Comprehensive overview of all student activities
- **Performance Analytics**: Track top businesses and students by revenue
- **Transaction History**: View all marketplace transactions in real-time
- **Reporting Tools**: Export data for grading and assessment
- **Student Monitoring**: See individual and aggregate performance metrics

### Technical Features
- **Multi-user Support**: Real-time collaboration via Socket.IO
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Secure Authentication**: JWT-based authentication system
- **SQLite Database**: Lightweight, file-based database perfect for educational use
- **RESTful API**: Clean API architecture for easy extension
- **Real-time Market Simulation**: Automatic price updates for stocks and crypto

## 🛠️ Technology Stack

### Backend
- Node.js & Express.js
- SQLite (better-sqlite3)
- Socket.IO for real-time features
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Socket.IO client for real-time updates

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup Instructions

1. **Clone or download the project**

2. **Install backend dependencies**
```bash
cd entrepreneur-simulator
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Start the backend server**
```bash
npm start
```
The server will run on http://localhost:3001

5. **In a new terminal, start the frontend**
```bash
cd client
npm start
```
The React app will run on http://localhost:3000

## 🚀 Quick Start Guide

### For Students

1. **Register**
   - Go to http://localhost:3000
   - Click "Start as Student"
   - Fill in your details
   - You'll start with $10,000 play money

2. **Create Your Business**
   - Click "Create Business" from your dashboard
   - Choose a name, industry, and brand color
   - Add a tagline and description
   - Submit to create your business

3. **Add Products/Services**
   - Go to "My Businesses"
   - Select your business
   - Click "Add Product"
   - Fill in details, pricing, and stock
   - Submit to add to your catalog

4. **Start Selling**
   - Your business appears on the marketplace
   - Other students can browse and purchase
   - Watch your revenue grow!

5. **Shop & Trade**
   - Browse the marketplace to buy from others
   - Visit the Trading platform to invest
   - Manage your portfolio and track gains/losses

### For Teachers

1. **Register**
   - Choose "Teacher" during registration
   - Access the Admin Dashboard

2. **Monitor Students**
   - View comprehensive statistics
   - Track top performers
   - See all transactions
   - Export data for grading

## 📊 Database Schema

The simulator uses SQLite with the following tables:

- **users**: Student and teacher accounts
- **businesses**: Student-created businesses
- **products**: Products and services offered
- **transactions**: Purchase history
- **stocks**: Simulated stock market data
- **crypto**: Simulated cryptocurrency data
- **investments**: User investment portfolio

## 🎮 Game Mechanics

### Economy
- All students start with $10,000 simulated currency
- Revenue is earned when others purchase your products/services
- Funds can be used to:
  - Purchase from other businesses
  - Invest in stocks and crypto
  - Expand your product catalog

### Market Simulation
- Stock and crypto prices update every 30 seconds
- Price changes are random within realistic ranges:
  - Stocks: -5% to +5% per update
  - Crypto: -10% to +10% per update
- Real-time updates via WebSocket

### Leaderboards
- Ranked by total revenue generated
- Visible on teacher dashboard
- Encourages healthy competition

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory (optional):

```
PORT=3001
JWT_SECRET=your-secret-key-here
```

### Default Settings
- Initial student balance: $10,000
- Market update interval: 30 seconds
- JWT token expiry: Session-based

## 📱 User Roles

### Student
- Create and manage businesses
- Add products and services
- Purchase from marketplace
- Trade stocks and crypto
- View personal dashboard

### Teacher
- View all student activities
- Access comprehensive reports
- Monitor business performance
- Track transaction history
- No trading or business creation

## 🎨 Customization

### Adding New Features
The modular architecture makes it easy to extend:

1. **New API Endpoints**: Add routes in `server/index.js`
2. **New Pages**: Create components in `client/src/pages/`
3. **New Database Tables**: Update `initDatabase()` function
4. **Market Types**: Extend stocks/crypto to add new asset classes

### Styling
- Tailwind CSS is used throughout
- Customize colors in `tailwind.config.js`
- Add custom styles in `client/src/index.css`

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
- Change PORT in `.env` file
- Or kill the process using the port

**Database locked**
- Close the database connection
- Restart the server

**WebSocket connection issues**
- Check firewall settings
- Ensure server is running on correct port

**React build errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm start -- --reset-cache`

## 📈 Future Enhancements

Potential features for expansion:
- [ ] Business partnerships and collaborations
- [ ] Marketing campaigns and advertising
- [ ] Employee hiring simulation
- [ ] Business loans and credit system
- [ ] Seasonal events and challenges
- [ ] Advanced analytics and charts
- [ ] Import/export functionality
- [ ] Multi-classroom support
- [ ] Gamification badges and achievements
- [ ] Mobile app version

## 🤝 Contributing

This is an educational project. Feel free to:
- Report bugs or issues
- Suggest new features
- Submit improvements
- Share with educators

## 📄 License

This project is designed for educational purposes. Feel free to use and modify for non-commercial educational use.

## 🎓 Educational Value

### Learning Outcomes
Students will learn:
- **Entrepreneurship**: Business planning and execution
- **Economics**: Supply, demand, and market forces
- **Finance**: Investment strategies and portfolio management
- **Marketing**: Branding, pricing, and product positioning
- **Technology**: Real-world software interaction
- **Competition**: Strategic thinking and decision-making

### Classroom Integration
- Use as a semester-long project
- Assign different business types to students
- Create competitions and challenges
- Discuss results and strategies
- Connect to curriculum topics

## 🙏 Credits

Built with:
- React for the user interface
- Express.js for the backend
- Socket.IO for real-time features
- Tailwind CSS for beautiful styling
- SQLite for simple data persistence

## 📞 Support

For questions or issues:
1. Check this README
2. Review the code comments
3. Check the console for error messages
4. Verify all dependencies are installed

---

**Happy Entrepreneuring!** 🚀💰📈

Made with ❤️ for education
