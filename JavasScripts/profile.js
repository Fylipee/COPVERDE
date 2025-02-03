// Função auxiliar para manipular exibição condicional
function toggleVisibility(elementId, isVisible) {
  const element = document.getElementById(elementId);
  if (element) {
      element.style.display = isVisible ? 'block' : 'none';
  } else {
      console.warn(`Elemento com ID '${elementId}' não encontrado.`);
  }
}

// Função centralizada para gerenciar mudanças no estado de autenticação
function handleAuthStateChange(user) {
  if (user) {
      // Exibe elementos relevantes ao usuário logado
      toggleVisibility('quandologar', true);
      toggleVisibility('auto', false);
      toggleVisibility('profilePicture', true);
      toggleVisibility('quandologardrop', true);
      toggleVisibility('logoutBtn', true);

      // Define dados do usuário logado
      const profilePicture = document.getElementById('profilePicture');
      if (profilePicture) {
          profilePicture.src = user.photoURL || 'assets/images/Fotos_pra_otimização/logo.webp';
      }

      const emailElement = document.getElementById('email_user');
      if (emailElement) {
          emailElement.innerText = user.email || 'Usuário não autenticado';
      }

      // Busca informações adicionais do Firestore
      const userId = user.uid;
      firebase.firestore().collection('users').doc(userId).get()
          .then(doc => {
              if (doc.exists) {
                  const userData = doc.data();
                  ['name', 'phone', 'local'].forEach(field => {
                      const element = document.getElementById(field);
                      if (element) {
                          element.value = userData[field] || '';
                          element.setAttribute('readonly', 'true');
                      }
                  });

                  // Torna os campos editáveis após um tempo
                  setTimeout(() => {
                      ['name', 'phone', 'local'].forEach(field => {
                          const element = document.getElementById(field);
                          if (element) {
                              element.removeAttribute('readonly');
                          }
                      });
                      console.log("Agora os campos estão editáveis.");
                  }, 5000);
              } else {
                  console.log("Nenhum documento encontrado para este usuário.");
              }
          })
          .catch(error => {
              console.error("Erro ao buscar dados do usuário: ", error);
          });

  } else {
      console.log('Usuário deslogado ou não autenticado.');

      // Oculta elementos para usuários não autenticados
      toggleVisibility('quandologar', false);
      toggleVisibility('auto', true);
      toggleVisibility('profilePicture', false);
      toggleVisibility('quandologardrop', false);
      toggleVisibility('logoutBtn', false);

      // Reseta campos para estado padrão
      ['name', 'phone', 'local'].forEach(field => {
          const element = document.getElementById(field);
          if (element) {
              element.value = 'Usuário não autenticado';
          }
      });

      const emailElement = document.getElementById('email_user');
      if (emailElement) {
          emailElement.innerText = 'Usuário não autenticado';
      }
  }
}

// Monitora mudanças no estado de autenticação
firebase.auth().onAuthStateChanged(handleAuthStateChange);

// Função para deslogar do sistema
function logout() {
  firebase.auth().signOut()
      .then(() => {
          alert('Deslogado com sucesso.');
          window.location.href = "index.html";
      })
      .catch((error) => {
          console.error('Erro ao deslogar: ', error);
          alert('Erro ao deslogar. Tente novamente.');
      });
}

// Adiciona evento ao botão de logout
const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

// Controle do modal do perfil
function openModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('editProfileModal');
  if (event.target === modal) {
      closeModal();
  }
};

// Salvar ou atualizar perfil do usuário
function saveOrUpdateUserProfile(user, profileData) {
  const userDocRef = firebase.firestore().collection("users").doc(user.uid);

  userDocRef
      .get()
      .then((doc) => {
          if (!doc.exists) {
              userDocRef.set({
                  email: user.email,
                  ...profileData,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
              console.log("Novo perfil criado!");
          } else {
              userDocRef.update({
                  ...profileData,
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
              console.log("Perfil existente atualizado!");
              alert("Perfil atualizado com sucesso!");
          }
      })
      .catch((error) => {
          console.error("Erro ao acessar o Firestore:", error);
          alert("Erro ao salvar perfil. Tente novamente.");
      });
}

// Verifica usuário logado e salva perfil
function checkUserAndSaveProfile() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          const fields = ['name', 'phone', 'local', 'FtPerfil'];
          const profileData = {};

          let missingFields = false;
          fields.forEach(field => {
              const element = document.getElementById(field);
              if (!element) {
                  alert(`Erro: Campo ${field} não encontrado!`);
                  missingFields = true;
              } else {
                  profileData[field] = element.value || `Sem ${field}`;
              }
          });

          if (!missingFields) {
              saveOrUpdateUserProfile(user, profileData);
          }
      } else {
          console.error('Usuário não autenticado');
      }
  });
}

// Evento do botão "Salvar"
document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("formPerfil");
  if (saveButton) {
      saveButton.addEventListener("click", (event) => {
          event.preventDefault();
          checkUserAndSaveProfile();
          closeModal();
      });
  }
});