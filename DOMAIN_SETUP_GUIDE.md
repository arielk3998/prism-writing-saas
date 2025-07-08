# 🌐 Custom Domain Setup: prismwriting.com

## 🎯 **Goal: Point prismwriting.com to Your Live SaaS Platform**

Your Prism Writing SaaS is currently live at:
**Current URL:** https://prism-enterprise-ao7h6su5c-prism-writings-projects.vercel.app

**Target URL:** https://prismwriting.com (your custom domain)

---

## 📋 **Step-by-Step Domain Configuration**

### **Step 1: Configure Domain in Vercel Dashboard**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/prism-writings-projects/prism-enterprise
   - Click on **Settings** tab
   - Click on **Domains** in the left sidebar

2. **Add Your Domain:**
   - Click **"Add Domain"**
   - Enter: `prismwriting.com`
   - Click **"Add"**
   - Also add: `www.prismwriting.com` (for www redirect)

3. **Get DNS Configuration:**
   - Vercel will provide DNS records to configure
   - Copy these values (they'll look like the examples below)

---

### **Step 2: Configure DNS Records**

**You need to configure these DNS records with your domain provider:**

#### **For Root Domain (prismwriting.com):**
```
Type: A
Name: @ (or root/blank)
Value: 76.76.19.61
TTL: 300 (or default)
```

#### **For WWW Subdomain (www.prismwriting.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

#### **Alternative: If your provider supports ALIAS/ANAME:**
```
Type: ALIAS (or ANAME)
Name: @ (or root/blank)
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

---

### **Step 3: Update Environment Variables**

After domain is configured, update your environment variables in Vercel:

1. **Go to:** https://vercel.com/prism-writings-projects/prism-enterprise
2. **Settings** → **Environment Variables**
3. **Update/Add these variables:**

```bash
# Update site URL to your custom domain
NEXT_PUBLIC_SITE_URL=https://prismwriting.com
NEXT_PUBLIC_API_URL=https://prismwriting.com/api

# Essential for security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Email configuration (update with your actual email settings)
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=hello@prismwriting.com
SMTP_PASS=your_email_password

# Optional but recommended
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

4. **Redeploy** after adding environment variables

---

## 🔧 **Domain Provider Specific Instructions**

### **Popular Domain Providers:**

#### **Namecheap:**
1. Login to Namecheap account
2. Go to Domain List → Manage
3. Advanced DNS tab
4. Add/modify A and CNAME records as specified above

#### **GoDaddy:**
1. Login to GoDaddy account
2. My Products → DNS → Manage Zones
3. Add/modify DNS records as specified above

#### **Cloudflare:**
1. Login to Cloudflare dashboard
2. Select your domain
3. DNS → Records
4. Add/modify records (set proxy status to "DNS only" for initial setup)

#### **Google Domains:**
1. Login to Google Domains
2. Select your domain → DNS
3. Add/modify custom resource records

---

## ⏱️ **Timeline & Verification**

### **Expected Timeline:**
- **DNS Configuration:** 5-10 minutes
- **DNS Propagation:** 5 minutes - 48 hours (usually 15-30 minutes)
- **SSL Certificate:** Automatic (5-10 minutes after DNS propagates)

### **Verification Steps:**

1. **Check DNS Propagation:**
   - Use: https://dnschecker.org
   - Enter: prismwriting.com
   - Verify A record points to Vercel's IP

2. **Test Domain:**
   - Try: https://prismwriting.com
   - Should redirect to your SaaS platform

3. **Verify SSL:**
   - Check for green lock icon in browser
   - Vercel handles SSL automatically

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Domain Already Assigned Error:**
- The domain might be assigned to another Vercel project
- Remove it from the other project first
- Or contact Vercel support

#### **DNS Not Propagating:**
- Wait up to 24-48 hours
- Clear browser cache
- Try incognito/private browsing

#### **SSL Certificate Issues:**
- Usually resolves automatically within 24 hours
- Ensure DNS is properly configured
- Contact Vercel support if persists

#### **Environment Variables Not Working:**
- Redeploy after adding variables
- Check variable names match exactly
- Verify no extra spaces in values

---

## 📞 **Quick Access Links**

- **🌐 Current Live Site:** https://prism-enterprise-ao7h6su5c-prism-writings-projects.vercel.app
- **⚙️ Vercel Dashboard:** https://vercel.com/prism-writings-projects/prism-enterprise
- **📱 GitHub Repo:** https://github.com/arielk3998/prism-writing-saas
- **🔍 DNS Checker:** https://dnschecker.org

---

## 🎯 **Success Criteria**

Your domain setup is successful when:
- ✅ https://prismwriting.com loads your SaaS platform
- ✅ https://www.prismwriting.com redirects properly
- ✅ SSL certificate shows green lock
- ✅ All functionality works on custom domain
- ✅ Environment variables updated

---

## 🎉 **After Domain Setup**

Once prismwriting.com is live, your platform will be:
- ✅ **Professional branded URL**
- ✅ **SEO optimized**
- ✅ **SSL secured**
- ✅ **Globally accessible**
- ✅ **Ready for business**

**Your Prism Writing SaaS will be live at: https://prismwriting.com** 🚀

---

*Domain setup guide created: July 8, 2025*  
*Next step: Configure DNS records with your domain provider*
