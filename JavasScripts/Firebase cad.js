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

//cadastro.
function cadastrar() {
  window.location.href = "cadastro.html"
}

function registro() {
  const Nome = document.getElementById('nome').value
  const local = document.getElementById('local').value
  const Email = document.getElementById('email').value
  const Celular = document.getElementById('number').value
  const Senha = document.getElementById('password').value
  const Confirme_sua_Senha = document.getElementById('confirmPassword').value
  firebase.auth().createUserWithEmailAndPassword(Email, Senha
  ).then(() => {
    window.location.href = "index.html";
  }).catch(error => {
    alert(error);
  });
}

//recuparar senha.
function resetSenha() {
  firebase.auth().sendPasswordResetEmail(document.getElementById('email').value).then(() => {
    alert('Email enviado com sucesso');
  }).catch(error => {
    alert('Esqueceu o email, bobo.')
  });

}