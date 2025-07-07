# OpenAPI Specification Template

**Project:** [API Name]  
**Version:** [API Version]  
**Date:** [Current Date]  
**Author:** [Team Member Name]  
**Client:** [Client Organization]

---

## OpenAPI Specification

This OpenAPI specification describes the [API Name] REST API. You can use this specification to generate client SDKs, server stubs, and interactive documentation.

### OpenAPI Version
This specification uses OpenAPI 3.0.3

### Generated Documentation
- **Swagger UI:** [https://api.example.com/docs](https://api.example.com/docs)
- **ReDoc:** [https://api.example.com/redoc](https://api.example.com/redoc)

---

## Complete OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: [API Name]
  description: |
    [Brief description of your API]
    
    ## Authentication
    This API uses API key authentication. Include your API key in the Authorization header:
    `Authorization: Bearer YOUR_API_KEY`
    
    ## Rate Limiting
    - Free tier: 100 requests per hour
    - Pro tier: 1,000 requests per hour
    - Enterprise: Custom limits
    
    ## Support
    For support, email [support@company.com](mailto:support@company.com)
  
  version: 1.0.0
  termsOfService: https://company.com/terms
  contact:
    name: API Support
    url: https://company.com/support
    email: support@company.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://api-staging.example.com/v1
    description: Staging server
  - url: https://api-dev.example.com/v1
    description: Development server

security:
  - ApiKeyAuth: []

paths:
  /users:
    get:
      summary: List users
      description: Retrieve a paginated list of users
      operationId: listUsers
      tags:
        - Users
      parameters:
        - name: page
          in: query
          description: Page number
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          description: Number of items per page
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
        - name: status
          in: query
          description: Filter by user status
          required: false
          schema:
            type: string
            enum: [active, inactive, suspended]
        - name: search
          in: query
          description: Search users by username or email
          required: false
          schema:
            type: string
            minLength: 3
      responses:
        '200':
          description: Successfully retrieved users
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'
                  meta:
                    $ref: '#/components/schemas/Meta'
              examples:
                success:
                  summary: Successful response
                  value:
                    data:
                      - id: "user_123"
                        username: "john_doe"
                        email: "john@example.com"
                        full_name: "John Doe"
                        status: "active"
                        created_at: "2023-01-15T10:30:00Z"
                        updated_at: "2023-01-15T10:30:00Z"
                    pagination:
                      current_page: 1
                      total_pages: 5
                      total_items: 98
                      items_per_page: 20
                      has_next_page: true
                      has_previous_page: false
                    meta:
                      request_id: "req_123456"
                      response_time: 45
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimited'
        '500':
          $ref: '#/components/responses/InternalError'
    
    post:
      summary: Create user
      description: Create a new user account
      operationId: createUser
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
            examples:
              create_user:
                summary: Create user example
                value:
                  username: "jane_doe"
                  email: "jane@example.com"
                  password: "securepassword123"
                  full_name: "Jane Doe"
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/User'
                  meta:
                    $ref: '#/components/schemas/Meta'
              examples:
                success:
                  summary: User created
                  value:
                    data:
                      id: "user_124"
                      username: "jane_doe"
                      email: "jane@example.com"
                      full_name: "Jane Doe"
                      status: "active"
                      created_at: "2023-06-20T14:15:30Z"
                      updated_at: "2023-06-20T14:15:30Z"
                    meta:
                      request_id: "req_123457"
                      response_time: 120
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          $ref: '#/components/responses/Conflict'
        '422':
          $ref: '#/components/responses/ValidationError'
        '500':
          $ref: '#/components/responses/InternalError'

  /users/{id}:
    get:
      summary: Get user by ID
      description: Retrieve a specific user by their ID
      operationId: getUserById
      tags:
        - Users
      parameters:
        - name: id
          in: path
          description: User ID
          required: true
          schema:
            type: string
            pattern: '^user_[a-zA-Z0-9]+$'
          example: "user_123"
      responses:
        '200':
          description: User retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/User'
                  meta:
                    $ref: '#/components/schemas/Meta'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalError'
    
    put:
      summary: Update user
      description: Update an existing user's information
      operationId: updateUser
      tags:
        - Users
      parameters:
        - name: id
          in: path
          description: User ID
          required: true
          schema:
            type: string
            pattern: '^user_[a-zA-Z0-9]+$'
          example: "user_123"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserRequest'
            examples:
              update_user:
                summary: Update user example
                value:
                  full_name: "John Smith"
                  status: "active"
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/User'
                  meta:
                    $ref: '#/components/schemas/Meta'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '422':
          $ref: '#/components/responses/ValidationError'
        '500':
          $ref: '#/components/responses/InternalError'
    
    delete:
      summary: Delete user
      description: Delete a user account
      operationId: deleteUser
      tags:
        - Users
      parameters:
        - name: id
          in: path
          description: User ID
          required: true
          schema:
            type: string
            pattern: '^user_[a-zA-Z0-9]+$'
          example: "user_123"
      responses:
        '204':
          description: User deleted successfully
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalError'

  /orders:
    get:
      summary: List orders
      description: Retrieve a paginated list of orders
      operationId: listOrders
      tags:
        - Orders
      parameters:
        - name: user_id
          in: query
          description: Filter orders by user ID
          required: false
          schema:
            type: string
            pattern: '^user_[a-zA-Z0-9]+$'
        - name: status
          in: query
          description: Filter by order status
          required: false
          schema:
            type: string
            enum: [pending, processing, completed, cancelled]
        - name: page
          in: query
          description: Page number
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          description: Number of items per page
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Successfully retrieved orders
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Order'
                  pagination:
                    $ref: '#/components/schemas/Pagination'
                  meta:
                    $ref: '#/components/schemas/Meta'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalError'
    
    post:
      summary: Create order
      description: Create a new order
      operationId: createOrder
      tags:
        - Orders
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Order'
                  meta:
                    $ref: '#/components/schemas/Meta'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '422':
          $ref: '#/components/responses/ValidationError'
        '500':
          $ref: '#/components/responses/InternalError'

  /orders/{id}:
    get:
      summary: Get order by ID
      description: Retrieve a specific order by its ID
      operationId: getOrderById
      tags:
        - Orders
      parameters:
        - name: id
          in: path
          description: Order ID
          required: true
          schema:
            type: string
            pattern: '^order_[a-zA-Z0-9]+$'
          example: "order_456"
      responses:
        '200':
          description: Order retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Order'
                  meta:
                    $ref: '#/components/schemas/Meta'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalError'

components:
  securitySchemes:
    ApiKeyAuth:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: |
        API key authentication. Include your API key in the Authorization header:
        `Authorization: Bearer YOUR_API_KEY`

  schemas:
    User:
      type: object
      required:
        - id
        - username
        - email
        - status
        - created_at
        - updated_at
      properties:
        id:
          type: string
          pattern: '^user_[a-zA-Z0-9]+$'
          description: Unique user identifier
          example: "user_123"
        username:
          type: string
          minLength: 3
          maxLength: 50
          pattern: '^[a-zA-Z0-9_]+$'
          description: Unique username
          example: "john_doe"
        email:
          type: string
          format: email
          description: User email address
          example: "john@example.com"
        full_name:
          type: string
          maxLength: 100
          description: User's full name
          example: "John Doe"
          nullable: true
        status:
          type: string
          enum: [active, inactive, suspended]
          description: User account status
          example: "active"
        created_at:
          type: string
          format: date-time
          description: User creation timestamp
          example: "2023-01-15T10:30:00Z"
        updated_at:
          type: string
          format: date-time
          description: Last update timestamp
          example: "2023-01-15T10:30:00Z"

    CreateUserRequest:
      type: object
      required:
        - username
        - email
        - password
      properties:
        username:
          type: string
          minLength: 3
          maxLength: 50
          pattern: '^[a-zA-Z0-9_]+$'
          description: Unique username
          example: "jane_doe"
        email:
          type: string
          format: email
          description: User email address
          example: "jane@example.com"
        password:
          type: string
          minLength: 8
          maxLength: 128
          description: User password (must be at least 8 characters)
          example: "securepassword123"
        full_name:
          type: string
          maxLength: 100
          description: User's full name
          example: "Jane Doe"

    UpdateUserRequest:
      type: object
      properties:
        email:
          type: string
          format: email
          description: User email address
          example: "john.doe@example.com"
        full_name:
          type: string
          maxLength: 100
          description: User's full name
          example: "John Smith"
        status:
          type: string
          enum: [active, inactive, suspended]
          description: User account status
          example: "active"

    Order:
      type: object
      required:
        - id
        - user_id
        - status
        - total
        - currency
        - items
        - created_at
        - updated_at
      properties:
        id:
          type: string
          pattern: '^order_[a-zA-Z0-9]+$'
          description: Unique order identifier
          example: "order_456"
        user_id:
          type: string
          pattern: '^user_[a-zA-Z0-9]+$'
          description: ID of the user who placed the order
          example: "user_123"
        status:
          type: string
          enum: [pending, processing, completed, cancelled]
          description: Order status
          example: "completed"
        total:
          type: number
          format: float
          minimum: 0
          description: Total order amount
          example: 99.99
        currency:
          type: string
          pattern: '^[A-Z]{3}$'
          description: Currency code (ISO 4217)
          example: "USD"
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'
          description: Items in the order
        created_at:
          type: string
          format: date-time
          description: Order creation timestamp
          example: "2023-06-20T15:30:00Z"
        updated_at:
          type: string
          format: date-time
          description: Last update timestamp
          example: "2023-06-20T15:45:00Z"

    OrderItem:
      type: object
      required:
        - id
        - product_id
        - name
        - quantity
        - price
      properties:
        id:
          type: string
          description: Order item identifier
          example: "item_789"
        product_id:
          type: string
          description: Product identifier
          example: "product_123"
        name:
          type: string
          description: Product name
          example: "Premium Widget"
        quantity:
          type: integer
          minimum: 1
          description: Quantity ordered
          example: 2
        price:
          type: number
          format: float
          minimum: 0
          description: Price per item
          example: 49.99

    CreateOrderRequest:
      type: object
      required:
        - user_id
        - items
        - currency
      properties:
        user_id:
          type: string
          pattern: '^user_[a-zA-Z0-9]+$'
          description: ID of the user placing the order
          example: "user_123"
        items:
          type: array
          minItems: 1
          items:
            type: object
            required:
              - product_id
              - quantity
              - price
            properties:
              product_id:
                type: string
                description: Product identifier
                example: "product_123"
              quantity:
                type: integer
                minimum: 1
                description: Quantity to order
                example: 2
              price:
                type: number
                format: float
                minimum: 0
                description: Price per item
                example: 49.99
        currency:
          type: string
          pattern: '^[A-Z]{3}$'
          description: Currency code (ISO 4217)
          example: "USD"

    Pagination:
      type: object
      required:
        - current_page
        - total_pages
        - total_items
        - items_per_page
        - has_next_page
        - has_previous_page
      properties:
        current_page:
          type: integer
          minimum: 1
          description: Current page number
          example: 1
        total_pages:
          type: integer
          minimum: 0
          description: Total number of pages
          example: 5
        total_items:
          type: integer
          minimum: 0
          description: Total number of items
          example: 98
        items_per_page:
          type: integer
          minimum: 1
          description: Number of items per page
          example: 20
        has_next_page:
          type: boolean
          description: Whether there is a next page
          example: true
        has_previous_page:
          type: boolean
          description: Whether there is a previous page
          example: false

    Meta:
      type: object
      required:
        - request_id
        - response_time
      properties:
        request_id:
          type: string
          description: Unique request identifier
          example: "req_123456"
        response_time:
          type: integer
          description: Response time in milliseconds
          example: 45
        api_version:
          type: string
          description: API version used
          example: "1.0.0"

    Error:
      type: object
      required:
        - error
      properties:
        error:
          type: object
          required:
            - code
            - message
          properties:
            code:
              type: string
              description: Error code
              example: "VALIDATION_ERROR"
            message:
              type: string
              description: Human-readable error message
              example: "Validation failed for one or more fields"
            details:
              type: object
              description: Additional error details
              example:
                field: "email"
                issue: "Invalid email format"
            timestamp:
              type: string
              format: date-time
              description: Error timestamp
              example: "2023-06-20T14:15:30Z"
        meta:
          $ref: '#/components/schemas/Meta'

    ValidationError:
      type: object
      required:
        - error
      properties:
        error:
          type: object
          required:
            - code
            - message
            - validation_errors
          properties:
            code:
              type: string
              enum: [VALIDATION_ERROR]
              description: Error code
              example: "VALIDATION_ERROR"
            message:
              type: string
              description: Human-readable error message
              example: "Validation failed for one or more fields"
            validation_errors:
              type: array
              items:
                type: object
                required:
                  - field
                  - message
                properties:
                  field:
                    type: string
                    description: Field that failed validation
                    example: "email"
                  message:
                    type: string
                    description: Validation error message
                    example: "Invalid email format"
                  code:
                    type: string
                    description: Validation error code
                    example: "INVALID_FORMAT"
        meta:
          $ref: '#/components/schemas/Meta'

  responses:
    BadRequest:
      description: Bad request - invalid parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            bad_request:
              summary: Bad request example
              value:
                error:
                  code: "BAD_REQUEST"
                  message: "Invalid request parameters"
                  details:
                    parameter: "page"
                    issue: "Must be a positive integer"
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 25

    Unauthorized:
      description: Unauthorized - invalid or missing API key
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            unauthorized:
              summary: Unauthorized example
              value:
                error:
                  code: "UNAUTHORIZED"
                  message: "Invalid or missing API key"
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 15

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            not_found:
              summary: Not found example
              value:
                error:
                  code: "NOT_FOUND"
                  message: "The requested resource was not found"
                  details:
                    resource: "user"
                    id: "user_nonexistent"
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 20

    Conflict:
      description: Conflict - resource already exists
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            conflict:
              summary: Conflict example
              value:
                error:
                  code: "CONFLICT"
                  message: "A user with this email already exists"
                  details:
                    field: "email"
                    value: "existing@example.com"
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 30

    ValidationError:
      description: Validation error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidationError'
          examples:
            validation_error:
              summary: Validation error example
              value:
                error:
                  code: "VALIDATION_ERROR"
                  message: "Validation failed for one or more fields"
                  validation_errors:
                    - field: "email"
                      message: "Invalid email format"
                      code: "INVALID_FORMAT"
                    - field: "password"
                      message: "Password must be at least 8 characters"
                      code: "TOO_SHORT"
                meta:
                  request_id: "req_123456"
                  response_time: 35

    RateLimited:
      description: Rate limit exceeded
      headers:
        X-RateLimit-Limit:
          description: Request limit per hour
          schema:
            type: integer
          example: 100
        X-RateLimit-Remaining:
          description: Requests remaining in current window
          schema:
            type: integer
          example: 0
        X-RateLimit-Reset:
          description: Time when rate limit resets (Unix timestamp)
          schema:
            type: integer
          example: 1640995200
        Retry-After:
          description: Seconds to wait before retrying
          schema:
            type: integer
          example: 3600
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            rate_limited:
              summary: Rate limited example
              value:
                error:
                  code: "RATE_LIMITED"
                  message: "Rate limit exceeded. Try again later."
                  details:
                    limit: 100
                    remaining: 0
                    reset_time: "2023-06-20T15:00:00Z"
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 10

    InternalError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            internal_error:
              summary: Internal error example
              value:
                error:
                  code: "INTERNAL_ERROR"
                  message: "An unexpected error occurred. Please try again later."
                  timestamp: "2023-06-20T14:15:30Z"
                meta:
                  request_id: "req_123456"
                  response_time: 500

  examples:
    UserExample:
      summary: Example user
      value:
        id: "user_123"
        username: "john_doe"
        email: "john@example.com"
        full_name: "John Doe"
        status: "active"
        created_at: "2023-01-15T10:30:00Z"
        updated_at: "2023-01-15T10:30:00Z"

    OrderExample:
      summary: Example order
      value:
        id: "order_456"
        user_id: "user_123"
        status: "completed"
        total: 99.99
        currency: "USD"
        items:
          - id: "item_789"
            product_id: "product_123"
            name: "Premium Widget"
            quantity: 2
            price: 49.99
        created_at: "2023-06-20T15:30:00Z"
        updated_at: "2023-06-20T15:45:00Z"

tags:
  - name: Users
    description: User management operations
  - name: Orders
    description: Order management operations
  - name: Authentication
    description: Authentication and authorization

externalDocs:
  description: Find more information about our API
  url: https://docs.company.com
```

---

## Using This Specification

### Generate Client SDKs

#### OpenAPI Generator
```bash
# Install OpenAPI Generator
npm install @openapitools/openapi-generator-cli -g

# Generate JavaScript client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g javascript \
  -o ./generated/javascript-client

# Generate Python client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ./generated/python-client

# Generate Java client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g java \
  -o ./generated/java-client
```

#### Swagger Codegen
```bash
# Install Swagger Codegen
npm install -g swagger-codegen

# Generate TypeScript client
swagger-codegen generate \
  -i openapi.yaml \
  -l typescript-fetch \
  -o ./generated/typescript-client
```

### Generate Server Stubs

#### Express.js Server
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g nodejs-express-server \
  -o ./generated/express-server
```

#### Spring Boot Server
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g spring \
  -o ./generated/spring-server
```

### Generate Documentation

#### Swagger UI
```bash
# Serve Swagger UI locally
npx swagger-ui-serve openapi.yaml
```

#### ReDoc
```bash
# Generate static ReDoc documentation
npx redoc-cli build openapi.yaml --output docs.html
```

---

## Validation and Testing

### Validate OpenAPI Specification

#### Swagger Editor
- Online: [editor.swagger.io](https://editor.swagger.io)
- Local: `npx swagger-editor`

#### CLI Validation
```bash
# Install OpenAPI linter
npm install -g @apidevtools/swagger-parser

# Validate specification
swagger-parser validate openapi.yaml
```

### API Contract Testing

#### Postman
1. Import OpenAPI specification into Postman
2. Generate test collection from schema
3. Run automated tests against API

#### Dredd
```bash
# Install Dredd
npm install -g dredd

# Test API against specification
dredd openapi.yaml https://api.example.com/v1
```

---

## Best Practices

### Specification Design
- Use clear, descriptive operation IDs
- Include comprehensive examples
- Define reusable components
- Document all error responses
- Use consistent naming conventions

### Schema Design
- Use appropriate data types and formats
- Set validation constraints (min/max, patterns)
- Make required fields explicit
- Use enums for fixed values
- Include helpful descriptions

### Documentation
- Write clear descriptions for all operations
- Include example requests and responses
- Document authentication requirements
- Explain error codes and handling
- Keep external documentation links updated

---

## Support

### Tools and Resources
- **OpenAPI Specification:** [spec.openapis.org](https://spec.openapis.org)
- **Swagger Tools:** [swagger.io](https://swagger.io)
- **OpenAPI Generator:** [openapi-generator.tech](https://openapi-generator.tech)

### Validation Tools
- **Swagger Editor:** [editor.swagger.io](https://editor.swagger.io)
- **Spectral Linter:** [stoplight.io/open-source/spectral](https://stoplight.io/open-source/spectral)

### Contact
- **Email:** [api-docs@company.com](mailto:api-docs@company.com)
- **Support:** [support@company.com](mailto:support@company.com)

---

**© 2023 [Company Name]. All rights reserved.**  
*This documentation was created by Prism Writing Cooperative*
