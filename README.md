#  BlogSphere

**BlogSphere** is a full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS. It offers a modern, responsive, and feature-rich experience for users to create, browse, and engage with blog content.

---

## Core Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
|  Authentication       | Secure login and registration using JWT                                     |
|  Role-Based Access   | Admins can manage posts and categories                                       |
|  Blog Creation UI     | Rich editor with markdown or WYSIWYG support                                |
|  View Blogs           | Public-facing feed to browse and read posts                                |
|  Category Manager     | Admin interface to create, edit, and delete categories                      |
|  User Profiles        | Personalized pages showing user activity and published posts                |
|  Search & Filter      | Find blogs by title, category, or author                                    |
|  Dark Mode Toggle     | Persistent theme switcher with smooth transitions                           |
|  Comments & Likes     | Engage with posts through reactions and discussions                         |

---

##  Key Features Added

✅ **Dark Mode Toggle** — Persistent dark/light mode with smooth transitions  
✅ **Blog Images** — Full image support with fallback images  
✅ **Modern UI** — Gradient buttons, hover effects, smooth animations  
✅ **Responsive Design** — Mobile-friendly navigation and layouts  
✅ **Enhanced Cards** — Beautiful post cards with images, categories, and metadata  
✅ **Loading States** — Elegant loaders and disabled states  
✅ **Error Handling** — Toast notifications with icons  
✅ **Image Preview** — Live preview when adding image URLs  
✅ **Improved Forms** — Better UX with labels, placeholders, and validation feedback  
✅ **Hero Section** — Eye-catching landing page  
✅ **Sticky Navigation** — Navbar stays at top while scrolling  

---

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React, Vite, Tailwind CSS     |
| Backend   | Node.js, Express              |
| Database  | MongoDB + Mongoose            |
| Auth      | JWT + bcrypt                  |
| Routing   | React Router + Express Router |

---

## Database Overview

BlogSphere uses **MongoDB**, connected via **Mongoose**, to manage all data:

- `users` — Stores user credentials, roles, and profile data  
- `posts` — Stores blog content, title, author, category, image, likes, and comments  
- `categories` — Stores blog categories for classification  

Posts reference `author` and `category`, and include embedded or referenced comments and likes. Authentication is handled via JWT, with middleware enforcing role-based access.

---

## ## Live Demo

Check out the live frontend here: [BlogSphere Frontend](https://blogsphere-frontend-766c.onrender.com/)
Check out the live backend here: [BlogSphere Frontend](https://blogsphere-api-wry8.onrender.com/)


