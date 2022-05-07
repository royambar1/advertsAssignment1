// Ofir Gur Cohen - 206588642
// Roy Ambar - 208789065

class Ad {
  constructor(
    name,
    templateUrl,
    texts,
    imagesUrl,
    days,
    fromDate,
    toDate,
    timeDuration,
    screens
  ) {
    this.name = name;
    this.templateUrl = templateUrl;
    this.texts = texts;
    this.imageUrl = imagesUrl;
    this.days = days;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.timeDuration = timeDuration;
    this.screens = screens;
  }
}

class Day {
  constructor(name, daynumber, fromHour, toHour) {
    this.name = name;
    this.daynumber = daynumber;
    this.fromHour = fromHour;
    this.toHour = toHour;
  }
}

// Array of all ads
var ads = [
  new Ad(
    "Ad1",
    "templateA.html",
    ["Time For ", "Coffee \n", "Elite ", " Coffe"],
    ["Pics/EliteCoffe_ad2.jpg", "Pics/coffe1_ad2.jpeg"],
    [new Day("monday", 1, 6, 12), new Day("wednesday", 3, 6, 12)],
    [new Date(2022, 1, 1)],
    [new Date(2022, 12, 31)],
    3,
    [2, 3]
  ),

  new Ad(
    "Ad2",
    "templateB.html",
    [
      "Learn ",
      "How ",
      "To ",
      "Code ",
      "In ",
      "Java",
      "Script\n",
      "Take a Free ",
      "Course ",
      "Now",
    ],
    ["Pics/javascript.png"],
    [new Day("tuesday", 2, 10, 16), new Day("wednesday", 3, 10, 16)],
    [new Date(2022, 3, 1)],
    [new Date(2022, 4, 30)],
    3,
    [1]
  ),

  new Ad(
    "Ad3",
    "templateC.html",
    [],
    [],
    [
      new Day("sunday", 0, 8, 22),
      new Day("monday", 1, 8, 22),
      new Day("tuesday", 2, 8, 22),
      new Day("wednesday", 3, 8, 22),
      new Day("thursday", 4, 8, 22),
      new Day("friday", 5, 8, 22),
      new Day("saturday", 6, 8, 22),
    ],
    [new Date(2022, 5, 1)],
    [new Date(2022, 6, 15)],
    3,
    [3]
  ),
  new Ad(
    "Ad4",
    "templateA.html",
    ["Roy Ambar\n", "Ofir Gur Cohen"],
    [],
    [new Day("monday", 1, 15, 19)],
    [new Date(2022, 3, 29)],
    [new Date(2022, 4, 15)],
    3,
    [1, 2, 3]
  ),
  new Ad(
    "Ad5",
    "templateB.html",
    [
      "iphone, ",
      "ipod, ",
      "ipad, ",
      "imac, ",
      "imouse, ",
      "ikeyboard,",
      "Ipod Touch",
    ],
    ["Pics/appleStore_ad5.jpeg", "Pics/apple1_ad5.png"],
    [
      new Day("monday", 1, 1, 23),
      new Day("tuesday", 2, 1, 23),
      new Day("wednesday", 3, 1, 23),
    ],
    [new Date(2022, 4, 1)],
    [new Date(2022, 4, 30)],
    3,
    [1, 2, 3]
  ),
];

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

//Collects all relevant ads to run now into an array
function adSelector() {
  let adsArray = [];
  var time = Currenttime();
  for (i = 0; i < ads.length; i++) {
    //if year is current year
    if (
      ads[i].fromDate[0].getFullYear() <= time[4] ||
      ads[i].toDate[0].getFullYear() >= time[4]
    ) {
      //if month is current month
      if (
        ads[i].fromDate[0].getDate() <= time[3] ||
        ads[i].toDate[0].getDate() >= time[3]
      ) {
        //if day is current day
        if (
          ads[i].fromDate[0].getDay() <= time[2] ||
          ads[i].toDate[0].getDay() >= time[2]
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
  console.log("num of advs = " + adsArray.length);
  localStorage.ads = JSON.stringify(adsArray);
}

//Finds the right template
function templateSelector() {
  adSelector();
  let adsArray = JSON.parse(localStorage.ads);
  //As long as there are ads to run then take the first template
  if (adsArray.length > 0) {
    var template = adsArray[0].templateUrl;
    document.location.href = template;
  }
}

//Displays the current ad in the array of ads
function adsDisplay() {
  let adsArray = JSON.parse(localStorage.ads);
  var singleAd = adsArray[0];
  adsArray.shift();
  localStorage.ads = JSON.stringify(adsArray);
  //Prints the text and image to the id in the right template
  printText(singleAd);
  printImage(singleAd);
  //Timeout to get next Ad
  timeDelay = setTimeout(defaultTemplate, singleAd.timeDuration * 1000);
}

//Sends the text to id = grid-item1
function printText(currentAd) {
  let display = document.getElementById("grid-item1");
  display.innerText = currentAd.texts.join("");
}

//Sends the images to printImageDimensions
function printImage(currentAd) {
  for (let imgArr of ads) {
    if (!imgArr.name.localeCompare(currentAd.name)) {
      if (imgArr.imageUrl.length != 0)
        for (let img of imgArr.imageUrl) printImageDimensions(img);
    }
  }
}

//Sends the images to id = grid2
function printImageDimensions(source) {
  var img = document.createElement("img");
  img.src = source;
  img.style.height = "auto";
  img.style.width = "200px";
  img.style.marginBlock = "20px";
  let display = document.getElementById("grid-item2");
  display.appendChild(img);
}

//Handler - Timerhandler
function defaultTemplate() {
  let ads_array = JSON.parse(localStorage.ads);
  if (ads_array.length != 0) document.location.href = ads_array[0].templateUrl;
  else document.location.href = "main.html";
}
