window.addEventListener('DOMContentLoaded', (event) => {
  const id = 'hc7h3g9MdRZoOGceRbx8rmy5OEY4h1lyBQwu7qJF'

  const landing = document.querySelector('.hero__container')
  const credits = document.querySelector('.credits')
  const main = document.querySelector('main')
  const photoGallery = document.querySelector('.photo-gallery')
  // links
  const avoidanceCam = document.getElementById('avoidance-cam')
  const mastCam = document.getElementById('mast-cam')
  const navigationCam = document.getElementById('navigation-cam')
  
  // console.log(navigationCam)

  // FHAZ/NAVCAM/MAST
  avoidanceCam.addEventListener('click', getPhotos)
  mastCam.addEventListener('click', getPhotos)
  navigationCam.addEventListener('click', getPhotos)

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${id}`)
  .then(response => response.json())
  .then(response => {
    landing.style.backgroundImage =`url(${response.url})`
    // console.log(response)
    credits.innerText = `Astronomy Picture of the Day / Copyright: ${response.copyright} (${response.date})`
  })
  
  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=hc7h3g9MdRZoOGceRbx8rmy5OEY4h1lyBQwu7qJF
  
  
  function getPhotos (event) {
    displayMain()
    let camera
    // console.log(event.target.id === "avoidance-cam")
    if (event.target.id === "avoidance-cam") {
      console.log('hazard-avoidance')
      camera = 'fhaz' 
    }
    console.log('clicked')
    // console.log('camera', camera);
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&camera=${camera}&api_key=${id}`)
    .then(response => response.json())
    .then(response => {
      // console.log('here');
      // console.log(response.photos)
      // console.log(photoGallery);
      console.log((response.photos).forEach(element => {
        // console.log(element.img_src)
        photoGallery.innerHTML += `<li class="photo">
        <figure>
          <img src=${element.img_src} alt="">
          <figcaption></figcaption>
        </figure>
      </li>`
      }))
    })
  }

  function displayMain () {
    main.classList.remove('d--none')
  }
  

  // console.log('DOM fully loaded and parsed');
});

