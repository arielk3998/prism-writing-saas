# Webhook API Documentation Template

**Project:** [Webhook System Name]  
**Version:** [API Version]  
**Date:** [Current Date]  
**Author:** [Team Member Name]  
**Client:** [Client Organization]

---

## Overview

This documentation covers the webhook system that allows your application to receive real-time notifications when specific events occur in [System Name].

### What are Webhooks?

Webhooks are HTTP callbacks sent to your application when specific events happen. Instead of polling our API for changes, we'll push notifications to your specified endpoints.

### Benefits
- Real-time notifications
- Reduced API calls
- Event-driven architecture
- Reliable delivery with retries

---

## Getting Started

### Prerequisites
- Active API account
- HTTPS endpoint to receive webhooks
- Valid SSL certificate

### Quick Setup
1. Configure your webhook endpoint
2. Subscribe to events
3. Verify webhook signatures
4. Handle webhook events

---

## Webhook Configuration

### Creating a Webhook

**Endpoint:** `POST /webhooks`

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks/handler",
  "events": ["user.created", "order.completed"],
  "description": "Production webhook for user events",
  "secret": "your-webhook-secret"
}
```

**Response:**
```json
{
  "id": "wh_1234567890",
  "url": "https://your-app.com/webhooks/handler",
  "events": ["user.created", "order.completed"],
  "description": "Production webhook for user events",
  "created_at": "2023-06-20T14:15:30Z",
  "status": "active"
}
```

### Listing Webhooks

**Endpoint:** `GET /webhooks`

**Response:**
```json
{
  "webhooks": [
    {
      "id": "wh_1234567890",
      "url": "https://your-app.com/webhooks/handler",
      "events": ["user.created", "order.completed"],
      "status": "active",
      "created_at": "2023-06-20T14:15:30Z"
    }
  ],
  "total": 1
}
```

### Updating a Webhook

**Endpoint:** `PUT /webhooks/{webhook_id}`

**Request Body:**
```json
{
  "events": ["user.created", "user.updated", "order.completed"],
  "status": "active"
}
```

### Deleting a Webhook

**Endpoint:** `DELETE /webhooks/{webhook_id}`

---

## Available Events

### User Events

#### user.created
Triggered when a new user registers.

**Payload:**
```json
{
  "event": "user.created",
  "timestamp": "2023-06-20T14:15:30Z",
  "data": {
    "id": "user_123",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "active",
    "created_at": "2023-06-20T14:15:30Z"
  }
}
```

#### user.updated
Triggered when user information is modified.

**Payload:**
```json
{
  "event": "user.updated",
  "timestamp": "2023-06-20T14:16:45Z",
  "data": {
    "id": "user_123",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "status": "active",
    "updated_at": "2023-06-20T14:16:45Z",
    "changes": ["email"]
  }
}
```

#### user.deleted
Triggered when a user account is deleted.

**Payload:**
```json
{
  "event": "user.deleted",
  "timestamp": "2023-06-20T14:20:00Z",
  "data": {
    "id": "user_123",
    "username": "john_doe",
    "deleted_at": "2023-06-20T14:20:00Z"
  }
}
```

### Order Events

#### order.created
Triggered when a new order is placed.

**Payload:**
```json
{
  "event": "order.created",
  "timestamp": "2023-06-20T15:30:00Z",
  "data": {
    "id": "order_456",
    "user_id": "user_123",
    "status": "pending",
    "total": 99.99,
    "currency": "USD",
    "items": [
      {
        "id": "item_789",
        "name": "Product Name",
        "quantity": 2,
        "price": 49.99
      }
    ],
    "created_at": "2023-06-20T15:30:00Z"
  }
}
```

#### order.completed
Triggered when an order is successfully completed.

**Payload:**
```json
{
  "event": "order.completed",
  "timestamp": "2023-06-20T15:45:00Z",
  "data": {
    "id": "order_456",
    "user_id": "user_123",
    "status": "completed",
    "total": 99.99,
    "currency": "USD",
    "completed_at": "2023-06-20T15:45:00Z"
  }
}
```

#### order.cancelled
Triggered when an order is cancelled.

**Payload:**
```json
{
  "event": "order.cancelled",
  "timestamp": "2023-06-20T16:00:00Z",
  "data": {
    "id": "order_456",
    "user_id": "user_123",
    "status": "cancelled",
    "reason": "customer_request",
    "cancelled_at": "2023-06-20T16:00:00Z"
  }
}
```

### Payment Events

#### payment.succeeded
Triggered when a payment is successfully processed.

**Payload:**
```json
{
  "event": "payment.succeeded",
  "timestamp": "2023-06-20T15:45:00Z",
  "data": {
    "id": "payment_789",
    "order_id": "order_456",
    "amount": 99.99,
    "currency": "USD",
    "method": "credit_card",
    "status": "succeeded",
    "processed_at": "2023-06-20T15:45:00Z"
  }
}
```

#### payment.failed
Triggered when a payment fails to process.

**Payload:**
```json
{
  "event": "payment.failed",
  "timestamp": "2023-06-20T15:35:00Z",
  "data": {
    "id": "payment_789",
    "order_id": "order_456",
    "amount": 99.99,
    "currency": "USD",
    "method": "credit_card",
    "status": "failed",
    "error_code": "insufficient_funds",
    "error_message": "Your card has insufficient funds.",
    "failed_at": "2023-06-20T15:35:00Z"
  }
}
```

---

## Security

### Webhook Signatures

All webhook payloads are signed using HMAC-SHA256. Verify signatures to ensure requests come from our servers.

**Header:** `X-Webhook-Signature`

**Format:** `sha256={signature}`

### Signature Verification

#### Node.js Example
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  const providedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(providedSignature, 'hex')
  );
}

// Usage
const isValid = verifyWebhookSignature(
  req.body,
  req.headers['x-webhook-signature'],
  process.env.WEBHOOK_SECRET
);
```

#### Python Example
```python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    provided_signature = signature.replace('sha256=', '')
    
    return hmac.compare_digest(expected_signature, provided_signature)

# Usage
is_valid = verify_webhook_signature(
    request.body,
    request.headers['X-Webhook-Signature'],
    os.environ['WEBHOOK_SECRET']
)
```

#### PHP Example
```php
<?php
function verifyWebhookSignature($payload, $signature, $secret) {
    $expectedSignature = hash_hmac('sha256', $payload, $secret);
    $providedSignature = str_replace('sha256=', '', $signature);
    
    return hash_equals($expectedSignature, $providedSignature);
}

// Usage
$isValid = verifyWebhookSignature(
    file_get_contents('php://input'),
    $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'],
    $_ENV['WEBHOOK_SECRET']
);
?>
```

---

## Delivery and Retries

### Delivery Expectations
- Webhooks are delivered via HTTP POST
- Expect response within 30 seconds
- Return HTTP 2xx status for success
- Any other status triggers retry

### Retry Policy
- **Immediate retry:** After 1 second
- **Retry 1:** After 5 minutes  
- **Retry 2:** After 30 minutes
- **Retry 3:** After 2 hours
- **Retry 4:** After 6 hours
- **Final retry:** After 12 hours

### Delivery Status
Check delivery status via API:

**Endpoint:** `GET /webhooks/{webhook_id}/deliveries`

**Response:**
```json
{
  "deliveries": [
    {
      "id": "delivery_123",
      "event": "user.created",
      "status": "succeeded",
      "response_code": 200,
      "delivered_at": "2023-06-20T14:15:35Z",
      "attempts": 1
    },
    {
      "id": "delivery_124",
      "event": "order.completed",
      "status": "failed",
      "response_code": 500,
      "last_attempt_at": "2023-06-20T15:45:30Z",
      "attempts": 3,
      "next_attempt_at": "2023-06-20T17:45:30Z"
    }
  ]
}
```

---

## Implementation Examples

### Express.js Webhook Handler
```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware to capture raw body
app.use('/webhooks', express.raw({ type: 'application/json' }));

function verifySignature(req, res, next) {
  const signature = req.headers['x-webhook-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  next();
}

app.post('/webhooks', verifySignature, (req, res) => {
  const event = JSON.parse(req.body);
  
  console.log(`Received event: ${event.event}`);
  
  switch (event.event) {
    case 'user.created':
      handleUserCreated(event.data);
      break;
    case 'order.completed':
      handleOrderCompleted(event.data);
      break;
    case 'payment.succeeded':
      handlePaymentSucceeded(event.data);
      break;
    default:
      console.log(`Unhandled event type: ${event.event}`);
  }
  
  res.status(200).json({ received: true });
});

function handleUserCreated(userData) {
  // Send welcome email
  // Update internal systems
  // Track analytics
}

function handleOrderCompleted(orderData) {
  // Send order confirmation
  // Update inventory
  // Process fulfillment
}

function handlePaymentSucceeded(paymentData) {
  // Send payment receipt
  // Update accounting system
  // Trigger order fulfillment
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Flask Webhook Handler
```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json

app = Flask(__name__)

def verify_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    provided_signature = signature.replace('sha256=', '')
    return hmac.compare_digest(expected_signature, provided_signature)

@app.route('/webhooks', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.get_data()
    
    if not verify_signature(payload, signature, app.config['WEBHOOK_SECRET']):
        return jsonify({'error': 'Invalid signature'}), 401
    
    event = json.loads(payload)
    event_type = event['event']
    
    print(f"Received event: {event_type}")
    
    if event_type == 'user.created':
        handle_user_created(event['data'])
    elif event_type == 'order.completed':
        handle_order_completed(event['data'])
    elif event_type == 'payment.succeeded':
        handle_payment_succeeded(event['data'])
    else:
        print(f"Unhandled event type: {event_type}")
    
    return jsonify({'received': True}), 200

def handle_user_created(user_data):
    # Send welcome email
    # Update internal systems
    # Track analytics
    pass

def handle_order_completed(order_data):
    # Send order confirmation
    # Update inventory
    # Process fulfillment
    pass

def handle_payment_succeeded(payment_data):
    # Send payment receipt
    # Update accounting system
    # Trigger order fulfillment
    pass

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

---

## Testing

### Webhook Testing Tool
Use our webhook testing tool: [https://webhook-tester.company.com](https://webhook-tester.company.com)

### Test Events
Trigger test events from your dashboard or via API:

**Endpoint:** `POST /webhooks/{webhook_id}/test`

**Request Body:**
```json
{
  "event": "user.created"
}
```

### Local Testing with ngrok
1. Install ngrok: `npm install -g ngrok`
2. Start your local webhook handler on port 3000
3. Expose local server: `ngrok http 3000`
4. Use ngrok URL for webhook configuration

### Example ngrok Setup
```bash
# Terminal 1: Start your webhook handler
node webhook-handler.js

# Terminal 2: Expose local server
ngrok http 3000

# Use the ngrok URL (e.g., https://abc123.ngrok.io/webhooks) 
# as your webhook endpoint
```

---

## Monitoring and Debugging

### Webhook Dashboard
Monitor webhook health and delivery status in your dashboard:
- Delivery success rates
- Response times
- Error patterns
- Event volume

### Webhook Logs
**Endpoint:** `GET /webhooks/{webhook_id}/logs`

**Response:**
```json
{
  "logs": [
    {
      "id": "log_123",
      "event": "user.created",
      "status": "delivered",
      "response_code": 200,
      "response_time": 150,
      "delivered_at": "2023-06-20T14:15:35Z"
    }
  ]
}
```

### Common Issues

#### Failed Deliveries
- Check webhook endpoint is accessible
- Verify HTTPS and SSL certificate
- Ensure proper response codes (2xx)
- Check signature verification

#### High Latency
- Optimize webhook handler performance
- Use asynchronous processing
- Implement proper error handling
- Consider webhook queuing

---

## Best Practices

### Endpoint Design
- Use HTTPS with valid SSL certificates
- Respond with 2xx status codes for success
- Handle webhooks idempotently
- Process webhooks asynchronously when possible

### Error Handling
- Implement proper logging
- Handle duplicate events gracefully
- Use exponential backoff for retries
- Monitor webhook health

### Security
- Always verify webhook signatures
- Use HTTPS endpoints only
- Rotate webhook secrets regularly
- Implement rate limiting

### Performance
- Keep webhook handlers lightweight
- Use queues for heavy processing
- Implement proper timeouts
- Scale webhook endpoints as needed

---

## Support

### Documentation
- [Webhook Dashboard](https://dashboard.company.com/webhooks)
- [API Reference](link-to-api-docs)
- [Webhook Testing Tool](https://webhook-tester.company.com)

### Contact
- **Email:** [webhooks@company.com](mailto:webhooks@company.com)
- **Support:** [support@company.com](mailto:support@company.com)
- **Community:** [community.company.com](https://community.company.com)

### Status
- **Webhook Status:** [status.company.com/webhooks](https://status.company.com/webhooks)
- **API Status:** [status.company.com](https://status.company.com)

---

**© 2023 [Company Name]. All rights reserved.**  
*This documentation was created by Prism Writing Cooperative*
