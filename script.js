// 1. The Destination Database (Linked to the local images folder)
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
        name: "Lyari Town, Pakistan", region: "Asia", image: "images/lyari-town.jpg",
        desc: "Street football culture, vibrant food spots, and rich local heritage",
        climate: ["city"], trip: ["cultural", "culinary"],
        budget: ["budget", "midrange"], companions: ["solo", "couple", "friends", "family"],
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
        desc: "Iconic harbor, surf beaches, and vibrant arts scene",
        climate: ["city", "beach"], trip: ["adventure", "cultural"],
        budget: ["midrange", "luxury"], companions: ["solo", "couple", "family"],
        activities: ["nature", "nightlife"]
    },
    {
        name: "Great Barrier Reef, Australia", region: "Oceania", image: "images/great barrier reef.jpg",
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
    const prefs = userPrefs || {};

    const pickFirst = (value) => Array.isArray(value) ? value[0] : value;

    const normalizeBudget = (value) => {
        if (!value) return value;
        if (value === 'mid') return 'midrange';
        if (value === 'high') return 'luxury';
        return value;
    };

    const scoredDestinations = destinations.map((dest) => {
        let score = 0;
        const matchedTags = [];

        const climate = prefs.climate || prefs.terrain;
        const trip = prefs.trip || prefs.difficulty;
        const budget = normalizeBudget(prefs.budget);
        const companions = prefs.companions || prefs.group;
        const activities = prefs.activities || prefs.activity;

        const destClimate = (dest.climate || []).map((item) => String(item).toLowerCase());
        const destTrip = (dest.trip || []).map((item) => String(item).toLowerCase());
        const destBudget = (dest.budget || []).map((item) => normalizeBudget(String(item).toLowerCase()));
        const destCompanions = (dest.companions || []).map((item) => String(item).toLowerCase());
        const destActivities = (dest.activities || []).map((item) => String(item).toLowerCase());

        if (climate && destClimate.includes(String(climate).toLowerCase())) {
            score += 2;
            matchedTags.push('Climate');
        }

        if (trip && destTrip.includes(String(trip).toLowerCase())) {
            score += 2;
            matchedTags.push('Vibe');
        }

        if (budget && destBudget.includes(String(budget).toLowerCase())) {
            score += 1;
            matchedTags.push('Budget');
        }

        if (companions && destCompanions.includes(String(companions).toLowerCase())) {
            score += 1;
            matchedTags.push('Party Size');
        }

        if (activities && destActivities.includes(String(activities).toLowerCase())) {
            score += 2;
            matchedTags.push('Activities');
        }

        const durationPref = Number(prefs.days || prefs.duration || 0);
        if (!Number.isNaN(durationPref) && durationPref > 0 && Number(dest.duration) > 0) {
            const gap = Math.abs(Number(dest.duration) - durationPref);
            if (gap <= 1) {
                score += 1;
                matchedTags.push('Duration');
            }
        }

        return {
            ...dest,
            score,
            matchedTags,
            primaryClimate: pickFirst(dest.climate),
            primaryTrip: pickFirst(dest.trip)
        };
    });

    scoredDestinations.sort((a, b) => b.score - a.score);
    return scoredDestinations.slice(0, 3);
}

// 3. Dynamic Tailwind Card Generator
function buildCardHTML(dest, isMatchResult = false) {
    const tripTags = Array.isArray(dest.trip) ? dest.trip : [];
    const climateTags = Array.isArray(dest.climate) ? dest.climate : [];
    const budgetTags = Array.isArray(dest.budget) ? dest.budget : [];
    const safeName = escapeHTML(dest.name);
    const isFavorite = isFavoriteDestination(dest.name);
    const favoriteLabel = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    const favoriteSymbol = isFavorite ? '💗' : '🤍';

    const topTags = [...tripTags, ...climateTags, ...budgetTags]
        .slice(0, 4)
        .map((tag) => `<span class="px-3 py-1 bg-teal-500/10 text-teal-600 dark:bg-teal-400/15 dark:text-teal-300 text-xs font-bold rounded-lg">${escapeHTML(formatSentenceCase(tag))}</span>`)
        .join('');

    let matchBadge = '';
    if (isMatchResult) {
        const maxScore = 9;
        const matchPercentage = Math.max(0, Math.min(100, Math.round(((dest.score || 0) / maxScore) * 100)));
        matchBadge = `<div class="absolute top-4 right-4 bg-juniper text-mint px-3 py-1 rounded-full font-bold text-sm shadow-md border border-mint/20">
            ${matchPercentage}% Match
        </div>`;
    }

    return `
        <div class="tripfit-card bg-white dark:bg-slate-900 rounded-[1.65rem] overflow-hidden shadow-[0_18px_35px_rgba(15,55,59,0.12)] dark:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-200 dark:border-slate-800/90 flex flex-col h-full min-h-[33rem] relative" role="button" tabindex="0" data-destination-name="${safeName}">
            ${matchBadge}
            <img src="${escapeHTML(dest.image)}" alt="${safeName}" class="w-full h-60 md:h-68 object-cover">
            <div class="p-7 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-white to-[#f7fbfb] dark:from-slate-800 dark:to-slate-900">
                <div class="flex gap-2 mb-5 flex-wrap">
                    ${topTags}
                </div>
                <h3 class="text-2xl font-extrabold text-juniper dark:text-slate-100 mb-2 leading-tight">${safeName}</h3>
                <p class="text-gray-600 dark:text-slate-300 mb-6 flex-1 text-base leading-relaxed">${escapeHTML(dest.desc)}</p>
                <div class="mt-auto flex items-end justify-between gap-4">
                    <p class="text-gray-400 dark:text-slate-400 text-sm">Click anywhere on this card to view trek details.</p>
                    <button type="button" data-favorite-name="${safeName}" aria-label="${favoriteLabel}" aria-pressed="${isFavorite ? 'true' : 'false'}" class="favorite-btn shrink-0 w-12 h-10 rounded-md border border-pink-100/60 grid place-items-center text-lg transition-colors ${isFavorite ? 'bg-pink-200 text-pink-600 card-favorite-active' : 'bg-pink-50 text-pink-500'}">
                        <span class="favorite-symbol">${favoriteSymbol}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function escapeHTML(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatSentenceCase(value) {
    const text = String(value ?? '').trim().toLowerCase();
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function ensureTripfitCardEffectsStyles() {
    if (document.getElementById('tripfit-card-effects')) return;

    const style = document.createElement('style');
    style.id = 'tripfit-card-effects';
    style.textContent = `
        .tripfit-card {
            transition: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
        }

        .tripfit-card:hover {
            border-color: rgba(45, 212, 191, 0.45) !important;
            box-shadow:
                0 0 0 1px rgba(45, 212, 191, 0.28),
                0 24px 60px rgba(45, 212, 191, 0.22),
                0 0 26px rgba(45, 212, 191, 0.20) !important;
        }

        html.dark .tripfit-card:hover {
            border-color: rgba(45, 212, 191, 0.42) !important;
            box-shadow:
                0 0 0 1px rgba(45, 212, 191, 0.26),
                0 24px 62px rgba(45, 212, 191, 0.24),
                0 0 30px rgba(45, 212, 191, 0.22) !important;
        }
    `;

    document.head.appendChild(style);
}

function safeParseJSON(value, fallback) {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

const FAVORITE_PRIMARY_KEY = 'tripfitFavorites';
const FAVORITE_FALLBACK_KEY = 'favorites';
const HISTORY_PRIMARY_KEY = 'tripfitHistory';

function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch { return false; }
}

function getStoredFavorites() {
    const tripfitFavorites = safeParseJSON(safeStorageGet(FAVORITE_PRIMARY_KEY), null);
    if (Array.isArray(tripfitFavorites)) return tripfitFavorites;

    const legacyFavorites = safeParseJSON(safeStorageGet(FAVORITE_FALLBACK_KEY), []);
    return Array.isArray(legacyFavorites) ? legacyFavorites : [];
}

function saveFavorites(favorites) {
    const uniqueFavorites = Array.from(new Set((favorites || []).filter(Boolean)));
    safeStorageSet(FAVORITE_PRIMARY_KEY, JSON.stringify(uniqueFavorites));
    safeStorageSet(FAVORITE_FALLBACK_KEY, JSON.stringify(uniqueFavorites));
    return uniqueFavorites;
}

function isFavoriteDestination(destinationName) {
    if (!destinationName) return false;
    const favorites = getStoredFavorites();
    return favorites.includes(destinationName);
}

function updateFavoriteButtons() {
    const favorites = getStoredFavorites();
    const buttons = document.querySelectorAll('[data-favorite-name]');

    buttons.forEach((button) => {
        const destinationName = button.getAttribute('data-favorite-name') || '';
        const isFavorite = favorites.includes(destinationName);

        button.setAttribute('aria-pressed', isFavorite ? 'true' : 'false');
        button.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');

        button.classList.toggle('card-favorite-active', isFavorite);
        button.classList.toggle('bg-pink-200', isFavorite);
        button.classList.toggle('text-pink-600', isFavorite);
        button.classList.toggle('bg-pink-50', !isFavorite);
        button.classList.toggle('text-pink-500', !isFavorite);

        const symbolNode = button.querySelector('.favorite-symbol');
        if (symbolNode) symbolNode.textContent = isFavorite ? '💗' : '🤍';

        const textNode = button.querySelector('.favorite-text');
        if (textNode) textNode.textContent = isFavorite ? 'Saved' : 'Save';
    });
}

function toggleFavoriteByName(destinationName) {
    if (!destinationName) return false;

    const favorites = getStoredFavorites();
    const nextFavorites = favorites.includes(destinationName)
        ? favorites.filter((name) => name !== destinationName)
        : [...favorites, destinationName];

    saveFavorites(nextFavorites);
    updateFavoriteButtons();
    return nextFavorites.includes(destinationName);
}

function saveFavorite(destinationName) {
    if (!destinationName) return;

    const favorites = getStoredFavorites();
    if (favorites.includes(destinationName)) return;

    saveFavorites([...favorites, destinationName]);
    updateFavoriteButtons();
}

function removeFavorite(destinationName) {
    if (!destinationName) return;

    const favorites = getStoredFavorites();
    const nextFavorites = favorites.filter((name) => name !== destinationName);
    saveFavorites(nextFavorites);
    updateFavoriteButtons();
}

function findDestinationByName(destinationName) {
    if (!destinationName) return null;

    const exact = destinations.find((dest) => dest.name === destinationName);
    if (exact) return exact;

    return destinations.find((dest) => String(dest.name).toLowerCase() === String(destinationName).toLowerCase()) || null;
}

function openDestinationDetails(destinationName, options = {}) {
    const destination = findDestinationByName(destinationName);
    if (!destination) return;

    const preferModal = options.preferModal !== false;
    if (preferModal && typeof window.openItineraryModal === 'function') {
        window.openItineraryModal(destination.name);
        return;
    }

    window.location.href = `destination.html?id=${encodeURIComponent(destination.name)}`;
}

function openTrekCardItinerary(destinationName) {
    openDestinationDetails(destinationName, { preferModal: true });
}

function normalizePreferencesFromQuery(searchParams) {
    const params = searchParams || new URLSearchParams(window.location.search);
    return {
        climate: params.get('climate') || '',
        trip: params.get('trip') || '',
        budget: params.get('budget') || '',
        companions: params.get('companions') || '',
        activities: params.get('activities') || '',
        days: params.get('days') || params.get('duration') || ''
    };
}

function saveRecommendationSnapshot(preferences, results) {
    if (!Array.isArray(results) || results.length === 0) return;

    const existingHistory = safeParseJSON(safeStorageGet(HISTORY_PRIMARY_KEY), []);
    const history = Array.isArray(existingHistory) ? existingHistory : [];

    const snapshot = {
        date: new Date().toLocaleString('en-IN', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        preferences: preferences || {},
        results: results.map((dest) => ({
            name: dest.name, region: dest.region, image: dest.image, desc: dest.desc,
            climate: Array.isArray(dest.climate) ? [...dest.climate] : [],
            trip: Array.isArray(dest.trip) ? [...dest.trip] : [],
            budget: Array.isArray(dest.budget) ? [...dest.budget] : [],
            companions: Array.isArray(dest.companions) ? [...dest.companions] : [],
            activities: Array.isArray(dest.activities) ? [...dest.activities] : [],
            score: Number(dest.score || 0),
            matchedTags: Array.isArray(dest.matchedTags) ? [...dest.matchedTags] : []
        }))
    };

    const latest = history[0];
    const latestSignature = latest ? JSON.stringify({ preferences: latest.preferences, names: (latest.results || []).map(i => i.name) }) : '';
    const nextSignature = JSON.stringify({ preferences: snapshot.preferences, names: snapshot.results.map(i => i.name) });

    if (latestSignature === nextSignature) return;

    history.unshift(snapshot);
    safeStorageSet(HISTORY_PRIMARY_KEY, JSON.stringify(history.slice(0, 20)));
}

function trySaveRecommendationSnapshot() {
    const path = window.location.pathname.toLowerCase();
    if (!path.includes('recommendation.html')) return;

    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) return;

    const preferences = normalizePreferencesFromQuery(new URLSearchParams(window.location.search));
    if (!preferences.climate || !preferences.trip) return;

    const topMatches = gradeDestinations(preferences);
    saveRecommendationSnapshot(preferences, topMatches);
}

// ================= RECOMMENDATION PAGE RENDERER (NEW) =================
function renderRecommendationResults() {
    const path = window.location.pathname.toLowerCase();
    if (!path.includes('recommendation.html')) return;

    const loadingEl = document.getElementById('analyzing-loading');
    const resultsGrid = document.getElementById('results-grid');

    if (!resultsGrid) {
        console.error('❌ Missing #results-grid in recommendation.html');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const preferences = normalizePreferencesFromQuery(params);

    if (!preferences.climate || !preferences.trip) {
        if (loadingEl) {
            loadingEl.innerHTML = `<p class="text-red-600 text-center py-12 text-lg">Invalid quiz data.<br><a href="quiz.html" class="underline hover:text-red-700">← Retake the Quiz</a></p>`;
        }
        return;
    }

    if (loadingEl) loadingEl.style.display = 'none';

    const topMatches = gradeDestinations(preferences);

    resultsGrid.innerHTML = topMatches.map(dest => buildCardHTML(dest, true)).join('');

    updateFavoriteButtons();

    console.log('✅ TripFit recommendations rendered successfully:', topMatches);
}

function handleCardClick(event) {
    const favoriteButton = event.target.closest('[data-favorite-name]');
    if (favoriteButton) {
        event.preventDefault();
        event.stopPropagation();
        toggleFavoriteByName(favoriteButton.getAttribute('data-favorite-name') || '');
        return;
    }

    const withinLink = event.target.closest('a, button, input, select, textarea, label');
    if (withinLink && !event.target.closest('[data-destination-name]')) return;

    const card = event.target.closest('[data-destination-name]');
    if (!card) return;

    const destinationName = card.getAttribute('data-destination-name') || '';
    openDestinationDetails(destinationName, { preferModal: true });
}

function handleCardKeydown(event) {
    const isActivateKey = event.key === 'Enter' || event.key === ' ';
    if (!isActivateKey) return;

    const card = event.target.closest('[data-destination-name]');
    if (!card) return;

    event.preventDefault();
    const destinationName = card.getAttribute('data-destination-name') || '';
    openDestinationDetails(destinationName, { preferModal: true });
}

function ensureCatalogRendered() {
    const container = document.getElementById('catalog-container');
    if (!container) return;

    const hasCards = container.querySelector('[data-destination-name]');
    if (hasCards) return;

    container.innerHTML = destinations.map((dest) => buildCardHTML(dest, false)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    ensureTripfitCardEffectsStyles();
    ensureCatalogRendered();
    updateFavoriteButtons();
    trySaveRecommendationSnapshot();
    renderRecommendationResults();                    // ← This is the key line

    document.addEventListener('click', handleCardClick);
    document.addEventListener('keydown', handleCardKeydown);

    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        const observer = new MutationObserver(() => updateFavoriteButtons());
        observer.observe(resultsContainer, { childList: true, subtree: true });
    }
});

window.safeParseJSON = safeParseJSON;
window.saveFavorite = saveFavorite;
window.removeFavorite = removeFavorite;
window.getStoredFavorites = getStoredFavorites;
window.openDestinationDetails = openDestinationDetails;
window.openTrekCardItinerary = openTrekCardItinerary;
