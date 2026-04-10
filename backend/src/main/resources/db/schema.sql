CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  enabled BIT NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  brand VARCHAR(255),
  average_rating DOUBLE,
  total_ratings INT,
  featured BIT,
  thumbnail VARCHAR(1000),
  created_at DATETIME,
  category_id BIGINT NOT NULL,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS product_image (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(1000),
  product_id BIGINT NOT NULL,
  CONSTRAINT fk_product_image_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS review (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  created_at DATETIME NOT NULL,
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS cart (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cart_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cart_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id) REFERENCES cart(id),
  CONSTRAINT fk_cart_item_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS wishlist_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  created_at DATETIME,
  UNIQUE KEY uk_wishlist_user_product (user_id, product_id),
  CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(255) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  order_status VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_charge DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(255),
  payment_reference VARCHAR(255),
  shipping_label VARCHAR(255),
  shipping_line1 VARCHAR(255),
  shipping_line2 VARCHAR(255),
  shipping_city VARCHAR(255),
  shipping_state VARCHAR(255),
  shipping_postal_code VARCHAR(255),
  shipping_country VARCHAR(255),
  shipping_phone VARCHAR(255),
  created_at DATETIME,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES product(id)
);
