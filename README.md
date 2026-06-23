# Sabores Caseros

A recipe web application built with **Next.js** that allows users to explore recipes, view detailed cooking instructions, register, log in, and save their favorite recipes.

## Features

### Recipe Catalog

* Browse recipes available to all users.
* Reusable recipe cards (`RecipeCard`) displaying:

  * Image
  * Recipe name
  * Preparation time
  * Difficulty level

### Recipe Details

* Dynamic route: `/recipes/[id]`
* Complete recipe information including:

  * Description
  * Ingredients
  * Preparation steps
  * Preparation time
  * Difficulty level
  * Servings

### Authentication

* User registration.
* User login.
* Session management using JWT cookies.
* Display of the authenticated user's name in the Navbar.

### Favorites

* Add or remove favorite recipes.
* Dedicated favorites page for authenticated users.
* Favorites are persisted in the database.

### Email Notifications

* Automatic welcome email sent upon successful registration.

---

# Technologies Used

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* React Toastify

## Backend

* Next.js Route Handlers
* JWT (JSON Web Tokens)
* Bcrypt

## Database

* MongoDB
* Mongoose

## External Services

* Nodemailer
* Gmail SMTP

---

# Prerequisites

Before getting started, make sure you have installed:

* Node.js >= 20
* npm
* MongoDB Atlas or a local MongoDB instance
* A Gmail account for email delivery

Check installed versions:

```bash
node -v
npm -v
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/mcastaneda846/examen-final-next.git
```

Navigate to the project directory:

```bash
cd sabores-caseros
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a file named:

```bash
.env
```

Add the following variables:

```env
# MongoDB
MONGODB_URI=

# JWT
JWT_SECRET=

# Mail
MAIL_USER=
MAIL_PASS=

# Admin Email
ADMIN_EMAIL=
```

---

# Gmail Configuration

To enable email delivery:

1. Enable Two-Factor Authentication on your Gmail account.
2. Generate an App Password.
3. Use the generated password in:

```env
MAIL_PASS=
```

Do not use your regular Gmail password.

---

# Running the Project

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

---

# Available Routes

| Route           | Description       | Authentication Required |
| --------------- | ----------------- | ----------------------- |
| `/`             | Recipe catalog    | No                      |
| `/recipes/[id]` | Recipe details    | No                      |
| `/login`        | User login        | No                      |
| `/register`     | User registration | No                      |
| `/favorites`    | Favorite recipes  | Yes                     |

---

# Authentication Flow

## Registration

1. User completes the registration form.
2. User data is validated.
3. The account is created.
4. A welcome email is sent automatically.
5. The user can log in.

## Login

1. User enters credentials.
2. Email and password are validated.
3. A JWT token is generated.
4. The token is stored in a secure cookie.

---

# Architecture

The project follows a Service Layer architecture to separate business logic from route handlers.

Example:

```text
Route Handler
      ↓
Service Layer
      ↓
Model
      ↓
MongoDB
```

Benefits:

* Scalability
* Maintainability
* Reusability
* Easier testing and future enhancements

---

# Troubleshooting

## MongoDB Connection Error

Verify:

```env
MONGODB_URI
```

Also ensure your IP address is whitelisted in MongoDB Atlas.

---

## JWT Error

Verify:

```env
JWT_SECRET
```

---

## Email Delivery Error

Verify:

```env
MAIL_USER
MAIL_PASS
```

Also confirm that you are using a Gmail App Password instead of your regular account password.

---

# Author

**Maribel Castañeda Cardona**

Project developed as a performance assessment using:

* Next.js
* TypeScript
* MongoDB
* Tailwind CSS
* JWT
* Nodemailer
