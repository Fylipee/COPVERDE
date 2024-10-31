//login Gmail
function loginGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
  firebase.auth().signInWithPopup(provider).then(() => {
    window.location.href = "index.html";
})
.catch(error => {
    alert(error);
});
}


//login normal.
function login() {
  firebase.auth().signInWithEmailAndPassword
    (document.getElementById('E-mail').value, document.getElementById('senha').value)
    .then(() => {
      //se tiver cadastro
      window.location.href = "index.html";
    }).catch(error => {
      //o que acontece se errar o email / senha.
      alert('E-mail ou senha estão incorreta!', + error);
    })
}

function registro() {
  const Email = document.getElementById('email').value
  const Senha = document.getElementById('senha').value
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  // Verifica se as senhas são iguais.
  if (Senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
}

if (Senha.length < 10) {
  alert('A senha deve ter pelo menos 10 caracteres.');
  return;
}

firebase.auth().createUserWithEmailAndPassword(Email, Senha)
.then(() => {
    window.location.href = "index.html";
})
.catch(error => {
    alert(error);
});
}

// Recuperar senha.
function resetSenha() {
  firebase.auth().sendPasswordResetEmail(document.getElementById('email').value).then(() => {
    alert('Email enviado com sucesso');
  }).catch(error => {
    alert('Esqueceu o email, bobo.')
  });
}
