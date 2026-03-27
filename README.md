# 🎮 GameStore – Full Stack E-commerce Website

**GameStore** is a fully functional e-commerce platform for selling video games. It combines a modern React frontend with a Node.js backend (optional) and uses `localStorage` as a simulated database for easy deployment. The project showcases advanced frontend features like 3D cards, scroll animations, dark/light theme, a wishlist, and an admin dashboard.

---

## ✨ Features

- **User Authentication** – Register, login, and logout. The first registered user automatically becomes an **admin**.
- **Product Browsing** – View all products with category and price filters.
- **Product Details** – Individual product page with image gallery and lightbox.
- **Shopping Cart** – Add/remove items, adjust quantities, and see the total dynamically.
- **Wishlist** – Save favorite products per user (stored separately in `localStorage`).
- **User Profile** – View personal info, order history, and wishlist items.
- **Admin Dashboard** – Manage products (add/edit/delete, upload images, mark as featured), view users, orders, and contact messages.
- **Responsive Design** – Fully responsive layout using Tailwind CSS.
- **Dark/Light Theme** – Toggle between dark and light mode with persistent preference.
- **Animations** – 3D card hover effects, scroll reveal (AOS), typing effects, and smooth transitions (Framer Motion).
- **PWA Ready** – Can be installed as a Progressive Web App (with offline support when using service workers).

---

## 🛠️ Tech Stack

| Layer          | Technologies |
|----------------|--------------|
| **Frontend**   | React, Vite, Tailwind CSS, Framer Motion, AOS, Axios |
| **Backend**    | Node.js, Express (optional – currently using `localStorage`) |
| **Storage**    | `localStorage` for user data, cart, wishlist, orders, and messages |
| **Deployment** | Vercel (frontend) / Render (backend, if used) |

---

## 📁 Project Structure

```
GameStore/
├── client/                 # React frontend
│   ├── public/             # Static files (images, icons)
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, ProductCard, Map, etc.)
│   │   ├── pages/          # Page components (Home, Products, Admin, Profile, etc.)
│   │   ├── utils/          # Utility functions (cart.js, wishlist.js, api.js)
│   │   ├── context/        # Theme context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend (optional)
│   ├── data/               # JSON data files
│   ├── routes/             # API routes
│   ├── server.js
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/GameStore.git
cd GameStore
```

### 2. Install frontend dependencies
```bash
cd client
npm install
```

### 3. (Optional) Install backend dependencies
```bash
cd ../server
npm install
```

### 4. Run the development server
- **Frontend only** (uses `localStorage`):
  ```bash
  cd client
  npm run dev
  ```
- **With backend** (if you choose to use the Node.js server):
  ```bash
  # Terminal 1: backend
  cd server
  npm start
  # Terminal 2: frontend
  cd client
  npm run dev
  ```

### 5. Open your browser
- Frontend: `http://localhost:5173`
- Backend API (if running): `http://localhost:5000`

---

## 🔐 Default Admin Account

The first user to register becomes an admin automatically. No special email is required. After registration, you can log in and access the admin panel at `/admin`.

---

## 🧪 Testing the Features

- **User registration / login** – Use any email/password.
- **Add to cart** – Click the “Add to Cart” button on any product.
- **Wishlist** – Click the heart icon on a product card.
- **Admin dashboard** – After logging in as admin, click the gear icon in the navbar or go to `/admin`.
  - Add a new product (upload an image – it will be stored as Base64 in `localStorage`).
  - Mark products as featured.
  - View users, orders, and contact messages.

---

## 📸 Screenshots

*(Add screenshots of your website here)*

---

## 📦 Deployment

### Frontend on Vercel
1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Set the **Root Directory** to `client`.
4. Vercel will automatically detect Vite and build the project.
5. Add environment variables if needed (e.g., `VITE_API_URL` for the backend).

### Backend on Render (optional)
If you decide to use the Node.js backend:
1. Push the repository (with the `server` folder) to GitHub.
2. On Render, create a new Web Service and point to your repository.
3. Set the **Root Directory** to `server`.
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add the environment variable `PORT` if needed.

---

## 🤝 Contributing

This project was developed as a graduation project. Feel free to fork and experiment.

---

## 📄 License

This project is for educational purposes only.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [AOS](https://michalsnik.github.io/aos/)
- [Font Awesome](https://fontawesome.com/)
- [Vite](https://vitejs.dev/)

---

**GameStore – Where Gaming Dreams Come True!** 🎮
