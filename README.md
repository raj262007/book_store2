# Full-Stack Book Store Website - MERN Implementation

## 📚 Project Overview

A modern, student-focused Full-Stack Book Store Website built with the **MERN Stack** (MongoDB, Express, React, Node.js). This platform allows students to discover, read, download, and save books across multiple categories including Horror, Story, History, Education, Poem, and Movies.

## ✨ Features

### 1. **Database & Content**
- 50+ high-rated books across 6 categories
- Each book includes: Title, Author, Category, Rating, Summary, and Read/Download links
- MongoDB database for scalable book management

### 2. **User Authentication**
- Secure Sign Up/Login system
- JWT-based authentication
- Password hashing with bcryptjs
- Persistent user sessions

### 3. **Personal Library**
- Save/Watchlist feature to bookmark favorite books
- View saved books in personalized dashboard
- Quick remove/manage saved books

### 4. **Search Functionality**
- Robust search by book name, author, or category
- Real-time filtering
- Category-based browsing

### 5. **Book Interaction**
- **Read Option**: Dedicated reader page with full book content
- **Download Option**: Direct file download functionality
- **Preview Summary**: Clean UI card showing book details before reading/downloading

### 6. **UI/UX Design**
- Modern gradient design tailored for students
- Responsive Bento Grid layout
- Mobile-friendly interface
- Material Design principles
- Attractive card-based design

## 🏗️ Project Structure

```
book_store2/
├── server/
│   ├── models/
│   │   ├── User.js           # User schema with saved books
│   │   └── Book.js           # Book schema with metadata
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── books.js          # Book CRUD operations
│   │   └── userLibrary.js    # Saved books management
│   ├── controllers/
│   │   ├── authController.js         # Auth logic
│   │   ├── bookController.js         # Book logic
│   │   └── userLibraryController.js # Library logic
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── data/
│   │   └── books.json        # Sample books data
│   └── server.js             # Main server file
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   ├── BookCard.jsx            # Book display card
│   │   │   ├── SearchBar.jsx           # Search functionality
│   │   │   ├── ReaderPage.jsx          # Book reader
│   │   │   └── Dashboard.jsx           # User dashboard
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Home page with books grid
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── SignUp.jsx              # Sign up page
│   │   │   ├── BookDetail.jsx          # Book details (optional)
│   │   │   └── UserDashboard.jsx       # User profile dashboard
│   │   ├── styles/
│   │   │   ├── index.css               # Global styles
│   │   │   ├── App.css                 # App layout
│   │   │   ├── Navbar.css              # Navbar styling
│   │   │   ├── BookCard.css            # Card styling
│   │   │   ├── SearchBar.css           # Search styling
│   │   │   ├── ReaderPage.css          # Reader styling
│   │   │   ├── Dashboard.css           # Dashboard styling
│   │   │   ├── Auth.css                # Auth pages styling
│   │   │   └── Home.css                # Home page styling
│   │   ├── App.jsx                     # Main app component
│   │   └── index.js                    # React entry point
│   ├── package.json                    # Client dependencies
│   └── public/
│       └── index.html                  # HTML template
│
├── .gitignore
└── README.md                           # This file
```

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/raj262007/book_store2.git
cd book_store2
checkout mern-implementation
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/book_store
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development" > .env

# Start MongoDB (if running locally)
# mongod

# Start development server
npm run dev
# OR for production
npm start
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React development server
npm start
```

Client will run on `http://localhost:3000`

### 4. Seed Sample Books (Optional)

```bash
# Make a POST request to seed the database
curl -X POST http://localhost:5000/api/seed
```

## 📝 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Create new user account
- `POST /login` - Login user
- `GET /profile` - Get user profile (requires auth)

### Books Routes (`/api/books`)
- `GET /` - Get all books (supports search & category filters)
- `GET /:id` - Get single book by ID
- `GET /category/:category` - Get books by category
- `POST /` - Create new book (admin only)

### User Library Routes (`/api/library`)
- `POST /save` - Save book to user's library (requires auth)
- `GET /` - Get user's saved books (requires auth)
- `DELETE /:bookId` - Remove book from saved list (requires auth)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User signs up with email and password
2. Password is hashed using bcryptjs
3. JWT token is generated and stored in localStorage
4. Token is sent in Authorization header for protected routes
5. Token expires in 7 days

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  savedBooks: [ObjectId], // References to Book documents
  createdAt: Date,
  updatedAt: Date
}
```

### Book Model
```javascript
{
  title: String,
  author: String,
  category: String (Horror|Story|History|Education|Poem|Movies),
  rating: Number (0-5),
  summary: String,
  content: String, // Full book text
  downloadUrl: String,
  coverImage: String,
  publishedYear: Number,
  totalReads: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Features

### Design Elements
- **Gradient Background**: Purple to blue gradient for modern look
- **Card Layout**: Bento grid-inspired book card design
- **Responsive Grid**: Auto-fills cards based on screen size
- **Hover Effects**: Smooth transitions and overlay effects
- **Modal-like Overlays**: Read/Download buttons appear on hover
- **Color Scheme**: Purple (#667eea), Blue (#764ba2), White, with accent yellows

### Responsive Breakpoints
- **Desktop**: Full grid layout
- **Tablet** (768px): Adjusted grid columns
- **Mobile** (480px): 2-column grid with optimized spacing

## 🎯 Key Components

### Navbar
- Logo and branding
- Navigation links
- Auth buttons (Login/Signup or Profile/Logout)
- Sticky positioning

### BookCard
- Cover image with hover overlay
- Read and Download buttons on hover
- Book title, author, rating, category
- Save/Remove button

### SearchBar
- Real-time search input
- Category filter dropdown
- Integrated search and filter logic

### ReaderPage
- Full book content display
- Book metadata (author, category, rating, year)
- Back button for navigation
- Download button

### Dashboard
- User profile information
- Count of saved books
- Grid view of saved books
- Remove saved books functionality
- Quick explore books button

## 🚦 How to Use

### For New Users
1. Click "Sign Up" in navbar
2. Enter name, email, password
3. Create account
4. Redirected to home page

### Finding Books
1. Use search bar to find by title, author, or category
2. Use category filter dropdown
3. Browse through the grid of books

### Reading Books
1. Hover over any book card
2. Click "Read" button
3. Full book content opens in reader page
4. Can download from reader page

### Managing Library
1. Click "Save" button on any book card
2. Access saved books from Dashboard
3. Remove books from dashboard anytime
4. All saved books persist across sessions

## 📱 Responsive Design

The application is fully responsive:
- **Mobile-first** approach
- **Flexible grid** that adapts to screen size
- **Touch-friendly** buttons and interactions
- **Optimized images** for different devices
- **CSS media queries** for layout adjustments

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Protected routes with middleware
- Email validation
- HTTP-only secure cookies (can be added)
- CORS enabled for development

## 🌟 Future Enhancements

- [ ] User ratings and reviews
- [ ] Reading progress tracking
- [ ] Personalized recommendations
- [ ] Social sharing features
- [ ] Admin panel for book management
- [ ] Email notifications
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Integration with real APIs for book covers
- [ ] Payment gateway for premium content

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Ensure MongoDB is running:
mongod
```

### Port Already in Use
```bash
# Change port in .env file
PORT=5001
```

### CORS Error
```
Ensure proxy is set in client/package.json:
"proxy": "http://localhost:5000"
```

### Books Not Showing
```
Run seed endpoint:
curl -X POST http://localhost:5000/api/seed
```

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create new issue with detailed description
3. Include error logs and steps to reproduce

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Pawan Singh** (raj262007)
- GitHub: [@raj262007](https://github.com/raj262007)
- Email: pawans1626@gmail.com

## 🙏 Acknowledgments

- MERN Stack community
- React documentation
- MongoDB documentation
- Express.js guides

---

**Happy Reading!** 📚✨
