// 1. The Destination Database (Linked to local images1 folder)
const destinations = [
    {
        name: "Bali, Indonesia", region: "Asia", image: "images1/BALI.jpg",
        desc: "Tropical beaches, ancient temples, and serene yoga retreats",
        climate: ["beach", "tropical"], trip: ["relaxation", "cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["nature"]
    },
    {
        name: "Tokyo, Japan", region: "Asia", image: "images1/TOKYO.jpg",
        desc: "Vibrant city life, cherry blossoms, and world-class cuisine",
        climate: ["city"], trip: ["cultural", "culinary"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "friends"],
        activities: ["food", "nightlife"]
    },
    {
        name: "Bangkok, Thailand", region: "Asia", image: "images1/BANGKOK.jpg",
        desc: "Bustling markets, golden temples, and street food adventures",
        climate: ["city", "tropical"], trip: ["cultural", "culinary"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["food", "history", "nightlife"]
    },
    {
        name: "Taj Mahal, India", region: "Asia", image: "images1/TAJ MAHAL.jpg",
        desc: "Iconic marble mausoleum and rich Mughal history",
        climate: ["city"], trip: ["cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "family"],
        activities: ["history"]
    },
    {
        name: "Swiss Alps, Switzerland", region: "Europe", image: "images1/SWISS ALPS.jpg",
        desc: "Snow-capped peaks, chocolate, and alpine hiking trails",
        climate: ["mountains"], trip: ["adventure", "relaxation"],
        budget: ["luxury"], companions: ["couple", "family", "friends"],
        activities: ["nature"]
    },
    {
        name: "Paris, France", region: "Europe", image: "images/paris.jpg", 
        desc: "Romantic streets, art museums, and fresh croissants",
        climate: ["city"], trip: ["cultural", "culinary", "relaxation"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "friends"],
        activities: ["history", "food"]
    },
    {
        name: "Santorini, Greece", region: "Europe", image: "images1/SANTORINI.jpg",
        desc: "Cliffside villages, azure waters, and volcanic sunsets",
        climate: ["beach"], trip: ["relaxation"],
        budget: ["luxury"], companions: ["couple"],
        activities: ["nature", "food"]
    },
    {
        name: "Reykjavik, Iceland", region: "Europe", image: "images1/ICELAND.png",
        desc: "Northern lights, hot springs, and rugged landscapes",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["luxury"], companions: ["solo", "couple", "friends"],
        activities: ["nature"]
    },
    {
        name: "New York City, USA", region: "North America", image: "images1/NEW YORK.jpg",
        desc: "Skyscrapers, Broadway shows, and diverse neighborhoods",
        climate: ["city"], trip: ["cultural", "culinary"],
        budget: ["luxury"], companions: ["solo", "couple", "friends"],
        activities: ["history", "food", "nightlife"]
    },
    {
        name: "Grand Canyon, USA", region: "North America", image: "images1/GRAND CANYON.jpg",
        desc: "Majestic red rock formations and thrilling rafting",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["budget", "midrange"], companions: ["solo", "family", "friends"],
        activities: ["nature"]
    },
    {
        name: "Vancouver, Canada", region: "North America", image: "images1/VANCOUVER.jpg",
        desc: "Coastal beauty, fresh seafood, and urban parks",
        climate: ["city", "mountains"], trip: ["adventure", "culinary"],
        budget: ["midrange"], companions: ["solo", "couple", "family"],
        activities: ["nature", "food"]
    },
    {
        name: "Rio de Janeiro, Brazil", region: "South America", image: "images1/RIO DE JANEIRO.jpg",
        desc: "Iconic beaches, samba rhythms, and Christ the Redeemer",
        climate: ["beach", "tropical"], trip: ["adventure", "cultural"],
        budget: ["midrange"], companions: ["solo", "couple", "friends"],
        activities: ["nature", "nightlife"]
    },
    {
        name: "Machu Picchu, Peru", region: "South America", image: "images1/MACHU PICCHU.jpg",
        desc: "Ancient Incan citadel high in the Andes",
        climate: ["mountains"], trip: ["adventure", "cultural"],
        budget: ["midrange"], companions: ["solo", "couple", "friends"],
        activities: ["history", "nature"]
    },
    {
        name: "Galapagos Islands, Ecuador", region: "South America", image: "images1/ECUADOR.jpg",
        desc: "Unique wildlife, volcanic islands, and Darwin's legacy",
        climate: ["beach", "tropical"], trip: ["adventure"],
        budget: ["luxury"], companions: ["couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Cape Town, South Africa", region: "Africa", image: "images1/CAPE TOWN.jpg",
        desc: "Dramatic coastlines, wine regions, and penguin beaches",
        climate: ["beach", "mountains"], trip: ["adventure", "culinary"],
        budget: ["midrange"], companions: ["couple", "family", "friends"],
        activities: ["nature", "food"]
    },
    {
        name: "Serengeti, Tanzania", region: "Africa", image: "images1/SERENGETI.jpg",
        desc: "Great Migration, big game safaris, and endless plains",
        climate: ["tropical"], trip: ["adventure"],
        budget: ["luxury"], companions: ["couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Marrakech, Morocco", region: "Africa", image: "images1/MARAKECH.jpg",
        desc: "Colorful souks, riads, and Sahara desert gateways",
        climate: ["city"], trip: ["cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["history", "food"]
    },
    {
        name: "Sydney, Australia", region: "Oceania", image: "images1/SYDNEY.jpg",
        desc: "Iconic harbor, surf beaches, and vibrant arts scene",
        climate: ["city", "beach"], trip: ["adventure", "cultural"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "family"],
        activities: ["nature", "nightlife"]
    },
    {
        name: "Great Barrier Reef, Australia", region: "Oceania", image: "images1/GREAT BARRIER REEF.jpg",
        desc: "World's largest coral reef system and marine life",
        climate: ["beach", "tropical"], trip: ["adventure", "relaxation"],
        budget: ["luxury"], companions: ["solo", "couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Queenstown, New Zealand", region: "Oceania", image: "images/Queenstown.jpg",
        desc: "Adventure capital, fjords, and extreme sports",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["midrange", "luxury"], companions: ["solo", "friends"],
        activities: ["nature", "nightlife"]
    }
];

// 2. Grader Function (The matching algorithm)
function gradeDestinations(userPrefs) {
    let scoredDestinations = destinations.map(dest => {
        let score = 0;
        let matchedTags = [];

        if (dest.climate.includes(userPrefs.climate)) { score += 2; matchedTags.push("Climate"); }
        if (dest.trip.includes(userPrefs.trip)) { score += 2; matchedTags.push("Vibe"); }
        if (dest.budget.includes(userPrefs.budget)) { score += 1; matchedTags.push("Budget"); }
        if (dest.companions.includes(userPrefs.companions)) { score += 1; matchedTags.push("Party Size"); }
        if (dest.activities.includes(userPrefs.activities)) { score += 2; matchedTags.push("Activities"); }

        return { ...dest, score, matchedTags };
    });

    // Sort by highest score, then slice top 3
    scoredDestinations.sort((a, b) => b.score - a.score);
    return scoredDestinations.slice(0, 3);
}

// 3. Dynamic Tailwind Card Generator
function buildCardHTML(dest, isMatchResult = false) {
    // Generate pill tags for the card
    const allTags = [...dest.trip, ...dest.climate];
    const topTags = allTags.slice(0, 2).map(tag => 
        `<span class="px-3 py-1 bg-mint/10 text-mint text-xs font-bold rounded-full uppercase tracking-wider">${tag}</span>`
    ).join('');

    // Optional match score badge for the results page
    let matchBadge = '';
    if (isMatchResult) {
        const matchPercentage = Math.round((dest.score / 8) * 100);
        matchBadge = `<div class="absolute top-4 right-4 bg-juniper text-mint px-3 py-1 rounded-full font-bold text-sm shadow-md border border-mint/20">
            ${matchPercentage}% Match
        </div>`;
    }

    // Return the injected Tailwind HTML
    return `
        <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col h-full relative">
            ${matchBadge}
            <img src="${dest.image}" alt="${dest.name}" class="w-full h-56 object-cover">
            
            <div class="p-6 flex-1 flex flex-col">
                <div class="flex gap-2 mb-3">
                    ${topTags}
                </div>
                
                <h3 class="text-2xl font-bold text-juniper dark:text-white mb-2 leading-tight">${dest.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 flex-1 text-sm leading-relaxed">${dest.desc}</p>
                
                <a href="destination.html?id=${encodeURIComponent(dest.name)}" class="mt-auto block text-center px-6 py-3 bg-mint hover:bg-teal text-juniper font-bold rounded-xl transition-colors w-full">
                    View Itinerary
                </a>
            </div>
        </div>
    `;
}
