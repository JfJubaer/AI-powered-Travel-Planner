export interface DestinationGalleryImage {
  src: string;
  alt: string;
}

export interface DestinationReview {
  author: string;
  rating: number;
  date: string;
  tripType: string;
  comment: string;
}

export interface DestinationBudgetDetails {
  stay: string;
  food: string;
  transport: string;
  experiences: string;
  note: string;
}

export interface DestinationSeasonNote {
  label: string;
  months: string;
  reason: string;
}

export interface DestinationTravelTip {
  title: string;
  description: string;
}

export interface DestinationDetailMetadata {
  galleryImages: DestinationGalleryImage[];
  budgetDetails: DestinationBudgetDetails;
  bestTimeToVisit: DestinationSeasonNote[];
  reviews: DestinationReview[];
  travelTips: DestinationTravelTip[];
}

export const destinationDetailsBySlug: Record<string, DestinationDetailMetadata> = {
  kyoto: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
        alt: "Kyoto temple district at golden hour",
      },
      {
        src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80",
        alt: "Traditional street in Kyoto with lanterns",
      },
      {
        src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=80",
        alt: "Autumn foliage around a Kyoto shrine",
      },
    ],
    budgetDetails: {
      stay: "$95 to $180 for design-forward hotels and ryokans outside peak blossom weekends.",
      food: "$30 to $55 covers a strong mix of ramen counters, kaiseki splurges, and coffee stops.",
      transport: "$8 to $18 with subway hops, buses, and the occasional taxi after late dinners.",
      experiences: "$20 to $80 for temple admissions, tea ceremonies, craft workshops, and guided walks.",
      note: "Kyoto rewards early starts. Budget a little extra for sunrise taxis and one memorable dinner.",
    },
    bestTimeToVisit: [
      {
        label: "Spring",
        months: "March to April",
        reason: "Cherry blossoms, crisp mornings, and temple gardens at their most dramatic.",
      },
      {
        label: "Autumn",
        months: "November",
        reason: "Maple season brings rich color, cooler evenings, and excellent walking weather.",
      },
      {
        label: "Shoulder",
        months: "Late May",
        reason: "Fewer crowds after blossom season with lush greenery and easier hotel pricing.",
      },
    ],
    reviews: [
      {
        author: "Mina R.",
        rating: 5,
        date: "2026-03-18",
        tripType: "Couples trip",
        comment: "Kyoto felt calm and deeply intentional. The early-morning temple circuit and neighborhood coffee stops made the whole trip feel cinematic without being rushed.",
      },
      {
        author: "Daniel K.",
        rating: 4.8,
        date: "2025-11-07",
        tripType: "Solo trip",
        comment: "Excellent for slow travel. I stayed near Higashiyama and could mix culture, food, and quiet evening walks without long transit days.",
      },
      {
        author: "Aya T.",
        rating: 4.9,
        date: "2025-04-02",
        tripType: "Family trip",
        comment: "The city handled family pacing better than expected. Booking the high-demand sights early made the trip feel much smoother.",
      },
    ],
    travelTips: [
      {
        title: "Front-load your mornings",
        description: "Popular shrines and bamboo groves feel dramatically better before 8:00 AM.",
      },
      {
        title: "Cluster neighborhoods",
        description: "Pick one area per half-day to avoid spending your best energy on transit instead of wandering.",
      },
      {
        title: "Reserve signature meals early",
        description: "Tea houses, tasting menus, and standout counters book fast during blossom and foliage seasons.",
      },
    ],
  },
  lisbon: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?auto=format&fit=crop&w=1600&q=80",
        alt: "Lisbon waterfront and tiled cityscape",
      },
      {
        src: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1600&q=80",
        alt: "Lisbon tram climbing a historic street",
      },
      {
        src: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1600&q=80",
        alt: "Viewpoint over Lisbon rooftops at sunset",
      },
    ],
    budgetDetails: {
      stay: "$85 to $160 for boutique rooms in central neighborhoods and stylish guesthouses.",
      food: "$28 to $50 with pastries, seafood lunches, and one elevated tasting dinner.",
      transport: "$10 to $16 using tram, metro, and the occasional rideshare on steeper days.",
      experiences: "$18 to $70 for museum entries, live fado, river cruises, and Sintra day add-ons.",
      note: "Lisbon stays good value for Western Europe, but hilltop neighborhoods can cost more for convenience.",
    },
    bestTimeToVisit: [
      {
        label: "Prime",
        months: "May to June",
        reason: "Long light, breezy evenings, and ideal weather for city-and-coast days.",
      },
      {
        label: "Late summer",
        months: "September",
        reason: "Warm water, strong sunsets, and slightly softer crowds than midsummer.",
      },
      {
        label: "Low season",
        months: "February",
        reason: "Great for food-focused trips with lower room rates and fewer lines.",
      },
    ],
    reviews: [
      {
        author: "Nora P.",
        rating: 4.8,
        date: "2025-09-21",
        tripType: "Friends trip",
        comment: "Lisbon balanced food, views, and easy day trips beautifully. It felt energetic without the trip becoming exhausting.",
      },
      {
        author: "Elias M.",
        rating: 4.7,
        date: "2026-05-14",
        tripType: "Couples trip",
        comment: "The mix of design hotels, seafood, and miradouros makes it incredibly easy to build a strong three- to five-day itinerary.",
      },
      {
        author: "Rita S.",
        rating: 4.9,
        date: "2025-06-03",
        tripType: "Solo trip",
        comment: "Very walkable if you pace the hills. Morning bakery stops and golden-hour viewpoints were the highlights for me.",
      },
    ],
    travelTips: [
      {
        title: "Wear proper shoes",
        description: "Cobblestones and hills add up quickly, especially if you explore Alfama and Bairro Alto in one day.",
      },
      {
        title: "Use viewpoints as anchors",
        description: "Plan routes around miradouros so you naturally build in scenic breaks between neighborhoods.",
      },
      {
        title: "Leave room for Sintra",
        description: "It is one of the easiest high-impact day trips and changes the feel of the whole itinerary.",
      },
    ],
  },
  reykjavik: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1600&q=80",
        alt: "Reykjavik and Icelandic coastline under dramatic skies",
      },
      {
        src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80",
        alt: "Icelandic waterfall near Reykjavik road trip route",
      },
      {
        src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80",
        alt: "Northern lights over Icelandic landscape",
      },
    ],
    budgetDetails: {
      stay: "$160 to $320 for central hotels, especially during aurora and summer road-trip seasons.",
      food: "$45 to $85 even with smart casual dining, coffee breaks, and one standout seafood meal.",
      transport: "$25 to $110 depending on whether you stay city-based or rent a car for longer loops.",
      experiences: "$40 to $180 for lagoons, glacier tours, boat trips, and small-group excursions.",
      note: "This is the least forgiving destination on cost, so lock in the big items early and keep a weather buffer.",
    },
    bestTimeToVisit: [
      {
        label: "Aurora season",
        months: "February",
        reason: "Good odds for northern lights with still-manageable daylight.",
      },
      {
        label: "Road-trip peak",
        months: "June",
        reason: "Maximum daylight and the easiest access for long scenic days.",
      },
      {
        label: "Balanced",
        months: "September",
        reason: "A strong compromise between color, crowd levels, and aurora potential.",
      },
    ],
    reviews: [
      {
        author: "Leah C.",
        rating: 4.8,
        date: "2025-09-28",
        tripType: "Adventure trip",
        comment: "The landscape feels unreal. Reykjavik works best when you treat it as a polished base for bigger nature days.",
      },
      {
        author: "Jonah W.",
        rating: 4.7,
        date: "2026-02-10",
        tripType: "Couples trip",
        comment: "Expensive, but worth it if you commit to a few anchor experiences and stay flexible around the forecast.",
      },
      {
        author: "Maya G.",
        rating: 4.6,
        date: "2025-06-22",
        tripType: "Road trip",
        comment: "Midnight light completely changes the rhythm of the trip. It lets you see a lot without making days feel rushed.",
      },
    ],
    travelTips: [
      {
        title: "Build for weather swings",
        description: "Keep one major outdoor day flexible so you can trade order based on the forecast.",
      },
      {
        title: "Book geothermal slots ahead",
        description: "Popular lagoons and premium time windows disappear early in peak periods.",
      },
      {
        title: "Do not underestimate drive times",
        description: "Scenery makes stops inevitable, so plan less distance than you think you can handle.",
      },
    ],
  },
  medellin: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1603411057855-5d18b7a1716b?auto=format&fit=crop&w=1600&q=80",
        alt: "Medellin skyline in the mountain valley",
      },
      {
        src: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?auto=format&fit=crop&w=1600&q=80",
        alt: "Colorful street art in Medellin",
      },
      {
        src: "https://images.unsplash.com/photo-1526401485004-2fda9f2f5539?auto=format&fit=crop&w=1600&q=80",
        alt: "Green hillside neighborhoods in Medellin",
      },
    ],
    budgetDetails: {
      stay: "$45 to $110 for well-located apartments and boutique hotels in safer, traveler-friendly areas.",
      food: "$18 to $35 for strong daily eating with room for coffee bars and one rooftop dinner.",
      transport: "$6 to $14 using metro, cable cars, and short rideshares.",
      experiences: "$12 to $55 for guided neighborhood tours, coffee trips, and cultural stops.",
      note: "Value is excellent here, but do not optimize purely for price. Neighborhood choice matters.",
    },
    bestTimeToVisit: [
      {
        label: "Reliable",
        months: "January",
        reason: "Warm weather with a good balance of city activity and day-trip conditions.",
      },
      {
        label: "Summer feel",
        months: "July to August",
        reason: "Strong atmosphere, springlike weather, and great conditions for coffee-region add-ons.",
      },
      {
        label: "Avoid",
        months: "Late April",
        reason: "Rain can interrupt skyline views and longer outdoor plans.",
      },
    ],
    reviews: [
      {
        author: "Camila D.",
        rating: 4.7,
        date: "2025-08-19",
        tripType: "Digital nomad stay",
        comment: "Medellin is easy to settle into. Great coffee, strong neighborhood energy, and enough structure to balance work with exploring.",
      },
      {
        author: "Owen L.",
        rating: 4.5,
        date: "2026-01-12",
        tripType: "Friends trip",
        comment: "Best when you stay intentional about where you spend time. The city has huge upside if you plan neighborhoods carefully.",
      },
      {
        author: "Sara J.",
        rating: 4.6,
        date: "2025-07-06",
        tripType: "Solo trip",
        comment: "I loved the mountain setting and public transport. Comuna 13 and the coffee day trip were the standouts.",
      },
    ],
    travelTips: [
      {
        title: "Choose the right base",
        description: "El Poblado is easiest for first-timers, while Laureles offers a calmer local rhythm.",
      },
      {
        title: "Use the metro strategically",
        description: "It is efficient and helps you cover more ground without defaulting to car trips.",
      },
      {
        title: "Book guided neighborhood visits",
        description: "Context adds a lot, especially in places like Comuna 13 where local storytelling matters.",
      },
    ],
  },
  queenstown: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&w=1600&q=80",
        alt: "Queenstown lake and alpine landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
        alt: "Mountain range near Queenstown adventure routes",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        alt: "Vineyard and valley scenery near Queenstown",
      },
    ],
    budgetDetails: {
      stay: "$135 to $260 for lake-adjacent hotels, apartments, and alpine lodges.",
      food: "$35 to $65 for casual brunches, après-style dinners, and one winery lunch.",
      transport: "$15 to $75 depending on shuttle use, car hire, and excursion pickups.",
      experiences: "$60 to $220 for adventure activities, scenic cruises, and premium nature excursions.",
      note: "This is a destination where activity costs define the budget more than food does.",
    },
    bestTimeToVisit: [
      {
        label: "Late summer",
        months: "February to March",
        reason: "Stable weather, long days, and strong hiking plus vineyard conditions.",
      },
      {
        label: "Holiday season",
        months: "December",
        reason: "Big energy, excellent scenery, and polished adventure operations.",
      },
      {
        label: "Winter option",
        months: "July",
        reason: "Great for snow sports, but book accommodation and transport earlier.",
      },
    ],
    reviews: [
      {
        author: "Hannah B.",
        rating: 4.9,
        date: "2026-03-04",
        tripType: "Adventure trip",
        comment: "Queenstown is almost unfairly scenic. It felt easy to mix big-adrenaline moments with really polished food and wine stops.",
      },
      {
        author: "Marcus T.",
        rating: 4.8,
        date: "2025-12-18",
        tripType: "Couples trip",
        comment: "The lakefront setting carries the whole trip. Even downtime between excursions feels memorable.",
      },
      {
        author: "Priya N.",
        rating: 4.7,
        date: "2025-02-27",
        tripType: "Road trip",
        comment: "Perfect if you want a polished base with excellent access to cinematic landscapes and day trips.",
      },
    ],
    travelTips: [
      {
        title: "Lock in big activities early",
        description: "Popular time slots for heli, cruise, and adventure bookings fill long before travel dates.",
      },
      {
        title: "Keep one slow day",
        description: "Queenstown is more enjoyable when you leave time for the lakefront and winery pacing too.",
      },
      {
        title: "Use the weather windows",
        description: "Move scenic flights and high-visibility experiences to the clearest day available.",
      },
    ],
  },
  marrakesh: {
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
        alt: "Marrakesh rooftops and warm-toned medina architecture",
      },
      {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80",
        alt: "Marrakesh market with lanterns and color",
      },
      {
        src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80",
        alt: "Courtyard riad design in Marrakesh",
      },
    ],
    budgetDetails: {
      stay: "$55 to $130 for photogenic riads and boutique stays inside or near the medina.",
      food: "$20 to $40 for market snacks, traditional dinners, and rooftop drinks.",
      transport: "$6 to $18 with airport transfers, short taxis, and occasional guided transport.",
      experiences: "$18 to $70 for hammams, desert add-ons, gardens, and cooking classes.",
      note: "Value is strong if you stay in a well-reviewed riad and pre-arrange key transfers.",
    },
    bestTimeToVisit: [
      {
        label: "Prime",
        months: "March to April",
        reason: "Warm days, cooler evenings, and better comfort for medina walking.",
      },
      {
        label: "Autumn",
        months: "October",
        reason: "Great light, manageable heat, and ideal timing for rooftop evenings.",
      },
      {
        label: "Avoid peak heat",
        months: "July",
        reason: "Midday exploring becomes much harder and pacing the trip takes more work.",
      },
    ],
    reviews: [
      {
        author: "Elena F.",
        rating: 4.6,
        date: "2025-10-16",
        tripType: "Design-focused trip",
        comment: "The riad culture and color palette alone made the trip worth it. Great for travelers who like atmosphere as much as landmarks.",
      },
      {
        author: "Jules P.",
        rating: 4.4,
        date: "2026-04-01",
        tripType: "Couples trip",
        comment: "Beautiful and intense in the best way. It felt smoother once we relied on a few trusted restaurant and transport reservations.",
      },
      {
        author: "Noah S.",
        rating: 4.5,
        date: "2025-03-27",
        tripType: "Solo trip",
        comment: "A fantastic sensory destination. The Atlas day trip gave the city stay a really good contrast.",
      },
    ],
    travelTips: [
      {
        title: "Use your riad team",
        description: "The best places to stay can arrange reliable transfers, hammams, and dinner bookings that remove friction.",
      },
      {
        title: "Pace the medina",
        description: "Do the denser market wandering early or late, then retreat for a courtyard reset in the afternoon.",
      },
      {
        title: "Carry small cash",
        description: "It helps for taxis, snacks, and low-friction purchases throughout the day.",
      },
    ],
  },
};
