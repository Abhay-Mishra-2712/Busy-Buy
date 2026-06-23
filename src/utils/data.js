const data = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 1099,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 300,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&q=80",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 1155,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 900,
    description:
      "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 6950,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1573408301185-9519f94816fe?w=300&q=80",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 7500,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 3999,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10999,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 999,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=300&q=80",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 699,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=300&q=80",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 5000,
    description:
      "3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=300&q=80",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 25000,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&q=80",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 19999,
    description:
      "21.5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor – Super Ultrawide Screen QLED",
    price: 70000,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=300&q=80",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 2599,
    description:
      "Note: The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 2599,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER).",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&q=80",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 3333,
    description:
      "Lightweight perfect for trip or casual wear. Long sleeve with hooded, adjustable drawstring waist design.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&q=80",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 799,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1485518882345-15568b007407?w=300&q=80",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 699,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&q=80",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 999,
    description:
      "95% Cotton, 5% Spandex, Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=300&q=80",
    rating: { rate: 3.6, count: 145 },
  },
];

export default data;
