import { checkForMobile, watchElementPosition } from  './helpers.js';

/**
 * ####################
 * # Console Messages #
 * ####################
 */

const welcome = '%cAhoy! \u26F5\n';
const welcomeStyle = 'font-size: 2rem;';
const intro = `%cWelcome to my portfolio website! I hope you have fun looking around.\n\nIf you have any questions, please feel free to contact me!\n\nBy the way, if you want to turn the flashlight effect off, try double-clicking!`;
const introStyle = 'font-size: 1.25rem;';

console.log(welcome + intro, welcomeStyle, introStyle);


/**
 * ####################
 * # Global Variables #
 * ####################
 */

const mobileBreakpointWidth = 767;
const isMobileDevice = checkForMobile(mobileBreakpointWidth);


addEventListener("DOMContentLoaded", (event) => {
    


    /**
     * #################
     * # Sticky Header #
     * #################
     */
    
    const header = document.querySelector('header');
    
    let scrollThrottle = false;

    document.addEventListener("scroll", (event) => {
        
        let scrollPosition = window.scrollY;

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

    
    /**
     * #####################
     * # Cursor Flashlight #
     * #####################
     */

    const flashlight = document.getElementById('flashlight');
    const lightOn = '0.4';
    const lightOff = '0';
    
    let lightSwitch = true;

    if (!isMobileDevice) {

        document.querySelector('body').addEventListener("mouseenter", (event) => {

            lightSwitch ? flashlight.style.opacity = lightOn : null;

        });
        
        document.querySelector('body').addEventListener('mousemove', (event) => {
            
            flashlight.style.left = `${event.clientX}px`;
            flashlight.style.top = `${event.clientY + window.scrollY}px`;

        });
        
        document.querySelector('body').addEventListener('mouseleave', (event) => {

            lightSwitch ? flashlight.style.opacity = lightOff : null;

        });
        
        document.querySelector('body').addEventListener('click', (event) => {

            if (event.detail === 2) {

                flashlight.style.opacity == lightOff ?
                (flashlight.style.opacity = lightOn, lightSwitch = true) :
                (flashlight.style.opacity = lightOff, lightSwitch = false);

            }

        });

    }


    /**
     * ##########################
     * # Intersection Observers #
     * ##########################
     */

    const articlesToObserve = document.querySelectorAll('.work-section article h4');
    const tableOfContentsOptions = { rootMargin: '0px 0px -20% 0px', threshold: 1 };
    
    const tableOfContentsObserver = new IntersectionObserver(watchElementPosition, tableOfContentsOptions);

    articlesToObserve.forEach((article) => { tableOfContentsObserver.observe(article); });
    
    const headings = document.querySelectorAll('main h3');
    const headingOptions = { rootMargin: '0px 0px -40% 0px', threshold: 1 };
    
    const headingObserver = new IntersectionObserver(watchElementPosition, headingOptions);

    headings.forEach((heading) => { headingObserver.observe(heading); });


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

