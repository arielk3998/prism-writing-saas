# GraphQL API Documentation Template

**Project:** [GraphQL API Name]  
**Version:** [API Version]  
**Date:** [Current Date]  
**Author:** [Team Member Name]  
**Client:** [Client Organization]

---

## Overview

[Brief description of the GraphQL API and its purpose]

### GraphQL Endpoint
```
https://api.example.com/graphql
```

### GraphQL Playground
Interactive playground: [https://api.example.com/playground](https://api.example.com/playground)

---

## Authentication

### Bearer Token
Include your API token in the Authorization header:

```http
Authorization: Bearer YOUR_API_TOKEN
```

### Example Query with Authentication
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ users { id username email } }"}' \
  https://api.example.com/graphql
```

---

## Schema Overview

### Types

#### User
```graphql
type User {
  id: ID!
  username: String!
  email: String!
  fullName: String
  status: UserStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
  posts: [Post!]!
}
```

#### Post
```graphql
type Post {
  id: ID!
  title: String!
  content: String!
  status: PostStatus!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  tags: [Tag!]!
}
```

#### Tag
```graphql
type Tag {
  id: ID!
  name: String!
  posts: [Post!]!
}
```

### Enums

#### UserStatus
```graphql
enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

#### PostStatus
```graphql
enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

### Input Types

#### CreateUserInput
```graphql
input CreateUserInput {
  username: String!
  email: String!
  fullName: String
  password: String!
}
```

#### UpdateUserInput
```graphql
input UpdateUserInput {
  username: String
  email: String
  fullName: String
  status: UserStatus
}
```

---

## Queries

### Get All Users
```graphql
query GetUsers($limit: Int, $offset: Int, $status: UserStatus) {
  users(limit: $limit, offset: $offset, status: $status) {
    id
    username
    email
    fullName
    status
    createdAt
  }
}
```

**Variables:**
```json
{
  "limit": 10,
  "offset": 0,
  "status": "ACTIVE"
}
```

**Example Response:**
```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "username": "john_doe",
        "email": "john@example.com",
        "fullName": "John Doe",
        "status": "ACTIVE",
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Get User by ID
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    username
    email
    fullName
    status
    createdAt
    posts {
      id
      title
      status
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

### Get Posts with Author
```graphql
query GetPosts($limit: Int, $status: PostStatus) {
  posts(limit: $limit, status: $status) {
    id
    title
    content
    status
    createdAt
    author {
      id
      username
      email
    }
    tags {
      id
      name
    }
  }
}
```

**Variables:**
```json
{
  "limit": 5,
  "status": "PUBLISHED"
}
```

---

## Mutations

### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    fullName
    status
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "username": "jane_doe",
    "email": "jane@example.com",
    "fullName": "Jane Doe",
    "password": "securepassword123"
  }
}
```

**Example Response:**
```json
{
  "data": {
    "createUser": {
      "id": "2",
      "username": "jane_doe",
      "email": "jane@example.com",
      "fullName": "Jane Doe",
      "status": "ACTIVE",
      "createdAt": "2023-06-20T14:15:30Z"
    }
  }
}
```

### Update User
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    username
    email
    fullName
    status
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "2",
  "input": {
    "fullName": "Jane Smith",
    "status": "ACTIVE"
  }
}
```

### Delete User
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    success
    message
  }
}
```

**Variables:**
```json
{
  "id": "2"
}
```

---

## Subscriptions

### User Created
```graphql
subscription UserCreated {
  userCreated {
    id
    username
    email
    createdAt
  }
}
```

### Post Published
```graphql
subscription PostPublished($authorId: ID) {
  postPublished(authorId: $authorId) {
    id
    title
    author {
      username
    }
    publishedAt
  }
}
```

---

## Error Handling

### Error Format
```json
{
  "errors": [
    {
      "message": "User not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["user"],
      "extensions": {
        "code": "USER_NOT_FOUND",
        "timestamp": "2023-06-20T14:15:30Z"
      }
    }
  ],
  "data": null
}
```

### Common Error Codes
- `UNAUTHORIZED` - Authentication failed
- `FORBIDDEN` - Insufficient permissions
- `USER_NOT_FOUND` - Requested user doesn't exist
- `VALIDATION_ERROR` - Input validation failed
- `RATE_LIMITED` - Too many requests

---

## Pagination

### Connection-based Pagination
```graphql
query GetUsersWithPagination($first: Int, $after: String) {
  users(first: $first, after: $after) {
    edges {
      node {
        id
        username
        email
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Offset-based Pagination
```graphql
query GetUsersOffset($limit: Int, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    id
    username
    email
  }
  usersCount
}
```

---

## Rate Limiting

- **Free Tier:** 100 requests per hour
- **Pro Tier:** 1,000 requests per hour
- **Enterprise:** Custom limits

Rate limit information is returned in response headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Code Examples

### JavaScript (Apollo Client)
```javascript
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.example.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Query users
const GET_USERS = gql`
  query GetUsers($limit: Int) {
    users(limit: $limit) {
      id
      username
      email
    }
  }
`;

const { loading, error, data } = useQuery(GET_USERS, {
  variables: { limit: 10 }
});
```

### Python (GQL)
```python
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

transport = AIOHTTPTransport(
    url="https://api.example.com/graphql",
    headers={"Authorization": "Bearer YOUR_TOKEN"}
)

client = Client(transport=transport, fetch_schema_from_transport=True)

# Query users
query = gql("""
    query GetUsers($limit: Int) {
        users(limit: $limit) {
            id
            username
            email
        }
    }
""")

result = client.execute(query, variable_values={"limit": 10})
```

### cURL Examples
```bash
# Query users
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query GetUsers($limit: Int) { users(limit: $limit) { id username email } }",
    "variables": { "limit": 5 }
  }' \
  https://api.example.com/graphql

# Create user mutation
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id username email } }",
    "variables": {
      "input": {
        "username": "new_user",
        "email": "new@example.com",
        "password": "password123"
      }
    }
  }' \
  https://api.example.com/graphql
```

---

## Testing

### GraphQL Playground
Use the interactive playground at: [https://api.example.com/playground](https://api.example.com/playground)

### Introspection Query
```graphql
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      name
      kind
      description
    }
  }
}
```

### Test Environment
- **Endpoint:** `https://api-staging.example.com/graphql`
- **Playground:** `https://api-staging.example.com/playground`

---

## Best Practices

### Query Optimization
- Use fragments for reusable field sets
- Avoid deeply nested queries
- Request only needed fields
- Use variables for dynamic values

### Fragment Example
```graphql
fragment UserInfo on User {
  id
  username
  email
  fullName
  status
}

query GetUsersAndPosts {
  users {
    ...UserInfo
  }
  posts {
    id
    title
    author {
      ...UserInfo
    }
  }
}
```

### Avoid Over-fetching
```graphql
# Good - only request needed fields
query GetUsers {
  users {
    id
    username
    email
  }
}

# Avoid - requesting unnecessary data
query GetUsers {
  users {
    id
    username
    email
    fullName
    posts {
      id
      title
      content
      tags {
        id
        name
      }
    }
  }
}
```

---

## Support

### Documentation
- [GraphQL Specification](https://graphql.org/)
- [API Playground](https://api.example.com/playground)
- [Getting Started Guide](link-to-guide)

### Contact
- **Email:** [support@company.com](mailto:support@company.com)
- **GraphQL Issues:** [graphql@company.com](mailto:graphql@company.com)
- **Community:** [community.company.com](https://community.company.com)

---

**© 2023 [Company Name]. All rights reserved.**  
*This documentation was created by Prism Writing Cooperative*
