const formMaterial = document.getElementById('formMaterial');
const listaMateriais = document.getElementById('listaMateriais');
const resetButton = document.getElementById('resetButton');
const clearListButton = document.getElementById('clearListButton');

// Verifique se o usuário está logado
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const materiaisRef = db.collection('materiais').doc(user.uid).collection('materiais');

        // Atualiza a lista de materiais em tempo real
        materiaisRef.onSnapshot(snapshot => {
            listaMateriais.innerHTML = ''; 
            snapshot.forEach(doc => {
                const material = doc.data().nome;
                const li = document.createElement('li');
                li.textContent = material;

                // Botão de excluir item
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.style.marginLeft = '10px';
                deleteButton.addEventListener('click', () => {
                    materiaisRef.doc(doc.id).delete();
                });

                li.appendChild(deleteButton);
                listaMateriais.appendChild(li);
            });
        });

        // Adiciona material ao enviar o formulário
        formMaterial.addEventListener('submit', event => {
            event.preventDefault();
            const material = document.getElementById('material').value;

            if (material.trim() !== '') {
                materiaisRef.add({
                    nome: material,
                });
                document.getElementById('material').value = ''; 
            }
        });

        // Reseta todos os dados do Firestore
        resetButton.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja apagar todos os materiais?')) {
                materiaisRef.get().then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                });
            }
        });

        clearListButton.addEventListener('click', () => {
            listaMateriais.innerHTML = '';
        });
    } else {
        console.log('Usuário não autenticado');
    }
});