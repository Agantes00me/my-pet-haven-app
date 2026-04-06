require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const hubspot = require('@hubspot/api-client');
const axios = require('axios');

// 1. Initialize Clients (Using your exact .env keys)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

async function runMyPetHavenSync() {
    console.log('🐾 Starting My Pet Haven Phase 1 Deployment Sync...');

    try {
        // --- STEP 1: SHOPIFY FETCH ---
        const shopifyUrl = `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2024-01/products.json`;
        console.log(`📦 Fetching from: ${process.env.SHOPIFY_SHOP_NAME}`);
        
        const response = await axios.get(shopifyUrl, {
            headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN }
        });

        const products = response.data.products;
        console.log(`✨ Found ${products.length} products. Syncing to local Supabase...`);

        // --- STEP 2: SUPABASE UPSERT ---
        for (const p of products) {
            const { error } = await supabase
                .from('shopify_products')
                .upsert({
                    id: p.id,
                    title: p.title,
                    handle: p.handle,
                    status: p.status,
                    updated_at_shopify: p.updated_at,
                    raw_json: p  // Saves everything!
                });

            if (error) console.error(`❌ Supabase Error for ${p.title}:`, error.message);
            else console.log(`✅ Saved to DB: ${p.title}`);
        }

        // --- STEP 3: HUBSPOT TEST ASSOCIATION ---
        console.log('🤝 Creating HubSpot Test Deal with Association...');
        
        const testEmail = "agante_test@example.com";
        const orderId = 12345;

        // Create/Update Contact with Pet Name
        const contact = await hubspotClient.crm.contacts.basicApi.create({
            properties: { email: testEmail, pet_name: "Buddy" }
        }).catch(err => err.body); // Catch if contact already exists

        const contactId = contact.id || contact.message.match(/\d+/)[0];

        // Create Deal and Associate
        const deal = await hubspotClient.crm.deals.basicApi.create({
            properties: {
                dealname: `My Pet Haven Order #${orderId}`,
                shopify_order_id: orderId.toString(),
                amount: "100.00"
            },
            associations: [{
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
            }]
        });

        console.log(`🎉 Phase 1 Success! Deal Created: ${deal.id}`);

    } catch (err) {
        console.error("🛑 Sync Failed:", err.response?.data || err.message);
    }
}

runMyPetHavenSync();
