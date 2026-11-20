const speedLowerBound = 5;
const speedRedBar = 10;
const speedGreenBar = 18;
const speedUpperBound = 40;

const accelLowerBound = 10;
const accelRedBar = 18;
const accelGreenBar = 32;
const accelUpperBound = 100;

const pushLowerBound = 20;
const pushRedBar = 60;
const pushGreenBar = 112;
const pushUpperBound = 300;

const fireRateLowerBound = 1;
const fireRateRedBar = 13;
const fireRateGreenBar = 24;
const fireRateUpperBound = 80;

const intakeRateLowerBound = 1;
const intakeRateRedBar = 16;
const intakeRateGreenBar = 30;
const intakeRateUpperBound = 160;

const capacityLowerBound = 1;
const capacityRedBar = 45;
const capacityGreenBar = 85;
const capacityUpperBound = 600;

const shootOnMoveLowerBound = 0;
const shootOnMoveRedBar = 35;
const shootOnMoveGreenBar = 65;
const shootOnMoveUpperBound = 100;

const stats = [
    { prop: "speed", id: "speedChange" },
    { prop: "accel", id: "accelChange" },
    { prop: "push", id: "pushChange" },
    { prop: "fireRate", id: "fireRateChange" },
    { prop: "intakeRate", id: "intakeRateChange" },
    { prop: "capacity", id: "capacityChange" },
    { prop: "shootOnMove", id: "shootOnMoveChange" }
];

class Robot{
    constructor(number, name, rank, speed, accel, push, fireRate, intakeRate, capacity, shootOnMove){
        this.number = number;
        this.name = name;
        this.rank = rank;
        this.speed = speed;
        this.accel = accel;
        this.push = push;
        this.fireRate = fireRate;
        this.intakeRate = intakeRate;
        this.capacity = capacity;
        this.shootOnMove = shootOnMove;
    }

    generateCustomStats(){
        let speed = bound(this.speed * getRandomInteger(lowerMultiplier, upperMultiplier), speedLowerBound, speedUpperBound);
        let accel = bound(this.accel * getRandomInteger(lowerMultiplier, upperMultiplier), accelLowerBound, accelUpperBound);
        let push = bound(this.push * getRandomInteger(lowerMultiplier, upperMultiplier), pushLowerBound, pushUpperBound);
        let fireRate = bound(this.fireRate * getRandomInteger(lowerMultiplier, upperMultiplier), fireRateLowerBound, fireRateUpperBound);
        let intakeRate = bound(this.intakeRate * getRandomInteger(lowerMultiplier, upperMultiplier), intakeRateLowerBound, intakeRateUpperBound);
        let capacity = bound(this.capacity * getRandomInteger(lowerMultiplier, upperMultiplier), capacityLowerBound, capacityUpperBound);
        let shootOnMove = bound(this.shootOnMove * getRandomInteger(lowerMultiplier, upperMultiplier), shootOnMoveLowerBound, shootOnMoveUpperBound);
        return new Robot(this.number, this.name, this.rank, speed, accel, push, fireRate, intakeRate, capacity, shootOnMove);
    }

    updateScreen(index){
        let teamNumber = document.getElementById("teamNumber" + index);
        let teamName = document.getElementById("teamName" + index);
        let speedBar = document.getElementById("speedProgressBar" + index);
        let accelBar = document.getElementById("accelProgressBar" + index);
        let pushBar = document.getElementById("pushProgressBar" + index);
        let fireRateBar = document.getElementById("fireRateProgressBar" + index);
        let intakeRateBar = document.getElementById("intakeRateProgressBar" + index);
        let capacityBar = document.getElementById("capacityProgressBar" + index);
        let shootOnMoveBar = document.getElementById("shootOnMoveProgressBar" + index);

        teamNumber.textContent = this.number;
        teamName.textContent = this.name;
        speedBar.textContent = this.speed;
        document.getElementById("accelProgressBar" + index).textContent = this.accel;
        document.getElementById("pushProgressBar" + index).textContent = this.push;
        document.getElementById("fireRateProgressBar" + index).textContent = this.fireRate;
        document.getElementById("intakeRateProgressBar" + index).textContent = this.intakeRate;
        document.getElementById("capacityProgressBar" + index).textContent = this.capacity;
        document.getElementById("shootOnMoveProgressBar" + index).textContent = this.shootOnMove;

        let speedWidth = (((this.speed - speedLowerBound) / (speedUpperBound - speedLowerBound)) * 0.9 + 0.1) * 100;
        speedBar.style.width = `${speedWidth}%`;

        let accelWidth = ((Math.sqrt(this.accel - accelLowerBound) / Math.sqrt(accelUpperBound - accelLowerBound)) * 0.95 + 0.05) * 100;
        accelBar.style.width = `${accelWidth}%`;

        let pushWidth = (((this.push - pushLowerBound) / (pushUpperBound - pushLowerBound)) * 0.9 + 0.1) * 100;
        pushBar.style.width = `${pushWidth}%`;

        let fireRateWidth = ((Math.sqrt(this.fireRate - fireRateLowerBound) / Math.sqrt(fireRateUpperBound - fireRateLowerBound)) * 0.95 + 0.05) * 100;
        fireRateBar.style.width = `${fireRateWidth}%`;

        let intakeRateWidth = ((Math.sqrt(this.intakeRate - intakeRateLowerBound) / Math.sqrt(intakeRateUpperBound - intakeRateLowerBound)) * 0.95 + 0.05) * 100;
        intakeRateBar.style.width = `${intakeRateWidth}%`;

        let capacityWidth = ((Math.sqrt(this.capacity - capacityLowerBound) / Math.sqrt(capacityUpperBound - capacityLowerBound)) * 0.95 + 0.05) * 100;
        capacityBar.style.width = `${capacityWidth}%`;

        let shootOnMoveWidth = (((this.shootOnMove - shootOnMoveLowerBound) / (shootOnMoveUpperBound - shootOnMoveLowerBound)) * 0.9 + 0.1) * 100;
        shootOnMoveBar.style.width = `${shootOnMoveWidth}%`;

        // Speed
        if (this.speed < speedRedBar) {
            speedBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.speed < speedGreenBar) {
            speedBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            speedBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Acceleration
        if (this.accel < accelRedBar) {
            accelBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.accel < accelGreenBar) {
            accelBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            accelBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Push
        if (this.push < pushRedBar) {
            pushBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.push < pushGreenBar) {
            pushBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            pushBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Fire Rate
        if (this.fireRate < fireRateRedBar) {
            fireRateBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.fireRate < fireRateGreenBar) {
            fireRateBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            fireRateBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Intake Rate
        if (this.intakeRate < intakeRateRedBar) {
            intakeRateBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.intakeRate < intakeRateGreenBar) {
            intakeRateBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            intakeRateBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Capacity
        if (this.capacity < capacityRedBar) {
            capacityBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.capacity < capacityGreenBar) {
            capacityBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            capacityBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        // Shoot On Move
        if (this.shootOnMove < shootOnMoveRedBar) {
            shootOnMoveBar.style.backgroundColor = "rgb(255, 70, 70)";
        } else if (this.shootOnMove < shootOnMoveGreenBar) {
            shootOnMoveBar.style.backgroundColor = "rgb(255, 255, 70)";
        } else {
            shootOnMoveBar.style.backgroundColor = "rgb(70, 255, 70)";
        }

        let baseRobot = findRobotByName(this.name);
        stats.forEach(stat => {
            let changeText = document.getElementById(stat.id + index);
            if (!changeText) return;

            let change = Math.round((this[stat.prop] - baseRobot[stat.prop])*10)/10;

            if (change < 0) {
                changeText.textContent = change;
                changeText.style.color = "rgb(180, 0, 0)";
            } else if (change > 0) {
                changeText.textContent = "+" + change;
                changeText.style.color = "rgb(0, 180, 0)";
            } else {
                changeText.textContent = "0";
                changeText.style.color = "inherit"; // default text color when no change
            }
        });
    }
}

var robots = [
    new Robot(27,"Team RUSH","C",14.5,28,140,15,20,65,0),
    new Robot(67,"The HOT Team","C",14.8,28,140,15,27,45,20),
    new Robot(118,"Robonauts","C",14.8,27,150,9,20,40,65),
    new Robot(254,"The Cheesy Poofs","A",14.8,27,150,24,30,70,20),
    new Robot(341,"Miss Daisy","C",16,40,100,9,20,13,75),
    new Robot(359,"Hawaiian Kids v1","D",14.8,27,148,5,16,40,60),
    new Robot(359,"Hawaiian Kids v2","B",14.8,27,150,10,22,55,70),
    new Robot(971,"Spartan Robotics","B",14,27,150,14,18,45,65),
    new Robot(1114,"Simbotics","A",14,27,146,22,28,90,0),
    new Robot(1678,"Citrus Citrcuits","A",13.5,27,148,22,28,55,0),
    new Robot(1690,"Orbit","A",14.8,27,150,12,30,60,90),
    new Robot(1833,"Team BEAN","B",15,28,143,20,25,60,25),
    new Robot(2056,"OP Robotics","B",14.8,27,150,10,25,60,73),
    new Robot(2122,"Team Tators","B",14,27,150,12,22,50,10),
    new Robot(2481,"Roboteers","S",12.5,27,150,21,26,115,0),
    new Robot(2910,"Jack in the Bot v1","C",14.8,31,130,25,22,20,70,70),
    new Robot(2910,"Jack in the Bot v2","S",14.8,28,140,32,33,50,0),
    new Robot(3006,"Red Rock Robotics","C",14.8,27,145,8,18,40,75),
    new Robot(3070,"Team Pronto","F",12,28,140,1.5,6,15,20),
    new Robot(3647,"Millennium Falcons","C",14.8,28,140,20,13,50,0),
    new Robot(4180,"Iron Riders","F",12,29,135,2,4,15,0),
    new Robot(4414,"HighTide","S",14.8,29,135,14,40,110,85),
    new Robot(4907,"Thunderstamps","D",14.8,43,140,5,15,30,60),
    new Robot(4946,"The Alpha Dogs","A",13.5,27,150,16,20,100,75),
    new Robot(4999,"Momentum","F",14.5,28,140,3,10,35,0),
    new Robot(5687,"The Outliers","B",14.8,27,145,24,25,50,0),
    new Robot(7769,"The CREW","C",13.5,27,145,10,24,60,0),
    new Robot(8044,"Denham Vemon","A",14.0,29,135,10,30,100,70),
    new Robot(9442,"Miso Mechanics","F",24,33,150,0,0,0,0),
    new Robot(9470,"Ctrl-Alt-Defeat","C",14.5,31,130,13,22,45,20),
    new Robot(9483,"Overcharge","C",14.5,28,144,7,20,80,75),
    new Robot(10079,"Arrowdynamics","F",14.5,29,135,6,18,30,15)
];

var lowerMultiplier = 0.5;
var numberOfBots = 2;
var upperMultiplier = 2;
var botRank = "All";

const numberPerRow = 2;

function getRandomInteger(min, max) {
    let randomNum = Math.random();
    let lowerChance = 1 / min;
    let upperChance = max;
    let totalChance = lowerChance + upperChance;
    let lowerPecentage = lowerChance / totalChance;
    if(randomNum < lowerPecentage){
        return 1/getRandomNumber(1,lowerChance);
    } else {
        return getRandomNumber(1,upperChance);
    }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomIndex(list){
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function buttonClick(){
    let body = document.getElementById("body");
    body.innerHTML = `<h1 id="title">Rebuild Sim Randomizer</h1>
    <div id="settingsDiv">
        <div id="lowerMultiplierDiv">
            <p>Lower Multiplier</p>
            <input id="lowerMultiplier" type="text" value="${lowerMultiplier}" onchange="changeLowerMultiplier()">
        </div>
        <div id="botNumDiv">
            <p>Number of Bots</p>
            <input id="botNum" type="text" value="${numberOfBots}" onchange="changeBotNum()">
        </div>
        <div id="upperMultiplierDiv">
            <p>Upper Multiplier</p>
            <input id="upperMultiplier" type="text" value="${upperMultiplier}" onchange="changeUpperMultiplier()">
        </div>
        <div id="botRankDiv">
            <p>Rank of Bots</p>
            <select name="cars" id="botRank" onchange="changeBotRank()">
                <option value="All">All</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </div>
    </div>
    <button id="generateButton" onclick="buttonClick()">Generate</button>
    <script src="script.js"></script>`;
    for(let y = 0; y < Math.ceil(numberOfBots/numberPerRow); y++){
        for(let x = 0; x < numberPerRow; x++){
            if(y*2+x >= numberOfBots){
                break;
            }
            let randomBot = createRandomizedBot();
            body.innerHTML += `<div id='div${y}${x}' class='robotDiv'>
        <h1 id='teamNumber${y}${x}' class='item'>111</h1>
        <h2 id='teamName${y}${x}' class='item'>Bot</h2>
        <div class="itemContainer">
            <p id='speedText${y}${x}' class='item'>Speed</p>
            <div class="progressContainer item">
                <div id="speedProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="speedChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='accelText${y}${x}' class='item'>Accel</p>
            <div class="progressContainer item">
                <div id="accelProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="accelChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='pushText${y}${x}' class='item'>Push</p>
            <div class="progressContainer item">
                <div id="pushProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="pushChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='fireRateText${y}${x}' class='item'>Fire Rate</p>
            <div class="progressContainer item">
                <div id="fireRateProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="fireRateChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='intakeRateText${y}${x}' class='item'>Intake Rate</p>
            <div class="progressContainer item">
                <div id="intakeRateProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="intakeRateChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='capacityText${y}${x}' class='item'>Capacity</p>
            <div class="progressContainer item">
                <div id="capacityProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="capacityChange${y}${x}" class="item endText">+11</p>
        </div>
        <div class="itemContainer">
            <p id='shootOnMoveText${y}${x}' class='item'>Shoot On Move</p>
            <div class="progressContainer item">
                <div id="shootOnMoveProgressBar${y}${x}" class="progressBar">70%</div>
            </div>
            <p id="shootOnMoveChange${y}${x}" class="item endText">+11</p>
        </div>
    </div>`;
            let botDiv = document.getElementById(`div${y}${x}`);
            let leftAmount = x*(100/numberPerRow)+((100/numberPerRow)/2);
            let topAmount = y*70+60;
            botDiv.style.left = `${leftAmount}%`;
            botDiv.style.top = `${topAmount}%`;
            randomBot.updateScreen(`${y}${x}`);
        }
        document.getElementById("botRank").value = botRank;
    }
}

function createRandomizedBot(){
    if (botRank == "All"){
        var randomRobot = getRandomIndex(robots);
    } else {
        var randomRobot = getRandomIndex(filterRobotsByRank(botRank));
    }
    return randomRobot.generateCustomStats();
}

function bound(number,lowerBound,upperBound){
    number = Math.round(number);
    if(number < lowerBound){
        return lowerBound;
    } else if(number > upperBound){
        return upperBound;
    } else {
        return number;
    }
}

function changeLowerMultiplier(){
    lowerMultiplier = parseFloat(document.getElementById("lowerMultiplier").value);
}

function changeBotNum(){
    numberOfBots = parseFloat(document.getElementById("botNum").value);
}

function changeUpperMultiplier(){
    upperMultiplier = parseFloat(document.getElementById("upperMultiplier").value);
}

function changeBotRank(){
    botRank = document.getElementById("botRank").value;
}

function findRobotByName(name){
    for(let i = 0; i < robots.length; i++){
        let robot = robots[i];
        if(robot.name == name){
            return robot;
        }
    }
    return -1;
}

function filterRobotsByRank(rank){
    var filteredRobots = [];
    for(let i = 0; i < robots.length; i++){
        let robot = robots[i];
        if(robot.rank == rank){
            filteredRobots.push(robot);
        }
    }
    return filteredRobots;
}