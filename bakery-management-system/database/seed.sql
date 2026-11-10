-- 1. Thêm 6 tài khoản mẫu (Mật khẩu mặc định: 123456 - Hash demo)
INSERT INTO users (username, password_hash, full_name, email, phone, role) VALUES
('admin', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Đào Ngọc Đức (Admin)', 'admin@bakery.com', '0900000001', 'ADMIN'),
('sales_an', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Lê Văn An', 'sales@bakery.com', '0911223344', 'SALES'),
('inventory_khoa', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Trần Đăng Khoa', 'kho@bakery.com', '0922334455', 'INVENTORY'),
('shipper_tuan', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Nguyễn Văn Tuấn (Shipper 1)', 'shipper1@bakery.com', '0933445566', 'SHIPPER'),
('acct_ha', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Phạm Thu Hà', 'ketoan@bakery.com', '0944556677', 'ACCOUNTANT'),
('cust_b', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEg6Lruj3vjPGga31lW', 'Trần Thị B', 'khachhangb@gmail.com', '0988776655', 'CUSTOMER')
ON CONFLICT (username) DO NOTHING;

-- 2. Thêm Danh mục bánh
INSERT INTO categories (category_name, description) VALUES
('Bánh Sinh Nhật', 'Các mẫu bánh kem tươi trang trí nghệ thuật cho tiệc sinh nhật'),
('Bánh Mousse', 'Bánh Mousse mát lạnh cao cấp kết hợp socola & trái cây'),
('Bánh Lạnh', 'Bánh Tiramisu, Cheesecake bảo quản lạnh'),
('Bánh Tươi', 'Các loại bánh mì ngọt, bánh kem bơ chế biến trong ngày')
ON CONFLICT DO NOTHING;

-- 3. Thêm Sản phẩm bánh mẫu
INSERT INTO products (category_id, product_name, base_price, stock_quantity, image_url, shelf_life_hours) VALUES
(1, 'Bánh Kem Dâu Tây Tươi French Style', 350000, 8, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80', 24),
(2, 'Bánh Mousse Socola Bỉ Premium', 420000, 5, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=700&q=80', 48),
(4, 'Bánh Matcha Trà Xanh Kem Bơ Kyoto', 320000, 0, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80', 24),
(3, 'Bánh Tiramisu Ý Cổ Điển Kèm Rum', 380000, 12, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=700&q=80', 72)
ON CONFLICT DO NOTHING;