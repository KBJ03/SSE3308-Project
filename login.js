
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// var regexDigit=/\d/;
// var regexCharacter=/[a-zA-Z]/;
// var regexSymbol=/[-_'.]/;
// var regexSymbols = /[^a-zA-Z0-9]/;
// var regexCharacterLowerCase=/[a-z]/;
// var regexCharacterUpperCase=/[A-Z]/;


//     function validateInput(){
  
//       var userName=document.getElementById("userName").value;
//       var password=document.getElementById("password").value;
  
//       if((userName.length==0) || (password.length==0)){
//         alert('Please enter the user name, password!');
//       }
//       else{
//             if(userName.length>3 && password.length>=10 ){
//                if(regexCharacter.test(userName) && regexDigit.test(userName) && regexSymbol.test(userName)){
//                   if(regexDigit.test(password) && regexCharacterLowerCase.test(password) && regexCharacterUpperCase.test(password) && regexSymbols.test(password)){
//                     alert('Your username and password are correct! \nYou can now log in to the website!');
//                     return true;
//                   }
//                   else{
//                       alert('Please follow the format!');
//                       return false;
//                   }     
//               }
//                else{
//                   alert('Please follow the format!');
//                   return false;
//               }
//            }
//            else{
//               alert('Please follow the format!');
//               return false;
//            }
//           }
           
//       }


//       document.getElementById('login_button').addEventListener('click', function(){
  
//         var userName=document.getElementById("userName").value;
//         var password=document.getElementById("password").value;
    
//         if((userName.length==0) || (password.length==0)){
//           alert('Please enter the user name, password!');
//         }
//         else{
//               if(userName.length>3 && password.length>=10 ){
//                  if(regexCharacter.test(userName) && regexDigit.test(userName) && regexSymbol.test(userName)){
//                     if(regexDigit.test(password) && regexCharacterLowerCase.test(password) && regexCharacterUpperCase.test(password) && regexSymbols.test(password)){
//                       alert('Your username and password are correct! \nYou can now log in to the website!');
//                       //window.location.href = 'home.html';
//                     }
//                     else{
//                         alert('Please follow the format!');
//                     }     
//                 }
//                  else{
//                     alert('Please follow the format!');
//                 }
//              }
//              else{
//                 alert('Please follow the format!');
//              }
//             }
             
//         })
    

// Function to validate password change form
function validatePasswordChangeForm() {
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;

  if (newPassword.length === 0 || confirmNewPassword.length === 0) {
      alert('Please enter the new password!');
      return false;
  }

  if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match!');
      return false;
  }

  if (newPassword.length >= 10 && confirmNewPassword.length >= 10) {
      const regexDigit = /\d/;
      const regexCharacterLowerCase = /[a-z]/;
      const regexCharacterUpperCase = /[A-Z]/;
      const regexSymbols = /[!@#$%^&*(),.?":{}|<>]/;

      if (regexDigit.test(newPassword) && regexCharacterLowerCase.test(newPassword) &&
          regexCharacterUpperCase.test(newPassword) && regexSymbols.test(newPassword) &&
          regexDigit.test(confirmNewPassword) && regexCharacterLowerCase.test(confirmNewPassword) &&
          regexCharacterUpperCase.test(confirmNewPassword) && regexSymbols.test(confirmNewPassword)) {
          return true;
      } else {
          alert('Please follow the format!\n A combination of uppercase letters, lowercase letters, numbers, and symbols with at least 10 characters');
          return false;
      }
  } else {
      alert('Please follow the format!\n A combination of uppercase letters, lowercase letters, numbers, and symbols with at least 10 characters');
      return false;
  }
}


/*Javascript for login digital clock */
function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    var time = setTimeout(function(){ startTime() }, 500);
  }
  function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }