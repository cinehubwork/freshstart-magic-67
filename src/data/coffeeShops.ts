
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
  facebook?: string;
  wifi?: boolean;
  menu?: {
    category: string;
    items: {
      name: string;
      price: string;
      description?: string;
    }[];
  }[];
}

// Sample coffee shop images for variety
const coffeeShopImages = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
];

// Cities for Vietnam
const vietnamCities = [
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Đà Lạt',
  'Huế',
  'Nha Trang',
  'Vũng Tàu',
  'Cần Thơ',
  'Phú Quốc',
  'Hội An'
];

// Street names for Vietnam
const vietnamStreets = [
  'Nguyễn Huệ',
  'Lê Lợi',
  'Trần Hưng Đạo',
  'Nguyễn Văn Hưởng',
  'Đồng Khởi',
  'Phạm Ngọc Thạch',
  'Lê Thánh Tôn',
  'Bùi Viện',
  'Hàm Nghi',
  'Nguyễn Trãi',
  'Lý Tự Trọng',
  'Ngô Đức Kế',
  'Thảo Điền',
  'Calmette',
  'Hoàng Diệu'
];

// Coffee shop name elements
const coffeeNamePrefixes = [
  'The', 'Café', 'Chuyện', 'Phê', 'Xin', 'La', 'Là', 'A.M', 'Uncommon', 'Morning',
  'Eco', 'Green', 'Saigon', 'Hanoi', 'Vintage', 'Urban', 'Traditional', 'Modern',
  'Specialty', 'Roastery', 'Brew', 'Bean', 'Drip', 'Pour', 'Filter', 'House of'
];

const coffeeNameSuffixes = [
  'Coffee', 'Bistro', 'Roasters', 'Café', 'House', 'Spot', 'Corner', 'Workshop',
  'Lab', 'Beans', 'Cup', 'Brew', 'Grind', 'Experience', 'Culture', 'Society',
  'Garden', 'Kitchen', 'Room', 'Studio', 'Bar', 'Place', 'Story', 'Project'
];

// Generate a random coffee shop name
const generateCoffeeShopName = () => {
  const usePrefix = Math.random() > 0.3;
  const prefix = usePrefix ? `${coffeeNamePrefixes[Math.floor(Math.random() * coffeeNamePrefixes.length)]} ` : '';
  const suffix = coffeeNameSuffixes[Math.floor(Math.random() * coffeeNameSuffixes.length)];
  return `${prefix}${suffix}`;
};

// Generate a random address
const generateAddress = () => {
  const number = Math.floor(Math.random() * 200) + 1;
  const street = vietnamStreets[Math.floor(Math.random() * vietnamStreets.length)];
  return `${number} ${street}`;
};

// Generate random hours
const generateHours = () => {
  const openingHour = Math.floor(Math.random() * 4) + 6; // 6-9 AM
  const closingHour = Math.floor(Math.random() * 6) + 19; // 7-11 PM
  return `${openingHour.toString().padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'} - ${closingHour.toString().padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`;
};

// Generate random rating
const generateRating = () => {
  return (Math.floor(Math.random() * 15) + 35) / 10; // 3.5 - 5.0
};

// Generate random styles
const generateStyles = () => {
  const allStyles = ['Rustic', 'Vintage', 'Minimal', 'Garden', 'Industrial', 'Modern', 'Contemporary', 'Casual', 'Specialty', 'Artisanal', 'Traditional', 'Cozy', 'Elegant', 'Chic', 'Retro'];
  const numStyles = Math.floor(Math.random() * 3) + 1; // 1-3 styles
  const styles = [];
  
  for (let i = 0; i < numStyles; i++) {
    const randomStyle = allStyles[Math.floor(Math.random() * allStyles.length)];
    if (!styles.includes(randomStyle)) {
      styles.push(randomStyle);
    }
  }
  
  return styles;
};

// Generate random phone number
const generatePhone = () => {
  const prefix = '+84';
  const number = Math.floor(Math.random() * 900000000) + 100000000;
  return `${prefix} ${number.toString().slice(0, 3)} ${number.toString().slice(3, 6)} ${number.toString().slice(6)}`;
};

// Generate random social media
const generateSocial = (name: string) => {
  const normalized = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
  return normalized + (Math.floor(Math.random() * 100) + 1).toString();
};

// Generate random menu
const generateMenu = () => {
  if (Math.random() > 0.7) return undefined; // 30% chance to have no menu
  
  const categories = ['Specialty Coffee', 'Classic Drinks', 'Food', 'Desserts', 'Snacks', 'Signature Drinks'];
  const selectedCategories = [];
  const numCategories = Math.floor(Math.random() * 3) + 1; // 1-3 categories
  
  for (let i = 0; i < numCategories; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    if (!selectedCategories.some(cat => cat.category === randomCategory)) {
      const numItems = Math.floor(Math.random() * 4) + 2; // 2-5 items
      const items = [];
      
      for (let j = 0; j < numItems; j++) {
        const drinks = [
          'Espresso', 'Cappuccino', 'Latte', 'Americano', 'Vietnamese Coffee', 'Egg Coffee',
          'Coconut Coffee', 'Mocha', 'Macchiato', 'Cold Brew', 'Filter Coffee', 'Flat White',
          'Iced Coffee', 'Tea', 'Matcha Latte', 'Hot Chocolate'
        ];

        const foods = [
          'Croissant', 'Sandwich', 'Pasta', 'Salad', 'Cake', 'Cookies', 'Muffin', 'Bagel',
          'Cheesecake', 'Brownie', 'Quiche', 'Toast', 'Pancakes', 'Waffles'
        ];
        
        let itemName = '';
        let itemDescription = '';
        
        if (randomCategory.includes('Coffee') || randomCategory.includes('Drinks')) {
          itemName = drinks[Math.floor(Math.random() * drinks.length)];
          if (Math.random() > 0.5) {
            const descriptions = [
              'Made with our house-roasted beans',
              'A smooth and creamy delight',
              'Rich and aromatic',
              'Our customers\' favorite',
              'Perfect for any time of day'
            ];
            itemDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
          }
        } else {
          itemName = foods[Math.floor(Math.random() * foods.length)];
          if (Math.random() > 0.5) {
            const descriptions = [
              'Freshly baked daily',
              'Made with local ingredients',
              'Homemade recipe',
              'Chef\'s special',
              'A perfect pairing with our coffee'
            ];
            itemDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
          }
        }
        
        const price = Math.floor(Math.random() * 70) + 30;
        items.push({ 
          name: itemName, 
          price: `${price},000₫`,
          description: itemDescription || undefined
        });
      }
      
      selectedCategories.push({
        category: randomCategory,
        items
      });
    }
  }
  
  return selectedCategories;
};

// Generate a base set of coffee shops
export const baseShops: CoffeeShop[] = [
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
    phone: '+84 377 044 202',
    facebook: 'amphincoffee',
    wifi: true,
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
    website: 'https://chuyencoffee.com',
    facebook: 'chuyencoffee',
    instagram: 'chuyen.coffee'
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
    website: 'https://workshop.coffee',
    facebook: 'theworkshopcoffee',
    instagram: 'theworkshopcoffee',
    wifi: true
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
    instagram: 'thecoffeehouse.vn',
    facebook: 'thecoffeehousevn',
    phone: '+84 28 7107 8079',
    wifi: true
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
    website: 'https://laviet.coffee',
    facebook: 'lavietcoffee',
    instagram: 'laviet.coffee',
    phone: '+84 263 3525 175'
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
    instagram: 'uncommon.coffee',
    facebook: 'uncommon.coffee.saigon',
    phone: '+84 28 3824 6823',
    wifi: true
  }
];

// Generate additional shops up to 100
const generateAdditionalShops = (count: number): CoffeeShop[] => {
  const additionalShops = [];
  
  for (let i = 0; i < count; i++) {
    const id = (baseShops.length + i + 1).toString();
    const name = generateCoffeeShopName();
    const imageIndex = Math.floor(Math.random() * coffeeShopImages.length);
    
    const shop: CoffeeShop = {
      id,
      name,
      image: coffeeShopImages[imageIndex],
      rating: generateRating(),
      address: generateAddress(),
      city: vietnamCities[Math.floor(Math.random() * vietnamCities.length)],
      hours: generateHours(),
      styles: generateStyles(),
      wifi: Math.random() > 0.5
    };
    
    // Add optional fields with some randomness
    if (Math.random() > 0.3) shop.phone = generatePhone();
    if (Math.random() > 0.5) shop.facebook = generateSocial(name);
    if (Math.random() > 0.6) shop.instagram = generateSocial(name);
    if (Math.random() > 0.7) shop.description = `${name} is a ${shop.styles.join(' and ')} coffee shop located in ${shop.city}. Known for their excellent coffee and atmosphere.`;
    if (Math.random() > 0.8) shop.website = `https://${generateSocial(name)}.com`;
    
    // Add menu for some shops
    shop.menu = generateMenu();
    
    additionalShops.push(shop);
  }
  
  return additionalShops;
};

// Combine the base shops with the additional shops to make 100 total
const additionalShops = generateAdditionalShops(94); // 6 base + 94 additional = 100 shops
export const coffeeShops: CoffeeShop[] = [...baseShops, ...additionalShops];

export const coffeeShopLocations = [
  { value: 'all', label: 'All Locations' },
  { value: 'hochiminhcity', label: 'Hồ Chí Minh' },
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'dalat', label: 'Đà Lạt' },
  { value: 'hue', label: 'Huế' },
  { value: 'nhatrang', label: 'Nha Trang' },
  { value: 'vungtau', label: 'Vũng Tàu' },
  { value: 'cantho', label: 'Cần Thơ' },
  { value: 'phuquoc', label: 'Phú Quốc' },
  { value: 'hoian', label: 'Hội An' },
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
  { value: 'artisanal', label: 'Artisanal' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'cozy', label: 'Cozy' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'chic', label: 'Chic' },
  { value: 'retro', label: 'Retro' },
];
