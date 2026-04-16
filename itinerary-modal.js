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
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('itinerary', this)">Day by day</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('packing', this)">Packing list</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('cost', this)">Cost breakdown</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('safety', this)">Safety & facts</button>
				<button class="itinerary-tab-btn" onclick="switchItineraryTab('faqs', this)">FAQs</button>
			</div>

			<div class="itinerary-content">
				<div id="overviewTab" class="itinerary-tab-content active">
					<div class="itinerary-section">
						<h3><i class="fas fa-info-circle"></i> Trip overview</h3>
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
					<i class="fas fa-check-circle"></i> Book this trip
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

function cloneItineraryData(itinerary) {
	try {
		return JSON.parse(JSON.stringify(itinerary));
	} catch {
		return itinerary;
	}
}

function getRequestedTripDays() {
	const params = new URLSearchParams(window.location.search);
	const fromQuery = Number(params.get('days') || params.get('duration') || 0);

	if (!Number.isNaN(fromQuery) && fromQuery >= 2) {
		return Math.round(fromQuery);
	}

	return null;
}

function adaptItineraryToRequestedDays(itinerary, requestedDays) {
	if (!itinerary || !requestedDays) return itinerary;

	const dayPlan = Array.isArray(itinerary.dayByDay) ? itinerary.dayByDay : [];
	const baseDays = Number(itinerary.overview && itinerary.overview.duration) || dayPlan.length || requestedDays;
	const targetDays = Math.max(2, Math.round(requestedDays));

	let adaptedPlan = dayPlan.map((day) => ({ ...day }));

	if (adaptedPlan.length > targetDays) {
		adaptedPlan = adaptedPlan.slice(0, targetDays);
	}

	if (adaptedPlan.length < targetDays) {
		const template = adaptedPlan[adaptedPlan.length - 1] || {
			title: 'Exploration day',
			distance: 'Flexible route',
			altitude: 'As per destination',
			duration: 'Full day',
			activities: 'Guided sightseeing and local experiences.',
			meals: 'Breakfast and dinner',
			accommodation: 'Hotel / stay option'
		};

		for (let dayNumber = adaptedPlan.length + 1; dayNumber <= targetDays; dayNumber += 1) {
			const isLastDay = dayNumber === targetDays;
			adaptedPlan.push({
				...template,
				title: isLastDay ? 'Departure and wrap-up' : `Exploration day ${dayNumber}`,
				distance: isLastDay ? 'Departure transfer' : template.distance,
				duration: isLastDay ? 'Half day' : template.duration,
				activities: isLastDay
					? 'Checkout, transfer, and return journey.'
					: 'Extended exploration, optional activities, and local experiences.'
			});
		}
	}

	adaptedPlan = adaptedPlan.map((day, index) => ({ ...day, day: index + 1 }));

	itinerary.dayByDay = adaptedPlan;
	itinerary.overview.duration = targetDays;
	itinerary.meta = {
		...(itinerary.meta || {}),
		baseDays,
		requestedDays: targetDays,
		durationMultiplier: baseDays > 0 ? targetDays / baseDays : 1
	};

	return itinerary;
}

function openItineraryModal(trekName) {
	createItineraryModal();

	const rawItinerary = getTripItineraryCompat(trekName);
	if (!rawItinerary) {
		alert('Trip details not found');
		return;
	}

	const requestedDays = getRequestedTripDays();
	const itinerary = adaptItineraryToRequestedDays(cloneItineraryData(rawItinerary), requestedDays);

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
	const itineraryMeta = itinerary.meta || {};

	const baseDays = Number(itineraryMeta.baseDays || itinerary.overview.duration || (itinerary.dayByDay || []).length || 5);
	const requestedDays = Number(itineraryMeta.requestedDays || itinerary.overview.duration || baseDays);
	const durationMultiplier = baseDays > 0 ? requestedDays / baseDays : 1;

	const estimate = typeof window.getTrekPriceEstimate === 'function' ? window.getTrekPriceEstimate(trek) : null;
	const fallbackBase = Number(costBreak.basePrice || 8500);
	const tierBase = estimate ? Number(estimate[currentItineraryTier] || estimate.standard || fallbackBase) : fallbackBase;
	const basePrice = Math.round(tierBase * durationMultiplier);
	const gstAmount = Math.round(basePrice * 0.05);
	const insuranceBase = Number(costBreak.insurance || 299);
	const insurance = Math.round(insuranceBase * Math.max(durationMultiplier, 1));
	const total = basePrice + gstAmount + insurance;

	const standardReference = estimate ? Number(estimate.standard || fallbackBase) : fallbackBase;
	const budgetReference = estimate ? Number(estimate.budget || standardReference) : Math.round(standardReference * 0.85);
	const premiumReference = estimate ? Number(estimate.premium || standardReference) : Math.round(standardReference * 1.35);
	const budgetPrice = Math.round(budgetReference * durationMultiplier);
	const standardPrice = Math.round(standardReference * durationMultiplier);
	const premiumPrice = Math.round(premiumReference * durationMultiplier);

	const mergedInclusions = [...(costBreak.inclusions || []), ...tierConfig.inclusions];
	const mergedExclusions = [...(costBreak.exclusions || []), ...tierConfig.exclusions];

	const html = `
		<div class="cost-breakdown">
			<div class="cost-row"><span>Budget package (${requestedDays} days)</span><strong>INR ${budgetPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Standard package (${requestedDays} days)</span><strong>INR ${standardPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Premium package (${requestedDays} days)</span><strong>INR ${premiumPrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>${tierConfig.label} base price (per person, ${requestedDays} days)</span><strong>INR ${basePrice.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>GST (5%)</span><strong>INR ${gstAmount.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row"><span>Travel Insurance</span><strong>INR ${insurance.toLocaleString('en-IN')}</strong></div>
			<div class="cost-row total"><span>Total per person (${tierConfig.label})</span><strong>INR ${total.toLocaleString('en-IN')}</strong></div>
			<div class="cost-note">Note: Prices are indicative. Trip duration and seasonal availability can affect final rates.</div>
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
	const params = new URLSearchParams(window.location.search);
	const companions = encodeURIComponent(params.get('companions') || '');
	const days = encodeURIComponent(params.get('days') || params.get('duration') || '');
	window.location.href = `book.html?destination=${tripName}&tier=${tierKey}&companions=${companions}&days=${days}`;
}

function formatINR(value) {
	const amount = Number(value || 0);
	return `INR ${amount.toLocaleString('en-IN')}`;
}

function buildItineraryPrintHTML() {
	const tripName = escapeModalHTML((currentSelectedTrek && currentSelectedTrek.name) || (currentItin && currentItin.overview && currentItin.overview.name) || 'Trip itinerary');
	const overview = (currentItin && currentItin.overview) || {};
	const dayByDay = Array.isArray(currentItin && currentItin.dayByDay) ? currentItin.dayByDay : [];
	const cost = (currentItin && currentItin.costBreakdown) || {};

	const dayRows = dayByDay.map((day) => {
		return `
			<tr>
				<td>${escapeModalHTML(day.day || '-')}</td>
				<td>${escapeModalHTML(day.title || '-')}</td>
				<td>${escapeModalHTML(day.activities || '-')}</td>
			</tr>
		`;
	}).join('');

	const inclusions = Array.isArray(cost.inclusions) ? cost.inclusions.map((item) => `<li>${escapeModalHTML(item)}</li>`).join('') : '<li>-</li>';
	const exclusions = Array.isArray(cost.exclusions) ? cost.exclusions.map((item) => `<li>${escapeModalHTML(item)}</li>`).join('') : '<li>-</li>';

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${tripName} itinerary - TripFit</title>
	<style>
		body { font-family: Arial, sans-serif; color: #1f2937; margin: 28px; line-height: 1.45; }
		h1 { margin: 0 0 8px; font-size: 28px; }
		h2 { margin: 24px 0 8px; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
		p { margin: 4px 0; }
		.meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px 14px; margin-top: 10px; }
		table { width: 100%; border-collapse: collapse; margin-top: 10px; }
		th, td { border: 1px solid #e5e7eb; text-align: left; padding: 8px; font-size: 13px; vertical-align: top; }
		th { background: #f8fafc; }
		ul { margin: 8px 0 0; padding-left: 20px; }
		.footer { margin-top: 28px; font-size: 12px; color: #6b7280; }
	</style>
</head>
<body>
	<h1>${tripName}</h1>
	<p>Generated by TripFit itinerary planner</p>

	<div class="meta">
		<p><strong>Location:</strong> ${escapeModalHTML(overview.location || '-')}</p>
		<p><strong>Duration:</strong> ${escapeModalHTML(overview.duration || '-')}</p>
		<p><strong>Difficulty:</strong> ${escapeModalHTML(overview.difficulty || '-')}</p>
		<p><strong>Package tier:</strong> ${escapeModalHTML(titleCase(currentItineraryTier || 'standard'))}</p>
	</div>

	<h2>Overview</h2>
	<p>${escapeModalHTML((overview.highlights && overview.highlights[0]) || 'Personalized itinerary details.')}</p>

	<h2>Day-by-day plan</h2>
	<table>
		<thead>
			<tr>
				<th>Day</th>
				<th>Title</th>
				<th>Activities</th>
			</tr>
		</thead>
		<tbody>
			${dayRows || '<tr><td>-</td><td>-</td><td>-</td></tr>'}
		</tbody>
	</table>

	<h2>Cost summary</h2>
	<p><strong>Base price:</strong> ${formatINR(cost.basePrice)}</p>
	<p><strong>Insurance:</strong> ${formatINR(cost.insurance)}</p>
	<p><strong>Total (est.):</strong> ${formatINR(Number(cost.basePrice || 0) + Number(cost.insurance || 0))}</p>

	<h2>Inclusions</h2>
	<ul>${inclusions}</ul>

	<h2>Exclusions</h2>
	<ul>${exclusions}</ul>

	<p class="footer">TripFit • Safe travels and happy exploring.</p>
</body>
</html>`;
}

function downloadItineraryPDF() {
	if (!currentItin && !currentSelectedTrek) return;

	const printWindow = window.open('', '_blank', 'width=980,height=780');
	if (!printWindow) {
		window.print();
		return;
	}

	printWindow.document.open();
	printWindow.document.write(buildItineraryPrintHTML());
	printWindow.document.close();
	printWindow.focus();

	printWindow.onload = function () {
		printWindow.print();
		printWindow.onafterprint = function () {
			printWindow.close();
		};
	};
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

