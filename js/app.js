window.addEventListener("DOMContentLoaded", (event) => {
  const id = "hc7h3g9MdRZoOGceRbx8rmy5OEY4h1lyBQwu7qJF";

  const heroContainer = document.querySelector(".hero__container");
  const credits = document.querySelector(".credits");
  const main = document.querySelector("main");
  const photoGallery = document.querySelector(".photo-gallery");
  const loadingFigure = document.querySelector(".loading");
  const showMore = document.querySelector(".show-more");
  // nav-elements
  const backgroundLoader = document.querySelector(".background--loader");
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


  function getBackgroundImage(params) {
    let today = new Date();
    let twoDaysBefore = new Date(today);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
    today = today.toISOString().slice(0, 10);
    twoDaysBefore = twoDaysBefore.toISOString().slice(0, 10);

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${id}&start_date=${twoDaysBefore}&end_date=${today}`
      )
      .then(response=>{
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Server error')
        }
      })
      // .then((response) => response.json())
      // avoiding the video format by searching 2 days before for img
      .then((response) => {
        if (response[2].media_type === "image") {
          imgResponse = response[2];
        } else if (response[1].media_type === "image") {
          imgResponse = response[1];
        } else {
          imgResponse = response[0];
        }
        heroContainer.style.backgroundImage = `url(${imgResponse.url})`;
        
        credits.innerText = `Astronomy Picture of the Day / Copyright: ${response.copyright} (${imgResponse.date})`
      })
      .then(()=>{
        // create new Image element
        const image = new Image();
        // add link
        image.src = imgResponse.url
        // check if loaded
        image.onload = function () {
          // alert('Loaded!');
          backgroundLoader.classList.add("d--none")
        };
        // source: https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache
      })
      .catch(err=>{
        console.log(err);
      });
  }

  getBackgroundImage()

  let camera;

  // setting beginning date
  let sol = 502;

  function getCamPhotos(event) {
    displayElement(main);
    if (event.target.id === "avoidance-cam") {
      camera = "fhaz";
    }
    if (event.target.id === "mast-cam") {
      camera = "mast";
    }
    if (event.target.id === "navigation-cam") {
      camera = "navcam";
    }
    getPhotos(camera);
    displayElement(showMore);
  }

  function getPhotos(camera) {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${id}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        loadingFigure.innerHTML = "";
        photoGallery.innerHTML += `<li class='sol-day'>Sol: ${sol} <span>(${response.photos.length} photos available from this day) </span> <li>`;
        for (let i = 0; i <= 5; i++) {
          photoGallery.innerHTML += `
          <li class="photo">
            <figure>
              <img class='image' src=${response.photos[i].img_src} alt="${response.photos[i].camera.name}-${response.photos[i].id}"/>
              <figcaption>Image id: ${response.photos[i].id}</figcaption>
            </figure>
          </li>`;
          const listImages = Array.from(document.querySelectorAll(".photo"));
          listImages.forEach(function (elem) {
            elem.addEventListener("click", handleImageClick);
          });
        }
      });
    sol++;
  }

  function createDivNode(imageSrc) {
    const div = document.createElement("div");
    div.classList.add("fullScreen");
    const img = document.createElement("img");
    img.setAttribute("src", imageSrc);
    const button = document.createElement("button");
    button.classList.add("close");
    button.classList.add("btn");
    button.innerText = "Close";
    div.appendChild(img);
    div.appendChild(button);
    return div;
    // const div = `
    //   <div class="fullScreen">
    //     <img src=${imageSrc}/>
    //     <button class="close btn">Close</button>
    //   </div>`
    // main.innerHTML += div
  }

  function handleFullscreenClose(event) {
    const fullscreenDiv = document.querySelector(".fullScreen");
    fullscreenDiv.parentElement.removeChild(fullscreenDiv);
  }

  function handleImageClick(event) {
    const src = this.firstElementChild.firstElementChild.getAttribute("src");
    // console.log('kliknieto', src);
    const fullscreenDiv = createDivNode(src);
    fullscreenDiv
      .querySelector(".close")
      .addEventListener("click", handleFullscreenClose);
    main.appendChild(fullscreenDiv);
  }

  // get more photos
  function morePhotos() {
    getPhotos(camera);
  }

  function displayElement(element) {
    element.classList.remove("d--none");
  }

});
