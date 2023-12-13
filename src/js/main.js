addEventListener("DOMContentLoaded", (event) => {
    /**
     * ####################
     * # Console Messages #
     * ####################
     */

    const welcome = '%cAhoy! \u26F5\n';
    const welcomeStyle = 'font-size: 2rem;';
    const intro = `%cWelcome to my portfolio website! I hope you have fun looking around.\n
If you have any questions, please feel free to contact me!\n
By the way, if you want to turn the flashlight effect off, try double-clicking!`;
    const introStyle = 'font-size: 1.25rem;';
    console.log(welcome + intro, welcomeStyle, introStyle);

    /**
     * #####################
     * # Cursor Flashlight #
     * #####################
     */

    const isMobile = navigator.userAgentData.mobile;
    const light = document.getElementById('light');
    const lightOn = '0.4';
    const lightOff = '0';
    let lightSwitch = true;

    if (isMobile) {
        const detailsAndNav = document.querySelector('.details-and-nav');
        const middleXAdjustment = -80;
        const middleX = detailsAndNav.offsetLeft + detailsAndNav.offsetWidth / 2 + middleXAdjustment;
        const middleY = detailsAndNav.offsetTop + detailsAndNav.offsetHeight / 2;
        light.style.left = `${middleX}px`;
        light.style.top = `${middleY}px`;
        light.style.opacity = lightOn;
    } else {
        document.addEventListener("mouseenter", (event) => {
            lightSwitch ? light.style.opacity = lightOn : null;
        });
        
        document.addEventListener('mousemove', (event) => {
            light.style.left = `${event.clientX}px`;
            light.style.top = `${event.clientY + window.scrollY}px`;
        });
        
        document.addEventListener('mouseleave', (event) => {
            lightSwitch ? light.style.opacity = lightOff : null;
        });
        
        document.addEventListener('click', (event) => {
            if (event.detail === 2) {
                light.style.opacity == lightOff ?
                (light.style.opacity = lightOn, lightSwitch = true) :
                (light.style.opacity = lightOff, lightSwitch = false);
            }
        });
    }

    /**
     * #################
     * # Sticky Header #
     * #################
     */
    const header = document.querySelector('header');
    window.addEventListener('scroll', (event) => {
        window.scrollY > 0 ?
        (header.style.boxShadow = '0px 1px 1px 1px rgba(255, 255, 255, 0.05)', header.style.backdropFilter = 'blur(15px)') :
        (header.style.boxShadow = 'none', header.style.backdropFilter = 'none');
    });

    /**
     * #################
     * # Project Cards #
     * #################
     */

    const projectCards = document.querySelectorAll('.content-sections__projects-card');

    projectCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            card.classList.toggle('flipped');
        });
    });

    /**
     * #####################
     * # Table of Contents #
     * #####################
     */

    const tableOfContents = document.getElementById('table-of-contents');
    const articlesToObserve = document.querySelectorAll('.content-sections__work article');
    const tableOfContentsOptions = { threshold: 1, rootMargin: '0px 0px -20% 0px' };

    const tableOfContentsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let currentActiveListItem = tableOfContents.querySelector('.active');
                
                if (currentActiveListItem) {
                    currentActiveListItem.classList.remove('active');
                }
                
                newActiveId = entry.target.id;
                newActiveListItem = tableOfContents.querySelector('a[href="#' + newActiveId + '"]');
                newActiveListItem.firstElementChild.classList.add('active');
            }
        });
    }, tableOfContentsOptions);

    articlesToObserve.forEach((article) => {
        tableOfContentsObserver.observe(article);
    });

});