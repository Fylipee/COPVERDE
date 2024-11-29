
// Função para pré-visualizar a imagem localmente
function previewImage(event) {
  const file = event.target.files[0]; 
  selectedFile = file; 
  const reader = new FileReader();
  reader.onload = function() {  
    const output = document.getElementById("profilePicture");
    output.src = reader.result;
  };

  reader.readAsDataURL(file);
}

firebase.auth().onAuthStateChanged((user) => {
const userId = firebase.auth().currentUser?.uid;

if (userId) {
    console.log("Usuário logado com ID:", userId);
    firebase.firestore().collection('users').doc(userId).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                console.log("Dados do usuário:", userData);
                document.getElementById('name').value = userData.name || ''; 
                document.getElementById('phone').value = userData.phone || '';
                document.getElementById('local').value = userData.local || '';

                document.getElementById('name').setAttribute('readonly', 'true');
                document.getElementById('phone').setAttribute('readonly', 'true');
                document.getElementById('local').setAttribute('readonly', 'true');

                setTimeout(() => {
                  document.getElementById('name').removeAttribute('readonly');
                  document.getElementById('phone').removeAttribute('readonly');
                  document.getElementById('local').removeAttribute('readonly');
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
    console.log("Usuário não autenticado.");
    // Se o usuário não estiver autenticado, exibe uma mensagem
    document.getElementById('name').value = 'Usuário não autenticado';
    document.getElementById('phone').value = 'Usuário não autenticado';
    document.getElementById('local').value = 'Usuário não autenticado';
}});