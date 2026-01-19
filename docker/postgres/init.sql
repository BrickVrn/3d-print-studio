-- Initial database setup for 3D Print Studio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for order status
CREATE TYPE order_status AS ENUM ('new', 'in_progress', 'completed', 'cancelled');

-- Create enum for user role
CREATE TYPE user_role AS ENUM ('client', 'admin');

-- Create tables (schema will be refined with Knex migrations)
-- This is just for initial Docker setup validation
SELECT 1;