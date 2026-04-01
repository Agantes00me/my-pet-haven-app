require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// We use process.env to grab the values from your .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// This checks if the keys actually loaded before trying to connect
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERROR: Keys not found in .env file. Check your spelling!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
    console.log('🔐 Securely connecting to Supabase via .env...');
    const { data, error } = await supabase.from('shopify_products').select('*');

    if (error) {
        console.error('❌ Connection failed:', error.message);
    } else {
        console.log(`✅ SUCCESS! Found ${data.length} products.`);
        console.table(data);
    }
}

checkProducts();