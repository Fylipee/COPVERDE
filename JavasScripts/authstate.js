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

    function logout() {
        firebase.auth().signOut().then(() => {
            console.log('Usuário deslogado com sucesso!');
            alert('Você foi deslogado.');
    
            window.location.href = '/index.html'; 
        }).catch((error) => {
            console.error('Erro ao deslogar: ', error);
            alert('Erro ao deslogar. Tente novamente.');
        });
    }
    
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById('logoutBtn').style.display = 'block';
        } else {
            document.getElementById('logoutBtn').style.display = 'none';
        }
    });

//         // Acesse a coleção 'users' e busque informações do usuário
//         firebase.firestore().collection('users').doc(userId).get()
//             .then(doc => {
//                 if (doc.exists) {
//                     const userData = doc.data();
//                     document.getElementById('email_user').innerText = user.email;
//                     document.getElementById('nome_user').innerText = userData.Nome || 'Nome não encontrado';
//                     document.getElementById('local_user').innerText = userData.Local || 'Local não encontrado';
//                     document.getElementById('tel_user').innerText = userData.Telefone || 'Telefone não encontrado';
//                 } else {
//                     console.log("Nenhum documento encontrado para este usuário.");
    
//                     document.getElementById('email_user').innerText = user.email;
//                     document.getElementById('nome_user').innerText = 'Nome não encontrado';
//                     document.getElementById('local_user').innerText = 'Local não encontrado';
//                     document.getElementById('tel_user').innerText = 'Telefone não encontrado';
//                 }
//             })
//             .catch(error => {
//                 console.error("Erro ao buscar dados do usuário: ", error);
        
//                 document.getElementById('email_user').innerText = 'Erro ao carregar dados';
//                 document.getElementById('nome_user').innerText = 'Erro ao carregar dados';
//                 document.getElementById('local_user').innerText = 'Erro ao carregar dados';
//                 document.getElementById('tel_user').innerText = 'Erro ao carregar dados';
//             });
//     } else {

//         document.getElementById('email_user').innerText = 'Usuário não autenticado';
//         document.getElementById('nome_user').innerText = 'Usuário não autenticado';
//         document.getElementById('local_user').innerText = 'Usuário não autenticado';
//         document.getElementById('tel_user').innerText = 'Usuário não autenticado';
//     }
// });



// // Função para salvar o perfil do usuário
// function salvarperfil(event) {
//     event.preventDefault();

//     const user = firebase.auth().currentUser;
//     if (!user) {
//         alert('Nenhum usuário autenticado.');
//         return;
//     }

//     const userId = user.uid;

//     const dadosPerfil = {
//         nome: document.getElementById('name').value,
//         numero: document.getElementById('phone').value,
//         local: document.getElementById('local').value
//     };

//     firebase.firestore()
//         .collection('users')
//         .doc(userId)  
//         .set(dadosPerfil, { merge: true })
//         .then(() => {
//             alert('Perfil atualizado com sucesso!');
//         })
//         .catch((error) => {
//             console.error('Erro ao atualizar o perfil:', error);
//             alert('Erro ao atualizar as informações.');
//         });
// }

// document.getElementById('formPerfil').addEventListener('submit', salvarperfil);
