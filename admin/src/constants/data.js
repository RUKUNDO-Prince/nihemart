import {
  usa,
  spain,
  france,
  rwanda,
  korea,
  apple,
  nike,
  iphone,
  shoes,
  computer,
  headphones,
  camera,
  phone,
  airpods,
  material,
  bag,
  caseB,
  computer2,
  coat,
  gamepad,
  kit,
  phone2,
  woman,
  perfume,
  ps,
  speakers,
  main,
  other1,
  other2,
  other3,
  other4,
  team1,
  team2,
  team3,
  team4,
  likes1,
  likes2,
  likes3,
  likes4,
} from "../assets";

export const categories = [
  {
    category: "IMIRINGA",
    subcategories: [
      "irikumwe nibindi (set)",
      "udukomo",
      "amaherena",
      "amashaneti",
      "kumaguru",
      "munda",
      "iyo kwizuru",
    ],
  },
  {
    category: "AMASAHA",
    subcategories: [
      "smart watch",
      "ayimibare",
      "ayurushinge",
      "arikumwe nibindi (set)",
    ],
  },
  {
    category: "ABANA",
    subcategories: ["ibikinisho", "ibipupe", "ibifasha kwiga", "ibindi"],
  },
  {
    category: "IBIKORESHO BYOMURUGO",
    subcategories: [
      "mugikoni",
      "muri saloon",
      "mucyumba",
      "mubwogero",
      "ibyisuku",
      "imitako",
      "ibindi",
    ],
  },
  {
    category: "IBIKORESHO BYA SPORT",
    subcategories: [],
  },
  {
    category: "IBIKORESHO BY’IBINYABIZIGA",
    subcategories: ["ibyamoto", "iby’imodoka", "iby’igare"],
  },
  {
    category: "IBIKAPU",
    subcategories: ["ibyabagabo", "ibyabagore", "ibindi"],
  },
  {
    category: "UBWIZA",
    subcategories: [],
  },
  {
    category: "IMISATSI",
    subcategories: ["imiti y’umusatsi", "ibikoresho by’umusatsi"],
  },
  {
    category: "IKORANA BUHANGA",
    subcategories: [
      "phones & accessories",
      "computer & accessories",
      "electronic devices & accessories",
      "office",
    ],
  },
  {
    category: "UBUZIMA",
    subcategories: ["kubyubuha & kunanuka", "uruhu", "amaso", "ibindi"],
  },
  {
    category: "IBINDI",
    subcategories: [],
  },
];

export const languages = [
  {
    name: "En - US",
    icon: usa,
  },
  {
    name: "Sp",
    icon: spain,
  },
  {
    name: "Fr",
    icon: france,
  },
  {
    name: "Ki",
    icon: rwanda,
  },
  {
    name: "Ko",
    icon: korea,
  },
];

export const footerEndData = [
  "Privacy Policy",
  "Terms and Conditions",
  "User Agreement",
  "License",
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Contact",
        link: "/contact",
      },
      {
        text: "Help",
        link: "/help",
      },
    ],
  },
];

export const footerActions = [
  {
    title: "Quick Actions",
    links: [
      {
        text: "Likes",
        link: "/likes",
      },
      {
        text: "Cart",
        link: "/cart",
      },
      {
        text: "Order",
        link: "/order",
      },
    ],
  },
];

export const homeSlider = [
  {
    icon: apple,
    name: "iPhone 14 series",
    heading: "Up to 10% off voucher",
    image: iphone,
  },
  {
    icon: apple,
    name: "iPhone 14 series test1",
    heading: "Up to 10% off voucher",
    image: iphone,
  },
  {
    icon: apple,
    name: "iPhone 14 series test2",
    heading: "Up to 10% off voucher",
    image: iphone,
  },
  {
    icon: apple,
    name: "iPhone 14 series test3",
    heading: "Up to 10% off voucher",
    image: iphone,
  },
];

export const categoriesList = [
  {
    icon: headphones,
    name: "Headphones",
  },
  {
    icon: phone,
    name: "Smartphone",
  },
  {
    icon: camera,
    name: "Camera",
  },
  {
    icon: computer,
    name: "Computers",
  },
  {
    icon: airpods,
    name: "Air-pods",
  },
  {
    icon: material,
    name: "Home materials",
  },
];

export const productsList = [
  {
    id: 1,
    img: coat,
    name: "The north coat",
    price: 3600,
    updatedPrice: 2600,
    starCount: 5,
    reviewCount: 65,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 2,
    img: bag,
    name: "Women bags",
    price: 8389,
    updatedPrice: 3292,
    starCount: 4,
    reviewCount: 89,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 3,
    img: kit,
    name: "Sports wear",
    price: 4985,
    updatedPrice: 2234,
    starCount: 5,
    reviewCount: 49,
    category: "Sports",
    isNew: false,
  },
  {
    id: 4,
    img: coat,
    name: "The north coat",
    price: 3984,
    updatedPrice: 2294,
    starCount: 5,
    reviewCount: 84,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 5,
    img: phone2,
    name: "iPhone",
    price: 8939,
    updatedPrice: 3323,
    starCount: 4.3,
    reviewCount: 44,
    category: "Smartphones",
    isNew: true,
  },
  {
    id: 6,
    img: computer2,
    name: "Lenovo Thinkbook",
    price: 9499,
    updatedPrice: 3388,
    starCount: 2.5,
    reviewCount: 848,
    category: "Computers",
  },
  {
    id: 7,
    img: caseB,
    name: "Multi-case",
    price: 1122,
    updatedPrice: 3939,
    starCount: 1.7,
    reviewCount: 33,
    category: "Materials",
  },
  {
    id: 8,
    img: gamepad,
    name: "Gamepad",
    price: 8485,
    updatedPrice: 4744,
    starCount: 3,
    reviewCount: 854,
    category: "Gaming",
  },
  {
    id: 9,
    img: coat,
    name: "The north coat",
    price: 3600,
    updatedPrice: 2600,
    starCount: 5,
    reviewCount: 65,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 10,
    img: bag,
    name: "Women bags",
    price: 8389,
    updatedPrice: 3292,
    starCount: 4,
    reviewCount: 89,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 11,
    img: kit,
    name: "Sports wear",
    price: 4985,
    updatedPrice: 2234,
    starCount: 5,
    reviewCount: 49,
    category: "Sports",
    isNew: false,
  },
  {
    id: 12,
    img: coat,
    name: "The north coat",
    price: 3984,
    updatedPrice: 2294,
    starCount: 5,
    reviewCount: 84,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 13,
    img: phone2,
    name: "iPhone",
    price: 8939,
    updatedPrice: 3323,
    starCount: 4.3,
    reviewCount: 44,
    category: "Smartphones",
    isNew: true,
  },
  {
    id: 14,
    img: computer2,
    name: "Lenovo Thinkbook",
    price: 9499,
    updatedPrice: 3388,
    starCount: 2.5,
    reviewCount: 848,
    category: "Computers",
  },
  {
    id: 15,
    img: caseB,
    name: "Multi-case",
    price: 1122,
    updatedPrice: 3939,
    starCount: 1.7,
    reviewCount: 33,
    category: "Materials",
  },
  {
    id: 16,
    img: gamepad,
    name: "Gamepad",
    price: 8485,
    updatedPrice: 4744,
    starCount: 3,
    reviewCount: 854,
    category: "Gaming",
  },
  {
    id: 17,
    img: coat,
    name: "The north coat",
    price: 3600,
    updatedPrice: 2600,
    starCount: 5,
    reviewCount: 65,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 18,
    img: bag,
    name: "Women bags",
    price: 8389,
    updatedPrice: 3292,
    starCount: 4,
    reviewCount: 89,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 19,
    img: kit,
    name: "Sports wear",
    price: 4985,
    updatedPrice: 2234,
    starCount: 5,
    reviewCount: 49,
    category: "Sports",
    isNew: false,
  },
  {
    id: 20,
    img: coat,
    name: "The north coat",
    price: 3984,
    updatedPrice: 2294,
    starCount: 5,
    reviewCount: 84,
    category: "Fashion",
    isNew: false,
  },
  {
    id: 21,
    img: phone2,
    name: "iPhone",
    price: 8939,
    updatedPrice: 3323,
    starCount: 4.3,
    reviewCount: 44,
    category: "Smartphones",
    isNew: true,
  },
  {
    id: 22,
    img: computer2,
    name: "Lenovo Thinkbook",
    price: 9499,
    updatedPrice: 3388,
    starCount: 2.5,
    reviewCount: 848,
    category: "Computers",
  },
  {
    id: 23,
    img: caseB,
    name: "Multi-case",
    price: 1122,
    updatedPrice: 3939,
    starCount: 1.7,
    reviewCount: 33,
    category: "Materials",
  },
  {
    id: 24,
    img: gamepad,
    name: "Gamepad",
    price: 8485,
    updatedPrice: 4744,
    starCount: 3,
    reviewCount: 854,
    category: "Gaming",
  },
];

export const singleProduct = [
  {
    id: 100,
    name: "Havic HV G-92 Gamepad",
    desc: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    img: main,
    imgs: [other1, other2, other3, other4],
    price: 1122344,
    updatedPrice: 84849495,
    starCount: 4.5,
    reviewCount: 8485,
    isAvailable: true,
    category: "Gaming",
  },
];

export const arrivals = [
  {
    img: ps,
    name: "PlayStation 5",
    text: "Black and White version of the PS5 coming out on sale.",
  },
  {
    img: woman,
    name: "Women’s Collections",
    text: "Featured woman collections that give you another vibe.",
  },
  {
    img: speakers,
    name: "Speakers",
    text: "Amazon wireless speakers",
  },
  {
    img: perfume,
    name: "Perfume",
    text: "GUCCI INTENSE OUD EDP",
  },
];

export const team = [
  {
    img: team1,
    name: "RUKUNDO David",
    position: "Co-Founder&CEO",
  },
  {
    img: team2,
    name: "UWINEZA Linda",
    position: "Co-Founder&COO",
  },
  {
    img: team3,
    name: "KEZA Ange",
    position: "Product Designer",
  },
  {
    img: team4,
    name: "BAHATI Paul",
    position: "Manager",
  },
];

export const faqs = [
  {
    question: "What is Nihe Mart ?",
    answer:
      "a software that enables the commercial process of buying and selling over the internet,a software that enables the commercial process of buying and selling over the internet",
  },
  {
    question: "What can Nihe Mart help you with ? ",
    answer:
      "a software that enables the commercial process of buying and selling over the internet,a software that enables the commercial process of buying and selling over the internet",
  },
  {
    question: "How can i shop from Nihe Mart ?",
    answer:
      "a software that enables the commercial process of buying and selling over the internet,a software that enables the commercial process of buying and selling over the internet",
  },
  {
    question: "How many products sold on Nihe Mart ?",
    answer:
      "a software that enables the commercial process of buying and selling over the internet,a software that enables the commercial process of buying and selling over the internet",
  },
  {
    question: "Can you make money on Nihe Mart ?",
    answer:
      "a software that enables the commercial process of buying and selling over the internet,a software that enables the commercial process of buying and selling over the internet",
  },
];

export const helpData = [
  {
    title: "Product help",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Order status",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Delivery",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Return",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Product help",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Order status",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Delivery",
    desc: "if you have any problem with our product like an expired or not working product",
  },
  {
    title: "Return",
    desc: "if you have any problem with our product like an expired or not working product",
  },
];

export const likesData = [
  {
    img: likes1,
    name: "Car",
    price: 84845,
    updatedPrice: 8485883,
  },
  {
    img: likes2,
    name: "Camera",
    price: 9844,
    updatedPrice: 98475,
  },
  {
    img: likes3,
    name: "Sports Boots",
    price: 8943,
    updatedPrice: 88432,
  },
  {
    img: likes4,
    name: "PlayStation",
    price: 2944,
    updatedPrice: 88445,
  },
];

export const ordersList = [
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "canceled",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "completed",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "canceled",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "completed",
  },
  {
    id: 1,
    name: "Kagabo",
    phone: 2785363746,
    price: 20000,
    date: "5 Jun 2024",
    status: "waiting",
  },
];

export const notificationsData = [
  {
    img: likes1,
    name: "Car",
    action: "New product added",
    price: 7374754,
  },
  {
    img: likes1,
    name: "Car",
    action: "Product updated",
    price: 7374754,
  },
  {
    img: likes1,
    name: "Car",
    action: "Product deleted",
    price: 7374754,
  },
  {
    img: likes1,
    name: "Car",
    action: "New product added",
    price: 7374754,
  },
  {
    img: likes1,
    name: "Car",
    action: "New product added",
    price: 7374754,
  },
];
