
function setup(){
  const imgs = document.querySelectorAll('.gallery .picture img');
  const fullPage = document.querySelector('#fullpage');

  imgs.forEach(img => {
    img.addEventListener('click', function() {
      fullPage.style.backgroundImage = 'url(' + img.src + ')';
      fullPage.style.display = 'block';
      fullPage.style.animation = "fullpageAppear 200ms ease 1 forwards"
    });
  });
}

function fullPageDisappear(){
  const fullPage = document.querySelector('#fullpage');
  fullPage.style.animation = 'fullpageDisappear 200ms ease 1 forwards';
}