CREATE TABLE IF NOT EXISTS internships (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    company VARCHAR(150) NOT NULL,

    location VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    skills TEXT[] NOT NULL DEFAULT '{}',

    stipend INTEGER DEFAULT 0,

    duration VARCHAR(100),

    type VARCHAR(50) DEFAULT 'Internship',

    application_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);