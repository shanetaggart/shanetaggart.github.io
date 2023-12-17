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

}


export function generateTableOfContents(parentNode, contentClass, tableClass) {
    
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
    
    string = string.replaceAll(' ', '-');
    string = string.toLowerCase();
    
    return string;

}


export function watchElementPosition(entries) {
    
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

