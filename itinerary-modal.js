// ================= ITINERARY MODAL SYSTEM (TRIPFIT) =================

let currentSelectedTrek = null;
let currentItin = null;
let currentItineraryTier = 'standard';

function getDestinationsCatalog() {
	if (Array.isArray(window.destinations)) return window.destinations;
	if (typeof destinations !== 'undefined' && Array.isArray(destinations)) return destinations;
	return [];
}

function getItineraryResolver() {
	if (typeof window.getTrekItinerary === 'function') return window.getTrekItinerary;
	if (typeof getTrekItinerary === 'function') return getTrekItinerary;
	return null;
}

function createItineraryModal() {
	const existing = document.getElementById('itineraryModal');
	if (existing) return;

	const modal = document.createElement('div');
	modal.id = 'itineraryModal';
	modal.innerHTML = `
		<div class="itinerary-modal-overlay" onclick="closeItineraryModal(event)"></div>
		<div class="itinerary-modal-content">
			<button class="itinerary-modal-close" onclick="closeItineraryModal()" aria-label="Close itinerary">&times;</button>

			<div class="itinerary-header">
				<h1 id="itineraryTitle">Trip Name</h1>
				<div class="itinerary-meta-info">
					<div class="meta-item"><i class="fas fa-location-dot"></i> <span id="itineraryLocation">Location</span></div>
					<div class="meta-item"><i class="fas fa-calendar"></i> <span id="itineraryDuration">Days</span></div>
					<div class="meta-item"><i class="fas fa-gauge"></i> <span id="itineraryDifficulty">Difficulty</span></div>
					<div class="meta-item"><i class="fas fa-mountain"></i> <span id="itineraryAltitude">Altitude</span></div>
				</div>
				<div class="itinerary-highlights" id="itineraryHighlights"></div>
				<div class="itinerary-package-switch">
					<p class="itinerary-package-label">Package</p>
					<div class="itinerary-package-buttons">
						<button class="package-tier-btn" data-tier="budget" onclick="setItineraryPackage('budget')">Budget</button>
						<button class="package-tier-btn active" data-tier="standard" onclick="setItineraryPackage('standard')">Standard</button>
						<button class="package-tier-btn" data-tier="premium" onclick="setItineraryPackage('premium')">Premium</button>
					</div>
					<p class="itinerary-package-note" id="itineraryPackageNote">Balanced comfort and support for most travelers.</p>
				</div>
			</div>

			<div class="itinerary-tabs">
				<button class="itinerary-tab-btn active" onclick="switchItineraryTab('overview', this)">Overview</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('itinerary', this)">Day by Day</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('packing', this)">Packing List</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('cost', this)">Cost Breakdown</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('safety', this)">Safety & Facts</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('faqs', this)">FAQs</button>
			</div>

			<div class="itinerary-content">
				<div id="overviewTab" class="itinerary-tab-content active">
					<div class="itinerary-section">
						<h3><i class="fas fa-info-circle"></i> Trip Overview</h3>
						<div class="overview-grid" id="overviewContent"></div>
					</div>
				</div>

				<div id="itineraryTab" class="itinerary-tab-content">
					<div class="itinerary-section" id="dayByDayContent"></div>
				</div>

				<div id="packingTab" class="itinerary-tab-content">
					<div class="packing-grid" id="packingContent"></div>
				</div>

				<div id="costTab" class="itinerary-tab-content">
					<div class="itinerary-section" id="costContent"></div>
				</div>

				<div id="safetyTab" class="itinerary-tab-content">
					<div class="itinerary-section" id="safetyContent"></div>
				</div>

				<div id="faqsTab" class="itinerary-tab-content">
					<div class="itinerary-section" id="faqsContent"></div>
				</div>
			</div>

			<div class="itinerary-cta">
				<button class="btn-book-now" onclick="bookNowFromItinerary()">
					<i class="fas fa-check-circle"></i> Book This Trip
				</button>
				<button class="btn-download-pdf" onclick="downloadItineraryPDF()">
					<i class="fas fa-download"></i> Download PDF
				</button>
				<button class="btn-contact" onclick="contactGuide()">
					<i class="fas fa-phone"></i> Contact TripFit
				</button>
			</div>
		</div>
	`;

	document.body.appendChild(modal);
}

function openItineraryModal(trekName) {
	createItineraryModal();

	const itinerary = getTripItineraryCompat(trekName);
	if (!itinerary) {
		alert('Trip details not found');
		return;
	}

	const trek = getDestinationsCatalog().find((d) => d.name === trekName) || null;

	currentSelectedTrek = trek || { name: trekName, id: trekName };
	currentItin = itinerary;
	currentItineraryTier = 'standard';

	document.getElementById('itineraryTitle').textContent = itinerary.overview.name;
	document.getElementById('itineraryLocation').textContent = itinerary.overview.location;
	document.getElementById('itineraryDuration').textContent = itinerary.overview.duration + ' Days';
	document.getElementById('itineraryDifficulty').textContent = itinerary.overview.difficulty;
	document.getElementById('itineraryAltitude').textContent = itinerary.overview.altitude;

	const highlightsHTML = (itinerary.overview.highlights || [])
		.map((item) => `<span class="highlight-badge"><i class="fas fa-star"></i> ${escapeModalHTML(item)}</span>`)
		.join('');
	document.getElementById('itineraryHighlights').innerHTML = highlightsHTML;

	syncItineraryTierUI();
	populateOverviewTab(itinerary);
	populateDayByDayTab(itinerary);
	populatePackingTab(itinerary);
	populateCostTab(itinerary, trek);
	populateSafetyTab(itinerary);
	populateFAQsTab(itinerary);

	switchItineraryTab('overview', document.querySelector('.itinerary-tab-btn'));

	const modal = document.getElementById('itineraryModal');
	if (modal) {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

function closeItineraryModal(event) {
	if (event && event.target && event.target.classList && !event.target.classList.contains('itinerary-modal-overlay')) {
		return;
	}

	const modal = document.getElementById('itineraryModal');
	if (!modal) return;

	modal.classList.remove('active');
	document.body.style.overflow = 'auto';
}

function switchItineraryTab(tabName, buttonElement) {
	document.querySelectorAll('.itinerary-tab-content').forEach((tab) => tab.classList.remove('active'));
	document.querySelectorAll('.itinerary-tab-btn').forEach((btn) => btn.classList.remove('active'));

	const tabEl = document.getElementById(tabName + 'Tab');
	if (tabEl) tabEl.classList.add('active');
	if (buttonElement) buttonElement.classList.add('active');
}

function populateOverviewTab(itinerary) {
	const html = `
		<div class="overview-item"><label>Distance</label><p>${escapeModalHTML(itinerary.overview.distance)}</p></div>
		<div class="overview-item"><label>Best Season</label><p>${escapeModalHTML(itinerary.overview.bestSeason)}</p></div>
		<div class="overview-item"><label>Starting Point</label><p>${escapeModalHTML(itinerary.logistics.startPoint)}</p></div>
		<div class="overview-item"><label>Ending Point</label><p>${escapeModalHTML(itinerary.logistics.endPoint)}</p></div>
	`;
	document.getElementById('overviewContent').innerHTML = html;
}

function populateDayByDayTab(itinerary) {
	const tierConfig = getItineraryTierConfig(currentItineraryTier);
	const html = (itinerary.dayByDay || []).map((day) => `
		<div class="day-accordion">
			<div class="day-header" onclick="toggleDayAccordion(this)">
				<h4><i class="fas fa-route"></i> Day ${day.day}: ${escapeModalHTML(day.title)}</h4>
				<p class="day-meta">
					<span><i class="fas fa-shoe-prints"></i> ${escapeModalHTML(day.distance)}</span>
					<span><i class="fas fa-mountain"></i> ${escapeModalHTML(day.altitude)}</span>
					<span><i class="fas fa-clock"></i> ${escapeModalHTML(day.duration)}</span>
				</p>
			</div>
			<div class="day-details">
				<div class="detail-section"><h5><i class="fas fa-map"></i> Activities</h5><p>${escapeModalHTML(day.activities)} ${escapeModalHTML(tierConfig.activityNote)}</p></div>
				<div class="detail-section"><h5><i class="fas fa-utensils"></i> Meals</h5><p>${escapeModalHTML(day.meals)} ${escapeModalHTML(tierConfig.mealNote)}</p></div>
				<div class="detail-section"><h5><i class="fas fa-bed"></i> Accommodation</h5><p>${escapeModalHTML(day.accommodation)} ${escapeModalHTML(tierConfig.stayNote)}</p></div>
			</div>
		</div>
	`).join('');

	document.getElementById('dayByDayContent').innerHTML = `<div>${html}</div>`;
}

function populatePackingTab(itinerary) {
	const packing = itinerary.packing || {};
	const packingHTML = Object.entries(packing)
		.map(([category, items]) => `
			<div class="packing-category">
				<h4>${escapeModalHTML(category.charAt(0).toUpperCase() + category.slice(1))}</h4>
				<ul>${(items || []).map((item) => `<li><i class="fas fa-check"></i> ${escapeModalHTML(item)}</li>`).join('')}</ul>
			</div>
		`)
		.join('');
	document.getElementById('packingContent').innerHTML = packingHTML;
}

function populateCostTab(itinerary, trek) {
	const tierConfig = getItineraryTierConfig(currentItineraryTier);
	const costBreak = itinerary.costBreakdown || {};

	const estimate = typeof window.getTrekPriceEstimate === 'function' ? window.getTrekPriceEstimate(trek) : null;
	const fallbackBase = Number(costBreak.basePrice || 8500);
	const basePrice = estimate ? Number(estimate[currentItineraryTier] || estimate.standard || fallbackBase) : fallbackBase;
	const gstAmount = Math.round(basePrice * 0.05);
	const insurance = Number(costBreak.insurance || 299);
	const total = basePrice + gstAmount + insurance;

	const standardReference = estimate ? Number(estimate.standard || fallbackBase) : fallbackBase;
	const budgetPrice = estimate ? Number(estimate.budget || standardReference) : Math.round(standardReference * 0.85);
	const standardPrice = standardReference;
	const premiumPrice = estimate ? Number(estimate.premium || standardReference) : Math.round(standardReference * 1.35);

	const mergedInclusions = [...(costBreak.inclusions || []), ...tierConfig.inclusions];
	const mergedExclusions = [...(costBreak.exclusions || []), ...tierConfig.exclusions];

	const html = `
		<div class="cost-breakdown">
			<div class="cost-row"><span>Budget Package</span><strong>INR ${budgetPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Standard Package</span><strong>INR ${standardPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Premium Package</span><strong>INR ${premiumPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>${tierConfig.label} Base Price (per person)</span><strong>INR ${basePrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>GST (5%)</span><strong>INR ${gstAmount.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Travel Insurance</span><strong>INR ${insurance.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row total"><span>Total per Person (${tierConfig.label})</span><strong>INR ${total.toLocaleString('en-IN')}</strong></div>
			<div class="cost-note">Note: Prices are indicative. Seasonal availability can affect final rates.</div>
		</div>
		<div class="cost-inclusions">
			<h4><i class="fas fa-check-circle"></i> Inclusions (${tierConfig.label})</h4>
			<ul>${mergedInclusions.map((item) => `<li>${escapeModalHTML(item)}</li>`).join('')}</ul>
		</div>
		<div class="cost-exclusions">
			<h4><i class="fas fa-times-circle"></i> Exclusions (${tierConfig.label})</h4>
			<ul>${mergedExclusions.map((item) => `<li>${escapeModalHTML(item)}</li>`).join('')}</ul>
		</div>
	`;

	document.getElementById('costContent').innerHTML = html;
}

function populateSafetyTab(itinerary) {
	const safetyHTML = `
		<h4><i class="fas fa-shield"></i> Safety Guidelines</h4>
		<ul class="safety-list">${(itinerary.safetyGuidelines || []).map((guide) => `<li>${escapeModalHTML(guide)}</li>`).join('')}</ul>
		<h4 style="margin-top: 2rem;"><i class="fas fa-route"></i> How to Reach</h4>
		<p>${escapeModalHTML(itinerary.logistics.howToReach)}</p>
		<p style="margin-top: 1rem;"><strong>Nearest Airport:</strong> ${escapeModalHTML(itinerary.logistics.nearestAirport)}</p>
	`;
	document.getElementById('safetyContent').innerHTML = safetyHTML;
}

function populateFAQsTab(itinerary) {
	const faqHTML = (itinerary.faqs || []).map((faq) => `
		<div class="faq-item">
			<div class="faq-question" onclick="toggleFAQ(this)">
				<h5>${escapeModalHTML(faq.q)}</h5>
				<i class="fas fa-chevron-down"></i>
			</div>
			<div class="faq-answer"><p>${escapeModalHTML(faq.a)}</p></div>
		</div>
	`).join('');
	document.getElementById('faqsContent').innerHTML = faqHTML;
}

function toggleDayAccordion(header) {
	if (header && header.parentElement) {
		header.parentElement.classList.toggle('active');
	}
}

function toggleFAQ(element) {
	if (element && element.parentElement) {
		element.parentElement.classList.toggle('active');
	}
}

function getItineraryTierConfig(tier) {
	const configs = {
		budget: {
			label: 'Budget',
			activityNote: 'Group-paced support and essential route coordination.',
			mealNote: 'Basic but nutritious daily meal plan.',
			stayNote: 'Shared stays based on route availability.',
			note: 'Efficient itinerary with essential services.',
			inclusions: ['Shared transfers in destination circuit', 'Group support and logistics coordination'],
			exclusions: ['Private guide or dedicated concierge support', 'Premium room upgrade guarantees']
		},
		standard: {
			label: 'Standard',
			activityNote: 'Balanced schedule with comfortable pacing.',
			mealNote: 'Standard meal plan with hydration support.',
			stayNote: 'Comfort-focused stay mix based on inventory.',
			note: 'Balanced comfort and support for most travelers.',
			inclusions: ['Priority logistics coordination', 'Enhanced trip briefing and support'],
			exclusions: ['One-to-one dedicated support', 'Luxury stay guarantees across all nights']
		},
		premium: {
			label: 'Premium',
			activityNote: 'Small-group prioritization with upgraded support.',
			mealNote: 'Upgraded meals with additional snacks and recovery options.',
			stayNote: 'Premium category stays where available.',
			note: 'High-comfort itinerary with upgraded travel services.',
			inclusions: ['Dedicated local transfer coordination', 'Priority support team allocation'],
			exclusions: ['International travel to/from destination', 'Custom add-ons beyond listed package scope']
		}
	};

	return configs[tier] || configs.standard;
}

function syncItineraryTierUI() {
	const tierConfig = getItineraryTierConfig(currentItineraryTier);

	document.querySelectorAll('.package-tier-btn').forEach((button) => {
		const isActive = button.dataset.tier === currentItineraryTier;
		button.classList.toggle('active', isActive);
	});

	const noteElement = document.getElementById('itineraryPackageNote');
	if (noteElement) noteElement.textContent = tierConfig.note;
}

function setItineraryPackage(tier) {
	currentItineraryTier = tier;
	syncItineraryTierUI();

	if (!currentItin) return;
	populateDayByDayTab(currentItin);
	populateCostTab(currentItin, currentSelectedTrek);
}

function bookNowFromItinerary() {
	if (!currentSelectedTrek) return;

	closeItineraryModal();
	const tripName = encodeURIComponent(currentSelectedTrek.name || currentSelectedTrek.id || '');
	const tierKey = encodeURIComponent(currentItineraryTier);
	window.location.href = `book.html?destination=${tripName}&tier=${tierKey}`;
}

function downloadItineraryPDF() {
	const originalTitle = document.title;
	if (currentSelectedTrek && currentSelectedTrek.name) {
		document.title = `${currentSelectedTrek.name} itinerary - TripFit`;
	}
	window.print();
	document.title = originalTitle;
}

function contactGuide() {
	const tripName = currentSelectedTrek && currentSelectedTrek.name ? currentSelectedTrek.name : 'this trip';
	const subject = encodeURIComponent(`Inquiry about ${tripName} itinerary`);
	const body = encodeURIComponent(`Hello TripFit team,\n\nI would like more information about ${tripName}. Please share the next steps and availability.\n\nThanks.`);
	window.location.href = `mailto:support@tripfit.com?subject=${subject}&body=${body}`;
}

function getTripItineraryCompat(tripName) {
	const resolver = getItineraryResolver();
	if (resolver) {
		const fromMain = resolver(tripName);
		if (fromMain) return fromMain;
	}

	const trip = getDestinationsCatalog().find((item) => item.name === tripName) || null;
	if (!trip) return null;

	return {
		overview: {
			name: trip.name,
			location: trip.region || 'Destination',
			duration: 5,
			difficulty: Array.isArray(trip.trip) ? titleCase(trip.trip[0] || 'Moderate') : 'Moderate',
			altitude: Array.isArray(trip.climate) && trip.climate.includes('mountains') ? 'Medium' : 'Low',
			distance: 'Flexible route',
			bestSeason: 'Year-round (weather dependent)',
			highlights: [trip.desc, `Best for ${titleCase((trip.trip || [])[0] || 'travel')}`, `Region: ${trip.region || 'Global'}`]
		},
		dayByDay: [
			{ day: 1, title: 'Arrival and briefing', distance: 'Local transfer', altitude: 'Base level', duration: 'Half day', activities: 'Arrival, check-in, and orientation.', meals: 'Welcome meal', accommodation: 'City hotel / guesthouse' },
			{ day: 2, title: 'Core exploration', distance: 'Guided route', altitude: 'As per destination', duration: 'Full day', activities: 'Guided exploration of primary highlights.', meals: 'Breakfast and local meal options', accommodation: 'Hotel / stay option' },
			{ day: 3, title: 'Experience day', distance: 'Flexible', altitude: 'As per route', duration: 'Full day', activities: 'Experience-focused local activities and free time.', meals: 'Breakfast and dinner', accommodation: 'Hotel / stay option' },
			{ day: 4, title: 'Leisure and wrap-up', distance: 'Flexible', altitude: 'Base level', duration: 'Half to full day', activities: 'Optional add-ons and relaxed exploration.', meals: 'Breakfast', accommodation: 'Hotel / stay option' },
			{ day: 5, title: 'Departure', distance: 'Airport / station transfer', altitude: 'Base level', duration: 'Departure day', activities: 'Checkout and onward journey.', meals: 'Breakfast', accommodation: 'Departure' }
		],
		packing: {
			clothing: ['Comfortable layers', 'Weather-appropriate jacket', 'Extra socks', 'Sleepwear'],
			footwear: ['Walking shoes', 'Comfort sandals'],
			gear: ['Daypack', 'Water bottle', 'Power bank', 'ID copies'],
			essentials: ['Personal medication', 'Toiletries', 'Sunscreen', 'Travel documents']
		},
		costBreakdown: {
			basePrice: 8500,
			insurance: 299,
			inclusions: ['Stay as per package', 'Basic itinerary support', 'Local coordination'],
			exclusions: ['Personal shopping', 'Optional activities', 'Travel to destination']
		},
		safetyGuidelines: [
			'Follow your guide and local advisories.',
			'Stay hydrated and carry essentials.',
			'Keep emergency contacts handy.',
			'Avoid isolated routes at late hours.',
			'Share your route with companions.'
		],
		logistics: {
			howToReach: 'Reach by air, rail, or road depending on your destination and itinerary.',
			startPoint: trip.name,
			endPoint: trip.name,
			nearestAirport: `${trip.region || 'Nearest major city'} airport`
		},
		faqs: [
			{ q: 'Is this trip suitable for beginners?', a: 'Yes, most TripFit itineraries are planned to be beginner-friendly unless specified otherwise.' },
			{ q: 'Can I customize this itinerary?', a: 'Yes, optional customization is available based on season and availability.' },
			{ q: 'What is included in the package?', a: 'The package generally includes stay, itinerary support, and listed inclusions under cost breakdown.' },
			{ q: 'How early should I book?', a: 'Booking 2 to 4 weeks in advance is recommended for best availability and pricing.' }
		]
	};
}

function titleCase(value) {
	return String(value || '')
		.split(' ')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join(' ');
}

function escapeModalHTML(value) {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

window.createItineraryModal = createItineraryModal;
window.openItineraryModal = openItineraryModal;
window.closeItineraryModal = closeItineraryModal;
window.switchItineraryTab = switchItineraryTab;
window.toggleDayAccordion = toggleDayAccordion;
window.toggleFAQ = toggleFAQ;
window.setItineraryPackage = setItineraryPackage;
window.bookNowFromItinerary = bookNowFromItinerary;
window.downloadItineraryPDF = downloadItineraryPDF;
window.contactGuide = contactGuide;
