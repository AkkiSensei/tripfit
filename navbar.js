<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Destinations • TripFit</title>
    
    <link rel="icon" href="logo/TripFit_logo2-removebg-preview.png" type="image/png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        mint: '#2dd4bf',
                        teal: '#14b8a6',
                        juniper: '#0f373b',
                        pearl: '#f8f9fa',
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
    </style>
</head>
<body class="bg-pearl dark:bg-gray-900 min-h-screen flex flex-col text-gray-800 dark:text-gray-100 transition-colors duration-300">

    <header id="tripfit-navbar"></header>

    <section class="bg-white dark:bg-gray-800 py-16 px-6 text-center border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-extrabold text-juniper dark:text-white tracking-tight mb-4">Explore the World</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">Browse our complete catalog of handpicked global destinations. Filter by vibe, climate, or budget to find your next adventure.</p>
        </div>
    </section>

    <section class="py-16 px-6 flex-1">
        <div class="max-w-7xl mx-auto">
            
            <div class="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="text-sm font-bold text-gray-500 uppercase tracking-wider pl-2">20 Destinations Found</div>
                <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <button class="px-4 py-2 bg-juniper text-white text-sm font-bold rounded-full">All</button>
                    <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-mint hover:text-juniper text-sm font-bold rounded-full transition-colors">Beach</button>
                    <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-mint hover:text-juniper text-sm font-bold rounded-full transition-colors">Mountains</button>
                    <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-mint hover:text-juniper text-sm font-bold rounded-full transition-colors">City</button>
                </div>
            </div>

            <div id="catalog-container" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                </div>
            
        </div>
    </section>

    <footer class="bg-juniper text-center py-8 border-t border-teal/20 mt-auto">
        <p class="text-gray-400 text-sm">&copy; 2026 TripFit • Fueling wanderlust for dreamers and explorers worldwide.</p>
    </footer>

    <script src="script.js"></script>
    <script src="navbar.js"></script>
    
    <script>
        // Global Theme Toggle Logic with Memory
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        // Check memory on load
        if (localStorage.getItem('tripfit-theme') === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        // Handle toggle click
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                
                if (document.documentElement.classList.contains('dark')) {
                    localStorage.setItem('tripfit-theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('tripfit-theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
        }

        // Render the Full Catalog
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('catalog-container');
            
            // Loop through the entire destinations array and build the HTML
            // Pass 'false' so the "Match %" badge does not appear here
            const catalogHTML = destinations.map(dest => buildCardHTML(dest, false)).join('');
            
            container.innerHTML = catalogHTML;
        });
    </script>
</body>
</html>
