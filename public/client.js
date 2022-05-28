
let ads = [];
var screenNum = 0;
//Array of current Time
function Currenttime() {
  var dateNow = new Date();
  var dayInAWeek = dateNow.getDay();
  var dateInMonth = dateNow.getDate();
  var month = dateNow.getMonth();
  var year = dateNow.getFullYear();
  var hour = dateNow.getHours();
  return [hour, dayInAWeek, dateInMonth, month, year];
}

function getScreenNum() {
  screenNum = window.location.pathname;
  if(screenNum.length > 1){
  let screenRes = screenNum.split('=');
  screenNum = parseInt(screenRes.pop());
  }
}


function getAds(){
  $(function(){
    $.get("screen", function(data, status){
      ads = data;
      getScreenNum();
      adSelector();
      firstAd()
    });
  });
}

function checkForScreens(Adsarray){
  let adsScreenCheck = [];
  Adsarray.forEach(ad => {
    for(var i=0; i < ad.screens.length;i++)
    {
      if(ad.screens[i] == screenNum){
          adsScreenCheck.push(ad);
      }
    }
  });
  return adsScreenCheck;
}

//Collects all relevant ads to run now into an array
function adSelector() {
  let adsArray = [];
  var time = Currenttime();
  for (i = 0; i < ads.length; i++) {
    //if year is current year
    if (
      new Date(ads[i].fromDate[0]).getFullYear() <= time[4] ||
      new Date(ads[i].toDate[0]).getFullYear() >= time[4]
    ) {
      //if month is current month
      if (
       new Date(ads[i].fromDate[0]).getDate() <= time[3] ||
       new Date(ads[i].toDate[0]).getDate() >= time[3]
      ) {
        //if day is current day
        if (
          new Date(ads[i].fromDate[0]).getDay() <= time[2] ||
          new Date(ads[i].toDate[0]).getDay() >= time[2]
        ) {
          //runs on all days
          for (j = 0; j < ads[i].days.length; j++) {
            //checks for days and time frame
            if (
              ads[i].days[j].daynumber == time[1] &&
              ads[i].days[j].fromHour <= time[0] &&
              ads[i].days[j].toHour >= time[0]
            ) {
              adsArray.push(ads[i]);
            }
          }
        }
      }
    }
  }
  adsArray = checkForScreens(adsArray);
  console.log("num of advs = " + adsArray.length);
  localStorage.ads = JSON.stringify(adsArray);
}

//Finds the right template
function templateSelector() {
  getAds();
}

function firstAd(){
  let adsArray = JSON.parse(localStorage.ads);
  var singleAd = adsArray[0];
  document.location.href = singleAd.templateUrl;
}

//Displays the current ad in the array of ads
function adsDisplay() {
  let adsArray = JSON.parse(localStorage.ads);
  var singleAd = adsArray[0];
  if (!singleAd) {
    return templateSelector();
  }
  //Prints the text and image to the id in the right template
  printText(singleAd);
  let display = document.getElementById("grid-item2");
  if (display) {
    display.innerHTML = ''
  }
  printImages(singleAd);
  //Timeout to get next Ad
  TimeDelay = setTimeout(defaultTemplate, singleAd.timeDuration * 1000);
}

//Sends the text to id = grid-item1
function printText(currentAd) {
  let display = document.getElementById("grid-item1");
  if (display) {
    display.innerText = currentAd.texts.join("");
  }
}

//Sends the images to printImageDimensions
function printImages(currentAd) {
  for (let img of currentAd.imageUrl) printImageDimensions(img);
}

//Sends the images to id = grid2
function printImageDimensions(source) {
  var img = document.createElement("img");
  img.src = source;
  img.style.height = "auto";
  img.style.width = "200px";
  img.style.marginBlock = "20px";
  let display = document.getElementById("grid-item2");
  if (display) {
    display.appendChild(img);
  }
}

//Handler - Timerhandler
function defaultTemplate() {
  let adsArray = JSON.parse(localStorage.ads);
  adsArray.shift();
  localStorage.ads = JSON.stringify(adsArray);
  if (adsArray && adsArray.length) {
    document.location.href = adsArray[0].templateUrl;
  } else {
    templateSelector();
  } 
}
