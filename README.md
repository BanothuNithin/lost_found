# Lost & Found

> A simple community-driven Lost & Found web app (MERN) — report lost or found items, upload photos, and help reunite items with their owners.

**Status:** Work in progress — UI improvements, Cloudinary image uploads, authentication with roles (user/admin).

**Contents**

- `client/` - React frontend (Vite)
- `server/` - Express.js backend, MongoDB models, Cloudinary upload middleware

**Key features**

- Report lost or found items with photos
- Role-based signup (user / admin)
- Image uploads to Cloudinary
- Protected routes for creating items and dashboard
- Responsive, modern UI (login, signup, dashboard, create item)

**Tech stack**

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, Mongoose (MongoDB)
- Authentication: JWT, bcrypt
- File uploads: multer + Cloudinary

**Prerequisites**

- Node.js (recommended 20.19+ or 22.12+)
- npm or yarn
- MongoDB database (Atlas or local)
- Cloudinary account (for image hosting)

**Environment variables**
Create a `.env` file in the `server/` folder with the following (example):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/lostfound?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If you are using a different Cloudinary setup, ensure the `server/config/cloudinary.js` and `server/middleware/upload.js` are configured to read the correct env vars.

**Run locally (development)**

1. Install dependencies for server and client

```powershell
cd client
npm install

cd ..\server
npm install
```

2. Start the server and client in separate terminals

Terminal 1 (server):

```powershell
cd server
npm run dev     # or `node server.js` depending on scripts
```

Terminal 2 (client):

```powershell
cd client
npm run dev
```

Open the app in a browser at `http://localhost:5173` (Vite default) and the API typically runs on `http://localhost:5000`.

**Build for production**

```powershell
cd client
npm run build

cd ..\server
node server.js   # or use a process manager like pm2
```

**Quick Git commands**

Stage, commit, and push your changes to `main`:

```powershell
cd "c:\Users\bnith\Music\lost_found"
git status
git add -A
git commit -m "chore: add README and UI improvements"
git push origin main
```

If you prefer to open a PR, create a feature branch first:

```powershell
git checkout -b feat/ui-updates
git add -A
git commit -m "feat(ui): style auth, dashboard, create item, navbar"
git push -u origin feat/ui-updates
```

**Notes & Helpful tips**

- The app uses Cloudinary for image hosting — ensure the `uploads` middleware in `server/middleware/upload.js` is configured and `dotenv` loads before Cloudinary is configured.
- If you run into issues with Vite and Node versions, upgrade Node to 20.19+ or 22.12+ (the project was tested with a newer Node release).
- Forms include client-side validation; server-side validation returns helpful messages in `err.response.data`.

**Contributing**

- Feel free to open issues for bugs or feature requests. Submit PRs against `main` or create feature branches and open a PR for review.

**License**

- This repository is provided without a license file. Add an appropriate `LICENSE` if you plan to open-source it.

---

