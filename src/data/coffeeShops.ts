
export interface CoffeeShop {
  id: string;
  name: string;
  image: string;
  rating: number;
  address: string;
  city: string;
  hours: string;
  styles: string[];
  description?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  instagram?: string;
  menu?: {
    category: string;
    items: {
      name: string;
      price: string;
      description?: string;
    }[];
  }[];
}

export const coffeeShops: CoffeeShop[] = [
  {
    id: '1',
    name: 'A.M Phin & Pour',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    address: 'KDC, 04 D. số 53B, Khu Dân Cư',
    city: 'Hồ Chí Minh',
    hours: '07:30 - 21:00',
    styles: ['Rustic', 'Vintage'],
    description: 'A.M Phin & Pour offers a unique Vietnamese coffee experience with both traditional and modern brewing methods. The rustic, industrial design creates a peaceful atmosphere away from the busy city.',
    phone: '+84 90 123 4567',
    menu: [
      {
        category: 'Specialty Coffee',
        items: [
          { name: 'Vietnamese Egg Coffee', price: '65,000₫', description: 'Traditional egg-based coffee custard' },
          { name: 'Phin Filter Coffee', price: '45,000₫', description: 'Slow-dripped Vietnamese style coffee' },
          { name: 'Coconut Coffee', price: '70,000₫', description: 'Coffee blended with coconut cream' },
        ]
      },
      {
        category: 'Classic Drinks',
        items: [
          { name: 'Espresso', price: '40,000₫' },
          { name: 'Cappuccino', price: '55,000₫' },
          { name: 'Americano', price: '45,000₫' },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Chuyện Coffee',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    address: '189 Nguyễn Văn Hưởng, Thảo Điền',
    city: 'Hồ Chí Minh',
    hours: '08:00 - 22:00',
    styles: ['Minimal', 'Garden'],
    description: 'Chuyện Coffee offers a serene escape in a garden setting with minimalist design elements. The cafe specializes in carefully selected Vietnamese beans and creative brewing methods.',
    phone: '+84 28 3744 6845',
    website: 'https://chuyencoffee.com'
  },
  {
    id: '3',
    name: 'The Workshop Coffee',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    address: '27 Ngô Đức Kế, Bến Nghé',
    city: 'Quận 1, Hồ Chí Minh',
    hours: '08:00 - 22:30',
    styles: ['Industrial', 'Modern'],
    website: 'https://workshop.coffee'
  },
  {
    id: '4',
    name: 'The Coffee House',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    address: '86-88 Cao Thắng',
    city: 'Quận 3, Hồ Chí Minh',
    hours: '07:00 - 22:00',
    styles: ['Contemporary', 'Casual'],
    instagram: 'thecoffeehouse.vn'
  },
  {
    id: '5',
    name: 'Là Việt Coffee',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    address: '200 Nguyễn Công Trứ',
    city: 'Đà Lạt',
    hours: '07:30 - 21:30',
    styles: ['Modern', 'Roastery'],
    website: 'https://laviet.coffee'
  },
  {
    id: '6',
    name: 'The Uncommon',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    address: '1B-1C Phan Văn Đạt',
    city: 'Quận 1, Hồ Chí Minh',
    hours: '08:00 - 22:00',
    styles: ['Specialty', 'Artisanal'],
    instagram: 'uncommon.coffee'
  }
];

export const coffeeShopLocations = [
  { value: 'all', label: 'All Locations' },
  { value: 'quan1', label: 'Quận 1' },
  { value: 'quan3', label: 'Quận 3' },
  { value: 'thaodien', label: 'Thảo Điền' },
  { value: 'dalat', label: 'Đà Lạt' },
];

export const coffeeShopStyles = [
  { value: 'all', label: 'All Styles' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'garden', label: 'Garden' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'modern', label: 'Modern' },
  { value: 'specialty', label: 'Specialty' },
];
