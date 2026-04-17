'use strict';

let submitBtn = document.querySelector('.generate');
let teamInput = document.querySelector('.team-names');
let teamNumber = document.querySelector('.team-number');
let againBtn = document.querySelector('.again');
let noOfName = document.querySelector('.no-of-names');
let bottomSection = document.querySelector('.bottom');
let actionValue = document.querySelector('.select-action');
let count = 0;

/**
 * Handles event for clicking the submit button.
 */
submitBtn.addEventListener('click', () => {
    let noOfTeams = Number(teamNumber.value);
    let teamNames = teamInput.value
        .split('\n')
        .map(name => name.trim())
        .filter(name => name !== '');

    let action = actionValue.value;

    if (action === 'teamGenerator' &&
        checkNoOfTeamsIsValid(noOfTeams, teamNames)) 
    {
        generateTeams(chunkArray(teamNames, noOfTeams));
    }

    if (action === 'namePicker') {
        displayValueOnPage(namePicker(teamNames));
    }
});

/**
 * Handles event for clicking the again button.
 */
againBtn.addEventListener('click', () => {
    teamInput.value = '';
    teamNumber.value = '';
    noOfName.textContent = '0';
    bottomSection.innerHTML = '';
    count = 0;
});

/**
 * Handles Keyup event in textarea box
 */
teamInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        count++;
        noOfName.textContent = count;
    }
});

/**
 * Check No of team names is valid
 */
function checkNoOfTeamsIsValid(noOfTeams, arrayOfTeams) {
    if (noOfTeams === "" || noOfTeams <= 0 || noOfTeams > arrayOfTeams.length) {
        displayValueOnPage("Check input values and try again");
        return false;
    }
    return true;
}

function displayValueOnPage(value) {
    let pTag = document.createElement("p");
    let createTextNode = document.createTextNode(value);
    pTag.appendChild(createTextNode);
    bottomSection.appendChild(pTag);
}

function generateTeams(arrayOfTeams) {
    let rows = arrayOfTeams.length;
    bottomSection.innerHTML = '';

    for (let item = 0; item < rows; item++) {
        let items = arrayOfTeams[item];

        const teamCard = document.createElement('div');
        const cardHeader = document.createElement('div');

        cardHeader.appendChild(document.createTextNode("Team " + (item + 1)));
        teamCard.className = "team-card";

        teamCard.appendChild(cardHeader);

        for (let value = 0; value < items.length; value++) {
            let node = document.createElement("p");
            let textnode = document.createTextNode(items[value]);
            node.appendChild(textnode);
            teamCard.appendChild(node);
        }

        bottomSection.appendChild(teamCard);
    }
}

function namePicker(arrayOfNames) {
    if (arrayOfNames.length === 0) return "No names entered";
    const picker = Math.floor(Math.random() * arrayOfNames.length);
    return arrayOfNames[picker];
}

function chunkArray(array, noOfTeams) {
    let result = [];
    let size = Math.ceil(array.length / noOfTeams);

    for (let i = 0; i < noOfTeams; i++) {
        result.push(array.slice(i * size, i * size + size));
    }

    return result;
}