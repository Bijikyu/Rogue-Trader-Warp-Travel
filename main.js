// Constants

const warpTravelEncounters = [
    'Reality Erosion', 
    'Plague of Madness', 
    'Incursion', 
    'Lost in Time', 
    'Ghost Ships', 
    'Shoals and Reefs', 
    'Visitations', 
    'Gellar Field Fluctuations', 
    'Warp Storm', 
    'Whispers and Dreams', 
    'All is well'
];

// Variables/State

let random;

let dur0 = 1;
let dur1, dur2, dur3;
let dur4 = 'Several Years';

let aware, awareDegrees, navSkill, charted, difficulty;

let astroStatus;
let onCourse;

let duration;
let estDuration;
let subjectiveDuration;
let timeDilation;
let realDuration;

let ourEncounters = [];

let leaveDegrees;


// Cached Event Listeners

/* A listener is needed to list to a table of options 
with the options being as per table 7-2 on Core pg 184 (handle duration) */

/* A listener for the difficulty of passage per block on Core pg 185 (handle difficulty)*/

/* a listener for reset */

// Render
function render(){
    astroStatus ? console.log('The Astronomican has been located') : console.log('The Astronomican cannot be found');
    console.log(duration + estDuration + realDuration + charted + onCourse);
    console.log(ourEncounters);
    console.log(leaveDegrees);
};

// Functions

function findAstro(){
    let pass;
    let awarenessRoll = Math.floor(Math.random()*99)+1;
    awarenessRoll <= aware ? pass = true : pass = false;
    awareDegrees = aware - awarenessRoll;
    return awareDegrees;
};

function navEst(){
    let navEstimate;
    let navRoll = Math.floor(Math.random()*99)+1;
    navRoll <= navSkill + awareDegrees ? navEstimate = true : navEstimate = false;
    navEstimate ? estDuration = duration : estDuration = duration*(Math.floor((Math.random()*2)*((navSkill+awareDegrees)-navRoll))+0.5);
    return estDuration;
};

function timeDilate(){
    timeDilation = Math.floor(Math.Random()*24);
    return timeDilation;
};

function chartCourse(){
    if (astroStatus === false){
        let pass;
        let hellishRoll = Math.floor(Math.random()*99)+1;
        hellishRoll <= navSkill+awareDegrees-60 ? pass = true : pass = false;
        if (pass === false){return charted = false};
    }
    else {
        let pass;
        let chartRoll = Math.floor(Math.random()*99)+1;
        chartRoll <= navSkill+awareDegrees+10 ? pass = true : pass = false;
        pass ? charted = true : charted = false;
    }
};

function steerVessel(){
    let pass;
    let steerRoll = Math.floor(Math.random()*99)+1;
    let dice1 = Math.floor(Math.random()*9)+1;
    let dice2 = Math.floor(Math.random()*9)+1;
    steerRoll <= navSkill+awareDegrees+difficulty ? pass = true : pass = false;
    (dice1 === 9 || dice2 === 9) && pass === false ? onCourse = false : onCourse = true;
    if ((navSkill+awareDegrees+difficulty)-steerRoll >= 30){
        steerSuccess = 0.25;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll >= 20){
        steerSuccess = 0.5;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll >= 10){
        steerSuccess = 0.75;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll >= 0){
        steerSuccess = 1;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll >= -1){
        steerSuccess = 2;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll >= -10){
        steerSuccess = 3;
    }
    else if ((navSkill+awareDegrees+difficulty)-steerRoll <= -20){
        steerSuccess = 4;
    }
    subjectiveDuration = duration*steerSuccess;
    realDuration = subjectiveDuration*timeDilation;
};

function warpEncounters(){
    let encounterNum = Math.floor(subjectiveDuration/5);
    if (encounterNum === 0){encounterNum = 1};
    let n;
    charted ? n = 20 : n = 0;
    for (i = 0; i < encounterNum; i++){
        let warpRoll = Math.floor(Math.random()*99)+1+n;
        if (warpRoll <= 3){
            ourEncounters.push(warpTravelEncounters[0]);
        }
        if (warpRoll <= 9){
            ourEncounters.push(warpTravelEncounters[1]);
        }
        if (warpRoll <= 18){
            ourEncounters.push(warpTravelEncounters[2]);
        }
        if (warpRoll <= 26){
            ourEncounters.push(warpTravelEncounters[3]);
        }
        if (warpRoll <= 33){
            ourEncounters.push(warpTravelEncounters[4]);
        }
        if (warpRoll <= 39){
            ourEncounters.push(warpTravelEncounters[5]);
        }
        if (warpRoll <= 48){
            ourEncounters.push(warpTravelEncounters[6]);
        }
        if (warpRoll <= 53){
            ourEncounters.push(warpTravelEncounters[7]);
        }
        if (warpRoll <= 67){
            ourEncounters.push(warpTravelEncounters[8]);
        }
        if (warpRoll <= 75){
            ourEncounters.push(warpTravelEncounters[9]);
        }
        if (warpRoll >= 76){
            ourEncounters.push(warpTravelEncounters[10]);
        }
    }
};

function leaveWarp() {
    let exitTarget = navSkill+awareDegrees-20;
    let exitRoll = Math.floor(Math.random()*99)+1;
    leaveDegrees = exitTarget-exitRoll;
    return leaveDegrees;
};

function handleDuration(e){
    duration = e.target. // the duration button's duration - some durX
    navEst();
    timeDilate();
    chartCourse();
    steerVessel();
    warpEncounters();
    leaveWarp();
};

function handleReset(e){
    init();
};

// Init

function init(){
    random = function randomNum(){Math.floor(Math.random())};
    dur1 = (random * 5) + 5;
    dur2 = (random * 30) + 30;
    dur3 = ((random * 100) + 100) * (Math.floor(Math.random() * 1.5) + 1);
    aware = prompt('Input Navigator Awareness Target')+10;
    findAstro();
    awareDegrees >= -30 ? astroStatus = true : astroStatus = false;
    navSkill = prompt('Input Navigation Warp Skill Target');
    render();
};
init();