-- Initialize the todo database
CREATE DATABASE IF NOT EXISTS todoapp;

-- Use the database
\c todoapp;

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Insert sample data
INSERT INTO todos (title, description) VALUES 
    ('Welcome to your Todo App', 'This is a sample todo item. You can edit or delete it.'),
    ('Learn React', 'Build amazing user interfaces with React'),
    ('Set up PostgreSQL', 'Configure your database for the todo app'),
    ('Deploy to production', 'Deploy your app to a hosting platform')
ON CONFLICT DO NOTHING;
