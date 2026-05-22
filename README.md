# PokéVerse BD
A modern full-stack anime merchandise e-commerce platform built with the MERN stack.  
PokéVerse BD allows users to browse anime-themed fashion and accessories, explore products category-wise, place orders, manage carts, and experience a smooth responsive shopping experience.

# Live Website
https://pokeversebd.shop

# Features
## User Features
- Browse products category-wise
- Product details page with image carousel
- Add to cart functionality
- Order now / checkout system
- Pre-order system with release date support
- Out of stock handling
- Firebase Authentication
- Google Login
- Responsive design for mobile, tablet, and desktop
- Dynamic category pages using slugs
- Search system
- Protected routes

## Admin Features
- Add products dynamically
- Update products
- Delete products
- Upload multiple product images
- Add and manage categories
- Manage users
- Manage orders
- Set product availability:
  - Available
  - Pre-Order
  - Out of Stock

# Tech Stack
## Frontend
- React.js
- React Router
- Tailwind CSS
- DaisyUI
- TanStack Query (React Query)
- Axios
- Firebase Authentication
- SweetAlert2
- React Icons
- React Responsive Carousel

## Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- CORS
- dotenv

## Database & Storage
- MongoDB Atlas
- ImgBB Image Hosting

## Deployment
- Netlify (Client)
- Vercel (Server)

# Key Functionalities
## Dynamic Category System
Categories are loaded directly from the database.
When the admin adds a new category, it automatically appears on the homepage and category pages without modifying frontend code.

## Multi Image Upload System
Admins can upload multiple images for a product.  
Images are hosted through ImgBB and displayed using a responsive carousel.

## Product Status System
Products support three different states:
### Available
- Normal purchase flow
### Pre-Order
- Displays "Pre-Order Available" badge
- Shows release date
- "Order Now" becomes "Pre-Order Now"
### Out of Stock
- Displays out of stock badge
- Disables purchase buttons

# Authentication & Security
- Firebase Authentication
- JWT-based authorization
- Protected admin routes
- Secure API calls using Axios interceptors

# Performance Optimizations
- Limited product loading
- Dynamic category filtering
- React Query caching
- Optimized image rendering
- Lazy loading friendly structure