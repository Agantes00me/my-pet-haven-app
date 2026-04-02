import { Map, Zap, Settings, Shield, Smile, Sparkles, LucideIcon } from 'lucide-react'

export interface Category {
  name: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accent: string;
}

export const categoriesData: Record<string, Category> = {
  'adventure': {
    name: 'Adventure & Travel',
    headline: 'Every Journey is Better Together',
    description: 'Whether it’s a weekend hike or a cross-country road trip, your pet deserves to explore the world in safety and style. At My Pet Haven, we understand that travel can be a leap of faith for both you and your companion. That’s why we curate only the most durable, crash-tested, and ergonomically designed travel gear. From secure vehicle restraints to breathable, comfort-first carriers, we prioritize your pet\'s security so you can focus on making memories. Adventure awaits—let’s get there safely.',
    icon: Map,
    color: 'bg-orange-50 text-orange-600',
    accent: 'orange'
  },
  'anxiety': {
    name: 'Anxiety & Comfort',
    headline: 'A Sanctuary of Calm for Your Best Friend',
    description: 'We know how heart-wrenching it is to see your pet stressed by storms, fireworks, or separation. Our Anxiety & Comfort collection is more than just products; it’s a promise of peace. We source scientifically backed solutions, including weighted blankets, calming pheromone diffusers, and ultra-plush orthopedic beds designed to mimic a mother’s warmth. Every item in this category is selected with a gentle touch to help your pet feel secure, loved, and at home, even when the world gets a little too loud.',
    icon: Shield,
    color: 'bg-blue-50 text-blue-600',
    accent: 'blue'
  },
  'eco-friendly': {
    name: 'Eco-Friendly & Sustainable',
    headline: 'Gentle on Paws, Kind to the Planet',
    description: 'Because you care about your pet’s future, we care about the planet they play on. Our Sustainable collection features products made from earth-friendly materials like organic hemp, recycled ocean plastics, and biodegradable bamboo. We vet our suppliers for ethical practices, ensuring that your choice doesn’t just benefit your pet today, but preserves the natural world they love to explore. Choose gear that reflects your values—quality that lasts without leaving a footprint.',
    icon: Sparkles,
    color: 'bg-emerald-50 text-emerald-600',
    accent: 'emerald'
  },
  'grooming': {
    name: 'Grooming & Wellness',
    headline: 'Nurturing Health from the Outside In',
    description: 'True wellness starts with a gentle touch and the right ingredients. Our Grooming & Wellness category is dedicated to the rituals of care that keep your pet vibrant and happy. We offer hypoallergenic shampoos, restorative skin balms, and dental care kits that turn "maintenance" into a bonding experience. Every formula is free from harsh chemicals, focusing on natural nourishment that respects your pet’s sensitive biology. Give them the spa-quality care they deserve, right in the comfort of your home.',
    icon: Smile,
    color: 'bg-purple-50 text-purple-600',
    accent: 'purple'
  },
  'smart-tech': {
    name: 'Smart Pet Tech',
    headline: 'Stay Connected, Even When You’re Apart',
    description: 'In a busy world, technology can be the bridge that keeps you close to your pet. Our Smart Pet Tech selection features intuitive tools designed to provide you with peace of mind. From GPS trackers that ensure they never wander too far to smart feeders and interactive cameras that let you check in from anywhere, we bring you the latest innovations in pet safety and engagement. It’s not just about gadgets; it’s about the reassurance that your pet is safe, fed, and happy—all at the touch of a button.',
    icon: Zap,
    color: 'bg-cyan-50 text-cyan-600',
    accent: 'cyan'
  },
  'toys': {
    name: 'Toys',
    headline: 'Play with Purpose, Joy, and Safety',
    description: 'Play is the language of love for pets, and we believe every toy should be an opportunity for growth and joy. Our Toys category focuses on mental stimulation and physical health, featuring everything from indestructible chew toys for the heavy hitters to intricate puzzles for the curious thinkers. We strictly avoid toxic dyes and fragile parts, ensuring that every play session is as safe as it is fun. Spark their imagination and strengthen your bond with toys built to withstand the test of time and "zoomies."',
    icon: Settings,
    color: 'bg-pink-50 text-pink-600',
    accent: 'pink'
  }
}
