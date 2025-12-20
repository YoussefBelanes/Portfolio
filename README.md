# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





# Personal Portfolio – React + Vite

This is my personal portfolio built with **React**, **Vite**, and **Tailwind CSS**.
It includes a public website and a private admin dashboard.

---

## 🌐 Live Demo
👉 https://portfolio-seven-zeta-kzjaqkdayi.vercel.app/

---

## ✨ Features

### Public
- About / Experience / Projects
- Contact form (stored via MockAPI)
- Responsive modern UI

### Admin Dashboard
- Admin-only login (no public user accounts)
- Manage projects
- View & manage contact form submissions
- Statistics dashboard

---

## 🔐 Admin Authentication (Important)

For deployment limitations on free services:
- User authentication via database was **removed**
- Admin access is handled via **environment variables**
- Login credentials are **not stored in the repository**

This was a deliberate choice for:
- Security
- Free hosting compatibility
- Simplicity

