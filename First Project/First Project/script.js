const superSpeedInitalCost = 10000;
const clickPriceIncrease = 10;
const clickAmountIncrease = 1;
const speedPriceIncrease = 1000;
const speedAmountInrease = 10;
const workerPriceIncrease = 1000000;
const savePercent = 10;
const saveStartingCost = 10;
const saveIncrease = 1.015;
const investPercent = 10;
const investStartingCost = 100;
const investDefaultIncrease = 1.02;
const investRange = 0.08;


var money = 0.00;
var savedMoney = -1;
var investedMoney = -1;
var previousAmountGained = 1;
let holdInterval;

var clickAmount = 1;
var clickPrice = clickPriceIncrease;

var speedAmount = 100;
var speedPrice = speedPriceIncrease;

const initHoldSpeed = 100;
var holdSpeed = initHoldSpeed;
var superSpeedUnlocked = false;
var superSpeedActive = false;
var superSpeedText = "$10000: super speed"

const superSpeedAmount = 10;

var workerPrice = workerPriceIncrease;

var viewing = false;
var currentView;
var allView = false;

var workers = [];
var currentWorkerList = [];

var autoSort = false;

var workerLevel = 1;

class Worker {
    constructor(name, level){
        this.name = name;
        this.level = level;
        this.money = 0.00;
        this.click = 1;
        this.speed = 1;
        this.save = -1;
        this.invest = -1;
        this.percentList = generatePercentList();
    }

    work(){
        let randomNum = Math.random();
        if(randomNum < this.percentList[0]){
            this.money += this.click * this.speed * this.level;
        } else if(randomNum < this.percentList[1]) {
            if(this.money >= this.click * clickPriceIncrease){
                this.money -= this.click * clickPriceIncrease;
                this.click += clickAmountIncrease * this.level;
            }
        } else if(randomNum < this.percentList[2]){
            if(this.speed == 1){
                if(this.money >= superSpeedInitalCost){
                    this.money -= superSpeedInitalCost;
                    this.speed += 9;
                }
            } else {
                if(this.money >= (this.speed - 9)*speedPriceIncrease){
                    this.money -= (this.speed - 9)*speedPriceIncrease;
                    this.speed += parseInt(speedAmountInrease/10*this.level);
                }
            }
        } else if(randomNum < this.percentList[3]) {
            if(this.save < 0){
                if(this.money >= saveStartingCost){
                    this.money -= saveStartingCost;
                    this.save = 0;
                }
            } else {
                this.save += this.money / savePercent;
                this.money -= this.money / savePercent;
            }
        } else if(randomNum < this.percentList[4]){
            if(this.invest < 0){
                if(this.money >= investStartingCost){
                    this.money -= investStartingCost;
                    this.invest = 0;
                }
            } else {
                this.invest += this.money / investPercent;
                this.money -= this.money / investPercent;
            }
        } else if(randomNum < this.percentList[5]){
            if(this.save >= 0){
                this.money += this.save;
                this.save = 0;
            }
        } else if(randomNum < this.percentList[6]){
            if(this.invest >= 0){
                this.money += this.invest;
                this.invest = 0;
            }
        } else if(randomNum < this.percentList[7]){
            if(this.money >= (this.click+4999.5) * clickPriceIncrease*10000){
                this.money -= this.click * clickPriceIncrease * 10000;
                this.click += clickAmountIncrease * 10000;
            } else if(this.money >= (this.click+499.5) * clickPriceIncrease*1000){
                this.money -= this.click * clickPriceIncrease * 1000;
                this.click += clickAmountIncrease * 1000;
            } else if(this.money >= (this.click+49.5) * clickPriceIncrease*100){
                this.money -= this.click * clickPriceIncrease * 100;
                this.click += clickAmountIncrease * 100;
            } else if(this.money >= (this.click+4.5) * clickPriceIncrease*10){
                this.money -= this.click * clickPriceIncrease * 10;
                this.click += clickAmountIncrease * 10;
            }
        } else if(randomNum < this.percentList[8]){
            if(this.money >= (this.speed - 9 + 4999.5)*speedPriceIncrease*10000){
                this.money -= (this.speed - 9)*speedPriceIncrease*10000;
                this.speed += parseInt(speedAmountInrease/10)*10000;
            } else if(this.money >= (this.speed - 9 + 499.5)*speedPriceIncrease*1000){
                this.money -= (this.speed - 9)*speedPriceIncrease*1000;
                this.speed += parseInt(speedAmountInrease/10)*1000;
            } else if(this.money >= (this.speed - 9 + 49.5)*speedPriceIncrease*100){
                this.money -= (this.speed - 9)*speedPriceIncrease*100;
                this.speed += parseInt(speedAmountInrease/10)*100;
            } else if(this.money >= (this.speed - 9 + 4.5)*speedPriceIncrease*10){
                this.money -= (this.speed - 9)*speedPriceIncrease*10;
                this.speed += parseInt(speedAmountInrease/10)*10;
            }
        } else if(randomNum < this.percentList[9]){
            if(Math.random() > 0.5){
                this.money *= 2;
            } else {
                this.money = 0;
            }
        }
    }
}

function generatePercentList(){
    var chanceList = [1000,50,50,20,20,2,2,5,2,1];
    var total = 0;
    for(let i = 0; i < chanceList.length; i++){
        chanceList[i] = chanceList[i]/2+Math.random()*chanceList[i]
        total += chanceList[i];
    }
    var runningTotal = 0;
    var percentList = [];
    for(let i = 0; i < chanceList.length; i++){
        let percent = chanceList[i]/total;
        runningTotal += percent;
        percentList.push(runningTotal);
    }
    return percentList;
}

window.addEventListener('DOMContentLoaded', (event) => {
    run();
});

document.addEventListener('mouseup', (event) => {
  clearInterval(holdInterval);
});

function addMoney(){
    if(superSpeedActive){
        money += clickAmount * speedAmount/initHoldSpeed;
    } else {
        money += clickAmount;
    }
    updateText();
}

function holdButton(functionUsed){
    functionUsed();
    holdInterval = setInterval(functionUsed, holdSpeed);
}

function saveMoney(){
    var amountToSave = money/savePercent;
    money -= amountToSave;
    savedMoney += amountToSave;
    updateText();
}

function investMoney(){
    var amountToInvest = money/investPercent;
    money -= amountToInvest;
    investedMoney += amountToInvest;
    updateText();
}

function takeOutSave(){
    money += savedMoney;
    savedMoney = 0;
    updateText();
}

function takeOutInvest(){
    money += investedMoney;
    investedMoney = 0;
    updateText();
}

function buyClick(){
    if(money >= clickPrice){
        money -= clickPrice;
        clickAmount += clickAmountIncrease;
        clickPrice += clickPriceIncrease;
        updateText();
    }
}

function buyAllClicks() {
    if (money < clickPrice) return;

    const p = clickPrice;
    const i = clickPriceIncrease;
    const m = money;

    // Solving the quadratic equation for n (number of upgrades)
    // n = (- (2p - i) + sqrt((2p - i)^2 + 8 * i * m)) / (2 * i)
    let b = 2 * p - i;
    let n = Math.floor((-b + Math.sqrt(Math.pow(b, 2) + 8 * i * m)) / (2 * i));

    if (n > 0) {
        // Calculate total cost for n items
        let totalCost = (n / 2) * (2 * p + (n - 1) * i);

        // Update values
        money -= totalCost;
        clickAmount += n * clickAmountIncrease;
        clickPrice += n * i;

        updateText();
    }
}

function buySpeed(){
    if(money >= speedPrice){
        money -= speedPrice;
        speedAmount += speedAmountInrease;
        speedPrice += speedPriceIncrease;
        updateText();
    }
}

function buyAllSpeed() {
    if (money < speedPrice) return;

    // Mapping your variables to the formula
    const p = speedPrice;            // Starting price
    const i = speedPriceIncrease;    // Price increase per purchase
    const m = money;                 // Available budget

    let n = 0;

    if (i === 0) {
        // Simple case: price never increases
        n = Math.floor(m / p);
    } else {
        // Solving the quadratic: i/2 * n^2 + (p - i/2) * n - m = 0
        let b = 2 * p - i;
        n = Math.floor((-b + Math.sqrt(Math.pow(b, 2) + 8 * i * m)) / (2 * i));
    }

    if (n > 0) {
        // Calculate the total cost for 'n' purchases
        let totalCost = (n / 2) * (2 * p + (n - 1) * i);

        // Update your game state
        money -= totalCost;
        speedAmount += n * speedAmountInrease; // Note: kept your 'Inrease' typo for compatibility
        speedPrice += n * i;

        updateText();
    }
}

function useSuperSpeed(){
    if(!superSpeedUnlocked){
        buySuperSpeed();
    } else if(!(superSpeedActive)) {
        activateSuperSpeed();
    } else {
        deactivateSuperSpeed();
    }
}

function buySuperSpeed(){
    const price = superSpeedInitalCost;
    if(money >= price){
        money -= price;
        superSpeedUnlocked = true;
        activateSuperSpeed();
        updateText();
        document.getElementById("speedUpgrades").style.display = "block";
    }
}

function activateSuperSpeed(){
    superSpeedActive = true;
    holdSpeed = superSpeedAmount;
    superSpeedText = "Super Speed Active";
    document.getElementById("unlockSpeedButton").style.backgroundColor = "rgb(47, 214, 61)";
    updateText();
}

function deactivateSuperSpeed(){
    superSpeedActive = false;
    holdSpeed = 10;
    superSpeedText = "Super Speed Inactive";
    document.getElementById("unlockSpeedButton").style.backgroundColor = "rgb(232, 78, 51)";
    updateText();
}

function buySavings(){
    const price = saveStartingCost;
    if(money >= price){
        savedMoney = 0;
        money -= price;
        var saveBuy = document.getElementById("saveBuy");
        var saveText = document.getElementById("saveMoneyText");
        var saveButton = document.getElementById("saveButton"); 
        var takeOutButton = document.getElementById("takeOutSaveButton");
        saveBuy.style.display = "none";
        saveText.style.display = "block";
        saveButton.style.display = "inline-block";
        takeOutButton.style.display = "inline-block";
        updateText();
    }
}

function buyInvestings(){
    const price = investStartingCost;
    if(money >= price){
        investedMoney = 0;
        money -= price;
        var investBuy = document.getElementById("investBuy");
        var investText = document.getElementById("investMoneyText");
        var investButton = document.getElementById("investButton"); 
        var takeOutButton = document.getElementById("takeOutInvestButton");
        investBuy.style.display = "none";
        investText.style.display = "block";
        investButton.style.display = "inline-block";
        takeOutButton.style.display = "inline-block";
        updateText();
    }
}

function buyWorker(){
    if(money >= workerPrice){
        money -= workerPrice;
        names = ["Bob", "Tom", "Jeff", "Man", "Tommy", "Tate", "Siwon", "Luke", "Aiden", "Archer", "Carl", "Broden", "Floyd", "Landyn", "Miles", "Levi", "Teo", "Isaac", "Joel", "Seonu", "Connor", "Harrison", "Alex", "Eli", "Engelkes", "Mohab", "Carter", "Agustin", "Levi", "Jay", "david"];
        workers.push(new Worker(names[Math.floor(Math.random() * names.length)], workerLevel));
        workerPrice += workerPriceIncrease * (workerLevel*10);
        updateText();
        if(workers.length > 50 + (workerLevel-1)*10){
            workerLevel += 1;
            workerPrice *= 10;
        }
    }
}

function viewWorker(index){
    viewing = true;
    currentView = workers[index];
    if(viewing){
        document.getElementById("name").textContent = workers[index].name;
    }
    document.getElementById("viewWorkerButton").textContent = "Back";
    document.getElementById("viewWorkerButton").style.backgroundColor = "rgb(255,0,0)";
    document.getElementById("buyWorkerButton").style.display = "none";
    backFromViewAllWorkers();
    updateText();
}

function viewAllWorkers(){
    if(!viewing){
        viewWorkerList(workers);
        currentWorkerList = workers;
    } else {
        goBackFromSingleView();
    }
}

function goBackFromSingleView(){
    viewing = false;
    htmlUpdate(savedMoney >= 0, investedMoney >= 0, superSpeedUnlocked)
    document.getElementById("name").textContent = "Player";
    document.getElementById("viewWorkerButton").textContent = "View Workers";
    document.getElementById("viewWorkerButton").style.backgroundColor = "rgb(230,230,230)";
    document.getElementById("buyWorkerButton").style.display = "inline-block";
    updateText();
}

function toggleSortWorkers(){
    autoSort = !autoSort;
    if(autoSort){
        document.getElementById("sortButton").style.backgroundColor = "rgb(128,255,128)";
    } else {
        document.getElementById("sortButton").style.backgroundColor = "rgb(255,128,128)";
    }
}

function viewWorkerList(list){
    var htmlDiv = "<h1 class='workerHeader'>Workers</h1><button class='stealAllButton' onclick='stealAllMoney()'>Steal All</button><button id='sortButton' onclick='toggleSortWorkers()'>Sort</button>";
    for(let i = 0; i < list.length; i++){
        let id = 'workerMoney' + i;
        htmlDiv += `<div class='inner-content'><h2 class='workerName'>${list[i].level}: ${list[i].name}<h2><h2 id='${id}' class='workerMoney'>$${addCommas(list[i].money)}<h2><button class='stealButton' onclick='stealMoney(${i})'>Steal</button><button class='viewButton' onclick='viewWorker(${i})'>View</button></div>`
    }
    htmlDiv += "<div class='end-content'><button class='backButton' onclick='backFromViewAllWorkers()'>Back</button></div>";
    document.getElementById("viewWorkerWindow").innerHTML = htmlDiv;
    document.getElementById("viewWorkerWindow").style.display = "block";
    if(autoSort){
        document.getElementById("sortButton").style.backgroundColor = "rgb(128,255,128)";
    } else {
        document.getElementById("sortButton").style.backgroundColor = "rgb(255,128,128)";
    }
    allView = true;
}

function stealAllMoney(){
    for(let i = 0; i < currentWorkerList.length; i++){
        money += currentWorkerList[i].money;
        currentWorkerList[i].money = 0;
        updateWorkerMoney(i);
    }
    updateText();
}

function stealMoney(index){
    money += currentWorkerList[index].money;
    currentWorkerList[index].money = 0;
    updateWorkerMoney(index);
    updateText();
}

function updateWorkerMoney(index){
    let id = 'workerMoney' + String(index); 
    workerMoneyText = document.getElementById(id);
    workerMoneyText.textContent = `$${addCommas(currentWorkerList[index].money)}`;
}

function backFromViewAllWorkers(){
    autoSort = false;
    document.getElementById("sort")
    document.getElementById("viewWorkerWindow").style.display = "none";
    allView = false;
}

function updateText(){
    if(viewing){
        textUpdate(currentView.money, currentView.click*currentView.level, currentView.speed*10*currentView.level, currentView.save, currentView.invest, currentView.click * 10, Math.round(currentView.speed * speedPriceIncrease - 9000), currentView.speed > 1);
        htmlUpdate(currentView.save >= 0, currentView.invest >= 0, currentView.speed > 1);
    }else{
        textUpdate(money, clickAmount, speedAmount, savedMoney, investedMoney, clickPrice, speedPrice, superSpeedActive);
    }
}

function textUpdate(currentMoney, currentClick, currentSpeed, currentSave, currentInvest, currentClickPrice, currentSpeedPrice, speedActive){
    var moneyText = document.getElementById("moneyText");
    moneyText.textContent = "$" + addCommas(currentMoney);
    var moneyPerClickText = document.getElementById("moneyPerClickText");
    moneyPerClickText.textContent = "+" + currentClick;
    var speedText = document.getElementById("speedText");
    if(speedActive){
        speedText.textContent = "Speed: " + currentSpeed;
    }else{
        speedText.textContent = "Speed: 10";
    }
    var saveText = document.getElementById("saveMoneyText");
    saveText.textContent = "$" + addCommas(currentSave);
    var investText = document.getElementById("investMoneyText");
    investText.textContent = "$" + addCommas(currentInvest);
    var upgradeButton = document.getElementById("upgradeClickButton")
    upgradeButton.textContent = "$" + addCommas(currentClickPrice) + ": +1 click"
    var upgradeSpeed = document.getElementById("upgradeSpeedButton")
    upgradeSpeed.textContent = "$" + addCommas(currentSpeedPrice) + ": +10 speed"
    var speedUpgradeText = document.getElementById("unlockSpeedButton");
    speedUpgradeText.textContent = superSpeedText;
    var workerBuyText = document.getElementById("buyWorkerButton");
    workerBuyText.textContent = "$" + addCommas(workerPrice) + ": Worker"
}

function htmlUpdate(saveTrue, investTrue, speedTrue){
    var saveBuy = document.getElementById("saveBuy");
    var saveText = document.getElementById("saveMoneyText");
    var saveButton = document.getElementById("saveButton"); 
    var takeOutButton = document.getElementById("takeOutSaveButton");
    if(saveTrue){
        saveBuy.style.display = "none";
        saveText.style.display = "block";
        saveButton.style.display = "inline-block";
        takeOutButton.style.display = "inline-block";
    }else{
        saveBuy.style.display = "inline-block";
        saveText.style.display = "none";
        saveButton.style.display = "none";
        takeOutButton.style.display = "none";
    }
    var investBuy = document.getElementById("investBuy");
    var investText = document.getElementById("investMoneyText");
    var investButton = document.getElementById("investButton"); 
    var takeOutButton = document.getElementById("takeOutInvestButton");
    if(investTrue){
        investBuy.style.display = "none";
        investText.style.display = "block";
        investButton.style.display = "inline-block";
        takeOutButton.style.display = "inline-block";
    }else{
        investBuy.style.display = "block";
        investText.style.display = "none";
        investButton.style.display = "none";
        takeOutButton.style.display = "none";
    }
    if(speedTrue){
        document.getElementById("speedUpgrades").style.display = "block";
        document.getElementById("unlockSpeedButton").style.backgroundColor = "rgb(47, 214, 61)";
        superSpeedText = "Super Speed Active";
    } else {
        document.getElementById("speedUpgrades").style.display = "none";
        document.getElementById("unlockSpeedButton").style.backgroundColor = "rgb(230, 230, 230)";
        superSpeedText = "$10000: super speed";
    }
}

function doubleOrNothing(){
    if(Math.random() > 0.5){
        money *= 2;
    } else {
        money = 0;
    }
    updateText();
}

function increaseValues(){
    savedMoney *= saveIncrease;

    let randomNum = Math.random();
    if(randomNum > 0.85){
        amountGained = (Math.random()-0.5)*(investRange)+(investDefaultIncrease);
    } else {
        amountGained = randomAroundValue(previousAmountGained)
    }
    investedMoney *= amountGained;
    previousAmountGained = amountGained;
    for(let i = 0; i < workers.length; i++){
        workers[i].save *= (saveIncrease-1) * workers[i].level + 1;
        workers[i].invest *= (amountGained-1) * workers[i].level + 1;
    }
    updateText();
}

function randomAroundValue(value){
    const distanceAroundValue = 0.02;
    return (Math.random() * distanceAroundValue) + value - distanceAroundValue / 2;
}

function addCommas(number){
    const formatted = new Intl.NumberFormat('en-US').format(number);  
    return formatted;
}

function run(){
    let intervalId = setInterval(increaseValues, 1000);
    let workerInterval = setInterval(runWorkers, 100);
    let sortWorkerInterval = setInterval(sortWorkers, 500);
}

function runWorkers(){
    for(let i = 0; i < workers.length; i++){
        workers[i].work();
        if(allView){
            updateWorkerMoney(i);
        }
        if(viewing){
            updateText();
        }
    }
}

function sortWorkers(){
    if(autoSort){
        sortedList = workers.sort(function(a, b) {
            return b.money - a.money;
        });
        currentWorkerList = sortedList;
        viewWorkerList(sortedList);
    }
}