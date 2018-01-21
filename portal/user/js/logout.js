(function(){
  const config = {
    apiKey: "AIzaSyATixv-jGPMWUSctO9lwvSS0TlAsJ26iBw",
    authDomain: "getfamous-18f79.firebaseapp.com",
    databaseURL: "https://getfamous-18f79.firebaseio.com",
    projectId: "getfamous-18f79",
    storageBucket: "getfamous-18f79.appspot.com",
    messagingSenderId: "809485219012"
  };
  firebase.initializeApp(config);

  const btnLogout = document.getElementById('btnLogout');

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      if (document.getElementById('username') != undefined){
        const username = document.getElementById('username');
        username.innerHTML = firebaseUser.email;
        console.log(firebaseUser);
      }
    } else {
      console.log('not logged in');
      window.location="/login";

    }
  });

}());
