# API Endpoints

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

## Users
- `GET /api/users/me`
- `GET /api/users` `ADMIN`

## Categories
- `GET /api/categories`
- `POST /api/categories` `ADMIN`
- `PUT /api/categories/{id}` `ADMIN`
- `DELETE /api/categories/{id}` `ADMIN`

## Products
- `GET /api/products`
- `GET /api/products/{id}`
- `POST /api/products` `ADMIN`
- `PUT /api/products/{id}` `ADMIN`
- `DELETE /api/products/{id}` `ADMIN`
- `POST /api/products/{id}/reviews`
- `POST /api/products/upload` `ADMIN`

## Cart
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/{itemId}?quantity={value}`
- `DELETE /api/cart/{itemId}`

## Wishlist
- `GET /api/wishlist`
- `POST /api/wishlist/{productId}`
- `DELETE /api/wishlist/{productId}`

## Orders
- `POST /api/orders/checkout`
- `GET /api/orders/my`
- `GET /api/orders` `ADMIN`
- `PATCH /api/orders/{orderId}/status?status={ORDER_STATUS}` `ADMIN`

## Admin
- `GET /api/admin/dashboard` `ADMIN`

## Docs
- `GET /swagger-ui.html`
- `GET /v3/api-docs`
