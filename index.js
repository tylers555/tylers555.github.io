
function togglePlayPause(vid){
  if(vid.paused){
    vid.play();
  }else{
    vid.pause();
  }
}

function setup(){
  const pictures = document.querySelectorAll('.gallery .picture');
  const fullPage = document.querySelector('#fullpage');

  pictures.forEach(picture => {
    picture.addEventListener('click', function() {
      const img = picture.querySelector('img');
      const vid = picture.querySelector('video');
      if(img){
        // fullPage.style.backgroundImage = 'url(' + img.src + ')';
        fullPage.innerHTML = '<img id="fullpageSubject" src="' + img.src + '" onclick="fullPageDisappear()">';
        fullPage.style.display = 'flex';
        fullPage.style.animation = "fullpageAppear 200ms ease 1 forwards"
      }else if(vid){
        fullPage.innerHTML = '<video loop id="fullpageSubject" src="' + vid.src + '" type="video/mp4" onclick="togglePlayPause(this)" ></video>'
        fullPage.style.display = 'flex';
        fullPage.style.animation = "fullpageAppear 200ms ease 1 forwards"  
        fullVid = fullPage.querySelector('video');
        fullVid.play();
      }
    });
  });

  fullPage.addEventListener('click', function(event) {  
    const elem = document.querySelector("#fullpageSubject");
    const outsideClick = !elem.contains(event.target);
    if(outsideClick){
      fullPageDisappear();
    }
  });

  addEventListener("keyup", (event) => {
    console.log(event.key)
    if (event.key == "Escape"){
      if (fullPage.style.display == 'flex'){
        fullPageDisappear();
      }
    }
  })

  // var timer = null
  // var stoppedScrolling = false;
  // const galleries = document.querySelectorAll('.gallery');
  // galleries.forEach(gallery => {
  //     // where "container" is the id of the container
  //     gallery.addEventListener("wheel", function (e) {
  //     gallery.scrollBy(e.deltaY, 0);
  //     amount = gallery.scrollLeft / (gallery.scrollWidth - gallery.clientWidth);
  //     if(isNaN(amount)){
  //     }else if(stoppedScrolling && (amount == 0) && (e.deltaY < 0)){
  //     }else if(stoppedScrolling && (amount > 0.99) && (e.deltaY > 0)){
  //     }else{      
  //       e.preventDefault();
  //     }
  //     stoppedScrolling = false;
  //     if(timer !== null) {
  //       console.log("Here1")
  //       clearTimeout(timer);        
  //     }
  //     timer = setTimeout(function() {
  //         console.log("Here2")
  //         stoppedScrolling = true;
  //     }, 150);
  //   });
  // })

  const galleryUIs = document.querySelectorAll('.galleryUI');
  galleryUIs.forEach(galleryUI => {
    const gallery  = galleryUI.querySelector('.gallery');
    const pictures = gallery.querySelectorAll('.picture');
    const dots     = galleryUI.querySelectorAll('.dots .dot');
    const buttons  = galleryUI.querySelectorAll(".galleryArrow");
    
    const rotationDelay = 2000;
    const autoScrollTimeout = 10000;

    var doAutoScroll = true;

    gallery.addEventListener("scroll", (event) => {
      var activeIndex = Math.round(gallery.scrollLeft/gallery.clientWidth);
      if(activeIndex >= 0){
        dots.forEach(dot => {
          dot.classList.remove('active');
        })
        dots[activeIndex].classList.add('active');
      }

      if(activeIndex == 0) 
        buttons[0].classList.add('inactive')
      else
        buttons[0].classList.remove('inactive')

      if(activeIndex == dots.length-1) 
        buttons[1].classList.add('inactive')
      else
        buttons[1].classList.remove('inactive')
    })

    setInterval(() => {
      const rect = gallery.getBoundingClientRect();
      if (doAutoScroll &&
          (rect.top >= 0) &&
          (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))){
        var activeIndex = Math.round(gallery.scrollLeft/gallery.clientWidth);
        activeIndex += 1;
        activeIndex %= dots.length;
        gallery.scrollTo(activeIndex*gallery.clientWidth, 0);
      }
    }, rotationDelay);

    dots.forEach(dot => {
      dot.addEventListener("click", (e) => {
        console.log(dots);

        var index = Array.prototype.indexOf.call(dots, dot);
        gallery.scrollTo(index*gallery.clientWidth, 0);

        doAutoScroll = false;
        setTimeout(() => {
          doAutoScroll = true;
        }, autoScrollTimeout);
      })
    })

    // Left
    buttons[0].addEventListener("click", (e) => {
      var activeIndex = Math.round(gallery.scrollLeft/gallery.clientWidth);
      gallery.scrollTo((activeIndex-1)*gallery.clientWidth, 0);
      doAutoScroll = false;
      setTimeout(() => {
        doAutoScroll = true;
      }, autoScrollTimeout);
    })

    // Right
    buttons[1].addEventListener("click", (e) => {
      var activeIndex = Math.round(gallery.scrollLeft/gallery.clientWidth);
      gallery.scrollTo((activeIndex+1)*gallery.clientWidth, 0);
      doAutoScroll = false;
      setTimeout(() => {
        doAutoScroll = true;
      }, autoScrollTimeout);
    })
  })
}

function fullPageDisappear(){
  const fullPage = document.querySelector('#fullpage');
  fullPage.innerHTML = '';
  fullPage.style.animation = 'fullpageDisappear 200ms ease 1 forwards';
}