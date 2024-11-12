    //Controla botão da minha compostagem;
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('Usuário logado:', user);
           document.getElementById('quandologar').style.display = 'block';
           document.getElementById('auto').style.display = 'none';
           document.getElementById('profilePicture').style.display = 'block';
           document.getElementById('quandologardrop').style.display = 'block';
    } else {
        console.log('Usuário deslogado');
         document.getElementById('quandologar').style.display = 'none';
         document.getElementById('auto').style.display = 'block';
         document.getElementById('profilePicture').style.display = 'none';
    }
  });

    //Mostra email autenticado; 
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        const email = user.email;
        if (userId) {
            document.getElementById('email_user').innerText = email;
        } else {
            document.getElementById('email_user').innerText = 'Usuário não autenticado';
        }
    }});

    //função pra deslogar do sistema;
    function logout() {
        firebase.auth().signOut().then(() => {
            alert('Deslogado com sucesso.');
            window.location.href = "index.html"; 
        }).catch((error) => {
            console.error('Erro ao deslogar: ', error);
            alert('Erro ao deslogar. Tente novamente.');
        });
    }
    
    // Evento de deslogar do sistema;
    document.getElementById('logoutBtn').addEventListener('click', logout);

    //botão que aparece e some dependo está logado ou não;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById('logoutBtn').style.display = 'block';
        } else {
            document.getElementById('logoutBtn').style.display = 'none';
        }
    });
 
    //Controla modal do perfil;
    function openModal() {
        document.getElementById('editProfileModal').style.display = 'block';
    }
    function closeModal() {
        document.getElementById('editProfileModal').style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target === document.getElementById("editProfileModal")) {
            closeModal();
        }
    }

    //Visualiza a foto escolhida;
    // function previewImage(event) {
    //     const reader = new FileReader();
    //     reader.onload = function() {
    //         const output = document.getElementById('profilePicture');
    //         output.src = reader.result;
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    // }

//sus
// Lida com o envio do formulário de edição de perfil
// document.getElementById('editProfileForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   alert('Perfil atualizado com sucesso!');
//   closeModal();
// });