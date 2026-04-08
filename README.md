<div align="center">

<h1>🛒 BusyBuy</h1>

<h3>A full-featured e-commerce web application built with React, Redux Toolkit & Firebase</h3>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://busy-buy-self.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Abhay-Mishra-2712/Busy-Buy)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-1.9.3-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org)
[![Firebase](https://img.shields.io/badge/Firebase-9.18.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

</div>

---

## 📸 Screenshots

| ![Home](https://github.com/Abhay-Mishra-2712/Busy-Buy/blob/main/public/screenshots/Home.png) |
![SignIn](https://github.com/Abhay-Mishra-2712/Busy-Buy/blob/main/public/screenshots/SignIn.png) |
![Cart](https://github.com/Abhay-Mishra-2712/Busy-Buy/blob/main/public/screenshots/Cart.png) |
![Orders](https://github.com/Abhay-Mishra-2712/Busy-Buy/blob/main/public/screenshots/Orders.png) |

---

## ✨ Features

- 🔐 **Authentication** — Sign up & Sign in with Firebase Auth (email/password)
- 🛍️ **Product Browsing** — Browse 20 products seeded from a local dataset into Firestore
- 🔍 **Search** — Real-time search by product name
- 🎚️ **Filter Sidebar** — Filter by price range (₹1 – ₹1,00,000) and category simultaneously
- 🛒 **Cart Management** — Add, remove, increase/decrease quantity — all persisted to Firestore
- 📦 **Order History** — Purchase cart items and view complete order history with dates
- 🔒 **Protected Routes** — Cart and Orders pages redirect unauthenticated users to Sign In
- 📱 **Responsive Design** — Works on desktop and mobile
- 🔔 **Toast Notifications** — Real-time feedback for all user actions
- ⚡ **Redux State** — Centralized global state with Redux Toolkit, async thunks & extraReducers

---

## 🛠️ Tech Stack

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| **React 18**        | UI library                                 |
| **Redux Toolkit**   | Global state management                    |
| **React Redux**     | React bindings for Redux                   |
| **Firebase Auth**   | User authentication                        |
| **Cloud Firestore** | NoSQL database for products, carts, orders |
| **React Router v6** | Client-side routing                        |
| **React Toastify**  | Toast notifications                        |
| **React Spinners**  | Loading indicators                         |

---

## 📁 Project Structure

```
src/
├── assets/               # Images and icons
├── components/
│   ├── FilterSidebar/    # Price range slider + category checkboxes
│   ├── Navbar/           # Navigation bar (auth-aware)
│   ├── OrderTable/       # Order history table component
│   ├── Product/
│   │   ├── ProductCard/      # Individual product card
│   │   ├── ProductContainer/ # Card layout wrapper
│   │   ├── ProductGrid/      # CSS grid layout
│   │   └── ProductList/      # Maps products to cards
│   └── UI/
│       ├── Icons/        # Plus / Minus icons
│       └── Loader/       # Spinner component
├── config/
│   └── firebase.js       # Firebase initialization
├── pages/
│   ├── CartPage/         # Shopping cart page
│   ├── HomePage/         # Product listing + search + filter
│   ├── LoginPage/        # Sign in form
│   ├── NotFoundPage/     # 404 page
│   ├── OrdersPage/       # Order history page
│   └── RegisterPage/     # Sign up form
├── redux/
│   ├── reducers/
│   │   ├── authReducer.js      # Auth state + signupUser/loginUser/logoutUser thunks
│   │   ├── cartReducer.js      # Cart + Orders state + all cart/order thunks
│   │   └── productsReducer.js  # Products state + fetchProducts/filterProducts
│   └── store/
│       └── store.js            # Redux store configuration
└── utils/
    ├── data.js           # 20 seed products
    └── utils.js          # Firebase helper functions
```

---

## 🔄 Redux Architecture

```
store
├── auth
│   ├── isAuthenticated
│   ├── user { uid, email, name }
│   ├── authInitialized
│   └── loading / error
│   Thunks: signupUser | loginUser | logoutUser
│
├── products
│   ├── products[]
│   ├── filteredProducts[]
│   └── loading / error
│   Thunks: fetchProducts
│   Reducers: filterProducts
│
└── cart
    ├── cartProducts[]
    ├── orders[]
    ├── purchasing
    └── loading / error
    Thunks: fetchCartProducts | addToCart | removeFromCart
            increaseQuantity | decreaseQuantity
            purchaseCart | fetchOrders
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm v8+
- A Firebase project with **Authentication** and **Firestore** enabled

### 1. Clone the repository

```bash
git clone https://github.com/Abhay-Mishra-2712/Busy-Buy
cd busybuy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> **How to get these values:**
> Firebase Console → Project Settings → Your Apps → SDK config → Config

### 4. Enable Firebase Services

In your Firebase console:

- **Authentication** → Sign-in method → Enable **Email/Password**
- **Firestore Database** → Create database → **Start in test mode**

### 5. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

> 🎉 Products are automatically seeded into Firestore on first load!

---

## 🔐 Test Account

A pre-registered account for demo/testing purposes:

| Field        | Value          |
| ------------ | -------------- |
| **Name**     | Your Name      |
| **Email**    | youremail@.com |
| **Password** | password       |

---

## 🗺️ App Routes

| Route       | Component      | Protected        |
| ----------- | -------------- | ---------------- |
| `/`         | `HomePage`     | ❌ Public        |
| `/signup`   | `RegisterPage` | ❌ Public        |
| `/signin`   | `LoginPage`    | ❌ Public        |
| `/cart`     | `CartPage`     | ✅ Auth required |
| `/myorders` | `OrdersPage`   | ✅ Auth required |
| `*`         | `NotFoundPage` | ❌ Public        |

---

## ☁️ Firestore Data Structure

```
Firestore
├── products/
│   └── {productId}         # 20 products from data.js (auto-seeded)
│       ├── id, title, price, description, category, image
│       └── rating { rate, count }
│
├── usersCarts/
│   └── {uid}               # One doc per user
│       └── { productId: quantity, ... }
│
└── userOrders/
    └── {uid}               # One doc per user
        └── orders: [
              { productId: quantity, ..., date: timestamp },
              ...
            ]
```

---

## 📦 Available Scripts

```bash
npm start        # Run development server
npm run build    # Build for production
npm test         # Run test suite
npm run eject    # Eject from Create React App
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Click Deploy → Get your live link!

### Firebase Hosting

```bash
npm run build
firebase init hosting   # public dir: build, SPA: yes
firebase deploy
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

Abhay Mishra
🔗 LinkedIn: (https://www.linkedin.com/in/abhaymishra2712/)
💻 GitHub: (https://github.com/Abhay-Mishra-2712)

<div align="center">

**Built with ❤️ using React + Redux Toolkit + Firebase**

⭐ Star this repo if you found it helpful!

</div>
