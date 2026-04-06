const axios = require('axios');

const shop = 'gcrvj7-ea.myshopify.com';
const client_id = '0ccaf38da15babc8587a221704f5b678';
const client_secret ='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';
const code = '7407d7b80b81dbe47ad85aeb20bcc484';

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
