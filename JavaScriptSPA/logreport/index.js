const myMSALObj = new Msal.UserAgentApplication(msalConfig); 
var email = "";

myMSALObj.handleRedirectCallback(authRedirectCallBack);

// if (!myMSALObj.getAccount()) {
//     window.location = "/"
// }
function authRedirectCallBack(error, response) {
    if (error) {
        console.log(error);
    } else {
        if (response.tokenType === "id_token") {
            // console.log("id_token acquired at: " + new Date().toString()); 
            
            if (myMSALObj.getAccount()) {
              showWelcomeMessage(myMSALObj.getAccount());
            }
  
        } else if (response.tokenType === "access_token") {
            console.log("test");
          // console.log("access_token acquired at: " + new Date().toString());
          accessToken = response.accessToken.toString();
          rawToken = response.idToken.rawIdToken.toString();
    }
  }
}

function getAllReport(){
    postDataDownload(requestUrl + '/Log/Report/' + email)
    .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "report.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again         
    
        }).catch(e => {
            console.log(e);
        }); 
}

function getReportByDate(){
    var startDate = document.getElementById('startDate').value + " 00:00:00"
    var endDate = document.getElementById('endDate').value + " 23:59:59"
    console.log(startDate)
    postDataDownload(requestUrl + '/Log/Report/' + email + '/'  + startDate + '/' + endDate)
    .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "report.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again         
    
        }).catch(e => {
            console.log(e);
        }); 
}

function getTokenRedirect(request, endpoint) {
    return myMSALObj.acquireTokenSilent(request)
        .then((response) => {
          if (response.accessToken) {
              console.log("access_token acquired at: " + new Date().toString());
              accessToken = response.accessToken;
              rawToken = response.idToken.rawIdToken;
              email = response.account.userName;
          }
        })
        .catch(error => {
            console.log(error);
            window.location = "/"
        });
}
  
getTokenRedirect(loginRequest, graphConfig.graphMeEndpoint);

