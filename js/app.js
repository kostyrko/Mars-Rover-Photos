window.addEventListener('DOMContentLoaded', (event) => {
  const landing = document.querySelector('.hero__container')
  const credits = document.querySelector('.credits')

  fetch('https://api.nasa.gov/planetary/apod?api_key=hc7h3g9MdRZoOGceRbx8rmy5OEY4h1lyBQwu7qJF')
  .then(response => response.json())
  .then(response => {
    landing.style.backgroundImage =`url(${response.url})`
    console.log(response.date)
    credits.innerText = `Copyright: ${response.copyright} (${response.date})`
  })

  // console.log('DOM fully loaded and parsed');
});

