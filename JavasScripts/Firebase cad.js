//login Gmail
function loginGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
  firebase.auth().signInWithPopup(provider)
}


//login normal.
function login() {
  firebase.auth().signInWithEmailAndPassword
    (document.getElementById('email').value, document.getElementById('senha').value)
    .then(() => {
      //se tiver cadastro
      window.location.href = "index.html";
    }).catch(error => {
      //o que acontece se errar o email / senha
      alert(error);
    })
}

function registro() {
  const Email = document.getElementById('E-mail').value
  const Senha = document.getElementById('Senha').value
  // const confirmarSenha = document.getElementById('confirmar-senha').value;
  firebase.auth().createUserWithEmailAndPassword(Email, Senha
  ).then(() => {
    window.location.href = "index.html";
  }).catch(error => {
    alert(error);
  });
}

//recuparar senha.
function resetSenha() {
  firebase.auth().sendPasswordResetEmail(document.getElementById('E-mail').value).then(() => {
    alert('Email enviado com sucesso');
  }).catch(error => {
    alert('Esqueceu o email, bobo.')
  });

}