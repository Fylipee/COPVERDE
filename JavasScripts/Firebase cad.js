//* Login com Gmail //
function loginGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
  
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      alert(error.message);
    });
}

//* Login com E-mail e Senha //
function login() {
  const email = document.getElementById('E-mail').value;
  const senha = document.getElementById('senha').value;

  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      alert('E-mail ou senha incorretos: ' + error.message);
    });
}

//* Registro de Novo Usuário //
function registro() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  // Verifica se as senhas são iguais.
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  // Verifica a força da senha.
  if (senha.length < 10) {
    alert('A senha deve ter pelo menos 10 caracteres.');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      alert('Essa conta já existe, faça seu login.');
    });
}

//* Recuperar Senha //
function resetSenha() {
  const email = document.getElementById('emailReset').value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('E-mail de recuperação enviado com sucesso.');
    })
    .catch(error => {
      alert('Email não cadastrado ou erro ao enviar o e-mail.');
    });
}

//* Mostrar Modal para Recuperação de Senha //
function mostrarModal() {
  const modal = document.getElementById('modalResetSenha');
  modal.style.display = "block";
  modal.querySelector('input').focus();
}

//* Fechar Modal para Recuperação de Senha //
function fecharModal() {
  const modal = document.getElementById('modalResetSenha');
  const tela = document.querySelector('.modal-overlay');
  
  modal.style.display = "none";
  tela.style.display = "none";
}

//* Keydown Event Listener //
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    fecharModal();
  }

  // Chama a função de login ao pressionar Enter (caso esteja na tela de login)
  if (event.key === 'Enter') {
    if (document.getElementById('confirmar-senha')) {
      registro();  // Chama o registro se o campo de confirmação de senha existir
    } else {
      login();  // Caso contrário, chama o login
    }
  }
});
