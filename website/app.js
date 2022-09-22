/* Global Variables */
const apiKey = 'c10f6cde7ddd3022454c51dddef01a57';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// My inputs
const zip = document.getElementById('zip');
const felling = document.getElementById('feelings');

// My outputs
const holder = document.querySelector('.holder');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// on submit
document.querySelector('.weather-data').onsubmit = (e) => {
  e.preventDefault();
};
document.getElementById('generate').addEventListener('click', async () => {
  if (zip.value == '' || felling.value == '') alert('Enter your Data..');
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}`;
  let dataWeather = await getDataApi(apiUrl);
  // save data in server
  if (dataWeather !== '404') {
    postData('/add', dataWeather);
    showData(true);
  }
})
// get data from api
async function getDataApi(url) {
  let res = await fetch(url);
  const data = await res.json();
  if (data.message) {
    // alert('City Not found');
    return '404';
  } else
    return {
      tem: data.main.temp,
      date: newDate,
      content: felling.value,
    };
}
// post data in server
async function postData(url, data) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
// show data in UI from server
async function showData(done) {
  if (done) {
    const getDataFromServer = await fetch('/all');
    const retrieveData = await getDataFromServer.json();
    date.innerHTML = `<p><strong>Today: </strong>${retrieveData.date}</p>`;
    temp.innerHTML = `<p><strong>Temperature: </strong>${retrieveData.tem} Fْ</p>`;
    content.innerHTML = `<p><strong>Feel: </strong>${retrieveData.content}</p>`;
    zip.value = '';
    felling.value = '';
    holder.style.padding = '20px';
  } else {
    holder.innerHTML = `<h2>City Not Found..</h2>`;
  }
}
