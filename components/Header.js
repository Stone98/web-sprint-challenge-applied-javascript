/* eslint-disable no-unused-vars */
// STEP 1: Create a Header component.
// -----------------------
// Write a function that takes no arguments and returns the markup you see below:
//
//  <div class="header">
//    <span class="date">MARCH 28, 2020</span>
//    <h1>Lambda Times</h1>
//    <span class="temp">98°</span>
//  </div>
//
// Use your function to create a header
// and append it to the DOM inside the div.header-container
const headerSection = document.querySelector('.header-container');

function Header() {

    // Instantiate
    const header = document.createElement('div');
    const date = document.createElement('span');
    const title = document.createElement('h1');
    const temperature = document.createElement('span');

    // Structure
    headerSection.appendChild(header);
    header.appendChild(date);
    header.appendChild(title);
    header.appendChild(temperature);

    // Class Names and Content
    header.classList.add('header');
    date.classList.add('date');
    temperature.classList.add('temp');
    date.textContent = 'MARCH 28, 2020';
    title.textContent = 'Lambda Times';
    temperature.textContent = '98°';

    return header;
}

headerSection.appendChild(Header());