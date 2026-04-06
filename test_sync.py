import os
from dotenv import load_dotenv
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInput as ContactInput
from hubspot.crm.deals import SimplePublicObjectInput as DealInput

# Load your new PAT token from .env
load_dotenv()
api_key = os.environ.get('HUBSPOT_ACCESS_TOKEN')
client = HubSpot(access_token=api_key)

def run_test_sync():
    print("🚀 Starting My Pet Haven Test Sync...")
    
    # Test Data
    email = "buddy.success.final@example.com"
    pet_name = "Buddy"
    category = "Grooming & Wellness"
    
    try:
        # 1. Sync Contact
        contact_props = {"email": email, "firstname": "Christiaan", "pet_name": pet_name}
        client.crm.contacts.basic_api.create(ContactInput(properties=contact_props))
        print("✅ Contact Created/Updated")

        # 2. Create Branded Deal
        deal_name = f"Order #1001 | {category} | {pet_name}"
        deal_props = {
            "dealname": deal_name, 
            "amount": "45.00", 
            "dealstage": "closedwon", 
            "pipeline": "default"
        }
        client.crm.deals.basic_api.create(DealInput(properties=deal_props))
        print(f"✅ Deal Created: {deal_name}")
        
        print("\n🎉 SUCCESS! Check your HubSpot Deals board now.")

    except Exception as e:
        print(f"❌ Sync failed: {e}")

if __name__ == "__main__":
    run_test_sync()
