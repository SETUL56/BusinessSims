# 📦 CodeSandbox Deployment Guide

## Method 1: Import from GitHub (Recommended)

1. **Upload to GitHub**
   - Create a new GitHub repository
   - Upload all project files
   - Commit and push

2. **Import to CodeSandbox**
   - Go to https://codesandbox.io
   - Click "Import"
   - Paste your GitHub repository URL
   - CodeSandbox will automatically detect the setup

## Method 2: Direct Upload

1. **Create New Sandbox**
   - Go to https://codesandbox.io
   - Click "Create Sandbox"
   - Choose "Node.js"

2. **Upload Files**
   - Upload the entire project structure
   - CodeSandbox will detect package.json files

3. **Configure**
   - CodeSandbox auto-installs dependencies
   - Server starts automatically on port 3001

## Method 3: Manual Setup

1. **Create Container Sandbox**
   - Choose "Server Template"
   - Node.js environment

2. **Upload Structure**
```
entrepreneur-simulator/
├── server/
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json
└── README.md
```

3. **Install Dependencies**
```bash
npm install
cd client && npm install && cd ..
```

4. **Start Application**
```bash
npm start
```

## CodeSandbox Configuration

### Server Configuration
CodeSandbox will automatically:
- Install dependencies from package.json
- Start the server on port 3001
- Expose the port publicly
- Handle environment variables

### Running Both Servers

**Option 1: Use Tasks**
1. Open CodeSandbox Tasks panel
2. Add Task: "Backend" → `npm start`
3. Add Task: "Frontend" → `cd client && npm start`
4. Run both tasks

**Option 2: Use concurrently**
```bash
npm run dev
```

## Important Notes

### Ports
- Backend: Use `process.env.PORT || 3001`
- Frontend: CodeSandbox auto-proxies to backend
- Socket.IO: Works automatically with WebSocket support

### Database
- SQLite database (`simulator.db`) persists in CodeSandbox
- Auto-created on first run
- Survives container restarts

### Environment Variables
1. Go to CodeSandbox Settings
2. Add environment variables:
   - `JWT_SECRET`: Your secret key
   - `PORT`: 3001 (optional)

### Multi-User Access
- CodeSandbox provides a public URL
- Share URL with students
- Supports multiple concurrent users
- Real-time features work via WebSocket

## Testing

1. **Open Preview**
   - CodeSandbox shows preview automatically
   - Or open the generated URL

2. **Test Features**
   - Register as student
   - Create business
   - Add products
   - Test marketplace
   - Try trading

3. **Test Multi-User**
   - Open URL in multiple browsers/tabs
   - Register different users
   - Test real-time updates

## Performance Tips

### For Large Classes (20+ students)

1. **Increase Container Resources**
   - Upgrade CodeSandbox plan if needed
   - More RAM for database operations

2. **Optimize Database Queries**
   - Add indexes if needed
   - Limit query results

3. **Socket.IO Scaling**
   - Already optimized for multi-user
   - WebSocket handles concurrent connections

## Troubleshooting

### "Port already in use"
- CodeSandbox auto-assigns ports
- Check Tasks panel for running processes

### Database Issues
- Delete `simulator.db` to reset
- Database recreates automatically

### WebSocket Connection Failed
- Check if both servers are running
- Verify Socket.IO client connection URL
- CodeSandbox should handle this automatically

### Dependencies Not Installing
- Check package.json syntax
- Try manual install: `npm install`
- Clear cache and reinstall

## Sharing with Students

1. **Get Public URL**
   - CodeSandbox generates unique URL
   - Format: `https://[sandbox-id].csb.app`

2. **Share Instructions**
   - Send URL to students
   - They can access without CodeSandbox account
   - No installation needed!

3. **Access Control**
   - Students register in the app
   - Teacher creates admin account
   - Each user gets separate login

## Deployment Checklist

- [ ] All dependencies installed
- [ ] Both servers running
- [ ] Database initializes correctly
- [ ] Can register users
- [ ] Can create businesses
- [ ] Marketplace loads
- [ ] Trading platform works
- [ ] WebSocket updates work
- [ ] Teacher dashboard accessible
- [ ] Public URL accessible

## Alternative: StackBlitz

If you prefer StackBlitz instead of CodeSandbox:

1. Go to https://stackblitz.com
2. Import from GitHub
3. Works similarly to CodeSandbox
4. Full-stack Node.js support

## Support

If you encounter issues on CodeSandbox:
1. Check CodeSandbox console logs
2. Verify both package.json files
3. Check server/index.js for port config
4. Ensure SQLite dependencies install correctly

---

**Your simulator is now ready for educational use!** 🎓🚀

Students can access from anywhere, no installation required!
