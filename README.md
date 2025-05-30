 ## "Velveta" 🌸

A visual product discovery platform built with React and Firebase, designed to provide a seamless and intuitive shopping experience through engaging imagery and user-friendly interactions.

![image](https://github.com/user-attachments/assets/e2c20ccf-a340-4a6c-bb79-11ae41e62eab)


## ✨ Features

### For Users
- 🖼️ Pinterest-style masonry grid layout
- 🔍 Filter products by categories
- 🛍️ Multiple affiliate links per product
- 📱 Fully responsive design

### For Admins
- 🔒 Password-protected admin panel
- ➕ Add/edit/delete products
- 🏷️ Manage product categories
- 🔗 Add unlimited affiliate links

## 🛠 Tech Stack

| Category       | Technology       |
|----------------|------------------|
| Frontend       | React 18         |
| Routing        | React Router v6  |
| Styling        | Tailwind CSS     |
| Database       | Firebase Firestore|
| Hosting        |     Netlify      |
| CI/CD          | GitHub Actions   |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Firebase account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/velveta.git
cd velveta
```

2. Install dependencies
```bash
npm install
```
3. Set up Firebase

Create a new Firebase project

Enable Firestore database

Copy your config to src/firebase-config.js

4. Run locally
```bash
npm start
```

🔥 Deployment

Netlify Hosting

Connect your GitHub repository
```bash
Set build command: npm run build

Set publish directory: build
```
🔐 Admin Access
Visit /admin route
Manage products and categories
