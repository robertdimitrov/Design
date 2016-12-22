/**
 * @fileOverview Scroll.js manages the scrolling behaviour of the page
 * @author s824894@beuth, s825800@beuth
 */

/**
 * @description Sets up the scrolling logic after the DOM Content is loaded
 */
document.addEventListener("DOMContentLoaded", function(){
    var infoArea = document.getElementsByClassName("information")[0];
    var navigationPoints = document.querySelectorAll("aside nav a");

    infoArea.addEventListener('scroll', function(){
        // prevents the scrolling through the navigation points when performing a smooth scroll after a click on one of them
        if(document.getElementsByTagName('nav')[0].classList.contains("scrolling")) return;

        var scrollPosition = infoArea.scrollTop;

        // manages the selection of the navigation points in the sidebar while scrolling through the main content
        Array.from(navigationPoints).forEach(function(a){
            var currentLink = a;
            var reference = currentLink.getAttribute("href");
            var anchor = document.getElementById(reference.slice(1));
            var extraOffset = 150;
            if(anchor.offsetTop - extraOffset <= scrollPosition && anchor.offsetTop + anchor.offsetHeight - extraOffset + 9 >= scrollPosition){
                currentLink.classList.add("active");
                if(currentLink.classList.contains("projectLink")){
                    document.getElementsByClassName('portfolioList')[0].classList.add("active");
                }
            } else {
                currentLink.classList.remove("active");
            }
        });
    });

    /**
     * @description Performs a smooth scroll to an element
     * @param element - the destination of the scroll
     * @param area - the parent element of the destination element
     * @param duration - the duration of the animation
     */
    function scrollTo(element, area, duration){
        // using an easing function instead of a linear one
        var easing = function(t){
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        };
        var start = area.scrollTop;
        var startTime = Date.now();
        var destination = element.offsetTop - 69;

        /**
         * @description The actual animation loop
         */
        function scroll(){
            document.getElementsByTagName("nav")[0].classList.add("scrolling");
            var now = Date.now();
            var time = Math.min(1,((now-startTime)/duration));
            area.scrollTop = easing(time)*(destination-start) + start;
            if(area.scrollTop === destination){
                document.getElementsByTagName("nav")[0].classList.remove("scrolling");
                return;
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    }

    // Binds the click on a navigation element to the scrolling behaviour
    Array.from(navigationPoints).forEach(function(np){
        np.addEventListener('click', function(){
            scrollTo(document.getElementById(np.getAttribute("href").slice(1)),infoArea,2000);
        });
    });
});

