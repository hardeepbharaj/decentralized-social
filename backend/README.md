# Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
# Create database and tables
createdb decentralized_social
psql decentralized_social < ../database/schema.sql

# Insert sample data (optional but recommended for development)
psql decentralized_social < ../database/seed.sql
```

3. Start the development server:
```bash
npm run start:dev
```

The server will be running on http://localhost:3001 with sample data ready for development.

## API Documentation

### Successful API Operations

#### 1. Create Post Successfully
```bash
curl --location 'http://localhost:3001/posts' \
--header 'Content-Type: application/json' \
--data '{
    "content": "This is a test post",
    "wallet_address": "0x1234567890123456789012345678901234567890"
}'

# Success Response:
{
    "id": 1,
    "content": "This is a test post",
    "wallet_address": "0x1234567890123456789012345678901234567890",
    "timestamp": "2024-07-06T09:00:00.000Z",
    "like_count": 0,
    "comment_count": 0
}
```

#### 2. Like Post Successfully
```bash
curl --location --request POST 'http://localhost:3001/posts/1/like' \
--header 'Content-Type: application/json' \
--data '{
    "wallet_address": "0x1234567890123456789012345678901234567890"
}'

# Success Response:
{
    "liked": true,
    "likeCount": 1
}
```

#### 3. Add Comment Successfully
```bash
curl --location --request POST 'http://localhost:3001/posts/1/comment' \
--header 'Content-Type: application/json' \
--data '{
    "content": "This is a test comment",
    "wallet_address": "0x1234567890123456789012345678901234567890"
}'

# Success Response:
{
    "comment": {
        "id": 1,
        "content": "This is a test comment",
        "wallet_address": "0x1234567890123456789012345678901234567890",
        "timestamp": "2024-07-06T09:00:00.000Z"
    },
    "commentCount": 1
}
```

#### 4. Get Posts Feed with Pagination
```bash
# Get first page with 10 posts
curl --location 'http://localhost:3001/posts?page=1&limit=10'

# Get feed with specific wallet to check liked status
curl --location 'http://localhost:3001/posts?wallet_address=0x1234567890123456789012345678901234567890'

# Success Response:
{
    "posts": [
        {
            "id": 1,
            "content": "This is a test post",
            "wallet_address": "0x1234567890123456789012345678901234567890",
            "timestamp": "2024-07-06T09:00:00.000Z",
            "like_count": 1,
            "comment_count": 1,
            "is_liked": true
        }
        // ... more posts
    ]
}
```

#### 5. Get Post Comments
```bash
curl --location 'http://localhost:3001/posts/1/comments'

# Success Response:
{
    "comments": [
        {
            "id": 1,
            "content": "This is a test comment",
            "wallet_address": "0x1234567890123456789012345678901234567890",
            "timestamp": "2024-07-06T09:00:00.000Z"
        }
        // ... more comments
    ]
}
```

### Testing API Without Wallet Connection

This section demonstrates the API's behavior when endpoints are accessed without proper wallet authentication.

### 1. Create Post

```bash
# Attempt to create post without wallet address
curl --location 'http://localhost:3001/posts' \
--header 'Content-Type: application/json' \
--data '{
    "content": "Testing post without wallet connection",
    "wallet_address": ""
}'

# Response (400 Bad Request):
{
    "statusCode": 400,
    "message": "Wallet address is required"
}

# Attempt with invalid wallet format
curl --location 'http://localhost:3001/posts' \
--header 'Content-Type: application/json' \
--data '{
    "content": "Testing with invalid wallet",
    "wallet_address": "not-a-valid-wallet"
}'

# Response (400 Bad Request):
{
    "statusCode": 400,
    "message": "Invalid wallet address format"
}

# Attempt without content
curl --location 'http://localhost:3001/posts' \
--header 'Content-Type: application/json' \
--data '{
    "content": "",
    "wallet_address": "0x1234567890123456789012345678901234567890"
}'

# Response (400 Bad Request):
{
    "statusCode": 400,
    "message": "Content cannot be empty"
}

# Valid post creation (for comparison)
curl --location 'http://localhost:3001/posts' \
--header 'Content-Type: application/json' \
--data '{
    "content": "This is a test post",
    "wallet_address": "0x1234567890123456789012345678901234567890"
}'

# Success Response:
{
    "id": 1,
    "content": "This is a test post",
    "wallet_address": "0x1234567890123456789012345678901234567890",
    "timestamp": "2024-07-06T09:00:00.000Z"
}
```

### 2. Like Post Without Wallet

```bash
# Attempt to like a post without wallet address
curl --location --request POST 'http://localhost:3001/posts/1/like' \
--header 'Content-Type: application/json' \
--data '{
    "wallet_address": ""
}'

# Response (400 Bad Request):
{
    "statusCode": 400,
    "message": "Wallet address is required"
}
```

### 3. Comment Without Wallet

```bash
# Attempt to comment without wallet address
curl --location --request POST 'http://localhost:3001/posts/1/comment' \
--header 'Content-Type: application/json' \
--data '{
    "content": "This is a test comment",
    "wallet_address": ""
}'

# Response (400 Bad Request):
{
    "statusCode": 400,
    "message": "Wallet address is required"
}
```

### 4. Read-Only Operations (Allowed Without Wallet)

```bash
# Get posts feed (allowed without wallet)
curl --location 'http://localhost:3001/posts'

# Get specific post (allowed without wallet)
curl --location 'http://localhost:3001/posts/1'

# Get post comments (allowed without wallet)
curl --location 'http://localhost:3001/posts/1/comments'
```

## API Validation Rules

### Wallet Address Requirements
- Must be present for all write operations
- Must follow Ethereum address format: 0x + 40 hex characters
- Example valid format: 0x1234567890123456789012345678901234567890

### Content Requirements
- Required for posts and comments
- Cannot be empty
- Maximum length: 280 characters

### Pagination Parameters
- page: Optional, defaults to 1, must be positive number
- limit: Optional, defaults to 20, must be between 1 and 100

## Error Responses

All error responses follow this format:
```json
{
    "statusCode": number,
    "message": string
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

## Seeding Data in PostgreSQL

To seed your PostgreSQL database using the provided seed file (located at `backend/database/seed.sql`), follow these steps:

1. **Ensure your PostgreSQL server is running** (for example, via Docker or a local installation).

2. **Connect to your PostgreSQL database** (for example, using psql or a GUI tool).  
   For example, if your database is named "decentralized_social" and you're using psql, run:
   
   ```bash
   psql -U your_username -d decentralized_social
   ```
   
   (Replace "your_username" with your PostgreSQL user.)

3. **Run the seed file** (for example, using psql's \i command) from the backend directory:
   
   ```bash
   cd backend
   psql -U your_username -d decentralized_social -f database/seed.sql
   ```
   
   (Alternatively, if you're already in psql, you can run:  
   \i database/seed.sql)

4. **Verify the data** (for example, by querying the tables) to ensure that the seed data has been inserted.

---

**Note:**  
- If you're using a Docker container for PostgreSQL, you can also copy the seed file into the container and run it from there.
- Adjust the database name, username, and connection details as needed for your environment.