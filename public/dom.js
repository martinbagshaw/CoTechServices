// DOM manipulation here
"use strict";

// initial callback function - output services
const outputServices = (response) => {
    // output list items
    const outputItems = response.map(item => `
    <li class="service-item">
        <a href="#wikiSearch">
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



// format clicked search term to put into wikipedia
const wikiFormat = title => {    
    // if title has two words, split it
    if (/\s/.test(title)) {
        const a = title.split(" ");
        return `${a[0]}_${a[1].toLowerCase()}`;
    }
    // if title has one word, return
    else {
        // console.log(title);
        return title;
    }
}

const locationFormat = location => {    
    // if location has a hash, remove hash and everything after it
    if (/#/.test(location)) {
        const a = location.split("#");
        return a[0];
    }
    // if not, return
    else {
        return location;
    }
}

// export for testing
// module.exports = wikiFormat;





// this runs AFTER initial json load
const serviceEventListener = () => {
    const serviceItems = document.querySelectorAll('.service-item a');
    serviceItems.forEach(item => item.addEventListener("click", serviceClick));
}


const serviceClick = (e) => {
    
    const li = e.target.closest('li'); // go up to the closest li (parent). Reliable
    const myTitle = li.querySelector('.service-item__title').textContent; // get text of the title


    // format myTitle before putting into search
    const formatted = wikiFormat(myTitle);
    const hashFormat = locationFormat(location.href);

    location.href = `${hashFormat}#service_${formatted}`;
    // handleWikiRequest(formatted); // in handlers.js, trying to circumvent CORS
    e.preventDefault();
}


// ``; https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=
    // console.log(location.href+formatted);
/*

https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=

wikipedia search terms (to concatenate to the above):

Game Design
Game_design

Research
Research

Data standards
Standard_data_model

Information Security
Information_security


*/