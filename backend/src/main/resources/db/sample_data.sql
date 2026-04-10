INSERT INTO category (id, name, description) VALUES
(1, 'Mobiles', 'Smartphones and accessories'),
(2, 'Electronics', 'Audio, wearables, and gadgets'),
(3, 'Fashion', 'Clothing and lifestyle products');

INSERT INTO users (id, full_name, email, password, role, enabled, created_at) VALUES
(1, 'Admin User', 'admin@flipkartclone.com', '$2a$10$KIXQw4qWYiaAlrTv6lV3eewEcaYB4mBr7gGjv8nH/8cgo3sO/0wLW', 'ROLE_ADMIN', true, NOW()),
(2, 'Demo Customer', 'customer@flipkartclone.com', '$2a$10$KIXQw4qWYiaAlrTv6lV3eewEcaYB4mBr7gGjv8nH/8cgo3sO/0wLW', 'ROLE_CUSTOMER', true, NOW());
