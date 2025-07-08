# API DOCUMENTATION TEMPLATE

**API Name:** [Insert API Name]  
**Version:** [Version Number]  
**Last Updated:** [Date]  
**Documentation Version:** 1.0  

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Endpoints](#endpoints)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Code Examples](#code-examples)
8. [SDKs and Libraries](#sdks-and-libraries)
9. [Support](#support)

---

## Overview

### Purpose
[Brief description of what the API does and its primary use cases]

### Key Features
- Feature 1: [Description]
- Feature 2: [Description]  
- Feature 3: [Description]

### Prerequisites
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

---

## Authentication

### Authentication Method
[Describe authentication method - API key, OAuth, JWT, etc.]

### Getting Your API Key
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Authentication Headers
```
Authorization: Bearer [YOUR_API_KEY]
Content-Type: application/json
```

---

## Base URL

**Production:** `https://api.example.com/v1`  
**Sandbox:** `https://sandbox-api.example.com/v1`

---

## Endpoints

### GET /users
Retrieve a list of users.

**Parameters:**
- `limit` (integer, optional): Number of results to return (default: 20, max: 100)
- `offset` (integer, optional): Number of results to skip (default: 0)
- `status` (string, optional): Filter by user status (`active`, `inactive`)

**Request Example:**
```bash
curl -X GET "https://api.example.com/v1/users?limit=10&status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response Example:**
```json
{
  "data": [
    {
      "id": "12345",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 250,
    "limit": 10,
    "offset": 0
  }
}
```

### POST /users
Create a new user.

**Required Parameters:**
- `name` (string): User's full name
- `email` (string): User's email address

**Optional Parameters:**
- `status` (string): User status (`active`, `inactive`) - defaults to `active`

**Request Example:**
```bash
curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "active"
  }'
```

**Response Example:**
```json
{
  "data": {
    "id": "67890",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "active",
    "created_at": "2024-01-15T11:00:00Z"
  }
}
```

### PUT /users/{id}
Update an existing user.

**Path Parameters:**
- `id` (string, required): User ID

**Request Body:**
- `name` (string, optional): Updated name
- `email` (string, optional): Updated email
- `status` (string, optional): Updated status

**Request Example:**
```bash
curl -X PUT "https://api.example.com/v1/users/12345" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive"
  }'
```

### DELETE /users/{id}
Delete a user.

**Path Parameters:**
- `id` (string, required): User ID

**Request Example:**
```bash
curl -X DELETE "https://api.example.com/v1/users/12345" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response Example:**
```json
{
  "message": "User deleted successfully"
}
```

---

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request data is invalid",
    "details": [
      {
        "field": "email",
        "message": "Email address is required"
      }
    ]
  }
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|------------|------------|-------------|
| 400 | `BAD_REQUEST` | Invalid request format |
| 401 | `UNAUTHORIZED` | Invalid or missing API key |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 422 | `VALIDATION_ERROR` | Request validation failed |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

## Rate Limiting

### Limits
- **Standard Plan:** 1,000 requests per hour
- **Premium Plan:** 10,000 requests per hour
- **Enterprise Plan:** Custom limits

### Headers
Rate limit information is included in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## Code Examples

### JavaScript (Node.js)
```javascript
const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

// Get users
async function getUsers() {
  try {
    const response = await apiClient.get('/users');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Create user
async function createUser(userData) {
  try {
    const response = await apiClient.post('/users', userData);
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

### Python
```python
import requests

class APIClient:
    def __init__(self, api_key):
        self.base_url = 'https://api.example.com/v1'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_users(self, limit=20, offset=0):
        params = {'limit': limit, 'offset': offset}
        response = requests.get(
            f'{self.base_url}/users',
            headers=self.headers,
            params=params
        )
        return response.json()
    
    def create_user(self, user_data):
        response = requests.post(
            f'{self.base_url}/users',
            headers=self.headers,
            json=user_data
        )
        return response.json()

# Usage
client = APIClient('YOUR_API_KEY')
users = client.get_users(limit=10)
print(users)
```

---

## SDKs and Libraries

### Official SDKs
- **JavaScript/Node.js:** [npm package link]
- **Python:** [PyPI package link]
- **PHP:** [Packagist link]
- **Ruby:** [RubyGems link]

### Community Libraries
- **Go:** [GitHub repository]
- **Java:** [Maven repository]

---

## Support

### Documentation
- **API Reference:** [Link to detailed API reference]
- **Tutorials:** [Link to tutorial section]
- **FAQ:** [Link to frequently asked questions]

### Contact
- **Support Email:** support@example.com
- **Developer Portal:** [Link to developer portal]
- **Community Forum:** [Link to community forum]
- **Status Page:** [Link to status page]

### Changelog
- **Latest Updates:** [Link to changelog]
- **Migration Guides:** [Link to migration documentation]

---

*Last updated: [Date] | Version: [Version Number]*
