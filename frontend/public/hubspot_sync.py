import os
import requests
from dotenv import load_dotenv
from supabase import create_client, Client

# --- 1. THE ZORIN OS VAULT PATHS ---
# Using absolute paths ensures the script works from any folder.
root_env = '/home/agante/Documents/Business/2026 Bus/Online Business/my-pet-haven-app/.env'
frontend_env = '/home/agante/Documents/Business/2026 Bus/Online Business/my-pet-haven-app/frontend/.env.local'

load_dotenv(frontend_env, override=True)
load_dotenv(root_env, override=True)

# --- 2. INITIALIZE SUPABASE ---
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") 

if not url or not key:
    print(f"❌ Error: Supabase credentials missing.")
    print(f"Checked: {frontend_env}")
    exit()

supabase_client: Client = create_client(url, key)

# --- 3. REFRESH HUBSPOT TOKEN (V3) ---
def get_fresh_token():
    token_url = "https://api.hubapi.com/oauth/v1/token"
    payload = {
        'grant_type': 'refresh_token',
        'client_id': os.getenv('HUBSPOT_CLIENT_ID'),
        'client_secret': os.getenv('HUBSPOT_CLIENT_SECRET'),
        'refresh_token': os.getenv('HUBSPOT_REFRESH_TOKEN')
    }
    r = requests.post(token_url, data=payload)
    return r.json().get('access_token')

# --- 4. RUN THE SYNC ---
access_token = get_fresh_token()

if access_token:
    print("✅ HubSpot Handshake Successful!")
    headers = {'Authorization': f'Bearer {access_token}'}
    # Fetching contacts
    res = requests.get("https://api.hubapi.com/crm/v3/objects/contacts", headers=headers)
    contacts = res.json().get('results', [])
    
    print(f"--- Syncing {len(contacts)} contacts to Supabase ---")
    for contact in contacts:
        payload = {
            "hubspot_id": contact['id'],
            "email": contact['properties'].get('email'),
            "firstname": contact['properties'].get('firstname'),
            "lastname": contact['properties'].get('lastname')
        }
        # Pushing to Supabase table named 'contacts'
        try:
            supabase_client.table("contacts").upsert(payload).execute()
            print(f"✅ Synced: {payload['email']}")
        except Exception as e:
            print(f"❌ Supabase Error: {e}")
else:
    print("❌ Failed to refresh HubSpot token. Check your .env.local file.")