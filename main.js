
function getVisibilityPercentage(element) {
  const rect = element.getBoundingClientRect();
  const scrollRect = element.parentElement.getBoundingClientRect();

  // Check if the element is completely out of view
  if (rect.top > scrollRect.bottom) {
    return 0;
  }

  if (rect.bottom < scrollRect.top){
    return 1;
  }

  // Calculate the visible height and width
  const visibleHeight = Math.abs(scrollRect.bottom-rect.top);

  // Calculate the visibility percentage
  const visibilityPercentage = Math.min(1, Math.max(0, (visibleHeight / rect.height)));

  return visibilityPercentage;
}

function setAnimationBasedOnVisibility(element){
  if(element){    
    animation = element.getAnimations()[0];
    if(!animation){
      console.log("No animation!")
      return;
    }

    pageElement = element.closest(".page");
    percent = getVisibilityPercentage(pageElement);
    console.log("Percent: " + percent)
    animation.currentTime = 499.999*percent;
  }
}

window.addEventListener("load", () => {
  const sections = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('#menu-bar .buttons a');
  const allPages = document.querySelector("#all-pages");
  const sliders  = document.querySelectorAll(".scroll-animation");

  function updateSelected(){
    let current = '';

    sliders.forEach(slide => {
      setAnimationBasedOnVisibility(slide);
    });
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
  
      if (allPages.scrollTop >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.getAttribute('href').substring(1)
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
        // TODO(Tyler): this currently causes weird issues with snap scrolling.
        // window.location.hash = current;
      }
    });
  }

  allPages.addEventListener('scroll', updateSelected);
  updateSelected();

  const cursorGlows = document.querySelectorAll('.cursor-glow');

  window.addEventListener('mousemove', (event) => {
    cursorGlows.forEach(glow => {
      const rect = glow.getBoundingClientRect();


      glow.style.background = `radial-gradient(30vw at ${event.pageX-rect.left}px ${event.pageY-rect.top}px,
                                  var(--content-bg-hover-color), 
                                  var(--content-bg-color))`;
    });
  });

  window.setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
});