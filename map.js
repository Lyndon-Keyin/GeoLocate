let x = document.getElementById("demo");
let num = []; 
//Run on load to showcase any markers stored in local storage at this time, it then outputs them to screen again
function local(){
  let output = localStorage.getItem('log_Coords');
    if (output == null){
        num = []
    }else{
      num = JSON.parse(output)
      let formated = "";
      for (let obj of num){
        formated += `User Name Goes Here ${JSON.stringify(obj)}` + "</br>";
      }
      document.getElementById("display").innerHTML = formated
      for (let i = 0; i < num.length; i++){
        let lati = [num[i].lat, num[i].lng];
        L.marker(lati).addTo(map);
    };
  }
}
//Gets Geolocation from your browser
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
//Takes Geolocation and adds marker to the map
function showPosition(pos) {
    let latlon = [pos.coords.latitude, pos.coords.longitude];
    L.marker(latlon).addTo(map);
    //taking local storage into function as to not loose array when new data is added
    let nums = localStorage.getItem('log_Coords');
    if (nums == null){
        num = []
    }else{
      num = JSON.parse(nums)
    };
    //creating an object of lat and long for each time button is pressed
    let data ={
        id: new Date(),
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    } 
    num.push(data);
    let three = "";
    for (let obj of num){
      three += `User Name Goes Here ${JSON.stringify(obj)}` + "</br>";
    }
    document.getElementById("display").innerHTML = three
    // save to local storage
    localStorage.setItem('log_Coords', JSON.stringify(num)); 
}
//Errors for when multiple users are running website hosted on server
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

window.addEventListener('load', local)

