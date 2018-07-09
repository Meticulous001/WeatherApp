var APPID = "f33d3657d06823fd3848f5fe7a1a6a9e";
var temp;
var loc;
var icon;
var humidity;

function updateByZip(zip)
{
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
	"zip="+ zip 
	+"&APPID=" +APPID ;
	
	sendRequest(url);
}

function updateByGeo(lat, lon)
{
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
				"lat=" +lat +"&lon=" +lon +"&APPID=" +APPID ;
			sendRequest(url);

}



function sendRequest(url)
{
	var xmlhttp = new XMLHttpRequest();
	 xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status==200) 
			{
				var data = JSON.parse(xmlhttp.responseText);
				var weather = {};

				weather.icon = data.weather[0].id;
				weather.temp = data.main.temp;
				weather.loc = data.name;
				weather.humidity = data.main.humidity;
				weather.temp  = K2C(data.main.temp);
				update(weather);
			
			}


	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

	function K2C(k)
	{
			return (Math.round(k-273.15));
	}

	function K2F(k)
	{
		return Math.round(k*(9/5)-459.67);
	}
function update(weather)
{
	temp.innerHTML = weather.temp;
	loc.innerHTML = weather.loc;
	icon.src = "imgs/codes/"+ weather.icon+ ".png";
	humidity.innerHTML = weather.humidity;
	console.log(icon);
}



function showPosition(position)
{
	updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function() ///first thing to load
{
	temp = document.getElementById("tempValue");
	loc = document.getElementById("place");
	humidity = document.getElementById("humidity");
	icon= document.getElementById("icon");

	 // var weather  = {};
	 // weather.temp = 30;
	 // weather.loc = "Lagos";
	 // weather.icon = 300;
	 // weather.humidity= "50";
	
	 // update(weather);

	// updateByZip(24027);
	 if(navigator.geolocation)
	 {
	 navigator.geolocation.getCurrentPosition(showPosition);

	 }
	 else
	 {
	 	var zip = window.prompt("Location not found, tell us your zip code");
	 	updateByZip(zip);
	 }

}