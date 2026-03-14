# TripFit | Travel Style Matcher

> **Stop guessing. Start exploring.** > Traditional travel websites only focus on booking flights and hotels. TripFit is a dynamic travel recommendation web application that helps users discover destinations tailored to their personal travel style through an interactive personality quiz.

![TripFit Preview](logo/TripFit_logo2-removebg-preview.png)

---

## Key Features
* **Secure Authentication UI:** A modern login gateway and 6-digit OTP verification interface.
* **Interactive Personality Quiz:** A seamless, no-scroll 6-step questionnaire utilizing custom sliders and premium grid layouts to analyze user preferences (climate, trip pace, budget, companions, activities, and duration).
* **Dynamic Recommendation Engine:** Client-side JavaScript logic that scores, ranks, and filters a database of 20 curated global destinations to find the user's top 3 matches.
* **Detailed Destination Profiles:** Dynamically rendered full-page destination views featuring custom 3-day itineraries, local tips, and breakdown scores based on URL parameters.
* **Persistent Theme Toggling:** A global dark/light mode toggle that saves user preferences across all pages using browser local storage.
* **Responsive Design:** A fully responsive, modern UI built with Tailwind CSS, featuring a custom mint (`#2dd4bf`) and dark juniper (`#0f373b`) color system.

---

## Tech Stack (Phase 1 - Frontend Prototype)
This project is currently built as a lightweight, lightning-fast Client-Side Single Page Application (SPA) prototype:
* **Frontend Structure:** HTML5
* **Styling:** Tailwind CSS, FontAwesome
* **Logic & Data:** Vanilla JavaScript (ES6), DOM Manipulation, Local Storage

---

## Project Structure
* `index.html` - The secure login gateway (Default entry point).
* `verify.html` - The 6-digit OTP email verification UI mockup.
* `home.html` - The main landing page and project introduction.
* `quiz.html` - The interactive travel personality questionnaire.
* `recommendation.html` - Displays the user's customized top 3 destination matches based on quiz parameters.
* `all-destinations.html` - A complete, filter-ready catalog of all 20 global destinations.
* `destination.html` - A dynamic template page that loads specific destination details, itineraries, and high-res images based on URL queries.
* `script.js` - Contains the destination database array, quiz grading logic, and dynamic HTML rendering functions.

---

## How to Run Locally
Because TripFit Phase 1 is a client-side application, running it locally on your machine is incredibly simple.

1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/AkkiSensei/tripfit.git](https://github.com/AkkiSensei/tripfit.git)
