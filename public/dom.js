// DOM manipulation here
"use strict";

// initial callback function - output services
const outputServices = (response) => {
    // output list items

    // use an anchor link to scroll to info on moblie
    // - needs to be clicked twice, due to wikipedia loading delay
    const outputItems = response.map(item => `
    <li class="service-item">
        <a href="#${wikiFormat(item.title)}">
            <img class="service-item__image" src="${item.img}" alt="${item.title}"/>
            <div class="service-item__title">${item.title}</div>
        </a>
    </li>
    `).join('');
    document.getElementById("services").innerHTML = outputItems;
    // <a href="${item.url}">View on CoTech website</a>
    
    // add function here to add event listeners to service list items
    serviceEventListener();
};





// this runs AFTER initial json load
// - attach click event handlers to list items
const serviceEventListener = () => {
    const serviceItems = document.querySelectorAll('.service-item a');
    serviceItems.forEach(item => item.addEventListener("click", serviceClick));
}


// stuff to do on click
const serviceClick = (e) => {
    
    const li = e.target.closest('li'); // go up to the closest li (parent). Reliable
    const myTitle = li.querySelector('.service-item__title').textContent; // get text of the title

    // format myTitle before putting into search
    const formatted = wikiFormat(myTitle);
    const hashFormat = locationFormat(location.href);

    // post to request.js, then router to search
    postRequest(formatted);

    // this isn't really necessary any more - postRequest handles stuff
    // - nice to show some change in address bar though
    location.href = `${hashFormat}#${formatted}`;
    e.preventDefault();
}







// output information from Wikipedia API call on back end
const wikiCallback = (response) => {

    // empty output variable
    let outputInfo;

    // check if wiki page exists
    if (response.exists === true) {
        outputInfo = `
        <h3>${response.title}</h3>
        <article id="${response.anchorID}" class="service-content">${response.info}<p class="service-source">Source: <a href="${response.link}" target="_blank">Wikipedia</a></p></article>`;
    }
    // no wiki page for search term
    else if (response.exists === false) {
        outputInfo = `
        <h3>No Wikipedia Page</h3>
        <article id="${response.anchorID}" class="service-content"><p>Unfortunately there is no Wikipedia page corresponding to this service.</p></article>`;
    }
    
    // output to DOM
    document.getElementById("service-info").innerHTML = outputInfo;
}







// ________________________________________________
// helper functions

// format clicked search term to put into wikipedia
const wikiFormat = title => {    
    // if title has two words, split it
    if (/\s/.test(title)) {
        const a = title.split(" ");
        return `${a[0]}_${a[1].toLowerCase()}`;
    }
    // if title has one word, return
    else {
        return title;
    }
}

// if location has a hash, remove hash and everything after it
const locationFormat = location => {
    if (/#/.test(location)) {
        const a = location.split("#");
        return a[0];
    }
    // if not, return
    else {
        return location;
    }
}
// export functions for testing
if (typeof module !== "undefined") {
    module.exports = {
        wikiFormat,
        locationFormat
    };
}