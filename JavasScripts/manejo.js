const formMaterial = document.getElementById('formMaterial');
const listaMateriais = document.getElementById('listaMateriais');

// Verifique se o usuário está logado
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const materiaisRef = db.collection('materiais').doc(user.uid).collection('materiais');
        materiaisRef.onSnapshot((snapshot) => {
            listaMateriais.innerHTML = ''; 
            snapshot.forEach((doc) => {
                const material = doc.data().nome;
                const li = document.createElement('li');
                li.textContent = material;
                listaMateriais.appendChild(li);
            });
        });

        formMaterial.addEventListener('submit', (event) => {
            event.preventDefault();
            const material = document.getElementById('material').value;
            
            materiaisRef.add({
                nome: material,
            });

            document.getElementById('material').value = ''; 
        });
    } else {
        console.log('Usuário não autenticado');
    }
});