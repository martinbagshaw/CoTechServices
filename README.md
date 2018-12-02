[![Build Status](https://travis-ci.org/mr-bagglesworth/CoTechServices.svg?branch=master)](https://travis-ci.org/mr-bagglesworth/CoTechServices) ![codecov](https://codecov.io/gh/mr-bagglesworth/CoTechServices/branch/master/graph/badge.svg)

# CoTechServices

A project started on Founders and Coders Course, Week 5, node week 2, in collaboration with [teenie-quaggard](https://github.com/teenie-quaggard), [wright1](https://github.com/wright1), and [charlielafosse](https://github.com/charlielafosse), a.k.a. **Team Chinny Chin CHIN!!!**. Another cool project I could not resist but add some finishing touches to!

![chin](https://media.giphy.com/media/xTiTnzR3oXDcFea0NO/giphy.gif)
![chin](https://media.giphy.com/media/a5viI92PAF89q/giphy.gif)


## About this project

This was a fairly loose brief to build a component for the [CoTech](https://www.coops.tech/about) Website (a network of cooperative technologists), that would enhance the infomation provided to website visitors. The brief was to harness user input, and the content of one or more APIs in our project. We were to make **API calls from the back end, and to test our server.** [You can read the full brief here](https://hackmd.io/h9fBLTDERVKg9CGr3KINMQ?view).

We opted to use the WordPress REST API endpoint for _services_ from the CoTech website, along with [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) to provide users with a basic description to help clarify what each service listed on CoTech entails.


### To open this project:

- Clone the repo
- run `npm install` to install node modules and dependencies, which include:
    - tape and tap-spec
    - nyc (for code coverage) and istanbul
    - supertest (for testing http requests)
    - eslint
- `nodemon ./src/server.js` to run project from root folder.
- `tape ./tests/test.js` to run tests from root folder.
- `npm run dev` to start the project. Go to `http://localhost:4000/` to view in the browser.
- `npm run test` to run tests with code coverage. `npm test` to include test result specifics from tape.


### Project process and debrief

- **Planning:** :clipboard: On Wednesday afternoon, we whiteboarded what the mentors _may_ tell us to do on Thursday, setting up a node.js project that is set up to host front end files, and work with APIs. On Thursday, we spent a while deliberating over what to build, while looking in to the data provided by CoTech API endpoints, which wasn't anywhere near as detailed, or as well associated as we hoped it would be. Ideas of matching technologies and services to people and businesses got scrapped due to lack of data and association in the json.
- **Tools:** :wrench: We used a bit of a wider array of tools for this project, following on from the week's instruction, and paying attention to hoops to jump through in the brief. Notably, we used [Travis](https://travis-ci.org/) for continuous integration, running our tests for us on each commit to Github. We also attempted to use eslint and prettier on our machines to enforce style guidelines (with mixed results), and [nyc](https://www.npmjs.com/package/nyc) for code coverage, to see how much of our codebase our tests cover.
- **Things that went well:** :fire:
    - The initial setup
    - Most group communication and decision making, especially when narrowing down the scope of our project and researching technical limitations
    - Explanation and understanding of code between team members (when things were going well)
    - Got the initial output from WordPress API sorted fairly quickly
- **Difficulties** :exclamation:
    - Working out how to call the Wikipedia API on the back end, and in response to user input (the click event)
    - Not going around in circles when trying to work out the above. We should have probably taken more breaks and asked other people a bit more.
    - Using ```module.exports``` in the DOM file correctly. This may have prevented tests from passing


### Links:

- [Original Repo](https://github.com/fac-15/chin)
- [Project Brief](https://hackmd.io/h9fBLTDERVKg9CGr3KINMQ?view)
- [Continuous Integration Cheatsheet](https://hackmd.io/LNg8wXcBTDSdShMTu64x5A)
- [Pre Project Research](https://github.com/fac-15/Research/tree/master/week%205)


### What I did afterwards - fix and finish at home. Not explained very succinctly... :checkered_flag:
1. Looking in the router.js, I found out that no change in url was being logged to the terminal on hash change (url change). The last change we made on the project was to change the value of the address bar in ```location.href``` to the ```textContent``` of the clicked item. It was assumed that the router would pick up this change in url, and use it to make the correct http request to the Wikipedia API.
2. I made a new **XMLHttpRequest** function in ```request.js```, using the **POST** method, and passing in the search term from the click event in the ```dom.js```file.
3. In the ```router.js``` file, I logged out ```request.method``` to listen for the POST method, and ```request.url``` to listen for the corresponding url. I checked my terminal to find that the POST was working after a button click.
4. I made a conditional statement in ```router.js``` to forward POST methods with **'/search'** in the url to the ```handleWikiRequest``` function in ```handlers.js```.
5. The ```handleWikiRequest``` function extracts the search term from the url that is passed in, and uses it to fetch data from the Wikipedia API.
6. I defined a callback function in ```dom.js```, and called it in the **XMLHttpRequest** function in ```request.js```, from step 2. This logged data from Wikipedia to the front end.


### Known bugs, improvements to be made, other bits (in my version) :bug:
- More tests required. Didn't quite work out how to write failing tests for ```handlers.js```.
- Feature to scroll to Wikipedia info works on second, not initial click.
    - This is because Wikipedia info box (along with linking id) loads **after** the click event fires. Therefore the browser does not have an id to scroll to the first time around. A possible way to fix this _may_ be to set a timeout on this behaviour.
- A static json file, and images within the project are used _rather than_ the CoTech API. The API seemed to stop working when at home (maybe due to too many requests, maybe due to being away from Space 4). Code to switch to the API is commented out.
- Some services do not match exact Wikipedia search terms, and fail to return a result. Relevant Wikipedia pages for each service may exist, but with different titles. Solutions may include:
    - Mapping CoTech service names to Wikipedia equivalents
    - Finding an alternative source to Wikipedia
    - A suggestions list - if there is a way to search Wikipedia for related topics, as opposed to a specific topic.
