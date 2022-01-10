
let WeatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=Limerick&units=metric&appid=5e13d9fc321f378e5251184a78baadc9";
let CryptoAPIUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";


let Weather;
let Temp;
let humidity;
let locationSelected;
let locationSelected2;
let NEWURL;
let EthereumPrice;
let LiteCoinPrice;
let BitcoinPrice;

function setUp()
{
    GetWeatherData();
    GetCryptoData();
    
}

async function GetWeatherData()
{
    
    let response = await fetch(WeatherAPIUrl);
    let data = await response.json();
    console.log(data);
    locationSelected2 = data.sys.country;
    locationSelected = data.name;
    humidity = data.main.humidity;
    Temp = data.main.temp;
    Wind = data.wind.speed;
    console.log(Temp);

    document.getElementById('locationSelected2').textContent = locationSelected2;
    document.getElementById('locationSelected').textContent = locationSelected;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('Temp').textContent = Temp;
    document.getElementById('WindS').textContent = Wind;
}

async function GetCryptoData()
{
   
    let response = await fetch(CryptoAPIUrl);
    let data = await response.json();
    console.log(data);
    let BitcoinLabel = data[0].symbol;
    BitcoinPrice = data[0].current_price;
    let EthereumLabel = data[1].symbol;
   EthereumPrice = data[1].current_price;
    let LiteCoinLabel = data[21].symbol;
    LiteCoinPrice = data[21].current_price;
    console.log("Bitcoin Price: " + BitcoinLabel + " €" + BitcoinPrice + " /coin");
    console.log("Ethereum Price: " + EthereumLabel + " €" + EthereumPrice + " /coin");
    console.log("Litecoin Price: " + LiteCoinLabel + " €" + LiteCoinPrice + " /coin");

    document.getElementById('BitcoinPrice').textContent = BitcoinPrice;
    document.getElementById('EthereumPrice').textContent = EthereumPrice;
    document.getElementById('LiteCoinPrice').textContent = LiteCoinPrice;

    DrawChart();
    //locationSelected = data.name;
    //humidity = data.main.humidity;
    //Temp = data.main.temp;
    //Wind = data.wind.speed;
    //console.log(Temp);

    //document.getElementById('locationSelected2').textContent = locationSelected2;
    //document.getElementById('locationSelected').textContent = locationSelected;
    //document.getElementById('humidity').textContent = humidity;
    //document.getElementById('Temp').textContent = Temp;
    //document.getElementById('WindS').textContent = Wind;
}

async function ResetWeatherData()
{
    try{
    let response = await fetch(WeatherAPIUrl);
    let data = await response.json();
    console.log(data);
    locationSelected2 = data.sys.country;
    locationSelected = data.name;
    humidity = data.main.humidity;
    Temp = data.main.temp;
    Wind = data.wind.speed;
    console.log(Temp);
   
    document.getElementById('locationSelected2').textContent = locationSelected2;
    document.getElementById('locationSelected').textContent = locationSelected;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('Temp').textContent = Temp;
    document.getElementById('WindS').textContent = Wind;
    }catch{
        
        alert("Invalid city input");

    }
        
    
}



function ResetWeatherLocation(LocationString)
{
    try{
    console.log(LocationString);
    let i=0;
    NEWURL='https://api.openweathermap.org/data/2.5/weather?q=' + LocationString + '&units=metric&appid=5e13d9fc321f378e5251184a78baadc9';
    console.log(NEWURL);
    if(i==0)
    {
    WeatherAPIUrl = NEWURL;
    }
    ResetWeatherData();
}
catch{
    alert("Invalid input");
}
}

function DrawChart()
{
  
  var xValues = ["Ethereum", "Bitcoin", "Litecoin"];
  var yValues = [Number(EthereumPrice), Number(BitcoinPrice), Number(LiteCoinPrice)];
  var barColors = ["blue", "green","red"];
  
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Current Crypto Prices"
      }
    }
  });
}

