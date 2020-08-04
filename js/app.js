window.addEventListener("DOMContentLoaded", (event) => {
  const id = "hc7h3g9MdRZoOGceRbx8rmy5OEY4h1lyBQwu7qJF";

  const heroContainer = document.querySelector(".hero__container");
  const credits = document.querySelector(".credits");
  const main = document.querySelector("main");
  const photoGallery = document.querySelector(".photo-gallery");
  const loadingFigure = document.querySelector(".loading");
  const showMore = document.querySelector(".show-more");
  // nav-elements
  const backgroundLoader = document.querySelector('.background--loader')
    // links-buttons
  const avoidanceCam = document.getElementById("avoidance-cam");
  const mastCam = document.getElementById("mast-cam");
  const navigationCam = document.getElementById("navigation-cam");

  // FHAZ/NAVCAM/MAST
  avoidanceCam.addEventListener("click", getCamPhotos);
  mastCam.addEventListener("click", getCamPhotos);
  navigationCam.addEventListener("click", getCamPhotos);
  // show more
  showMore.addEventListener("click", morePhotos);
  
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${id}`)
    .then((response) => response.json())
    .then((response) => {
      heroContainer.style.backgroundImage = `url(${response.url})`;
      // console.log(response)
      credits.innerText = `Astronomy Picture of the Day / Copyright: ${response.copyright} (${response.date})`;
      backgroundLoader.classList.add("d--none");
    });

  let camera;
  let sol = 1000;
  
  function getCamPhotos(event) {
    displayElement(main);
    // loadingInfo();
    // console.log(event.target);
    // console.log(event.target.id === "avoidance-cam")
    if (event.target.id === "avoidance-cam") {
      camera = "fhaz";
    }
    if (event.target.id === "mast-cam") {
      camera = "mast";
    }
    if (event.target.id === "navigation-cam") {
      camera = "navcam";
    }
    console.log('camera',camera);
    getPhotos(camera)
    displayElement(showMore);
  }

  function getPhotos(camera) {
    console.log('camera',camera);
    loadingInfo();
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${id}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        loadingFigure.innerHTML = ''
        for (let i = 0; i <= 5; i++) {
          photoGallery.innerHTML += `<li class="photo">
          <figure>
            <img src=${response.photos[i].img_src} alt="">
            <figcaption></figcaption>
          </figure>
          </li>`;
        }
      });
      sol++
  }

  function morePhotos() {
    console.log(camera);
    console.log('sol',sol);
    getPhotos(camera)
  }

  function displayElement(element) {
    element.classList.remove("d--none");
  }

  function loadingInfo() {
    loadingFigure.innerHTML += `
      <i class="fa fa-spinner fa-spin fa-3x"></i>
      `;
  }
  // console.log('DOM fully loaded and parsed');
});
