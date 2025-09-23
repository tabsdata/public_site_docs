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

if (window.location.hostname === "docs.tabsdata.com") {
    // Insert your GTag snippet here
    (function() {
      var gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QEJPE16TH2';
      document.head.appendChild(gtagScript);
  
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-QEJPE16TH2');
    })();
  }
