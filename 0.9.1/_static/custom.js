document.addEventListener("DOMContentLoaded", function () {
    // TOC Update Logic
    function updateTOC() {
        let sections = document.querySelectorAll("section");
        let navLinks = document.querySelectorAll(".bd-toc nav ul li a");

        let scrollPosition = window.scrollY + 150;

        let activeSection = null;
        sections.forEach(section => {
            let top = section.offsetTop;
            let height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                activeSection = section;
            }
        });

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
    updateTOC();

    // Copy Button Tracking (Using Event Delegation)
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('copybtn')) {
            gtag('event', 'copy_code', {
                'event_category': 'interaction',
                'event_label': window.location.pathname
            });
        }
    });
});
