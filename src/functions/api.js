import FileSaver from 'file-saver'

// call Rest API
export function callAPI(url, cb, type, body, errorConn) {
  if (type == "POST") {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(errorConn);
  }
  else if (type == "GET"){
    return fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
  
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(errorConn);
  }
  else if (type == "PUT"){
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
  }
  else {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(function(error){
      // console.log("error");
      // console.log(error);
    });
  }
}

// downloadCSV
export function downloadCSV(url, cb, type, body, filename){
  if (type == "POST") {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
      body: body
    }).then(function(response) {
        return response.blob()
      }).then(function(blob) {
          FileSaver.saveAs(blob, filename)
      }).then(cb);
  }
}

// check status response from API
export function checkStatus(response) {
  // console.log("response check ",response)
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.statusText = response.statusText;
  error.status = response.status;
  error.response = response;
  // console.log("error");
  console.log(error); // eslint-disable-line no-console
  throw error;
}

// parsing json
export function parseJSON(response) {
  return response.json();
}

