# Flipkart-Inspired eCommerce Web Application

This project contains a complete full-stack eCommerce starter inside `Ecommerce_project` with:

- `backend`: Java Spring Boot, Spring Security, JWT, JPA, Swagger, MySQL
- `frontend`: React, Vite, Tailwind CSS, Axios, Context API

## 1. Project Folder Structure

```text
Ecommerce_project/
├── API_ENDPOINTS.md
├── README.md
├── backend/
│   ├── .env.example
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/flipkartclone/ecommerce/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── exception/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       └── resources/
│           ├── application.properties
│           └── db/
│               ├── schema.sql
│               └── sample_data.sql
└── frontend/
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── pages/
        ├── router/
        └── utils/
```

## 2. Backend Implementation Step-by-Step

1. A Spring Boot backend was scaffolded with layered architecture: controller, service, repository, DTO, entity, security and exception packages.
2. Core entities were added for users, categories, products, product images, reviews, carts, wishlist items, orders and order items.
3. JWT authentication was implemented with Spring Security, a JWT filter, custom user details service and role-based authorization for admin-only routes.
4. REST APIs were created for authentication, products, categories, cart, wishlist, checkout, orders, users and admin dashboard metrics.
5. Pagination, search, filtering and sorting were added for product listing.
6. Swagger/OpenAPI was configured using `springdoc-openapi`.
7. Image upload support was added through multipart upload and static file serving from the configured `uploads` directory.
8. Seed data was added through `DataInitializer` so the app can boot with demo admin, customer, categories and products.
9. SQL reference files were added in `backend/src/main/resources/db/` for schema and sample data.

## 3. Frontend Implementation Step-by-Step

1. A Vite + React frontend was created in `frontend` with Tailwind CSS.
2. Axios API helpers were added in `src/api`.
3. Authentication state is managed in `AuthContext`, including login, register, logout and session restore.
4. Store state is managed in `ShopContext`, covering categories, cart and wishlist.
5. Customer-facing pages include home, product details, cart, checkout, orders, wishlist and login/register.
6. An admin dashboard page was added with metrics, category creation, product creation, order management and user listing.
7. A Flipkart-inspired UI was built with a search navbar, hero banner, product cards, responsive layouts and clean checkout/order flows.
8. Protected routes were added for customer-only and admin-only pages.

## 4. Database Schema

Reference schema: `backend/src/main/resources/db/schema.sql`

Main tables:
- `users`
- `category`
- `product`
- `product_image`
- `review`
- `cart`
- `cart_item`
- `wishlist_item`
- `orders`
- `order_item`

## 5. .env Configuration Details

### Backend `.env`
Copy values from `backend/.env.example`:

```env
DB_URL=jdbc:mysql://localhost:3306/flipkart_clone?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=root
SERVER_PORT=8080
JWT_SECRET=ChangeThisSecretKeyForProductionUseAtLeast32CharsLong
JWT_EXPIRATION_MS=86400000
UPLOAD_DIR=uploads
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
Copy values from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 6. Setup Instructions

### Backend setup

1. Install Java 17, Maven and MySQL 8+.
2. Create a database user that matches `DB_USERNAME` and `DB_PASSWORD`.
3. From `Ecommerce_project/backend`, create environment variables or map the values from `.env.example`.
4. Run:

```bash
mvn spring-boot:run
```

5. Open Swagger:

```text
http://localhost:8080/swagger-ui.html
```

### Frontend setup

1. Install Node.js 18+.
2. From `Ecommerce_project/frontend`, create `.env` from `.env.example`.
3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:5173
```

## 7. Demo Accounts

- Admin: `admin@flipkartclone.com` / `Admin@123`
- Customer: `customer@flipkartclone.com` / `Customer@123`

## 8. Notes

- Swagger docs are available after backend startup.
- `DataInitializer` seeds demo data automatically if the database is empty.
- `API_ENDPOINTS.md` contains the API inventory.
- Image uploads are stored in the local folder defined by `UPLOAD_DIR`.
- Payments are mock payments with generated references.

## 9. Verification Status

The project codebase has been fully scaffolded. I attempted a Maven compile inside the sandbox, but sandbox restrictions blocked Maven from writing to the user-level cache at `C:\Users\sanja\.m2`, so I could not complete a full local dependency-resolved build from within this session.
