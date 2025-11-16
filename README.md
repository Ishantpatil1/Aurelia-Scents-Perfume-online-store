# Perfumora — Full Stack Sample

This workspace contains a simple full-stack sample for Perfumora: an Express + MongoDB backend and a React (Vite) frontend.

**Structure**
- `backend/` — Express server, Mongoose models, routes, and seed script
- `client/` — Vite + React app (Home, Product pages)

**Prerequisites**
- Node.js (18+ recommended) and `npm`
- MongoDB running locally or accessible via connection URI

**Setup (Windows PowerShell)**

1. Start MongoDB (local) — either run your local `mongod` service, or use Docker:
```powershell
# Docker run (if you have Docker Desktop)
docker run -p 27017:27017 -d --name perfumora-mongo mongo:6
```

2. Configure backend environment:
```powershell
cd d:\perfume\backend
copy .env.example .env
# edit .env to set MONGO_URI if needed
```

3. Install backend deps and seed the database:
```powershell
cd d:\perfume\backend; npm install
# Ensure MongoDB is running, then:
cd d:\perfume\backend; npm run seed
```

4. Start backend server:
```powershell
cd d:\perfume\backend; npm run dev
```
The backend will run on `http://localhost:5000` by default.

5. Install and run the client:
```powershell
cd d:\perfume\client; npm install
cd d:\perfume\client; npm run dev
```
The client (Vite) dev server will run (by default) on `http://localhost:5173` — open it in your browser. The frontend fetches data from `http://localhost:5000/api`.

**Notes**
- The seed script populates the `products` and `reviews` collections with sample data.
- Product images in the seed use relative paths (`/images/...`). You can replace these with remote URLs or host static images.
- The frontend fetches all data from the backend API — no static product data is used.

**Next steps / Improvements**
- Add authentication, cart, and checkout flows.
- Serve frontend from backend in production or configure CORS/proxy.
- Replace placeholder images with real assets and add image uploads.

If you'd like, I can:
- Commit the scaffold to git and create a proper gitignore
- Add hosting instructions for production (build + serve)
- Add a Docker Compose for Mongo + backend + frontend
