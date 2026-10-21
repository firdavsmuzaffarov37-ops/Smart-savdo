-- SmartSavdo PostgreSQL Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stores table (Uzbekistan retailers)
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    website VARCHAR(255) NOT NULL,
    logo_url TEXT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(120) NOT NULL,
    category VARCHAR(80) NOT NULL,
    category_slug VARCHAR(80) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    current_price BIGINT NOT NULL, -- In UZS (so'm)
    original_price BIGINT,         -- In UZS (so'm)
    discount_percent INT DEFAULT 0,
    store_name VARCHAR(120) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.8,
    reviews_count INT DEFAULT 42,
    is_demo BOOLEAN DEFAULT TRUE,
    ai_recommended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Specifications table
CREATE TABLE IF NOT EXISTS product_specifications (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    spec_key VARCHAR(120) NOT NULL,
    spec_value VARCHAR(255) NOT NULL,
    spec_group VARCHAR(100) DEFAULT 'Umumiy'
);

-- Product Offers (Store Integrations)
CREATE TABLE IF NOT EXISTS product_offers (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    store_id INT REFERENCES stores(id) ON DELETE CASCADE,
    store_name VARCHAR(120) NOT NULL,
    price BIGINT NOT NULL, -- In UZS
    product_url TEXT NOT NULL,
    availability VARCHAR(60) DEFAULT 'Mavjud',
    delivery_cost BIGINT DEFAULT 0, -- 0 for free delivery
    delivery_time VARCHAR(60) DEFAULT '1-2 kun',
    warranty VARCHAR(60) DEFAULT '1 yil rasmiy kafolat',
    data_source VARCHAR(60) DEFAULT 'demo_provider',
    is_verified BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Price History table (for Recharts)
CREATE TABLE IF NOT EXISTS price_history (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    recorded_date VARCHAR(30) NOT NULL,
    price BIGINT NOT NULL, -- In UZS
    is_demo BOOLEAN DEFAULT TRUE
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Comparisons table
CREATE TABLE IF NOT EXISTS comparisons (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Price Alerts table
CREATE TABLE IF NOT EXISTS price_alerts (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    target_price BIGINT NOT NULL,
    user_contact VARCHAR(120) NOT NULL,
    status VARCHAR(40) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Search History table
CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    query VARCHAR(255) NOT NULL,
    results_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
