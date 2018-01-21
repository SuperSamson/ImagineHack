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

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  // const btnLogout = document.getElementById('btnLogout');

  var showNag = function(e){
    $('.nag > .title').html(e.message);
    $('.nag')
      .nag('show');
    $('.nag')
      .nag('clear');
  }

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => {
      showNag(e);
    });
  });

  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => {
        showNag(e);
    });
  });

  // btnLogout.addEventListener('click', e => {
  //   firebase.auth().signOut();
  // });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      window.location="/";
      // btnLogin.style.visibility = 'hidden';
      // btnSignUp.style.visibility = 'hidden';
      // btnLogout.style.visibility = 'visible';
    } else {
      console.log('not logged in');
      // btnLogin.style.visibility = 'visible';
      // btnSignUp.style.visibility = 'visible';
      // btnLogout.style.visibility = 'hidden';
    }
  });
  //
  // const dbRefObject = firebase.database().ref().child('object');
  // dbRefObject.on('value', snap => console.log(snap.val()));

}());
