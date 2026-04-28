# Installation & Configuration Guide

## Complete Step-by-Step Setup

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- npm or yarn
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- Git
- Code editor (VS Code recommended)

## Backend Setup (Server)

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator

### Step 3: Create Environment File
Create a `.env` file in the server directory:

```bash
touch .env
```

Add the following content:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/book_store
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book_store

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# On Windows (CMD)
mongod

# On macOS/Linux
mongod --dbpath /usr/local/var/mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Step 5: Start Backend Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 6: Seed Sample Data

In another terminal, run:
```bash
curl -X POST http://localhost:5000/api/seed
```

OR use Postman:
- Method: POST
- URL: `http://localhost:5000/api/seed`
- Body: None
- Send

Response:
```json
{
  "success": true,
  "message": "50 books seeded successfully",
  "books": [...]
}
```

## Frontend Setup (Client)

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- react-icons
- react-spinners

### Step 3: Verify Proxy Configuration

Check `client/package.json` has:
```json
"proxy": "http://localhost:5000"
```

This allows API calls to the backend.

### Step 4: Start React Development Server

```bash
npm start
```

Browser will automatically open to `http://localhost:3000`

You should see:
```
Compiled successfully!
On Your Network: http://xxx.xxx.x.xxx:3000
```

## Testing the Application

### 1. Test Sign Up
1. Click "Sign Up" button
2. Fill in details:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm: "password123"
3. Click "Create Account"
4. Should be redirected to home page

### 2. Test Search
1. Use search bar to search for "The Great Gatsby"
2. Try filtering by category "Story"
3. Results should update in real-time

### 3. Test Save Book
1. Hover over any book card
2. Click "Save" button
3. Button changes to "Remove"
4. Go to Dashboard to see saved books

### 4. Test Read Book
1. Click "Read" button on any book
2. Should open reader page with full content
3. Click back button to return

### 5. Test Download
1. Click "Download" button
2. Should open download link in new tab

## Troubleshooting

### Issue: "Cannot GET /api/books"
**Solution**: Ensure backend server is running
```bash
# In server directory
npm run dev
```

### Issue: "localhost:3000 refused to connect"
**Solution**: Clear npm cache and reinstall
```bash
npm cache clean --force
npm install
npm start
```

### Issue: "MongooseError: Cannot connect to MongoDB"
**Solution**: Check MongoDB connection
```bash
# Verify MongoDB is running
mongod

# Check connection string in .env
echo $MONGODB_URI
```

### Issue: "Books not showing after seed"
**Solution**: 
1. Clear browser cache
2. Verify seed was successful (check response)
3. Check MongoDB database:
   ```bash
   mongo
   use book_store
   db.books.count()
   ```

### Issue: "Port 5000 already in use"
**Solution**: Change port in .env
```env
PORT=5001
```

### Issue: "CORS error" 
**Solution**: Check backend/server.js has cors middleware
```javascript
app.use(cors());
```

## Environment Variables Reference

### Server (.env)
| Variable | Description | Example |
|----------|-------------|----------|
| MONGODB_URI | Database connection string | mongodb://localhost:27017/book_store |
| JWT_SECRET | Secret key for JWT tokens | your_secret_key_here |
| PORT | Server port number | 5000 |
| NODE_ENV | Environment type | development/production |

### Client (package.json)
| Config | Description | Value |
|--------|-------------|-------|
| proxy | Backend API URL | http://localhost:5000 |

## API Testing with Postman

### Import API Collection
1. Open Postman
2. Create new collection "BookStore API"
3. Add requests:

#### Sign Up
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }
  ```

#### Login
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Body** (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get All Books
- **Method**: GET
- **URL**: `http://localhost:5000/api/books`
- **Params**: 
  - search: (optional) book title or author
  - category: (optional) Horror, Story, History, Education, Poem, Movies

#### Get Single Book
- **Method**: GET
- **URL**: `http://localhost:5000/api/books/{bookId}`

#### Save Book
- **Method**: POST
- **URL**: `http://localhost:5000/api/library/save`
- **Headers**: 
  - Authorization: `Bearer {token}`
- **Body** (JSON):
  ```json
  {
    "bookId": "book_id_here"
  }
  ```

## Performance Tips

1. **Database Indexing**: Add indexes for frequently searched fields
   ```javascript
   // In Book model
   bookSchema.index({ title: 'text', author: 'text' });
   ```

2. **Image Optimization**: Compress book cover images

3. **Pagination**: Implement pagination for large book lists
   ```javascript
   const page = req.query.page || 1;
   const limit = 12;
   const skip = (page - 1) * limit;
   const books = await Book.find().skip(skip).limit(limit);
   ```

4. **Caching**: Cache frequently accessed data

## Deployment

### Deploy Backend to Heroku
```bash
cd server
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend to Vercel
```bash
cd client
npm install -g vercel
vercel
```

Update API endpoint in client to deployed backend URL.

## Next Steps

1. ✅ Complete local setup
2. ✅ Test all features
3. ✅ Add more books to database
4. ✅ Customize styling
5. ✅ Deploy to production

---

**Need help?** Check GitHub issues or create a new one with your problem description.
