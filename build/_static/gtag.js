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