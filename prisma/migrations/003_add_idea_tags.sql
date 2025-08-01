-- Add tags column to ideas table
ALTER TABLE ideas ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Create index for tags array
CREATE INDEX idx_ideas_tags ON ideas USING GIN (tags);