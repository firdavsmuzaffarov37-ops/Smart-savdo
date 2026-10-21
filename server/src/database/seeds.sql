-- Seed Data for SmartSavdo

INSERT INTO stores (name, website, rating, is_verified) VALUES
('TechnoHouse', 'https://technohouse.uz', 4.9, TRUE),
('RizoStore', 'https://rizostore.uz', 4.7, TRUE),
('Olcha.uz', 'https://olcha.uz', 4.8, TRUE),
('Texnomart', 'https://texnomart.uz', 4.8, TRUE),
('MediaPark', 'https://mediapark.uz', 4.6, TRUE),
('Uzum Market', 'https://uzum.uz', 4.9, TRUE);

INSERT INTO products (id, name, brand, category, category_slug, description, image_url, current_price, original_price, discount_percent, store_name, rating, reviews_count, is_demo, ai_recommended) VALUES
(1, 'iPhone 15', 'Apple', 'Smartfonlar', 'smartphones', 'Apple iPhone 15 128GB Blue - Super Retina XDR ekran, A16 Bionic protsessor, 48MP asosiy kamera va Dynamic Island innovatsiyasi bilan.', 'iphone-15', 11999000, 12999000, 8, 'TechnoHouse', 4.9, 128, TRUE, TRUE),
(2, 'MacBook Air M2', 'Apple', 'Noutbuklar', 'laptops', 'Apple MacBook Air 13.6" M2 Chip 8GB/256GB Midnight - Yupqa va yengil dizayn, 18 soatgacha batareya quvvati, Liquid Retina ekran.', 'macbook-air-m2', 16499000, 17999000, 8, 'RizoStore', 4.8, 94, TRUE, FALSE),
(3, 'Samsung QLED 4K', 'Samsung', 'Televizorlar', 'tvs', 'Samsung 55" QLED 4K Smart TV Q60C - Kvant nuqtalari bilan 100% rang hajmi, Quantum Processor Lite 4K, AirSlim dizayn.', 'samsung-qled-4k', 13499000, 14999000, 10, 'Olcha.uz', 4.7, 76, TRUE, FALSE),
(4, 'Sony WH-1000XM5', 'Sony', 'Naushniklar', 'headphones', 'Sony WH-1000XM5 Simsiz Shovqinni bekor qiluvchi naushniklar - Industry-leading noise cancellation, 30 soat quvvat, Hi-Res audio.', 'sony-wh-1000xm5', 4299000, 4999000, 14, 'Texnomart', 4.9, 112, TRUE, FALSE),
(5, 'iPhone 14', 'Apple', 'Smartfonlar', 'smartphones', 'Apple iPhone 14 128GB Midnight - A15 Bionic chip, ilg''or dual kamera, 20 soat video ijro.', 'iphone-14', 9999000, 10999000, 9, 'Olcha.uz', 4.8, 205, TRUE, FALSE),
(6, 'iPhone SE (2022)', 'Apple', 'Smartfonlar', 'smartphones', 'Apple iPhone SE 3-avlod 64GB Starlight - Ixcham 4.7" ekran, A15 Bionic chip, Touch ID tugmasi.', 'iphone-se-2022', 6499000, 7199000, 10, 'MediaPark', 4.6, 68, TRUE, FALSE),
(7, 'LG Smart Inverter Kir Yuvish Mashinasi', 'LG', 'Maishiy texnika', 'appliances', 'LG AI DD 8.5kg bug'' funksiyali avtomat kir yuvish mashinasi, Steam texnologiyasi va Wi-Fi ThinQ boshqaruvi.', 'washing-machine', 5400000, 6200000, 13, 'Texnomart', 4.8, 54, TRUE, FALSE),
(8, 'AirPods Pro 2', 'Apple', 'Naushniklar', 'headphones', 'Apple AirPods Pro 2 USB-C - Aktiv shovqinni bekor qilish, moslashuvchan audio va MagSafe g''ilofi.', 'airpods-pro-2', 2850000, 3350000, 15, 'TechnoHouse', 4.9, 310, TRUE, FALSE),
(9, 'Nike Sport Hoodie', 'Nike', 'Kiyim', 'clothing', 'Nike Club Fleece erkaklar sport hudisi - Paxtali yumshoq mato, qulay fason va zamonaviy ko''k rang.', 'nike-hoodie', 850000, 990000, 14, 'Uzum Market', 4.7, 43, TRUE, FALSE);

-- Product Offers from multiple stores
INSERT INTO product_offers (product_id, store_id, store_name, price, product_url, availability, delivery_cost, delivery_time, warranty, is_verified) VALUES
(1, 1, 'TechnoHouse', 11999000, 'https://technohouse.uz/products/iphone-15', 'Mavjud', 0, 'Bugun yetkazib berish', '1 yil rasmiy kafolat', TRUE),
(1, 3, 'Olcha.uz', 12150000, 'https://olcha.uz/ru/product/view/apple-iphone-15-128gb', 'Mavjud', 0, '1 kun ichida', '1 yil rasmiy kafolat', TRUE),
(1, 4, 'Texnomart', 12399000, 'https://texnomart.uz/katalog/smartfony/apple-iphone-15', 'Mavjud', 30000, 'Ertaga', '1 yil rasmiy kafolat', TRUE),
(1, 2, 'RizoStore', 12100000, 'https://rizostore.uz/apple/iphone-15', 'Mavjud', 0, '1 kun', '1 yil servis kafolati', TRUE),
(2, 2, 'RizoStore', 16499000, 'https://rizostore.uz/laptops/macbook-air-m2', 'Mavjud', 0, '1 kun ichida', '1 yil Apple kafolati', TRUE),
(2, 1, 'TechnoHouse', 16799000, 'https://technohouse.uz/products/macbook-air-m2', 'Mavjud', 0, 'Bugun', '1 yil rasmiy kafolat', TRUE),
(2, 4, 'Texnomart', 16990000, 'https://texnomart.uz/katalog/noutbuki/macbook-air-m2', 'Mavjud', 0, '1-2 kun', '1 yil rasmiy kafolat', TRUE),
(3, 3, 'Olcha.uz', 13499000, 'https://olcha.uz/tv/samsung-qled-4k', 'Mavjud', 0, 'Ertaga', '3 yil Samsung kafolati', TRUE),
(3, 4, 'Texnomart', 13799000, 'https://texnomart.uz/tv/samsung-q60c', 'Mavjud', 50000, '1-2 kun', '3 yil Samsung kafolati', TRUE),
(4, 4, 'Texnomart', 4299000, 'https://texnomart.uz/audio/sony-wh-1000xm5', 'Mavjud', 0, '1 kun', '1 yil Sony kafolati', TRUE),
(4, 1, 'TechnoHouse', 4450000, 'https://technohouse.uz/products/sony-wh1000xm5', 'Mavjud', 0, 'Bugun', '1 yil kafolat', TRUE);

-- Price History for iPhone 15
INSERT INTO price_history (product_id, recorded_date, price, is_demo) VALUES
(1, '1 Apr', 12899000, TRUE),
(1, '8 Apr', 12599000, TRUE),
(1, '15 Apr', 12499000, TRUE),
(1, '22 Apr', 13199000, TRUE),
(1, '29 Apr', 11999000, TRUE);

-- Price History for MacBook Air M2
INSERT INTO price_history (product_id, recorded_date, price, is_demo) VALUES
(2, '1 Apr', 17999000, TRUE),
(2, '8 Apr', 17499000, TRUE),
(2, '15 Apr', 16999000, TRUE),
(2, '22 Apr', 16799000, TRUE),
(2, '29 Apr', 16499000, TRUE);

-- Price History for Samsung QLED
INSERT INTO price_history (product_id, recorded_date, price, is_demo) VALUES
(3, '1 Apr', 14999000, TRUE),
(3, '8 Apr', 14200000, TRUE),
(3, '15 Apr', 13800000, TRUE),
(3, '22 Apr', 13600000, TRUE),
(3, '29 Apr', 13499000, TRUE);

-- Price History for Sony WH-1000XM5
INSERT INTO price_history (product_id, recorded_date, price, is_demo) VALUES
(4, '1 Apr', 4999000, TRUE),
(4, '8 Apr', 4850000, TRUE),
(4, '15 Apr', 4600000, TRUE),
(4, '22 Apr', 4400000, TRUE),
(4, '29 Apr', 4299000, TRUE);

-- Product Specifications
INSERT INTO product_specifications (product_id, spec_key, spec_value, spec_group) VALUES
(1, 'Ekran', '6.1" Super Retina XDR OLED, 2556x1179', 'Ekran'),
(1, 'Protsessor', 'Apple A16 Bionic (6-yadroli)', 'Ishlash unumdorligi'),
(1, 'Asosiy Kamera', '48 MP + 12 MP ultra-keng burchakli', 'Kamera'),
(1, 'Old Kamera', '12 MP TrueDepth', 'Kamera'),
(1, 'Xotira', '128 GB NVMe', 'Xotira'),
(1, 'Ulagich', 'USB Type-C', 'Aloqa'),
(1, 'Batareya', '3349 mA/soat, 20W tezkor quvvatlash', 'Akkumulyator'),
(2, 'Ekran', '13.6" Liquid Retina, 2560x1664', 'Ekran'),
(2, 'Protsessor', 'Apple M2 chip (8-core CPU, 8-core GPU)', 'Ishlash unumdorligi'),
(2, 'Tezkor xotira', '8 GB birlashgan xotira', 'Xotira'),
(2, 'Doimiy xotira', '256 GB SSD', 'Xotira'),
(2, 'Vazni', '1.24 kg', 'O''lchamlar'),
(3, 'Ekran o''lchami', '55 dyuym (139 sm)', 'Ekran'),
(3, 'Ruxsat etilganlik', '4K UHD (3840 x 2160)', 'Ekran'),
(3, 'Texnologiya', 'QLED, Quantum HDR', 'Tasvir'),
(3, 'Smart TV', 'Tizen OS', 'Tizim'),
(4, 'Turi', 'Simsiz to''liq o''lchamli (Over-ear)', 'Dizayn'),
(4, 'Shovqin bekor qilish', 'Active Noise Cancelling (ANC)', 'Audio'),
(4, 'Ishlash vaqti', '30 soatgacha (ANC yoqilganda)', 'Batareya'),
(4, 'Interfeys', 'Bluetooth 5.2, LDAC, 3.5mm mini-jack', 'Aloqa');
