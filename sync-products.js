require('dotenv').config();
const Shopify = require('shopify-api-node');
const { createClient } = require('@supabase/supabase-js');

// 1. Setup Shopify Connection
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME || process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
});

// 2. Setup Supabase Connection (Flexible Naming)
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Missing Supabase Credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncProducts() {
  try {
    const products = await shopify.product.list();
    console.log(`🚀 Found ${products.length} products in Shopify. Starting sync...`);

    for (const product of products) {
      const price = product.variants && product.variants.length > 0 ? product.variants[0].price : 0;
      const imageUrl = product.image ? product.image.src : (product.images && product.images.length > 0 ? product.images[0].src : null);

      const { error } = await supabase
        .from('shopify_products')
        .upsert({
          shopify_id: product.id.toString(),
          handle: product.handle,
          title: product.title,
          description_html: product.body_html,
          price: parseFloat(price), 
          image_url: imageUrl,      
          status: product.status,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'shopify_id'
        });

      if (error) {
        console.error(`❌ Error syncing ${product.title}:`, error.message);
      } else {
        console.log(`✅ Synced: ${product.title} | $${price}`);
      }
    }
    console.log("--- ✨ Sync Complete! Refresh your website now. ---");
  } catch (err) {
    console.error('❌ Sync failed:', err.message);
  }
}

syncProducts();
