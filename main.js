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
let aware, awareDegrees, navSkill, charted, difficulty;
let duration, estDuration, subjectiveDuration, timeDilation, realDuration;
let astroStatus;
let onCourse;
let steerSuccess;
let ourEncounters = [];
let leaveDegrees;

// Cached Element Referances
const start = document.getElementById('start');
const submit = document.getElementById('submit');

// Event Listeners
start.addEventListener('click', init);
submit.addEventListener('click', handleSubmit);

/* TODO: A listener for the difficulty of passage per block on Core pg 185 (handle difficulty)*/

// Render
function render(){
    console.log('--------------------------------------------------------------------------')
    astroStatus ? console.log('The Astronomican has been located') : console.log('The Astronomican cannot be found');
    charted ? console.log('The Navigator was able to plot a course') : console.log('The Navigator was unable to plot a course');
    console.log(`The appropriate estimate for the travel duration would be ${duration} days`);
    console.log(`The Navigator estimates the journey will take ${estDuration} days`);
    console.log(`Our warp encounters include: ${ourEncounters}`);
    console.log(`The Navigator has completed the journey in ${subjectiveDuration} subjective days and  ${realDuration} objective Realspace days, which is ${realDuration/30} months, or ${realDuration/365} years.`);
    console.log(`Exit translation accuracy is ${Math.floor(leaveDegrees/10)} degrees`);
    onCourse ? console.log('The ship arrives at its intended destination') : console.log('The ship has not arrived at the intended destination and is lost in space');
    console.log('--------------------------------------------------------------------------')
};

// Functions
function navEst(){
    let navEstimate;
    let navRoll = Math.floor(Math.random()*99)+1;
    navRoll <= navSkill + awareDegrees ? navEstimate = true : navEstimate = false;
    navEstimate ? estDuration = Math.floor(duration) : estDuration = Math.floor(duration*((Math.random()*2)+0.25));
    return estDuration;
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
    console.log('The steerRoll was ' + steerRoll);
    (dice1 === 9 || dice2 === 9) && pass === false ? onCourse = false : onCourse = true;
    if ((navSkill+awareDegrees+difficulty)-steerRoll >= 30){
        steerSuccess = 0.25;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll >= 20){
        steerSuccess = 0.5;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll >= 10){
        steerSuccess = 0.75;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll >= 0){
        steerSuccess = 1;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll >= -1){
        steerSuccess = 2;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll >= -10){
        steerSuccess = 3;
    }
    else if ((navSkill+awareDegrees/*difficulty*/)-steerRoll <= -20){
        steerSuccess = 4;
    }
    else {
        console.log('navSkill is ' + navSkill);
        console.log('awareDegrees is ' + awareDegrees);
        console.log('steerRoll is ' + steerRoll);
        console.log('total is ' + navSkill+awareDegrees-steerRoll);
    }
    subjectiveDuration = duration * steerSuccess;
    return subjectiveDuration;
};

function warpEncounters(){
    ourEncounters = [];
    let encounterNum = (Math.floor(subjectiveDuration/5));
    console.log('encounternum = ' + encounterNum);
    if (encounterNum < 1){encounterNum = 1};
    console.log('encounternum = ' + encounterNum);
    let n;
    charted ? n = 20 : n = 0;
    while (ourEncounters.length < encounterNum){
        let warpRoll = Math.floor(Math.random()*99)+1+n;
        if (warpRoll <= 3){
            ourEncounters.push(warpTravelEncounters[0]);
        }
        else if (warpRoll <= 9){
            ourEncounters.push(warpTravelEncounters[1]);
        }
        else if (warpRoll <= 18){
            ourEncounters.push(warpTravelEncounters[2]);
        }
        else if (warpRoll <= 26){
            ourEncounters.push(warpTravelEncounters[3]);
        }
        else if (warpRoll <= 33){
            ourEncounters.push(warpTravelEncounters[4]);
        }
        else if (warpRoll <= 39){
            ourEncounters.push(warpTravelEncounters[5]);
        }
        else if (warpRoll <= 48){
            ourEncounters.push(warpTravelEncounters[6]);
        }
        else if (warpRoll <= 53){
            ourEncounters.push(warpTravelEncounters[7]);
        }
        else if (warpRoll <= 67){
            ourEncounters.push(warpTravelEncounters[8]);
        }
        else if (warpRoll <= 75){
            ourEncounters.push(warpTravelEncounters[9]);
        }
        else if (warpRoll >= 76){
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

function handleSubmit(e){
    e.preventDefault();
    dura1 = (Math.random() * 5) + 5;
    dura2 = (Math.random() * 30) + 30;
    dura3 = ((Math.random() * 100) + 100) * (Math.floor(Math.random() * 1.5) + 1);
    let durations = [1, dura1, dura2, dura3, 'Several Years'];
    duration = durations[e.target.id.replace('dur','')];
    navEst();
    timeDilation = Math.random()*24;
    chartCourse();
    steerVessel();
    realDuration = subjectiveDuration * timeDilation;
    warpEncounters();
    leaveWarp();
    render();
};

// Init
function init(){
    aware = parseInt(prompt('Input Navigator Awareness Target'))+10;
    awareDegrees = aware - (Math.floor(Math.random()*99)+1);
    awareDegrees >= -30 ? astroStatus = true : astroStatus = false;
    navSkill = parseInt(prompt('Input Navigation Warp Skill Target'));
};