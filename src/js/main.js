
/**
 * ####################
 * # Global Variables #
 * ####################
 */

const mobileBreakpointWidth = 767;
const isMobileDevice = checkForMobile(mobileBreakpointWidth);


/**
 * ####################
 * # Console Messages #
 * ####################
 */

// Is there a better way to write this?
const welcome = '%cAhoy! \u26F5\n';
const welcomeStyle = 'font-size: 2rem;';
const intro = `%cWelcome to my portfolio website! I hope you have fun looking around.\n
If you have any questions, please feel free to contact me!\n
By the way, if you want to turn the flashlight effect off, try double-clicking!`;
const introStyle = 'font-size: 1.25rem;';
console.log(welcome + intro, welcomeStyle, introStyle);


addEventListener("DOMContentLoaded", (event) => {
    
    /**
     * #################
     * # Sticky Header #
     * #################
     */
    
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const headings = document.querySelectorAll('main h3');
    const headingOptions = { threshold: 1, rootMargin: '0px 0px -40% 0px' };
    let scrollThrottle = false;

    /**
     * Can this be more performant without checking every pixel scrolled?
     * The animation frame would cover it if it was busy enough, but
     * even so it sill doesn't need to check every single pixel,
     * just the first and last one. 
    */
    document.addEventListener("scroll", (event) => {
        scrollPosition = window.scrollY;
        if (!scrollThrottle) {
            window.requestAnimationFrame(() => {
                if (scrollPosition > 0) {
                    header.classList.add('site-header--shadow');
                } else {
                    header.classList.remove('site-header--shadow');
                }
                scrollThrottle = false;
            });
            scrollThrottle = true;
        }
    });

    // There are two observers that do basically the same thing minus a couple of operations...
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let currentActiveNavItem = nav.querySelector('.active');
    
                if (currentActiveNavItem) {
                    currentActiveNavItem.classList.remove('active');
                }
                    
                newActiveId = entry.target.closest('section').id;
                newActiveNavItem = nav.querySelector('a[href="#' + newActiveId + '"]');
                newActiveNavItem.classList.add('active');
            }
        });
    }, headingOptions);

    headings.forEach((heading) => {
        headingObserver.observe(heading);
    });


    /**
     * #################
     * # Project Cards #
     * #################
     */

    const projectCards = document.querySelectorAll('.projects-card');

    projectCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            card.classList.toggle('flipped');
        });
    });

});


addEventListener("load", (event) => {
    
    /**
     * #####################
     * # Cursor Flashlight #
     * #####################
     */

    const light = document.getElementById('light');
    // These should be classes that get added/removed, instead of doing inline styles.
    const lightOn = '0.4';
    const lightOff = '0';

    let lightSwitch = true;

    if (isMobileDevice) {
        const heroSection = document.querySelector('.hero-section');
        const middleXAdjustment = -80;
        const middleX = heroSection.offsetLeft + heroSection.offsetWidth / 2 + middleXAdjustment;
        const middleY = heroSection.offsetTop + heroSection.offsetHeight / 2;
        light.style.left = `${middleX}px`;
        light.style.top = `${middleY}px`;
        light.style.opacity = lightOn;
    } else {
        document.querySelector('body').addEventListener("mouseenter", (event) => {
            lightSwitch ? light.style.opacity = lightOn : null;
        });
        
        document.querySelector('body').addEventListener('mousemove', (event) => {
            light.style.left = `${event.clientX}px`;
            light.style.top = `${event.clientY + window.scrollY}px`;
        });
        
        document.querySelector('body').addEventListener('mouseleave', (event) => {
            lightSwitch ? light.style.opacity = lightOff : null;
        });
        
        document.querySelector('body').addEventListener('click', (event) => {
            if (event.detail === 2) {
                light.style.opacity == lightOff ?
                (light.style.opacity = lightOn, lightSwitch = true) :
                (light.style.opacity = lightOff, lightSwitch = false);
            }
        });
    }


    /**
     * #####################
     * # Table of Contents #
     * #####################
     */

    const tableOfContents = document.getElementById('table-of-contents');
    const articlesToObserve = document.querySelectorAll('.work-section article h4');
    const tableOfContentsOptions = { threshold: 1, rootMargin: '0px 0px -20% 0px' };

    const tableOfContentsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let currentActiveListItem = tableOfContents.querySelector('.active');
                
                if (currentActiveListItem) {
                    currentActiveListItem.classList.remove('active');
                }
                
                newActiveId = entry.target.parentElement.id;
                newActiveListItem = tableOfContents.querySelector('a[href="#' + newActiveId + '"]');
                newActiveListItem.parentElement.classList.add('active');
            }
        });
    }, tableOfContentsOptions);

    articlesToObserve.forEach((article) => {
        tableOfContentsObserver.observe(article);
    });

});


/**
 * ####################
 * # Helper Functions #
 * ####################
 */

// Is this very truly necessary? Why can't it be CSS?
function checkForMobile(mobileBreakpointWidth) {
    const htmlElement = document.querySelector('html');
    let isMobileDevice = false;
    const viewportWidth = htmlElement.clientWidth;
    viewportWidth > mobileBreakpointWidth ? isMobileDevice = false: isMobileDevice = true;
    return isMobileDevice;
};

