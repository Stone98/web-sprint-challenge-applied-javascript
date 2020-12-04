/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element

const {
    default: Axios
} = require("axios");

Axios.get('https://lambda-times-api.herokuapp.com/topics')
    .then((result) => {
        tabsMaker(result.data);
    })
    .catch((err) => {
        console.log('something went wrong', err);
    })
    .finally(() => {
        console.log('done');
    });

function tabsMaker(topics) {
    let topicList = topics.topics;
    let topicsTabs = document.querySelector('.topics');
    let allTab = tabMaker('All');
    allTab.classList.add('active-tab');
    topicsTabs.appendChild(allTab);
    for (let index = 0; index < topicList.length; index++) {
        let topic = topicList[index];
        let tab = tabMaker(topic);
        topicsTabs.appendChild(tab);

    }
}

function tabMaker(topic) {
    let tab = document.createElement('div');
    tab.classList.add('tab');
    if (topic === 'node.js') {
        topic = 'node'; // Does not match articles topics name
    }
    // Content
    tab.setAttribute('id', topic);
    tab.textContent = topic;
    // Events
    tab.addEventListener('click', (event) => {
        // Rules for tab selection:
        // 1. If the all tab is the one that was clicked and is now selected it is needs to be the only tab that is selected
        // 2. If no tab is selected, then the all tab needs to be selected
        // 3. If the active list contains the all tab and any other tab, the all tab must be removed
        event.target.classList.toggle('active-tab');
        let id = event.target.id;
        let tabs = document.getElementsByClassName('tab'); // This gets an array of all the tabs
        let activeList = [];
        let allTab = document.getElementById('All');
        let isAllActive = id === 'All' && allTab.classList.contains('active-tab');

        if (isAllActive) { // enforce rule 1
            activeList.push('Alltopic');
            for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                const tab = tabs[tabIndex];
                if (tab.id != 'All') {
                    if (tab.classList.contains('active-tab')) {
                        tab.classList.toggle('active-tab');
                    }
                }
            }
        } else { // Gets the list of all currently selected tabs
            for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                const tab = tabs[tabIndex];
                if (tab.classList.contains('active-tab')) {
                    activeList.push(tab.id + 'topic');
                }
            }
            if (activeList.length === 0) { // enforce rule 2
                document.getElementById('All').classList.toggle('active-tab');
                activeList.push('Alltopic');
            } else if (activeList.length > 1) { // enforce rule 3
                if (activeList.indexOf('Alltopic') > -1) {
                    document.getElementById('All').classList.toggle('active-tab');
                    activeList = activeList.filter(function(item) {
                        return item !== 'Alltopic';
                    })
                }
            }
        }
        let topicContainers = document.getElementsByClassName('topic-container');
        for (let index = 0; index < topicContainers.length; index++) { // only show the sections that are in the active list or all sections if the all topic is in the list
            const topicContainer = topicContainers[index];
            if (activeList.indexOf(topicContainer.id) > -1 || activeList.indexOf('Alltopic') > -1) {
                topicContainer.style.display = ''; // show this item
            } else {
                topicContainer.style.display = 'none'; // hide this item
            }

        }
    })
    return tab;
}