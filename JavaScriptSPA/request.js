function enableAccount(){
    console.log(rawToken)
    postData('https://localhost:5001/Contact/ChangeTransferStatus/enabled')
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
}

function disableAccount(){
    postData('https://localhost:5001/Contact/ChangeTransferStatus/disabled')
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
}

async function postData(url = '') {
    console.log(rawToken)
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + rawToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
