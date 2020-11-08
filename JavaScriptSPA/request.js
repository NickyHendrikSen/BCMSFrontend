var debounce = false;
function enableAccount(){
  if(debounce)return;
    debounce = true;
    loadingScreen.classList.remove("d-none");
    postData(requestUrl + '/Contact/ChangeTransferStatus/enabled')
    .then(data => {
      if(data != null){
        document.getElementById("status").innerHTML = "Enabled"
        document.getElementById("status").style.color = "green";
        disable.classList.remove("d-none");
        enable.classList.add("d-none");
        syncButton.innerText = "Transfer Now";
      }
      debounce = false;
      console.log("Test")
      loadingScreen.classList.add("d-none");
    });
}

function disableAccount(){
  if(debounce)return;
    debounce = true;
    loadingScreen.classList.remove("d-none");
    postData(requestUrl + '/Contact/ChangeTransferStatus/disabled')
    .then(data => {
      if(data != null){
        document.getElementById("status").innerHTML = "Disabled"
        document.getElementById("status").style.color = "red";
        enable.classList.remove("d-none");
        disable.classList.add("d-none");
        syncButton.innerText = "Transfer Now";
      }
      debounce = false;
      loadingScreen.classList.add("d-none");
    });
}

function sync(){
  if(debounce)return;
    debounce = true;
    loadingScreen.classList.remove("d-none");
    postData(requestUrl + '/Contact/DirectSync/' + loginData.mail)
    .then(data => {
      alert("Success Transfer");
      debounce = false;
      loadingScreen.classList.add("d-none");
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

    try{
      return response.json(); // parses JSON response into native JavaScript objects
    }catch(e){
      return response
    }
}

async function postDataDownload(url = '') {
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

    return response
}

