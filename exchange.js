const axios = require('axios');

const shop = 'gcrvj7-ea.myshopify.com';
const client_id = '667b1bef5493e661bae888b3d8bdec75';
const client_secret = 'process.env.SHOPIFY_APP_SECRET';
const code = '38f6ce58f80362a05cb395a849aa06db';

async function exchange() {
    console.log('🔄 Exchanging code for permanent access token...');
    try {
        const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
            client_id,
            client_secret,
            code
        });

        console.log('✅ TOKEN_ACQUIRED');
        console.log('ACCESS_TOKEN=' + response.data.access_token);
        console.log('SCOPES=' + response.data.scope);
    } catch (error) {
        console.error('❌ EXCHANGE_FAILED');
        if (error.response) {
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

exchange();
