# Food Sharing Platform

A web-based platform to connect food donors with those in need by enabling easy donation listings, mapping of donation points, and real-time updates using Firebase and Mapbox.

## 🌟 Features

- Interactive ZIP-code-based donation map with Mapbox
- Firebase authentication and no_SQL realtime database
- Add, edit, and soft-delete donations with versioning
- Request needed items for who are in need
- Searchable and filterable donation and request entries
- Request/Help system with real-time updates
- History pages to keep track all donation activities

## 🛠️ Tech Stack

- Frontend: React, React Bootstrap, React Router
- Backend: Firebase (Auth, Firestore)
- Maps: Mapbox GL JS + @mapbox/search-js-react

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/foodsharingplatform.git
cd foodsharingplatform
```

### 2. Install dependencies
```
npm install
```

### 3. Set up environment variables
Create a .env file in the root and add the following:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Start the app
```
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## 🤝 Contributing to the project
- Fork the repo
- Create a new branch: git checkout -b feature/your-feature
- Make changes and commit: git commit -m "Added feature"
- Push to branch: git push origin feature/your-feature
- Submit a pull request

## 🙌 Contributors
- Thanh Tran
- Alexander Pearce
- Jean Mbama Makita
- Ash Rahman
  
## 📝 License
MIT License

