// Blog list aur blog detail dono yahin se data lete hain.
// Asli image: public/ me file rakho, path "/blog1.jpg" (extension file jaisa hi).

const DEFAULT_CONTENT = [
  {
    heading: "Discovering Ayurveda",
    paragraphs: [
      "Ayurveda is a traditional system of wellness originating in India. It emphasizes a holistic approach to everyday life, including routines, food habits, rest, movement, and awareness of individual needs.",
      "In a busy modern lifestyle, learning about these traditional principles can encourage more thoughtful daily habits. Ayurveda can be explored as part of a balanced lifestyle while recognizing that individual health needs differ.",
    ],
  },
  {
    heading: "What Is Ayurveda?",
    paragraphs: [
      "Ayurveda focuses on the relationship between daily habits, the environment, and overall well-being. Traditional Ayurvedic teachings often discuss balance, consistency, and understanding individual differences.",
    ],
    listIntro: "Some commonly discussed areas include:",
    list: [
      "Daily routines: Maintaining consistent sleep and waking times.",
      "Mindful eating: Paying attention to food choices and eating habits.",
      "Rest and relaxation: Making time for adequate rest and stress management.",
      "Movement: Including suitable physical activity in everyday life.",
      "Traditional herbs: Learning about their history, uses, ingredients, and precautions",
    ],
  },
  {
    heading: "Understanding Ayurvedic Herbs and Products",
    paragraphs: [
      "Many Ayurvedic traditions include herbs and botanical ingredients. However, natural origin alone does not guarantee that a product is safe or suitable for everyone.",
    ],
    listIntro: "Before using an Ayurvedic product, take time to:",
    list: [
      "Read the complete ingredient list.",
      "Follow the manufacturer’s directions and warnings.",
      "Check for possible allergies and interactions with medicines.",
      "Consult a qualified healthcare professional when you have a health condition or questions about suitability.",
    ],
  },
  {
    heading: "Ayurveda and Modern Healthcare",
    paragraphs: [
      "Traditional wellness practices and modern healthcare serve different roles. Ayurvedic products should not be assumed to prevent or cure medical conditions without reliable evidence. Do not delay appropriate medical assessment or prescribed treatment in favor of a wellness product.",
    ],
  },
  {
    heading: "Final Thoughts",
    paragraphs: [
      "A mindful wellness routine can begin with small, sustainable habits: regular rest, balanced meals, suitable movement, and time to unwind. Learning about Ayurveda can be one way to explore traditional perspectives while making informed choices that suit your individual needs.",
    ],
  },
];

const RAW_POSTS = [
  { id: 1, slug: "understanding-ayurveda-everyday-wellness-routine", category: "Herbal Ingredients", title: "Understanding Ayurveda in Your Everyday Wellness Routine", excerpt: "Discover the principles of Ayurveda and learn how traditional wellness practices can complement a balanced, mindful lifestyle.", image: "/blog1.jpg" },
  { id: 2, slug: "ayurvedic-rituals-grounded-morning", category: "Ayurvedic Wellness", title: "5 Ayurvedic rituals for a more grounded morning", excerpt: "Start your day with simple Ayurvedic-inspired rituals that encourage calm, mindful living and a more balanced morning routine.", image: "/blog2.jpg" },
  { id: 3, slug: "herbal-wisdom-restful-sleep", category: "Product Education", title: "Herbal wisdom for deeper, more restful sleep", excerpt: "Explore traditional herbal wisdom and simple Ayurvedic-inspired evening practices that can help create a calm, soothing routine for more restful nights.", image: "/blog3.jpg" },
  { id: 4, slug: "consistent-hair-care-routine", category: "Herbal Ingredients", title: "Building a Consistent Hair Care Routine", excerpt: "Explore gentle hair care habits, scalp care basics, and when to seek professional advice.", image: "/blog4.jpg" },
  { id: 5, slug: "beginners-guide-ayurvedic-herbs", category: "Ayurvedic Wellness", title: "A Beginner’s Guide to Common Ayurvedic Herbs", excerpt: "Get familiar with traditional herbs and learn why checking ingredient information matters.", image: "/blog5.jpg" },
  { id: 6, slug: "small-habits-mindful-day", category: "Daily Self-Care", title: "Small Habits for a More Mindful Day", excerpt: "Discover practical ways to make time for rest, hydration, and everyday self-care.", image: "/blog6.jpg" },
  { id: 7, slug: "how-to-read-ayurvedic-product-label", category: "Product Education", title: "How to Read an Ayurvedic Product Label", excerpt: "Learn what to look for in ingredient lists, usage directions, warnings, and expiry information.", image: "/blog7.jpg" },
  { id: 8, slug: "understanding-agni-inner-digestive-fire", category: "Daily Self-Care", title: "Understanding agni: your inner digestive fire", excerpt: "Discover the Ayurvedic concept of Agni, or inner digestive fire, and learn how mindful eating, daily routines, and balanced habits are traditionally connected to digestive wellbeing.", image: "/blog8.jpg" },
  { id: 9, slug: "ayurvedic-diet-basics", category: "Ayurvedic Wellness", title: "Ayurvedic Diet Basics for Everyday Eating", excerpt: "Learn how traditional Ayurvedic principles approach mindful, seasonal and balanced eating.", image: "/blog1.jpg" },
  { id: 10, slug: "evening-self-care-routine", category: "Daily Self-Care", title: "A Calm Evening Self-Care Routine", excerpt: "Simple evening habits that help you wind down and prepare for a restful night.", image: "/blog2.jpg" },
  { id: 11, slug: "what-is-shatavari", category: "Herbal Ingredients", title: "What Is Shatavari? A Traditional Herb Explained", excerpt: "Know more about Shatavari and how it is traditionally used in Ayurvedic wellness.", image: "/blog3.jpg" },
  { id: 12, slug: "choosing-ayurvedic-products", category: "Product Education", title: "Choosing Ayurvedic Products With Confidence", excerpt: "Tips to review product information, labels and usage guidance before you buy.", image: "/blog4.jpg" },
];

export const POSTS = RAW_POSTS.map((post) => ({
  ...post,
  date: "18 May 2025",
  readTime: "6 minute read",
  author: "Dr. Arti’s Wellness Editorial Team",
  href: `/blogs/${post.slug}`,
  // Abhi sab posts ka content same dummy hai. Baad me har post ka apna content do.
  content: DEFAULT_CONTENT,
}));

export function getPostBySlug(slug) {
  return POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug, count = 6) {
  return POSTS.filter((post) => post.slug !== slug).slice(0, count);
}