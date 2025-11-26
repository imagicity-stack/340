# 340 Real Estate Inspired App

This project includes a React front-end (Vite) with multiple pages and an admin portal, plus a placeholder Node/Express API. Data is stored in memory so it can be swapped for Firebase or another database later.

## Scripts
- `npm run dev` – start the Vite dev server (requires installing dependencies).  
- `npm run build` – build the front-end assets.  
- `npm run server` – start the mock Express API at `http://localhost:3001`.

## Notes
- Admin login uses the demo password `123`. Replace the guard and wire up real auth (Firebase/Auth0/etc.) before production. 
- CRUD routes are defined in `server/index.js`; they mirror the admin actions and can be replaced by real database calls. 
- Front-end state is stored in-memory for demonstration. Hook forms into API mutations as backend services become available.
