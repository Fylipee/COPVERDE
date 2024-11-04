//
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const email = user.email;
        document.getElementById('email_user').innerText = email;
    } else {
        document.getElementById('email_user').innerText = 'Usuário não autenticado';
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
