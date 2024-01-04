/**
 * ####################
 * # Helper Functions #
 * ####################
 * 
 * This file contains all of the helper functions for main.js.
 */

export function checkForMobile(mobileBreakpointWidth) {
    /**
     * Compares the width of the viewport with the provided
     * mobile breakpoint width, to determine if the page is
     * loaded on a mobile device.
     * 
     * @param  {Integer} mobileBreakpointWidth The mobile breakpoint width.
     * @return {Boolean} Will return false if viewport is larger than the
     *                   breakpoint, will return true if it is less than or
     *                   equal to the breakpoint.
     */
    
    const htmlElement = document.querySelector('html');
    const viewportWidth = htmlElement.clientWidth;
    
    let isMobileDevice = false;
    
    viewportWidth > mobileBreakpointWidth ? isMobileDevice = false: isMobileDevice = true;
    
    return isMobileDevice;

}


export function generateTableOfContents(parentNode, contentClass, tableClass) {
    /**
     * Generates and inserts the HTML structure for the Table of Contents (ToC).
     * 
     * @param   {String} parentNode   The class of the parent node that the
     *                                ToC should appear in as a child element.
     * @param   {String} contentClass The class of the sibling element that
     *                                the ToC should appear along side of.
     * @param   {String} tableClass   The class that must be added to the ToC.
     */

    let parent = document.querySelector(parentNode);
    let content = document.querySelector(contentClass);

    let tableOfContents = document.createElement('nav');
    let unorderedList = document.createElement('ul');

    let articles = [...content.children];

    articles.forEach((article) => {

        let currentArticleHeading = article.querySelector('h4');
        let articleHeading = currentArticleHeading.innerText;

        let articleId = sanitizeID(articleHeading);
        
        currentArticleHeading.parentElement.id = articleId;

        let listItem = document.createElement('li');
        let anchor = document.createElement('a');

        anchor.href = '#' + articleId;
        anchor.innerText = articleHeading;

        listItem.appendChild(anchor);
        unorderedList.appendChild(listItem);

    });

    tableOfContents.classList.add(tableClass);
    tableOfContents.appendChild(unorderedList);

    parent.insertBefore(tableOfContents, content);

}

export function sanitizeID(string) {
    /**
     * Santizes a string to be used as an ID. Spaces are replaced
     * with hyphens, and all text is converted to lowercase.
     * 
     * @param  {String} string Text to apply the sanitization to.
     * @return  {String} The sanitized text to be used as an ID.
     */

    string = string.replaceAll(' ', '-');
    string = string.toLowerCase();
    
    return string;

}


export function watchElementPosition(entries) {
    /**
     * Watches elements to that apply and remove an active class
     * as necessary.
     * 
     * @param  {String} entries The entries from an Intersection Observer.
     */

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            let entryElementName = entry.target.nodeName;
            let parent, currentActiveElement, newActiveId = null;

            if (entryElementName == 'H3') {
    
                parent = document.querySelector('header nav');
    
            } else if (entryElementName == 'H4') {
    
                parent = document.querySelector('.work-section__table-of-contents');
    
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

