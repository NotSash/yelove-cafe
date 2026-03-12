export type BrandTier = 'luxury' | 'premium' | 'mainstream' | 'budget' | 'hypebeast';

export interface BrandData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tier: BrandTier;
  vibe: string;
  priceMultiplier: number;
  taglineStyle: string;
  taglineTemplate: string;
  emoji: string;
}

export interface ProductData {
  name: string;
  basePrice: number;
  category:
    | 'food'
    | 'tech'
    | 'home'
    | 'personal'
    | 'outdoor'
    | 'toy'
    | 'kitchen'
    | 'office'
    | 'hygiene'
    | 'transport'
    | 'random';
  emoji: string;
}

const brandNames = [
  'Nike', 'Apple', 'Mercedes-Benz', 'Gucci', 'Tesla', 'IKEA', 'Supreme', 'Louis Vuitton', 'Google', 'Amazon',
  "McDonald's", 'Ferrari', 'Rolex', 'Samsung', 'Coca-Cola', 'Adidas', 'Prada', 'BMW', 'Chanel', 'Microsoft',
  'Netflix', 'Lamborghini', 'Versace', 'Sony', 'Starbucks', 'Disney', 'Porsche', 'Hermès', 'Balenciaga', 'Red Bull',
  'Lego', 'Dyson', 'Patagonia', 'SpaceX', 'Rolls Royce', 'Tiffany & Co', 'Cartier', 'Under Armour', 'Puma', 'The North Face',
  'Burberry', 'Dior', 'Off-White', 'Ray-Ban', 'GoPro', 'Bose', 'Bang & Olufsen', 'KitchenAid', 'Whole Foods', 'Walmart',
  'Zara', 'H&M', 'Uniqlo', "Levi's", 'Carhartt', 'Caterpillar', 'John Deere', 'DeWalt', 'Nintendo', 'PlayStation',
  'Razer', 'Marshall', 'Fender', 'Gibson', 'Harley-Davidson', 'Ducati', 'Honda', 'Toyota', 'Audi', 'Volvo',
  'Jeep', 'Land Rover', 'Bentley', 'Bugatti', 'Aston Martin', 'McLaren', 'Crocs', 'Birkenstock', 'Dr. Martens', 'Converse',
  'Vans', 'Lululemon', 'Yeti', 'Traeger', 'Weber', 'Peloton', 'Roomba', 'Balmain', 'Givenchy', 'Bottega Veneta',
  'Montblanc', 'Swarovski', 'Pandora', 'Victorinox', 'Leatherman', 'Oakley', 'Patek Philippe', 'Audemars Piguet', 'TAG Heuer', 'Omega'
] as const;

const productList: ProductData[] = [
  ['Cookie', 3, 'food', '🍪'], ['TV', 600, 'tech', '📺'], ['Mattress', 1200, 'home', '🛏️'], ['Toothbrush', 4, 'hygiene', '🪥'], ['Umbrella', 22, 'outdoor', '☂️'],
  ['Toilet', 280, 'home', '🚽'], ['Pillow', 40, 'home', '🛌'], ['Sandwich', 9, 'food', '🥪'], ['Bicycle', 450, 'transport', '🚲'], ['Backpack', 80, 'outdoor', '🎒'],
  ['Candle', 18, 'home', '🕯️'], ['Socks', 12, 'personal', '🧦'], ['Pencil', 1.5, 'office', '✏️'], ['Water Bottle', 20, 'outdoor', '🍼'], ['Lawn Mower', 350, 'outdoor', '🛞'],
  ['Toaster', 45, 'kitchen', '🍞'], ['Blender', 90, 'kitchen', '🥤'], ['Doorbell', 60, 'home', '🔔'], ['Trash Can', 35, 'home', '🗑️'], ['Flip Flops', 16, 'personal', '🩴'],
  ['Sunglasses', 55, 'personal', '🕶️'], ['Lunchbox', 18, 'random', '🥡'], ['Alarm Clock', 25, 'home', '⏰'], ['Bathrobe', 40, 'personal', '🥋'], ['Hammock', 65, 'outdoor', '🪢'],
  ['Skateboard', 70, 'transport', '🛹'], ['Kite', 15, 'toy', '🪁'], ['Flashlight', 18, 'outdoor', '🔦'], ['Tent', 140, 'outdoor', '⛺'], ['Sleeping Bag', 95, 'outdoor', '🛌'],
  ['BBQ Grill', 320, 'kitchen', '🍖'], ['Waffle Iron', 50, 'kitchen', '🧇'], ['Coffee Mug', 12, 'kitchen', '☕'], ['Ice Cream', 6, 'food', '🍦'], ['Pizza', 18, 'food', '🍕'],
  ['Burrito', 10, 'food', '🌯'], ['Donut', 3, 'food', '🍩'], ['Cereal', 5, 'food', '🥣'], ['Popcorn', 4, 'food', '🍿'], ['Gummy Bears', 3, 'food', '🧸'],
  ['Chocolate Bar', 3.5, 'food', '🍫'], ['Cupcake', 4, 'food', '🧁'], ['Pancake', 8, 'food', '🥞'], ['Hot Dog', 5, 'food', '🌭'], ['Taco', 4, 'food', '🌮'],
  ['Sushi', 16, 'food', '🍣'], ['Ramen', 14, 'food', '🍜'], ['Bagel', 3, 'food', '🥯'], ['Pretzel', 4, 'food', '🥨'], ['Nachos', 9, 'food', '🧀'],
  ['Toilet Paper', 1, 'hygiene', '🧻'], ['Soap', 3, 'hygiene', '🧼'], ['Shampoo', 8, 'hygiene', '🧴'], ['Deodorant', 7, 'hygiene', '🧴'], ['Perfume', 70, 'personal', '🌸'],
  ['Hair Dryer', 45, 'personal', '💨'], ['Towel', 20, 'home', '🧺'], ['Sponge', 2, 'home', '🧽'], ['Mop', 18, 'home', '🧹'], ['Vacuum', 150, 'home', '🌀'],
  ['Lamp', 40, 'home', '💡'], ['Rug', 120, 'home', '🧶'], ['Vase', 30, 'home', '🏺'], ['Notebook', 6, 'office', '📓'], ['Scissors', 7, 'office', '✂️'],
  ['Calculator', 14, 'office', '🧮'], ['Teddy Bear', 25, 'toy', '🧸'], ['Drone', 300, 'tech', '🚁'], ['Scooter', 260, 'transport', '🛴'], ['Roller Skates', 70, 'transport', '🛼'],
  ['Trampoline', 280, 'outdoor', '🤸'], ['Pool Float', 20, 'outdoor', '🦩'], ['Surfboard', 400, 'outdoor', '🏄'], ['Kayak', 550, 'outdoor', '🛶'], ['Binoculars', 80, 'outdoor', '🔭'],
  ['Walkie Talkie', 45, 'tech', '📻'], ['Microphone', 120, 'tech', '🎤'], ['Headphones', 90, 'tech', '🎧'], ['Keyboard', 70, 'tech', '⌨️'], ['Printer', 180, 'office', '🖨️'],
  ['Power Bank', 35, 'tech', '🔋'], ['Light Bulb', 5, 'home', '💡'], ['Doorknob', 12, 'home', '🚪'], ['Mailbox', 60, 'home', '📬'], ['Doormat', 20, 'home', '🚪'],
  ['Garden Hose', 30, 'outdoor', '🪴'], ['Shovel', 28, 'outdoor', '🪏'], ['Wheelbarrow', 95, 'outdoor', '🛒'], ['Frying Pan', 30, 'kitchen', '🍳'], ['Knife', 25, 'kitchen', '🔪'],
  ['Cutting Board', 18, 'kitchen', '🪵'], ['Spatula', 8, 'kitchen', '🥄'], ['Oven Mitt', 10, 'kitchen', '🧤'], ['Apron', 18, 'kitchen', '👩‍🍳'], ['Comb', 5, 'personal', '💇'],
  ['Mirror', 22, 'personal', '🪞'], ['Band-Aid', 0.5, 'hygiene', '🩹'], ['Baby Stroller', 220, 'transport', '👶'], ['Pacifier', 4, 'personal', '🍼'], ['Diaper', 1.2, 'hygiene', '👶'],
  ['Rattle', 7, 'toy', '🪇'], ['Puzzle', 15, 'toy', '🧩'], ['Board Game', 35, 'toy', '🎲'], ['Playing Cards', 6, 'toy', '🃏'], ['Snow Globe', 18, 'random', '❄️'],
  ['Rubber Duck', 5, 'toy', '🦆'], ['Yo-Yo', 8, 'toy', '🪀'], ['Frisbee', 10, 'toy', '🥏'], ['Boomerang', 14, 'toy', '🪃'], ['Pogo Stick', 60, 'toy', '🦘'],
  ['Bubble Wand', 4, 'toy', '🫧'], ['Piñata', 28, 'toy', '🪅'], ['Chopsticks', 3, 'kitchen', '🥢'], ['Straw', 0.3, 'random', '🥤'], ['Napkin', 0.2, 'random', '🧻'],
  ['Coaster', 2, 'home', '🟤'], ['Plunger', 12, 'home', '🪠'], ['Flyswatter', 5, 'home', '🪰'], ['Dustpan', 9, 'home', '🧹'], ['Clothespin', 0.4, 'home', '🧷'],
  ['Ironing Board', 45, 'home', '🧺'], ['Step Ladder', 80, 'home', '🪜'], ['Wheelie Bin', 75, 'home', '🗑️'], ['Traffic Cone', 22, 'random', '🚧'], ['Fire Extinguisher', 35, 'home', '🧯']
].map(([name, basePrice, category, emoji]) => ({ name, basePrice, category, emoji })) as ProductData[];

const overrides: Partial<Record<(typeof brandNames)[number], Partial<BrandData>>> = {
  Nike: { primaryColor: '#111111', secondaryColor: '#f5f5f5', tier: 'premium', priceMultiplier: 4.5, taglineStyle: 'motivational imperative', taglineTemplate: 'Just {product} It.', emoji: '👟' },
  Apple: { primaryColor: '#a3aaae', secondaryColor: '#111827', tier: 'premium', priceMultiplier: 8, taglineStyle: 'two-word poetic', taglineTemplate: 'Think Different. {product} Different.', emoji: '🍎' },
  'Mercedes-Benz': { primaryColor: '#c0c0c0', secondaryColor: '#111111', tier: 'luxury', priceMultiplier: 14, taglineStyle: 'authoritative prestige', taglineTemplate: 'The Best or Nothing. Even for {product}.', emoji: '🚘' },
  Gucci: { primaryColor: '#1b5e20', secondaryColor: '#8d6e63', tier: 'luxury', priceMultiplier: 50, taglineStyle: 'opulent couture', taglineTemplate: 'Luxury never tasted so {product}.', emoji: '👜' },
  Tesla: { primaryColor: '#cc0000', secondaryColor: '#202124', tier: 'premium', priceMultiplier: 12, taglineStyle: 'future-forward manifesto', taglineTemplate: 'Accelerating the world\'s transition to sustainable {product}.', emoji: '⚡' },
  IKEA: { primaryColor: '#0058a3', secondaryColor: '#fbd914', tier: 'mainstream', priceMultiplier: 1.2, taglineStyle: 'quirky Swedish', taglineTemplate: 'Hej! Some assembly required for your {product}.', emoji: '🪑' },
  Supreme: { primaryColor: '#ff0000', secondaryColor: '#ffffff', tier: 'hypebeast', priceMultiplier: 18, taglineStyle: 'drop culture flex', taglineTemplate: '{product}, but make it limited.', emoji: '🟥' },
  Walmart: { primaryColor: '#0071ce', secondaryColor: '#ffc220', tier: 'budget', priceMultiplier: 0.3, taglineStyle: 'value slogan', taglineTemplate: 'Save money. Live better. {product} harder.', emoji: '🛒' },
  Rolex: { primaryColor: '#006039', secondaryColor: '#d4af37', tier: 'luxury', priceMultiplier: 120, taglineStyle: 'timeless heritage', taglineTemplate: 'A {product} for generations to come.', emoji: '⌚' }
};

const defaultByTier: Record<BrandTier, Omit<BrandData, 'name'>> = {
  luxury: { primaryColor: '#b58b2a', secondaryColor: '#1f1b16', tier: 'luxury', vibe: 'Ultra-crafted and elite', priceMultiplier: 25, taglineStyle: 'elevated prestige', taglineTemplate: '{product}, perfected beyond reason.', emoji: '💎' },
  premium: { primaryColor: '#1e88e5', secondaryColor: '#0d1117', tier: 'premium', vibe: 'Performance-first and polished', priceMultiplier: 6, taglineStyle: 'innovative confidence', taglineTemplate: 'Next-level {product}, unlocked.', emoji: '🚀' },
  mainstream: { primaryColor: '#00acc1', secondaryColor: '#263238', tier: 'mainstream', vibe: 'Friendly, dependable, familiar', priceMultiplier: 2, taglineStyle: 'relatable upbeat', taglineTemplate: 'Made for everyday {product} moments.', emoji: '✨' },
  budget: { primaryColor: '#43a047', secondaryColor: '#1b5e20', tier: 'budget', vibe: 'Practical and wallet-happy', priceMultiplier: 0.8, taglineStyle: 'straight value', taglineTemplate: 'Big value. Tiny price. Serious {product}.', emoji: '🏷️' },
  hypebeast: { primaryColor: '#ff2d7b', secondaryColor: '#111111', tier: 'hypebeast', vibe: 'Streetwear energy and scarcity', priceMultiplier: 16, taglineStyle: 'internet-breaking hype', taglineTemplate: 'The {product} drop your timeline can\'t handle.', emoji: '🔥' }
};

const tierHints: Record<string, BrandTier> = {
  Gucci: 'luxury', 'Louis Vuitton': 'luxury', Ferrari: 'luxury', Rolex: 'luxury', Prada: 'luxury', Chanel: 'luxury', Lamborghini: 'luxury', Versace: 'luxury', Porsche: 'luxury', 'Hermès': 'luxury', Balenciaga: 'luxury', 'Rolls Royce': 'luxury', 'Tiffany & Co': 'luxury', Cartier: 'luxury', Burberry: 'luxury', Dior: 'luxury', Balmain: 'luxury', Givenchy: 'luxury', 'Bottega Veneta': 'luxury', Montblanc: 'luxury', Swarovski: 'luxury', 'Patek Philippe': 'luxury', 'Audemars Piguet': 'luxury', Omega: 'luxury', Bentley: 'luxury', Bugatti: 'luxury', 'Aston Martin': 'luxury', McLaren: 'luxury', TAG: 'luxury',
  Supreme: 'hypebeast', 'Off-White': 'hypebeast',
  Walmart: 'budget', H&M: 'budget', Zara: 'budget', Uniqlo: 'budget', Crocs: 'budget', Caterpillar: 'budget', 'John Deere': 'budget',
  Nike: 'premium', Apple: 'premium', Tesla: 'premium', Dyson: 'premium', SpaceX: 'premium', Sony: 'premium', Bose: 'premium', 'Bang & Olufsen': 'premium', Nintendo: 'premium', PlayStation: 'premium', Razer: 'premium',
};

const colorHints: Record<string, [string, string]> = {
  Google: ['#4285f4', '#34a853'], Amazon: ['#ff9900', '#131921'], Microsoft: ['#00a4ef', '#7fba00'], Netflix: ['#e50914', '#141414'], Coca-Cola: ['#f40009', '#ffffff'], Adidas: ['#000000', '#ffffff'], BMW: ['#0066b1', '#ffffff'], Samsung: ['#1428a0', '#ffffff'], Starbucks: ['#006241', '#ffffff'], Disney: ['#113ccf', '#ffffff'], Lego: ['#d50000', '#ffde00'], Patagonia: ['#1a4d8f', '#f7b733'], Red Bull: ['#1a237e', '#d32f2f'], Nintendo: ['#e60012', '#ffffff'], PlayStation: ['#003791', '#00a4ef'], Audi: ['#000000', '#bbbec5'], Toyota: ['#eb0a1e', '#000000'], Honda: ['#cc0000', '#111111'], Volvo: ['#003057', '#6f7271'], Jeep: ['#4f5320', '#111111'], 'Land Rover': ['#005a2b', '#c9c9c9'], Puma: ['#d5001c', '#111111']
};

const emojiHints: Record<string, string> = {
  Ferrari: '🏎️', Lamborghini: '🏁', Porsche: '🚗', Google: '🔎', Amazon: '📦', Supreme: '🧢', Disney: '🏰', Starbucks: '☕', Coca-Cola: '🥤', SpaceX: '🛰️', Rolex: '⌚', Dyson: '🌀', KitchenAid: '🍳', Walmart: '🛍️', Nintendo: '🎮', PlayStation: '🎮', Fender: '🎸', Gibson: '🎸', Ducati: '🏍️', Harley-Davidson: '🏍️', Bentley: '🚘'
};

export const BRANDS: BrandData[] = brandNames.map((name) => {
  const hint = Object.entries(tierHints).find(([k]) => name.includes(k))?.[1] ?? 'mainstream';
  const base = defaultByTier[hint];
  const colors = colorHints[name] ?? [base.primaryColor, base.secondaryColor];
  const specific = overrides[name];
  return {
    name,
    primaryColor: specific?.primaryColor ?? colors[0],
    secondaryColor: specific?.secondaryColor ?? colors[1],
    tier: specific?.tier ?? hint,
    vibe: specific?.vibe ?? base.vibe,
    priceMultiplier: specific?.priceMultiplier ?? base.priceMultiplier,
    taglineStyle: specific?.taglineStyle ?? base.taglineStyle,
    taglineTemplate: specific?.taglineTemplate ?? `${name}: ${base.taglineTemplate}`,
    emoji: specific?.emoji ?? emojiHints[name] ?? base.emoji
  };
});

export const PRODUCTS = productList;
