# [Bribbble](https://bribbble.salimi.my) &middot; [![Author Salimi](https://img.shields.io/badge/Author-Salimi-%3C%3E)](https://www.linkedin.com/in/mohamad-salimi/)

This is a Dribbble clone app created using Next.js for educational purposes. Bribbble is an app that brings the vibrant and inspiring world of design right to your fingertips. Bribbble is your go-to platform for sharing, discovering, and celebrating creative brilliance, just like the original Dribbble.

## Dribbble Clone

- Search & filter functions
- Authentication using Clerk
- MongoDB & Prisma for database
- Edgestore for image upload
- Zustand for state management
- Hosted in Vercel

## Tech/framework used

- Next.js 14
- Shadcn/ui
- Clerk
- Tailwind CSS
- TypeScript
- MongoDB
- Prisma
- Edgestore
- Zustand
- Vercel

## Starting the project

Open the [.env.example](/.env.example) and fill in your Database URL, Edgestore configurations & Clerk Auth Configurations then save it as .env the run the following command:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Demo

The app is hosted on Vercel. [Click here](https://bribbble.salimi.my) to visit.
<br>
Direct link: `https://bribbble.salimi.my`

## Screenshots

#### Homepage

![Homepage](/screenshots/screenshot-1.png)

#### Work

![Work](/screenshots/screenshot-2.png)

#### Sign in

![Sign in](/screenshots/screenshot-3.png)

#### Sign up

![Sign up](/screenshots/screenshot-4.png)

#### Search

![Search](/screenshots/screenshot-5.png)

#### Profile

![Profile](/screenshots/screenshot-6.png)

#### Upload

![Upload](/screenshots/screenshot-7.png)
