// 1. The Destination Database (The Data)
const destinations = [
    {
        name: "Bali, Indonesia", region: "Asia", image: "images/bali.png",
        desc: "Tropical beaches, ancient temples, and serene yoga retreats",
        climate: ["beach", "tropical"], trip: ["relaxation", "cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["nature"]
    },
    {
        name: "Tokyo, Japan", region: "Asia", image: "images/tokyo.jpg",
        desc: "Vibrant city life, cherry blossoms, and world-class cuisine",
        climate: ["city"], trip: ["cultural", "culinary"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "friends"],
        activities: ["food", "nightlife"]
    },
    {
        name: "Bangkok, Thailand", region: "Asia", image: "images/bangkok.jpg",
        desc: "Bustling markets, golden temples, and street food adventures",
        climate: ["city", "tropical"], trip: ["cultural", "culinary"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["food", "history", "nightlife"]
    },
    {
        name: "Taj Mahal, India", region: "Asia", image: "images/Taj_Mahal_(Edited).jpeg",
        desc: "Iconic marble mausoleum and rich Mughal history",
        climate: ["city"], trip: ["cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "family"],
        activities: ["history"]
    },
    {
        name: "Swiss Alps, Switzerland", region: "Europe", image: "images/swiss.png",
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
        name: "Santorini, Greece", region: "Europe", image: "images/santorini.jpg",
        desc: "Cliffside villages, azure waters, and volcanic sunsets",
        climate: ["beach"], trip: ["relaxation"],
        budget: ["luxury"], companions: ["couple"],
        activities: ["nature", "food"]
    },
    {
        name: "Reykjavik, Iceland", region: "Europe", image: "images/reykjavik.jpg",
        desc: "Northern lights, hot springs, and rugged landscapes",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["luxury"], companions: ["solo", "couple", "friends"],
        activities: ["nature"]
    },
    {
        name: "New York City, USA", region: "North America", image: "images/new york.jpg",
        desc: "Skyscrapers, Broadway shows, and diverse neighborhoods",
        climate: ["city"], trip: ["cultural", "culinary"],
        budget: ["luxury"], companions: ["solo", "couple", "friends"],
        activities: ["history", "food", "nightlife"]
    },
    {
        name: "Grand Canyon, USA", region: "North America", image: "images/grand canyon.jpg",
        desc: "Majestic red rock formations and thrilling rafting",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["budget", "midrange"], companions: ["solo", "family", "friends"],
        activities: ["nature"]
    },
    {
        name: "Vancouver, Canada", region: "North America", image: "images/vancouver.jpg",
        desc: "Coastal beauty, fresh seafood, and urban parks",
        climate: ["city", "mountains"], trip: ["adventure", "culinary"],
        budget: ["midrange"], companions: ["solo", "couple", "family"],
        activities: ["nature", "food"]
    },
    {
        name: "Rio de Janeiro, Brazil", region: "South America", image: "images/rio de janeiro.jpg",
        desc: "Iconic beaches, samba rhythms, and Christ the Redeemer",
        climate: ["beach", "tropical"], trip: ["adventure", "cultural"],
        budget: ["midrange"], companions: ["solo", "couple", "friends"],
        activities: ["nature", "nightlife"]
    },
    {
        name: "Machu Picchu, Peru", region: "South America", image: "images/machu picchu.jpg",
        desc: "Ancient Incan citadel high in the Andes",
        climate: ["mountains"], trip: ["adventure", "cultural"],
        budget: ["midrange"], companions: ["solo", "couple", "friends"],
        activities: ["history", "nature"]
    },
    {
        name: "Galapagos Islands, Ecuador", region: "South America", image: "images/galapagos.jpg",
        desc: "Unique wildlife, volcanic islands, and Darwin's legacy",
        climate: ["beach", "tropical"], trip: ["adventure"],
        budget: ["luxury"], companions: ["couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Cape Town, South Africa", region: "Africa", image: "images/cape town.jpg",
        desc: "Dramatic coastlines, wine regions, and penguin beaches",
        climate: ["beach", "mountains"], trip: ["adventure", "culinary"],
        budget: ["midrange"], companions: ["couple", "family", "friends"],
        activities: ["nature", "food"]
    },
    {
        name: "Serengeti, Tanzania", region: "Africa", image: "images/serengeti.jpg",
        desc: "Great Migration, big game safaris, and endless plains",
        climate: ["tropical"], trip: ["adventure"],
        budget: ["luxury"], companions: ["couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Marrakech, Morocco", region: "Africa", image: "images/marrakech.jpg",
        desc: "Colorful souks, riads, and Sahara desert gateways",
        climate: ["city"], trip: ["cultural"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends"],
        activities: ["history", "food"]
    },
    {
        name: "Sydney, Australia", region: "Oceania", image: "images/sydney.jpg",
        desc: "Harbor bridges, surfing waves, and vibrant festivals",
        climate: ["beach", "city"], trip: ["relaxation", "adventure"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "family"],
        activities: ["nature", "nightlife"]
    },
    {
        name: "Great Barrier Reef, Australia", region: "Oceania", image: "images/great barrier reef.jpg",
        desc: "World's largest coral system and underwater wonders",
        climate: ["beach", "tropical"], trip: ["adventure", "relaxation"],
        budget: ["luxury"], companions: ["couple", "family"],
        activities: ["nature"]
    },
    {
        name: "Queenstown, New Zealand", region: "Oceania", image: "images/Queenstown.jpg",
        desc: "Adrenaline sports, fjords, and Lord of the Rings scenery",
        climate: ["mountains"], trip: ["adventure"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "friends"],
        activities: ["nature", "nightlife"]
    }
];

// 2. The Extractor (Reads user answers from the URL)
function getUserPreferences() {
    const params = new URLSearchParams(window.location.search);
    return {
        climate: params.get('climate'),
        trip: params.get('trip'),
        budget: params.get('budget'),
        companions: params.get('companions'),
        activities: params.get('activities')
    };
}
// 3. The Grader (Scores and returns ALL sorted destinations)
function scoreDestinations(userPrefs) {
    if (!userPrefs.climate) return destinations; 
    destinations.forEach(dest => dest.score = 0);

    destinations.forEach(dest => {
        if (userPrefs.climate && dest.climate.includes(userPrefs.climate)) dest.score += 1;
        if (userPrefs.trip && dest.trip.includes(userPrefs.trip)) dest.score += 1;
        if (userPrefs.budget && dest.budget.includes(userPrefs.budget)) dest.score += 1;
        if (userPrefs.companions && dest.companions.includes(userPrefs.companions)) dest.score += 1;
        if (userPrefs.activities && dest.activities.includes(userPrefs.activities)) dest.score += 1;
    });

    return destinations.sort((a, b) => b.score - a.score);
}

// 4. Generate the HTML for a single card
function buildCardHTML(dest, showScore = false, rank = 0) {
    let scoreBadge = showScore ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
            <span style="background: var(--light); color: var(--dark); padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">
                ${dest.score}/5 Match
            </span>
        </div>` : '';

    let rankBadge = rank > 0 && rank <= 3 ? `<div class="rank-badge rank-${rank}">#${rank}</div>` : '';

    return `
        <div class="card">
            ${rankBadge}
            <img src="${dest.image}" alt="${dest.name}">
            <div class="card-content">
                <h3>${dest.name} (${dest.region})</h3>
                <p>${dest.desc}</p>
                ${scoreBadge}
                <a href="destination.html?id=${encodeURIComponent(dest.name)}" class="btn small" style="margin-top: 15px;">Plan Trip</a>
            </div>
        </div>
    `;
}

// 5. Initialize the correct layout based on the page
document.addEventListener('DOMContentLoaded', () => {
    const userPrefs = getUserPreferences();
    const sortedDestinations = scoreDestinations(userPrefs);

    // Check if we are on the Recommendation page
    const recContainer = document.getElementById('recommendation-results');
    if (recContainer) {
        recContainer.innerHTML = '';
        // Only grab the top 3, and YES show the score, NO rank badge
        const top3 = sortedDestinations.slice(0, 3);
        top3.forEach(dest => recContainer.innerHTML += buildCardHTML(dest, true, 0));

        // Make the "View All" link pass the quiz answers to the new page
        const viewAllLink = document.getElementById('view-all-link');
        if (viewAllLink) {
            viewAllLink.href = 'all-destinations.html' + window.location.search;
        }
    }

    // Check if we are on the All Destinations page
    const podiumContainer = document.getElementById('podium-results');
    const allContainer = document.getElementById('all-results');
    if (podiumContainer && allContainer) {
        podiumContainer.innerHTML = '';
        allContainer.innerHTML = '';

        // Slice into Top 3 and The Rest
        const top3 = sortedDestinations.slice(0, 3);
        const theRest = sortedDestinations.slice(3);

        // Inject Podium (NO score, YES rank badge)
        top3.forEach((dest, index) => {
            podiumContainer.innerHTML += buildCardHTML(dest, false, index + 1);
        });

        // Inject The Rest (NO score, NO rank badge)
        theRest.forEach(dest => {
            allContainer.innerHTML += buildCardHTML(dest, false, 0);
        });
    }
});
// Execute when the DOM is fully loaded
window.onload = displayResults;