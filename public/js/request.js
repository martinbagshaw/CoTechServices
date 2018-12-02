
const makeRequest = (response) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const coTechObj = JSON.parse(xhr.responseText);
      // callback function
      outputServices(coTechObj);
    }
  };
  xhr.open("GET", '/src', true); // was /coTechRequest
  xhr.send();
};

// we HAVE to call the function to get the initial data!!!
makeRequest();





// post request to router.js
const postRequest = (searchTerm) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const wikiResult = JSON.parse(xhr.responseText);
      // callback function
      wikiCallback(wikiResult);
    }
  };
  xhr.open("POST", `/search/${searchTerm}`, true);
  xhr.send(searchTerm);
};