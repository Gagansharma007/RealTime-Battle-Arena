# 🎮 Real-Time Multiplayer Battle Arena

## 🚀 Overview
A **real-time multiplayer 2D battle game** where players join an arena and compete until the last one standing. The game uses **WebSockets (Socket.io)** for real-time communication and **Canvas API** for rendering.

## 🛠️ Tech Stack
**Frontend:**
- React (TypeScript)
- Canvas API (WebGL Rendering)

**Backend:**
- Node.js (Express.js)
- Socket.io (WebSockets)
- Redis (Leaderboard & Sessions)

**DevOps & Deployment:**
- Docker (Containerization)
- GitHub Actions (CI/CD)
- AWS (Cloud Deployment)

---

## 📂 Project Structure
```
real-time-battle-arena/
│── backend/                 # Node.js Backend (Game Logic, WebSocket)
│   ├── src/
│   │   ├── game/            # Game Logic (Player, Projectile, Collision, Rooms)
│   │   ├── config/          # Server, Redis, Env Configurations
│   │   ├── controllers/     # WebSocket & REST Controllers
│   │   ├── middleware/      # Authentication & Security
│   │   ├── utils/           # Helpers & Lag Compensation
│   ├── tests/               # Backend Unit Tests
│   ├── package.json         # Backend Dependencies
│── frontend/                # React Frontend (Canvas, UI, WebSockets)
│   ├── src/
│   │   ├── components/      # UI Components (Lobby, Leaderboard, Game)
│   │   ├── game/            # Game Rendering & State Management
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── styles/          # UI Styling
│   │   ├── socket.ts        # WebSocket Handlers
│   ├── tests/               # Frontend Unit Tests
│   ├── package.json         # Frontend Dependencies
│── docker-compose.yml       # Docker Setup for Backend & Redis
│── .github/workflows/       # CI/CD (Automated Deployment)
│── README.md                # Documentation
```

---

## 📺 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/real-time-battle-arena.git
cd real-time-battle-arena
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
npm run dev
```
- The server runs on **`http://localhost:3001`**.

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```
- The React app runs on **`http://localhost:5173`**.

---

## 🚀 Features
✅ **Real-time multiplayer battles** using **WebSockets**  
✅ **Smooth game rendering** with **Canvas API (WebGL)**  
✅ **Leaderboards & player rankings** stored in **Redis**  
✅ **Scalable matchmaking system** with **Socket.io Rooms**  
✅ **Optimized game performance** using **lag compensation**  
✅ **Dockerized backend for easy deployment**  

---

## 🛠️ Development Workflow
1. **Main Branches:**
   - `main` → Production code.
   - `dev` → Development branch.

2. **Feature Workflow:**
   ```sh
   git checkout -b feature-game-logic
   # Work on changes
   git commit -m "Added player movement"
   git push origin feature-game-logic
   ```

3. **Merging Changes:**
   ```sh
   git checkout dev
   git merge feature-game-logic
   git push origin dev
   ```

---

## 🏗️ Deployment (Coming Soon)
- **Backend:** AWS EC2 / DigitalOcean  
- **Frontend:** Vercel / Netlify  
- **Database:** Redis on AWS Elasticache  
- **CI/CD:** GitHub Actions  

---

## 👥 Contributors
- **Your Name** - Gagan Sharma

