document.addEventListener("DOMContentLoaded", function () {
    function updateTOC() {
        let sections = document.querySelectorAll("section");
        let navLinks = document.querySelectorAll(".bd-toc nav ul li a");

        let scrollPosition = window.scrollY + 150; // Increased offset for better detection

        let activeSection = null;

        sections.forEach(section => {
            let top = section.offsetTop;
            let height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                activeSection = section;
            }
        });

        // First, remove all active classes
        navLinks.forEach(link => {
            link.classList.remove("active");
            link.parentElement.classList.remove("active");
        });

        if (activeSection) {
            let id = activeSection.getAttribute("id");
            if (id) {
                let activeLink = document.querySelector(`.bd-toc nav ul li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                    
                    // Expand all parent sections
                    let parent = activeLink.parentElement;
                    while (parent && parent.tagName !== 'NAV') {
                        if (parent.tagName === 'LI') {
                            parent.classList.add("active");
                        }
                        parent = parent.parentElement;
                    }
                }
            }
        }
    }

    window.addEventListener("scroll", updateTOC);
    updateTOC(); // Run initially in case page loads at a scrolled position
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('copybtn')) {
        console.log('Copy button clicked! Sending event to GA...');
        gtag('event', 'copy_code', {
            'event_category': 'interaction',
            'event_label': window.location.pathname
        });
    }
});
