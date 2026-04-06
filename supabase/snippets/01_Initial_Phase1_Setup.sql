-- 1. Shopify Products Table
CREATE TABLE IF NOT EXISTS public.shopify_products (
    id BIGINT PRIMARY KEY, -- Shopify's Product ID
    title TEXT NOT NULL,
    handle TEXT UNIQUE,
    status TEXT, -- active, archived, draft
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at_shopify TIMESTAMPTZ,
    raw_json JSONB -- Stores the full Shopify response for future-proofing
);

-- 2. HubSpot Sync Logs (To track what landed in CRM)
CREATE TABLE IF NOT EXISTS public.hubspot_sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopify_order_id BIGINT UNIQUE,
    hubspot_deal_id BIGINT,
    hubspot_contact_id BIGINT,
    sync_status TEXT DEFAULT 'pending', -- pending, success, failed
    last_attempt TIMESTAMPTZ DEFAULT now(),
    error_message TEXT
);

-- 3. Enable Row Level Security (RLS)
-- Even though we use the Secret Key locally, it's good practice.
ALTER TABLE public.shopify_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hubspot_sync_logs ENABLE ROW LEVEL SECURITY;