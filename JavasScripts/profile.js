// Função para salvar ou atualizar o perfil do usuário;
function saveOrUpdateUserProfile(user, profileData) {
  const userDocRef = db.collection("users").doc(user.uid);

  userDocRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // Criar novo perfil;
        userDocRef.set({
          email: user.email,
          ...profileData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Novo perfil criado!");
      } else {
        // Atualizar perfil existente;
        userDocRef.update({
          ...profileData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Perfil existente atualizado!");
      }
    })
    .catch((error) => {
      console.error("Erro ao acessar o Firestore:", error);
      alert("Erro ao salvar perfil. Tente novamente.");
    });
}

// Função para verificar se há um usuário logado e executar ações;
function checkUserAndSaveProfile() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const nameElement = document.getElementById("name");
      const phoneElement = document.getElementById("phone");
      const localElement = document.getElementById("local");

      if (!nameElement || !phoneElement || !localElement) {
        alert("Erro: Campos do formulário não encontrados!");
        return;
      }

      const name = nameElement.value || "Nome não informado";
      const phone = phoneElement.value || "Sem telefone";
      const local = localElement.value || "Sem localização";

      saveOrUpdateUserProfile(user, { name, phone, local });
    } else {
      alert("Usuário não está logado!");
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
    });
  }
});


// pra fechar ao modal ao clicar em "salvar"//
//ajustar pra outras páginas.
//....


// firebase.firestore().collection('users').doc(userId).get()
//             .then(doc => {
//                 if (doc.exists) {
//                     const userData = doc.data(); // Obtenha os dados do usuário
//                     document.getElementById('email_user').innerText = user.email;
//                     document.getElementById('nome_user').innerText = userData.Nome; // Supondo que 'nome' está no documento
//                     document.getElementById('local_user').innerText = userData.Local; // Supondo que 'local' está no documento
//                     document.getElementById('tel_user').innerText = userData.Telefone; // Supondo que 'tel' está no documento
//                 } else {
//                     console.log("Nenhum documento encontrado para este usuário.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Erro ao buscar dados do usuário: ", error);
//             });
//     } else {
//         // Se o usuário não estiver autenticado, exiba mensagens padrão
//         document.getElementById('email_user').innerText = 'Usuário não autenticado';
//         document.getElementById('nome_user').innerText = 'Usuário não autenticado';
//         document.getElementById('local_user').innerText = 'Usuário não autenticado';
//         document.getElementById('tel_user').innerText = 'Usuário não autenticado';
//     }
// });