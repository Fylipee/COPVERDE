import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {
    // Configurações do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD3P3uCkKQfpeCDj-5J4cLFTrF3EQk_3fw",
        authDomain: "copverde-b2567.firebaseapp.com",
        projectId: "copverde-b2567",
        storageBucket: "copverde-b2567.appspot.com",
        messagingSenderId: "327954834216",
        appId: "1:327954834216:web:f709337934e8a765fea61d",
        measurementId: "G-29LJK80PD3"
    };

    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const minhacompostagem = document.getElementById('quandologar');
    const profilePicture = document.getElementById('profilePicture');
    const logar = document.getElementById('conectese')
    // Verifica o estado da autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuário autenticado, exibe o e-mail
            const email = user.email;
            document.getElementById('email_user').innerText = email;
            logar.style.display = 'none';
            profilePicture.style.display = 'block';
            minhacompostagem.style.display = 'block';
        } else {
            // Não há usuário autenticado
            document.getElementById('email_user').innerText = 'Usuário não autenticado';
            logar.style.display = 'block';
            profilePicture.style.display = 'none';
            minhacompostagem.style.display = 'none';
        }
    });
});

