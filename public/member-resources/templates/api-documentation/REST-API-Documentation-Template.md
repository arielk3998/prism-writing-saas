# REST API Documentation Template

**Project:** [API Name]  
**Version:** [API Version]  
**Date:** [Current Date]  
**Author:** [Team Member Name]  
**Client:** [Client Organization]

---

## Overview

### What is [API Name]?
[Brief description of what the API does and its main purpose]

### Key Features
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

### Base URL
```
https://api.example.com/v1
```

### Supported Formats
- JSON (default)
- XML (optional)

---

## Authentication

### API Key Authentication
All requests must include your API key in the header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting Your API Key
1. [Step 1 to get API key]
2. [Step 2 to get API key]
3. [Step 3 to get API key]

### Authentication Example
```bash
curl -H "Authorization: Bearer abc123xyz789" \
     https://api.example.com/v1/users
```

---

## Rate Limiting

- **Free Tier:** 100 requests per hour
- **Pro Tier:** 1,000 requests per hour
- **Enterprise:** Custom limits

Rate limit headers included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Endpoints

### Users

#### GET /users
Retrieve a list of users.

**Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20, max: 100)
- `status` (string, optional): Filter by status (`active`, `inactive`)

**Example Request:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.example.com/v1/users?page=1&limit=10&status=active"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 12345,
      "username": "john_doe",
      "email": "john@example.com",
      "status": "active",
      "created_at": "2023-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 98,
    "items_per_page": 20
  }
}
```

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "full_name": "string (optional)"
}
```

**Example Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"username":"jane_doe","email":"jane@example.com","password":"securepass123"}' \
     https://api.example.com/v1/users
```

**Example Response:**
```json
{
  "id": 12346,
  "username": "jane_doe",
  "email": "jane@example.com",
  "status": "active",
  "created_at": "2023-06-20T14:15:30Z"
}
```

#### GET /users/{id}
Retrieve a specific user by ID.

**Path Parameters:**
- `id` (integer, required): User ID

**Example Request:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.example.com/v1/users/12345
```

#### PUT /users/{id}
Update an existing user.

**Path Parameters:**
- `id` (integer, required): User ID

**Request Body:**
```json
{
  "email": "string (optional)",
  "full_name": "string (optional)",
  "status": "string (optional)"
}
```

#### DELETE /users/{id}
Delete a user.

**Path Parameters:**
- `id` (integer, required): User ID

**Example Request:**
```bash
curl -X DELETE \
     -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.example.com/v1/users/12345
```

---

## Error Handling

### HTTP Status Codes
- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request format
- `401` - Unauthorized: Invalid or missing API key
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error

### Error Response Format
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request format is invalid",
    "details": "Missing required field: username"
  }
}
```

### Common Error Codes
- `INVALID_REQUEST` - Request format error
- `UNAUTHORIZED` - Authentication failed
- `FORBIDDEN` - Permission denied
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `VALIDATION_ERROR` - Data validation failed

---

## SDKs and Libraries

### Official SDKs
- **JavaScript/Node.js:** `npm install @company/api-client`
- **Python:** `pip install company-api`
- **PHP:** `composer require company/api-client`
- **Ruby:** `gem install company_api`

### JavaScript Example
```javascript
const ApiClient = require('@company/api-client');

const client = new ApiClient('YOUR_API_KEY');

// Get users
const users = await client.users.list({
  page: 1,
  limit: 10,
  status: 'active'
});

// Create user
const newUser = await client.users.create({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123'
});
```

### Python Example
```python
from company_api import ApiClient

client = ApiClient(api_key='YOUR_API_KEY')

# Get users
users = client.users.list(page=1, limit=10, status='active')

# Create user
new_user = client.users.create({
    'username': 'john_doe',
    'email': 'john@example.com',
    'password': 'securepass123'
})
```

---

## Testing

### Postman Collection
Import our Postman collection: [Download Collection](link-to-postman-collection)

### Test Environment
- **Base URL:** `https://api-sandbox.example.com/v1`
- **Test API Key:** Contact support for test credentials

### Example Test Requests

#### Test Authentication
```bash
curl -H "Authorization: Bearer YOUR_TEST_KEY" \
     https://api-sandbox.example.com/v1/auth/verify
```

#### Create Test User
```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_TEST_KEY" \
     -H "Content-Type: application/json" \
     -d '{"username":"test_user","email":"test@example.com","password":"testpass123"}' \
     https://api-sandbox.example.com/v1/users
```

---

## Webhooks

### Available Events
- `user.created` - New user registered
- `user.updated` - User information changed
- `user.deleted` - User account deleted

### Webhook Configuration
Set up webhooks in your dashboard or via API:

```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"url":"https://your-site.com/webhook","events":["user.created","user.updated"]}' \
     https://api.example.com/v1/webhooks
```

### Webhook Payload Example
```json
{
  "event": "user.created",
  "timestamp": "2023-06-20T14:15:30Z",
  "data": {
    "id": 12346,
    "username": "jane_doe",
    "email": "jane@example.com",
    "status": "active"
  }
}
```

---

## Changelog

### Version 1.2.0 (2023-06-20)
- Added webhook support
- Improved error messages
- Added Python SDK

### Version 1.1.0 (2023-05-15)
- Added user status filtering
- Increased rate limits for Pro tier
- Bug fixes for pagination

### Version 1.0.0 (2023-04-01)
- Initial release
- Basic CRUD operations for users
- API key authentication

---

## Support

### Documentation
- [API Reference](link-to-reference)
- [Getting Started Guide](link-to-guide)
- [SDKs & Libraries](link-to-sdks)

### Contact
- **Email:** [support@company.com](mailto:support@company.com)
- **Documentation Issues:** [docs@company.com](mailto:docs@company.com)
- **Community Forum:** [forum.company.com](https://forum.company.com)

### Status Page
Check API status: [status.company.com](https://status.company.com)

---

**© 2023 [Company Name]. All rights reserved.**  
*This documentation was created by Prism Writing Cooperative*
