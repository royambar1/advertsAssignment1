class Ad{
    constructor(name,templateUrl,texts,imagesUrl,days,fromDate,toDate,timeDuration,screens) {
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

class Day{
    constructor(name,daynumber,fromHour,toHour) {
        this.name = name;
        this.daynumber = daynumber;
        this.fromHour = fromHour;
        this.toHour = toHour;
    }
}

// The ads array argument
 var ads = [
     new Ad("meridian",
         "templateA.html",
         ["Waterproof", "Shock resistant", "Cordless", "90 Minutes Trim Time Fully Charged"],
         ["pics/Meridian_balls.jpg", "pics/Meridian_case.jpg"],
         [ new Day("monday",1,6,12),
           new Day("friday",5,8,22),
           new Day("wednesday",3,13,20),
           new Day("saturday",6,8,22)],
         [new Date(2022,1,1)],
         [new Date(2022,12,31)],
         7,
         [1,2]
     ),
     new Ad("Mcdonalds",
        "./templateB.html",
        ["Big mac ............................................ 34nis",
               "Mac Royal......................................... 42nis",
               "Big America...................................... 48nis",
               "Big Tokyo.......................................... 48nis",
               "Big Japna.......................................... 48nis",
               "Big Mombai....................................... 60nis",
               "Big Texas............................................ 48nis",
               "McNuggets........................................ 30nis",
               "Potuto&chips..................................... 25nis",
               "Happy Meal....................................... 34nis"],
        ["pics/Mac.jpg"],
        [       new Day("tuesday",2,10,16),
                new Day("friday",5,8,22),
                new Day("wednesday",3,10,16),
                new Day("saturday",6,8,22)],
        [new Date(2022,1,3)],
        [new Date(2022,4,31)],
        10,
        [1,3]
    ),
     new Ad("Trivago",
         "templateC.html",
         [],
         [],
         [new Day("sunday",0,8,22),
             new Day("monday",1,8,22),
             new Day("tuesday",2,8,22),
             new Day("wednesday",3,8,22),
             new Day("thursday",4,8,22),
             new Day("friday",5,8,22),
             new Day("saturday",6,8,22)],
         [new Date(2022,1,1)],
         [new Date(2022,6,15)],
         3,
         [2,3]
     ),
     new Ad("Livnat Poran",
         "templateA.html",
         ["Halita? niftsata?", "we are here for you!"],
         [],
         [new Day("monday",1,15,19),
         new Day("saturday",6,8,22)],
         [new Date(2022,3,29)],
         [new Date(2022,5,14)],
         6,
         [2]
     ),
     new Ad("Durex",
         "templateB.html",
         ["Don't forget to wear your mask",
                "Don't limit yourself with treats",
                "freedom means responsibility",
                "Toys change, playtime Doesn't",
                "Protect yourself and your love ones",
                "Get in you closest drag store"],
         ["./pics/sand.jpg","./pics/ps5.jpg"],
         [new Day("monday",1,1,23),
             new Day("tuesday",2,1,23),
             new Day("wednesday",3,1,23),
             new Day("saturday",6,8,22)],
         [new Date(2022,4,1)],
         [new Date(2022,4,31)],
         9,
         [3]
     )
 ];

function Currenttime(){
    var date_now = new Date();
    var dayInAWeek = date_now.getDay();
    var dateInMonth = date_now.getDate();
    var month = date_now.getMonth();
    var year = date_now.getFullYear();
    var hour = date_now.getHours();
    return [hour,dayInAWeek,dateInMonth,month,year];
}

function adSelector(){

    let adsArray = [];
    var time = Currenttime();
    for(i = 0; i<ads.length;i++)
    {
        if (ads[i].fromDate[0].getFullYear() <= time[4] || ads[i].toDate[0].getFullYear() >= time[4])
        {
            console.log('if 1 #' + i);
            if (ads[i].fromDate[0].getDate() <= time[3] || ads[i].toDate[0].getDate() >= time[3])
            {
                console.log('if 2 #' + i)
                if(ads[i].fromDate[0].getDay() <= time[2] || ads[i].toDate[0].getDay() >= time[2])
                {
                    for (j = 0; j<ads[i].days.length;j++)
                    {
                        console.log('if 3 #' + i)
                        if (ads[i].days[j].daynumber == time[1])
                        {
                          console.log(ads[i].days[j].daynumber)
                          console.log(time[1])
                        }

                        if ((ads[i].days[j].daynumber == time[1]) && (ads[i].days[j].fromHour <= time[0]) && (ads[i].days[j].toHour >= time[0]) )
                        {
                            console.log('if 4 #' + i)
                            adsArray.push(ads[i]);
                        }
                    }
                }
            }
        }
    }
    console.log('num of advs = ' + adsArray.length)
    localStorage.ads = JSON.stringify(adsArray);
}

function adsPublisher(){
    let ads_array = JSON.parse(localStorage.ads);
    var single_ad = ads_array[0];
    ads_array.shift();
    localStorage.ads = JSON.stringify(ads_array);
    printHead(single_ad);
    printText(single_ad);
    timeDelay = setTimeout(swift,single_ad["timeDuration"]*1000);
}

function printHead(current_ad){
    document.write('<header id="head">' + current_ad["name"] + "(based on " + current_ad["templateUrl"] + ")<br/>" + '</header>');
}

function printText(current_ad){
    for(let elmnt of ads){
        if(!elmnt["name"].localeCompare(current_ad["name"])){
            var template = current_ad["templateUrl"]
            for(let text of elmnt["texts"]){
                document.write('<body id="body">' + text + "<br/>" + '</body>');
            }
            for(let img of elmnt["imageUrl"])
            printImg(img);
        }
    }
}

function printImg(source){
    var img = document.createElement("img");
    img.src = source;
    img.style.height = '300px';
    img.style.width = '600px';
    img.style.marginBlock = '20px';
    var block = document.getElementById("x");
    block.appendChild(img);
}

function templateSelector(){
    adSelector();
    let ads_array = JSON.parse(localStorage.ads);
    if(ads_array.length > 0)
    {
    var template = ads_array[0].templateUrl;
    document.location.href = template;
}
}

function swift(){
    let ads_array = JSON.parse(localStorage.ads);
    if(ads_array.length != 0)
        document.location.href = ads_array[0].templateUrl;
    else
        document.location.href = "main.html";
}