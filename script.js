window.onload = function () {
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('ip-address').textContent = data.ip;
      });
  };
  var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}
  document.getElementById('get-location').addEventListener('click', function () {
    fetch(`https://ipinfo.io/${document.getElementById('ip-address').textContent}/geo`)
      .then(response => response.json())
      .then(data => {
        const [lat, long] = data.loc.split(',');
        const mapDiv = document.getElementById('map');
        mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe> `;
      });
  });


  const ip = document.getElementById('ip-address').textContent;
  fetch(`https://ipinfo.io/${ip}/timezone`)
    .then(response => response.text())
    .then(timezone => {
      const timeElement = document.getElementById('time');
      const userTime = new Date().toLocaleString('en-US', { timeZone: timezone });
      timeElement.textContent = userTime;
    });






   


  const searchInput = document.getElementById('search');
  const postOfficesList = document.getElementById('post-offices');

  function fetchPostOffices(pincode) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => response.json())
      .then(data => {
        const postOffices = data[0].PostOffice;
        postOfficesList.innerHTML = '';
        postOffices.forEach(postOffice => {
          const li = document.createElement('li');
          li.textContent = `${postOffice.Name} (${postOffice.BranchType})`;
          postOfficesList.appendChild(li);
        });
      });
  }

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const liElements = postOfficesList.getElementsByTagName('li');
    for (let i = 0; i < liElements.length; i++) {
      const liText = liElements[i].textContent.toLowerCase();
      if (liText.includes(searchTerm)) {
        liElements[i].style.display = 'block';
      } else {
        liElements[i].style.display = 'none';
      }
    }
  });