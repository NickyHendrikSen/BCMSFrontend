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
            // console.log("test");
          // console.log("access_token acquired at: " + new Date().toString());
          accessToken = response.accessToken.toString();
          rawToken = response.idToken.rawIdToken.toString();
    }
  }
}

function getAllReport(){
    var currentDate = (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()).toString() + 
                        (new Date().getMonth()+1 < 10 ? '0' + new Date().getMonth()+1 : new Date().getMonth()+1).toString() +
                        (new Date().getFullYear()).toString()
    postDataDownload(requestUrl + '/User/Report/' + email)
    .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "user_report_" + currentDate + ".xlsx";
            document.body.appendChild(a);
            a.click();    
            a.remove(); 
    
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

