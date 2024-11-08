//
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid; // Obtenha o ID do usuário autenticado

        // Acesse a coleção 'users' e busque informações do usuário
        firebase.firestore().collection('users').doc(userId).get()
            .then(doc => {
                if (doc.exists) {
                    const userData = doc.data(); // Obtenha os dados do usuário
                    document.getElementById('email_user').innerText = user.email;
                    document.getElementById('nome_user').innerText = userData.Nome; // Supondo que 'nome' está no documento
                    document.getElementById('local_user').innerText = userData.Local; // Supondo que 'local' está no documento
                    document.getElementById('tel_user').innerText = userData.Telefone; // Supondo que 'tel' está no documento
                } else {
                    console.log("Nenhum documento encontrado para este usuário.");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar dados do usuário: ", error);
            });
    } else {
        // Se o usuário não estiver autenticado, exiba mensagens padrão
        document.getElementById('email_user').innerText = 'Usuário não autenticado';
        document.getElementById('nome_user').innerText = 'Usuário não autenticado';
        document.getElementById('local_user').innerText = 'Usuário não autenticado';
        document.getElementById('tel_user').innerText = 'Usuário não autenticado';
    }
});
// const form = {
//     nome: () => document.getElementById('name'),
//     numero: () => document.getElementById('phone'),
//     local: () => document.getElementById('local'),
// }

// function salvarperfil() {
//     return {
//         nome: form.nome().value,
//         numero: form.numero().value,
//         local: form.senha().value
//     }
// }

// function cadastro() {
//      firebase.firestore()
//      .collection('USUÁRIO')
//      .add(salvarperfil())
//      .then(() => {
//         alert('Cadastrado com sucesso')
//      })
//      .catch(()=>{
//         alert('Erro ao cadastrar as informações')
//      })
// }
