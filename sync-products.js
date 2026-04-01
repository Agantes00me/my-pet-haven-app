require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Configure these in your .env file
const SHOPIFY_STORE = process.env.SHOPIFY_STORE_URL; // e.g., mystore.myshopify.com
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function syncProducts() {
  console.log('🐾 Initializing My Pet Haven Sync...');

  try {
    const response = await axios.get(`https://${SHOPIFY_STORE}/admin/api/2024-01/products.json`, {
      headers: { 'X-Shopify-Access-Token': SHOPIFY_TOKEN }
    });

    const products = response.data.products;
    console.log(`✨ Found ${products.length} products on Shopify. Updating Supabase...`);

    for (const p of products) {
      const productData = {
        shopify_id: p.id.toString(),
        title: p.title,
        handle: p.handle,
        status: p.status,
        price: p.variants[0]?.price || '0.00',
        image_url: p.image?.src || null,
        description_html: p.body_html,
        vendor: p.vendor,
        product_type: p.product_type,
        tags: p.tags ? p.tags.split(',').map(t => t.trim()) : [],
        variants: JSON.stringify(p.variants),
        all_images: JSON.stringify(p.images),
        // Placeholder for metafields - requires separate API call per product
        metafields: JSON.stringify({ material: 'Pet-Safe Fiber', washable: 'Yes', durability: 'High' }),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('shopify_products')
        .upsert(productData, { onConflict: 'shopify_id' });

      if (error) {
        console.error(`❌ Error syncing ${p.title}:`, error.message);
      } else {
        console.log(`✅ Synced: ${p.title}`);
      }
    }

    console.log('🏁 Sync Complete! Your Pet Haven is now powered up.');
  } catch (err) {
    console.error('💥 Sync Failed:', err.message);
    if (err.response) {
      console.error('Data:', err.response.data);
      console.error('Status:', err.response.status);
    }
  }
}

syncProducts();
