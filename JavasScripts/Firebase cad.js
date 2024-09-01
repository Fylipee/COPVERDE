const firebaseConfig = {
    apiKey: "AIzaSyD3P3uCkKQfpeCDj-5J4cLFTrF3EQk_3fw",
    authDomain: "copverde-b2567.firebaseapp.com",
    projectId: "copverde-b2567",
    storageBucket: "copverde-b2567.appspot.com",
    messagingSenderId: "327954834216",
    appId: "1:327954834216:web:f709337934e8a765fea61d",
    measurementId: "G-29LJK80PD3"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

function login() {
  //firebase.auth().signInWithEmailAndPassword('alanlopes272003@gmail.com','123456')
  (document.getElementById('email').value, document.getElementById('senha').value)
  .then(() => {
      //se tiver cadastro
      window.location.href = "index.html";
  }).catch(error => {
      //o que acontece se errar o email / senha
      alert(error);
  })
}

function cadastrar() {
  window.location.href = "cadastro.html"
}

function registro() {
  const Nome = document.getElementById('nome').value
  const local = document.getElementById('local').value
  const Email = document.getElementById('Email').value
  const Celular = document.getElementById('Celular').value
  const Senha = document.getElementById('Senha').value
  const Confirme_sua_Senha = document.getElementById('Confirme_sua_Senha').value

  firebase.auth().createUserWithEmailAndPassword(Nome, local, Email, Celular, Senha, Confirme_sua_Senha
  ).then(() => {
   window.location.href = "index.html";
  }).catch(error => {
    alert(error);
  });
}