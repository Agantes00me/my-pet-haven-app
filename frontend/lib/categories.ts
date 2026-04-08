import { Map, Zap, Settings, Shield, Smile, Sparkles, LucideIcon } from 'lucide-react'

export interface Category {
  name: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accent: string;
  image: string;
}

export const categoriesData: Record<string, Category> = {
  'adventure': {
    name: 'Adventure & Travel',
    headline: 'Every Journey is Better Together',
    description: 'Whether it’s a weekend hike or a cross-country road trip, your pet deserves to explore the world in safety and style. We prioritize your pet\'s security so you can focus on making memories.',
    icon: Map,
    color: 'bg-orange-50 text-orange-600',
    accent: 'orange',
    image: '/images/categories/adventure.png'
  },
  'anxiety': {
    name: 'Anxiety & Comfort',
    headline: 'A Sanctuary of Calm for Your Best Friend',
    description: 'We know how heart-wrenching it is to see your pet stressed. Our Anxiety & Comfort collection is a promise of peace, from calming pheromones to orthopedic sanctuary beds.',
    icon: Shield,
    color: 'bg-blue-50 text-blue-600',
    accent: 'blue',
    image: '/images/categories/anxiety.png'
  },
  'eco-friendly': {
    name: 'Eco-Friendly & Sustainable',
    headline: 'Gentle on Paws, Kind to the Planet',
    description: 'Because you care about your pet’s future, we care about the planet they play on. earth-friendly materials like organic hemp and recycled ocean plastics.',
    icon: Sparkles,
    color: 'bg-emerald-50 text-emerald-600',
    accent: 'emerald',
    image: '/images/categories/eco.png'
  },
  'grooming': {
    name: 'Grooming & Wellness',
    headline: 'Nurturing Health from the Outside In',
    description: 'Nurturing health through spa-quality rituals at home. Hypoallergenic shampoos and restorative balms for a vibrant, happy pet.',
    icon: Smile,
    color: 'bg-purple-50 text-purple-600',
    accent: 'purple',
    image: '/images/categories/grooming.png'
  },
  'smart-tech': {
    name: 'Smart Pet Tech',
    headline: 'Stay Connected, Even When You’re Apart',
    description: 'Intuitive tools designed for peace of mind. From GPS trackers to smart feeders, the latest in pet safety and engagement.',
    icon: Zap,
    color: 'bg-cyan-50 text-cyan-600',
    accent: 'cyan',
    image: '/images/categories/tech.png'
  },
  'toys': {
    name: 'Toys',
    headline: 'Play with Purpose, Joy, and Safety',
    description: 'Toys are part of growth and joy. Indestructible chews and intricate puzzles to withstand the test of time and zoomies.',
    icon: Settings,
    color: 'bg-pink-50 text-pink-600',
    accent: 'pink',
    image: '/images/categories/toys.png'
  }
}
