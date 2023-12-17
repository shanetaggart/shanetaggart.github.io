/**
 * ####################
 * # Helper Functions #
 * ####################
 */

export function checkForMobile(mobileBreakpointWidth) {
    
    const htmlElement = document.querySelector('html');
    const viewportWidth = htmlElement.clientWidth;
    
    let isMobileDevice = false;
    
    viewportWidth > mobileBreakpointWidth ? isMobileDevice = false: isMobileDevice = true;
    
    return isMobileDevice;

};

export function watchElementPosition(entries) {
    
    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            let entryElementName = entry.target.nodeName;
            let parent, currentActiveElement, newActiveId = null;

            if (entryElementName == 'H3') {
    
                parent = document.querySelector('header nav');
    
            } else if (entryElementName == 'H4') {
    
                parent = document.querySelector('#table-of-contents');
    
            }
            
            if (parent) {
         
                currentActiveElement = parent.querySelector('.active');
         
            }
            
            if (currentActiveElement) {
         
                currentActiveElement.classList.remove('active');
         
            }

            if (entryElementName == 'H3') {
         
                newActiveId = entry.target.closest('section').id;
         
            } else if (entryElementName == 'H4') {
         
                newActiveId = entry.target.parentElement.id;
         
            }

            let newActiveElement = parent.querySelector('a[href="#' + newActiveId + '"]');

            if (entryElementName == 'H3') {
         
                newActiveElement.classList.add('active');
         
            } else if (entryElementName == 'H4') {
         
                newActiveElement.parentElement.classList.add('active');
         
            }

        }

    });
}

