// 📱 Progressive Web App Service Worker
// Phase 4: Production Features - PWA Implementation

const CACHE_NAME = 'prism-writing-v1.0.0';
const STATIC_CACHE = 'prism-static-v1.0.0';
const DYNAMIC_CACHE = 'prism-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/admin',
  '/dashboard',
  '/pricing',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/_next/static/css/',
  '/_next/static/js/',
];

// API routes to cache
const API_ROUTES = [
  '/api/auth/session',
  '/api/users',
  '/api/projects',
  '/api/analytics',
  '/api/notifications',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('📱 PWA: Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📱 PWA: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => !url.includes('undefined')));
      })
      .then(() => {
        console.log('📱 PWA: Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('📱 PWA: Failed to cache static assets:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('📱 PWA: Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('📱 PWA: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('📱 PWA: Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API requests - network first, then cache
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    // Static assets - cache first
    event.respondWith(handleStaticAssets(request));
  } else {
    // Pages - stale while revalidate
    event.respondWith(handlePageRequest(request));
  }
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first
    const networkResponse = await fetch(request.clone());
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📱 PWA: Network failed for API, trying cache:', url.pathname);
    
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for specific API routes
    if (url.pathname === '/api/auth/session') {
      return new Response(JSON.stringify({ user: null, offline: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Generic offline API response
    return new Response(JSON.stringify({ 
      error: 'Offline', 
      message: 'You are currently offline. Please check your connection.' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAssets(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📱 PWA: Failed to fetch static asset:', request.url);
    throw error;
  }
}

// Handle page requests with stale-while-revalidate strategy
async function handlePageRequest(request) {
  const cachedResponse = await caches.match(request);
  
  // Serve cached version immediately if available
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => {
      // If network fails and we have no cache, show offline page
      if (!cachedResponse) {
        return caches.match('/offline');
      }
    });
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('📱 PWA: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-analytics') {
    event.waitUntil(syncAnalyticsData());
  } else if (event.tag === 'background-sync-notifications') {
    event.waitUntil(syncNotifications());
  }
});

// Sync analytics data when back online
async function syncAnalyticsData() {
  try {
    const pendingEvents = await getStoredAnalyticsEvents();
    
    for (const event of pendingEvents) {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    }
    
    await clearStoredAnalyticsEvents();
    console.log('📱 PWA: Analytics data synced successfully');
  } catch (error) {
    console.error('📱 PWA: Failed to sync analytics data:', error);
  }
}

// Sync notifications when back online
async function syncNotifications() {
  try {
    const response = await fetch('/api/notifications');
    if (response.ok) {
      const notifications = await response.json();
      
      // Show any new notifications
      for (const notification of notifications.data) {
        if (!notification.read) {
          self.registration.showNotification(notification.title, {
            body: notification.message,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            tag: notification.id,
            data: notification,
          });
        }
      }
    }
  } catch (error) {
    console.error('📱 PWA: Failed to sync notifications:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('📱 PWA: Push notification received');
  
  const options = {
    body: 'You have new updates in Prism Writing',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Updates',
        icon: '/icons/checkmark.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png',
      },
    ],
  };
  
  event.waitUntil(
    self.registration.showNotification('Prism Writing', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('📱 PWA: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for IndexedDB storage
async function getStoredAnalyticsEvents() {
  // Simplified - in production, use IndexedDB
  return JSON.parse(localStorage.getItem('pendingAnalytics') || '[]');
}

async function clearStoredAnalyticsEvents() {
  localStorage.removeItem('pendingAnalytics');
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('📱 PWA: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('📱 PWA: Service Worker loaded successfully');
