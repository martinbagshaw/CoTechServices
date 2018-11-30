//make iffy function
const makeRequest = callback => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let coTechObj = JSON.parse(xhr.responseText);
      callback(coTechObj);
    }
  };
  xhr.open("GET", `/onload`, true);
  xhr.send();
};
