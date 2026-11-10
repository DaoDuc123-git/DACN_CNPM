-- Kích hoạt extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG USERS (Quản lý 6 vai trò)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('CUSTOMER', 'SALES', 'INVENTORY', 'SHIPPER', 'ACCOUNTANT', 'ADMIN')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG CATEGORIES (Danh mục bánh)
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 3. BẢNG PRODUCTS (Sản phẩm bánh tươi)
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    product_name VARCHAR(150) NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url TEXT,
    shelf_life_hours INT DEFAULT 24,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. BẢNG ORDERS (Đơn hàng & Hẹn giờ)
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(user_id),
    shipper_id INT REFERENCES users(user_id),
    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_time TIMESTAMP NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'COD' CHECK (payment_method IN ('COD', 'BANKING')),
    payment_status VARCHAR(20) DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID')),
    order_status VARCHAR(20) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'APPROVED', 'SHIPPING', 'COMPLETED', 'CANCELLED', 'INCIDENT')),
    cancel_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. BẢNG ORDER_DETAILS (Chi tiết bánh & Ghi chú chữ)
CREATE TABLE IF NOT EXISTS order_details (
    detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id),
    selected_size VARCHAR(10) DEFAULT '20cm',
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12, 2) NOT NULL,
    note_text VARCHAR(255)
);

-- 6. BẢNG COD_RECONCILIATIONS (Đối soát Kế toán)
CREATE TABLE IF NOT EXISTS cod_reconciliations (
    reconcile_id SERIAL PRIMARY KEY,
    shipper_id INT REFERENCES users(user_id),
    accountant_id INT REFERENCES users(user_id),
    system_cod_amount DECIMAL(12, 2) NOT NULL,
    cash_submitted DECIMAL(12, 2) NOT NULL,
    difference_amount DECIMAL(12, 2) DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('MATCHED', 'MISMATCHED')),
    reconciled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. BẢNG AUDIT_LOGS (Nhật ký giám sát Admin)
CREATE TABLE IF NOT EXISTS audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_token TEXT,
    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ONLINE' CHECK (status IN ('ONLINE', 'OFFLINE', 'FORCE_LOGGED_OUT'))
);