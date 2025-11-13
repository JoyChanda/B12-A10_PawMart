🐾 PawMart – Pet Adoption & Marketplace (Frontend)

PawMart is a modern, responsive web application where users can adopt pets, sell pet supplies, and explore pet-related listings.
This frontend is built with cutting-edge React tools and focuses on clean design, smooth performance, and dark mode functionality.

🚀 Tech Stack
Category Technologies Used
Frontend Framework React 18+

Routing React Router DOM v6

Styling Tailwind CSS

Animations Framer Motion

Notifications React Hot Toast

State Management React Hooks & Context API
Dark/Light Theme Custom ThemeContext with LocalStorage persistence
API Handling Axios (services/api.js)
Component-Based UI Custom reusable components like Navbar, Footer, ListingCard, etc.
Firebase Authentication setup (Login/Register) via Firebase SDK
Package Manager npm (via Vite build system)
Build Tool Vite
for fast development
🌟 Core Features
🏠 Home Page

Responsive Hero Banner Slider with auto-animation.

Dynamic Category Section (Pets, Food, Accessories, etc.)

Live Recent Listings fetched from backend.

Pet Heroes Section featuring real-life contributors.

Full Dark Mode Support.

💬 Listings

Browse pet and pet-supply listings.

Add, view, and manage listings (price, quantity, description, etc.).

Prevents invalid inputs (e.g., negative prices).

🧑‍💻 Authentication

Login and Register pages using Firebase Authentication.

Firebase config stored securely in .env variables.

Input validation and user-friendly UI.

🌓 Dark/Light Mode

Custom ThemeContext using React Context API.

Automatically remembers the selected theme (saved in localStorage).

Toggle via a single button in the navbar.

⚙️ Reusable Components

Navbar – top navigation with theme toggle.

Footer – clean responsive footer.

ListingCard – reusable UI for listing display.

CategoryCard – cute category display with emoji icons.

Loading – smooth loading animation component.

⚙️ Environment Setup

Create a .env file in the root directory and add your Firebase config keys:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

🧰 Installation & Setup

# Clone the repository

git clone : https://github.com/JoyChanda/B12-A10_PawMart.git

# Navigate to project folder

cd pawmart-frontend

# Install dependencies

npm install

# Start development server

npm run dev

🧡 Developer Notes

This frontend connects to a Node.js/Express backend API (/listings route).

Designed to be mobile-first, SEO-friendly, and accessible.

Fully supports dark mode, smooth animations, and clean code structure.

📸 Preview

🐕 Modern pet adoption experience with a beautiful UI, intuitive navigation, and full responsive layout.
