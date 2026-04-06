require('dotenv').config();
const axios = require('axios');

const shop = process.env.SHOPIFY_STORE_URL;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

async function testShopify() {
    console.log(`🚀 Testing connection to: ${shop}...`);
    
    try {
        const response = await axios({
            url: `https://${shop}/admin/api/2024-01/shop.json`,
            method: 'get',
            headers: {
                'X-Shopify-Access-Token': token,
                'Content-Type': 'application/json',
            },
        });

        console.log('✅ CONNECTION SUCCESS!');
        console.log(`🏠 Store Name: ${response.data.shop.name}`);
        console.log(`📧 Contact Email: ${response.data.shop.email}`);
        console.log('--- Heavy Lifting Sync is ONLINE ---');
        
    } catch (error) {
        console.log('❌ CONNECTION FAILED');
        if (error.response) {
            console.log('Error:', error.response.data.errors || error.response.statusText);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}

testShopify();
