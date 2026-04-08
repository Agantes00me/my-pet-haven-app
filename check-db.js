require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkProducts() {
    const { count, error } = await supabase
        .from('shopify_products')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error fetching count:', error.message);
    } else {
        console.log(`Total products in shopify_products: ${count}`);
    }
}

checkProducts();
