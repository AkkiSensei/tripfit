# TripFit | Travel Style Matcher

> **Stop guessing. Start exploring.** > Traditional travel websites only focus on booking flights and hotels. TripFit is a dynamic travel recommendation web application that helps users discover destinations tailored to their personal travel style through an interactive personality quiz.

![TripFit Preview](logo/TripFit_logo2-removebg-preview.png)

## Live Demo
*Check out the live deployment on Vercel: **[Insert Your Vercel Link Here]***

---

## Key Features
* **Interactive Personality Quiz:** A seamless, 5-step questionnaire analyzing user preferences (climate, trip pace, budget, companions, and activities).
* **Dynamic Recommendation Engine:** Client-side JavaScript logic that scores, ranks, and filters a database of 20 curated global destinations to find the user's top 3 matches.
* **Detailed Destination Profiles:** Dynamically rendered full-page destination views (`destination.html?id=...`) featuring custom itineraries, local tips, and breakdown scores based on URL parameters.
* **Responsive Design:** A fully responsive, modern UI built with CSS Grid and Flexbox, featuring a custom mint (`#2dd4bf`) and dark juniper (`#0f373b`) color system.

---

## Tech Stack
This project is currently built as a lightweight, lightning-fast Client-Side Single Page Application (SPA) prototype:
* **Frontend Structure:** HTML5
* **Styling:** CSS3 (Custom variables, Grid, Flexbox, Animations)
* **Logic & Data:** Vanilla JavaScript (ES6) 
* **Deployment:** Vercel

---

## Project Structure
* `index.html` - The landing page and project introduction.
* `quiz.html` - The interactive travel personality questionnaire.
* `recommendation.html` - Displays the user's customized top 3 destination matches.
* `all-destinations.html` - A complete, sortable catalog of all 20 global destinations.
* `destination.html` - A dynamic template page that loads specific destination details, itineraries, and high-res images based on URL queries.
* `script.js` - Contains the destination database array, quiz grading logic, and DOM manipulation functions.
* `style.css` - Global stylesheet.

---

## How to Run Locally
Because TripFit is a client-side application without a heavy backend framework, running it locally is incredibly simple.

1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/AkkiSensei/tripfit.git](https://github.com/AkkiSensei/tripfit.git)
