var express = require("express");
var app = express();
app.use("/", express.static('./public/'));

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
      [new Day("friday", 5, 8, 22),new Day("monday", 1, 6, 12), new Day("saturday", 6, 8, 22),
      new Day("wednesday", 3, 6, 12)],
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
      [new Day("friday", 5, 8, 22),new Day("saturday", 6, 8, 22),
      new Day("tuesday", 2, 10, 16), new Day("wednesday", 3, 10, 16)],
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
      [new Day("friday", 5, 8, 22),
      new Day("monday", 1, 15, 19)],
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
        new Day("friday", 5, 8, 22),
      ],
      [new Date(2022, 4, 1)],
      [new Date(2022, 4, 30)],
      3,
      [1, 2, 3]
    ),
  ];

  app.get("/screen", function (request, response) {
    response.json(ads);
  });
  
  app.get("/", function (request, response) {
    response.sendFile(__dirname + "/public/main.html");
  });

  app.get("/screen=1", function (request, response) {
    response.sendFile(__dirname + "/public/main.html");
  });

  app.get("/screen=2", function (request, response) {
    response.sendFile(__dirname + "/public/main.html");
  });

  app.get("/screen=3", function (request, response) {
    response.sendFile(__dirname + "/public/main.html");
  });
  
  app.listen(7000);