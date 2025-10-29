# 💎 NIORA - Jewelry E-Commerce Platform

A modern, responsive jewelry e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS. This project features a complete shopping experience with cart functionality, wishlist, search, and user authentication.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.2-764ABC)

## 🌟 Features

### Core Features
- **🛍️ E-Commerce Functionality**: Complete shopping cart and checkout experience
- **❤️ Wishlist System**: Save and manage favorite jewelry items
- **🔍 Advanced Search**: Filter by category, shape, metal, and price range
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🔐 User Authentication**: Login and signup functionality
- **📊 State Management**: Redux Toolkit for global state management
- **🍞 Toast Notifications**: User feedback for actions and events

### Product Features
- **💍 Product Categories**: Rings, Necklaces, Bracelets, Earrings
- **💎 Diamond Shapes**: Round, Princess, Heart, Oval cuts
- **🥇 Metal Types**: Gold, Silver, Platinum options
- **💰 Price Filtering**: Flexible price range selection
- **📸 Image Gallery**: High-quality product imagery
- **⭐ Product Details**: Comprehensive product information

### UI/UX Features
- **🎨 Modern Design**: Clean and elegant interface
- **🌊 Smooth Animations**: Hover effects and transitions
- **📱 Mobile-First**: Responsive design across all devices
- **🧭 Easy Navigation**: Intuitive menu and search functionality
- **🎯 Trust Badges**: Security and certification displays
- **📰 Newsletter**: Email subscription functionality

## 🚀 Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vigneshrk145/Jewelry-Website.git
   cd jewelry-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
jewelry-ecommerce/
├── public/                     # Static assets
│   ├── diamondshape/          # Diamond shape images
│   ├── images/                # General images
│   ├── newarrival/           # New arrival product images
│   └── shopcatageroy/        # Shop category images
├── src/
│   ├── app/                   # Next.js 13+ App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx          # Home page
│   │   ├── cart/             # Shopping cart page
│   │   ├── login/            # Login page
│   │   ├── search/           # Search results page
│   │   ├── signup/           # User registration page
│   │   └── wishlist/         # Wishlist page
│   ├── components/            # Reusable React components
│   │   ├── BlogSection.tsx    # Blog content component
│   │   ├── CustomSection.tsx  # Custom jewelry section
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Header.tsx         # Site header and navigation
│   │   ├── HeroSection.tsx    # Hero banner component
│   │   ├── LabGrownSection.tsx # Lab-grown diamonds section
│   │   ├── NewsletterSection.tsx # Email subscription
│   │   ├── ProductGrid.tsx    # Product display grid
│   │   ├── ReduxProvider.tsx  # Redux store provider
│   │   ├── SearchBar.tsx      # Search functionality
│   │   ├── ShopByCategory.tsx # Category navigation
│   │   ├── ShopByShape.tsx    # Diamond shape selection
│   │   ├── TestimonialsSection.tsx # Customer reviews
│   │   ├── ToastContainer.tsx # Notification system
│   │   ├── TrustBadges.tsx    # Trust and security badges
│   │   ├── WishlistDrawer.tsx # Wishlist sidebar
│   │   └── ui/               # UI component library
│   ├── constants/            # Application constants
│   │   └── placeholderImages.ts # Image placeholder data
│   └── store/                # Redux state management
│       ├── index.ts          # Store configuration
│       └── slices/           # Redux slices
│           ├── cartSlice.ts   # Shopping cart state
│           ├── toastSlice.ts  # Notification state
│           ├── uiSlice.ts     # UI state management
│           └── wishlistSlice.ts # Wishlist state
├── .eslintrc.json            # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build the application for production
npm run start        # Start the production server

# Code Quality
npm run lint         # Run ESLint for code linting
```

## 🔧 Technology Stack

### Frontend Framework
- **Next.js 16**: React framework with App Router
- **React 19.2**: UI library with latest features
- **TypeScript 5**: Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **PostCSS**: CSS processing tool
- **Responsive Design**: Mobile-first approach

### State Management
- **Redux Toolkit 2.9**: Simplified Redux for state management
- **React Redux 9.2**: React bindings for Redux

### Form Handling
- **React Hook Form 7.65**: Performant form library
- **Hookform Resolvers 5.2**: Form validation resolvers
- **Zod 4.1**: TypeScript-first schema validation

### Development Tools
- **ESLint 9**: Code linting and formatting
- **Babel React Compiler**: Performance optimization
- **Next.js Config**: Framework configuration

## 🎨 Key Components

### Header Component
- Responsive navigation menu
- Search functionality
- Cart and wishlist counters
- User authentication links

### Product Grid
- Dynamic product display
- Add to cart functionality
- Wishlist management
- Price filtering and sorting

### Shopping Cart
- Item quantity management
- Price calculations
- Checkout process
- Persistent storage

### Search System
- Advanced filtering options
- Sort by price, name, relevance
- Category and attribute filters
- Real-time search results

### State Management
- **Cart Slice**: Manages shopping cart items and quantities
- **Wishlist Slice**: Handles saved items
- **Toast Slice**: Manages notification messages
- **UI Slice**: Controls drawer states and modals

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 Search & Filtering

### Search Features
- Text-based product search
- Category filtering (Rings, Necklaces, Bracelets, Earrings)
- Shape filtering (Round, Princess, Heart, Oval)
- Metal filtering (Gold, Silver, Platinum)
- Price range filtering
- Sort options (Relevance, Price, Name)

## 🛒 E-Commerce Features

### Shopping Cart
- Add/remove products
- Quantity management
- Price calculations
- Persistent across sessions

### Wishlist
- Save favorite items
- Quick add/remove functionality
- Wishlist drawer interface
- Cross-session persistence

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with automatic CI/CD

### Manual Deployment
```bash
npm run build        # Build the application
npm run start        # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 👥 Authors

- **Vignesh** - *Initial work* - [@vigneshrk145](https://github.com/vigneshrk145)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Redux Toolkit for simplified state management
- All open-source contributors

## 📞 Support

For support and questions, please create an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js and modern web technologies.
