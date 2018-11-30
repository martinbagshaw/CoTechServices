// DOM manipulation here

"use strict";

// our callback function
const outputServices = (response) => {

    // output list items
    const outputItems = response.map(item => `
    <li class="service-item">
        <img class="service-item__image" src="${item.img}" alt="${item.title}"/>
        <div class="service-item__title">${item.title}</div>
        <a href="${item.url}">View on CoTech website</a>
    </li>
    `).join('');
    document.getElementById("services").innerHTML = outputItems;
    
    // add function here to add event listeners to service list items
    serviceEventListener();
};


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

// export for testing
// module.exports = wikiFormat;





// this runs AFTER initial json load
const serviceEventListener = () => {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => item.addEventListener("click", serviceClick));
}


const serviceClick = (e) => {
    const li = e.target.closest('li'); // go up to the closest li (parent). Reliable
    const myTitle = li.querySelector('.service-item__title').textContent; // get text of the title
    // console.log(myTitle);

    // format myTitle before putting into search
    const formatted = wikiFormat(myTitle);
    // const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${formatted}`;
    // console.log(wikiURL);
    wikiRequest(formatted);
}



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