export const sitePolicies = [
  {
    category: 'shipping',
    keywords: ['ship', 'delivery', 'tracking', 'arrive', 'cost', 'international'],
    summary: 'Orders are typically processed within 1-3 business days. Standard shipping takes 5-7 business days. We offer international shipping to select locations, though duties may apply. Tracking info is emailed once shipped.',
    link: '/policies/shipping-policy'
  },
  {
    category: 'refunds',
    keywords: ['return', 'refund', 'money back', '30 days', 'damaged', 'broken'],
    summary: 'We have a 30-day return policy. Instead of high-cost return shipping, we often prefer to offer refunds based on pictures/descriptions of the issue to save you time. Contact support with details to start the process.',
    link: '/policies/refund-policy'
  },
  {
    category: 'contact',
    keywords: ['contact', 'support', 'help', 'email', 'phone', 'talk'],
    summary: 'You can reach our support team through our contact page. We are happy to help with orders, product questions, or pet-specific recommendations!',
    link: '/contact'
  },
  {
    category: 'privacy',
    keywords: ['privacy', 'data', 'secure', 'personal information'],
    summary: 'Your privacy is paramount. We only collect the necessary information to process your orders and improve your shopping experience. Check our full privacy policy for details.',
    link: '/policies/privacy-policy'
  }
];

export function findPolicy(query: string) {
  const lowQuery = query.toLowerCase();
  return sitePolicies.find(policy => 
    policy.keywords.some(keyword => lowQuery.includes(keyword))
  );
}
