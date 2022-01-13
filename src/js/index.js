// import modules
const ready = require('document-ready');

// set constants
const ACTIVE_CLASS = 'active';
const INTERSECTION_OBSERVER_OPTIONS = {
    rootMargin: '0px',
    threshold: 0.9
}
// wait for DOM to be ready
ready(() => {
    
    // store our DOM elements
    const scrollEls = document.querySelectorAll('.scroll-section');
    const navContainerEl = document.querySelector('.nav-links');
    const navEls = document.querySelectorAll('.nav-links li');
    const navElsCount = navEls.length;

    let buttonClicked = false; 
    
    // add click event listeners
    navEls.forEach((navEl, index) => {

        navEl.querySelector('a').addEventListener("click", ()=> {
            buttonClicked = true;

            setTimeout(() => {
                buttonClicked = false;
            }, 500);
        });
    });


    const callback = (entries, observer) => {
        
        const entryId = entries[0].target.id || '';
        const totalWidth = navContainerEl.innerWidth || navContainerEl.clientWidth;

        // loop through els
        navEls.forEach((navEl, index) => {

            const hrefElHashValue = navEl.querySelector('a').getAttribute('href').replace('#', '');
            
            // add or remove active class based on matching scrolled-to log entry
            if (hrefElHashValue == entryId) {
               navEl.classList.add(ACTIVE_CLASS); 
               if (!buttonClicked) navContainerEl.scrollLeft = getScrollPostion(totalWidth, navEl.innerWidth || navEl.clientWidth, index, navElsCount);
            } 
            else navEl.classList.remove(ACTIVE_CLASS);
        })

    }
      
    const observer = new IntersectionObserver(callback, INTERSECTION_OBSERVER_OPTIONS);

    scrollEls.forEach(item => {
        observer.observe(item);
    })

});

const getScrollPostion = (totalWidth, itemWidth, index, total) => {
 console.log(totalWidth, itemWidth, index, total)
 
    const middleValue = totalWidth / 2;
    const currentPosition = (index * itemWidth) + (itemWidth / 2);
   // console.log(currentPosition, middleValue)
    if (currentPosition <= middleValue) return 0;

    return currentPosition - middleValue;

};