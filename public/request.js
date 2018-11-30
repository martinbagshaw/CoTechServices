
const makeRequest = (response) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const coTechObj = JSON.parse(xhr.responseText);
      // callback function
      outputServices(coTechObj);
    }
  };
  xhr.open("GET", `/coTechRequest`, true);
  xhr.send();
};

// we HAVE to call the function!!!
makeRequest();






// - - - - - - - - - - - - -

// const makeWikiRequest = (response, url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const wikiObj = JSON.parse(xhr.responseText);
//       // callback function
//       serviceEventListener(wikiObj);
//     }
//   };
//   xhr.open("GET", `/wikiRequest`, true);
//   xhr.send(url);
// };

// // we HAVE to call the function!!!
// makeWikiRequest();






// wikipedia Request - from click
// - getting CORS
// const wikiRequest = (response, formatted) => {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {

//       xhr.setRequestHeader("Origin", "http://localhost:4000/");
//       xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

//       const a = JSON.parse(xhr.responseText);
//       // callback function
//       console.log(response, a);
//       // outputServices(coTechObj);
//     }
//   };
//   xhr.open("GET", `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${formatted}`, true);
//   xhr.send();
// };
