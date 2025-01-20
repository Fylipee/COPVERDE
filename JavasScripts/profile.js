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
      const fotoElement = document.getElementById("FtPerfil");

      if (!nameElement || !phoneElement || !localElement || !fotoElement) {
        alert("Erro: Campos do formulário não encontrados!");
        return;
      }

      const name = nameElement.value || "Nome não informado";
      const phone = phoneElement.value || "Sem telefone";
      const local = localElement.value || "Sem localização";
      const foto = fotoElement.value || "Sem escolha";

      saveOrUpdateUserProfile(user, { name, phone, local, foto});
    } else {
      console.log('houve algum erro' + error)
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


// pra fechar ao modal ao clicar em "salvar"//
//ajustar pra outras páginas.
//....
