
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
}

function fullPageDisappear(){
  const fullPage = document.querySelector('#fullpage');
  fullPage.innerHTML = '';
  fullPage.style.animation = 'fullpageDisappear 200ms ease 1 forwards';
}