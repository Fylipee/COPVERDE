firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const email = user.email;
        document.getElementById('email_user').innerText = email;
    } else {
        document.getElementById('email_user').innerText = 'Usuário não autenticado';
    }
});