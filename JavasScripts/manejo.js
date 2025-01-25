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

// ------------------------------------------ //

// Escolha da compostagem
const tipoCompostagem = document.getElementById('tipoCompostagem');
const informacoesCompostagem = document.getElementById('informacoesCompostagem');

// Informações de compostagem
const compostagemData = {
    domestica: `
        <h3 class="tituloc">Compostagem Doméstica</h3>
        <p class="descc">A compostagem doméstica é uma forma prática de transformar resíduos orgânicos em adubo para o seu jardim ou horta. Para começar:</p>
        <ul class="listac">
            <li>Separe resíduos orgânicos como restos de frutas, legumes e borra de café.</li>
            <li>Evite colocar carne, laticínios ou gorduras.</li>
            <li>Use uma composteira simples ou um balde perfurado com tampa.</li>
        </ul>
    `,
    industrial: `
        <h3 class="tituloc">Compostagem Industrial</h3>
        <p class="descc">A compostagem industrial é realizada em larga escala por empresas ou indústrias. Para começar:</p>
        <ul class="listac">
            <li>Entre em contato com empresas locais que ofereçam serviços de coleta de resíduos orgânicos.</li>
            <li>Separe grandes quantidades de resíduos orgânicos de forma adequada.</li>
            <li>Considere visitar instalações para entender o processo.</li>
        </ul>
    `,
    vermicompostagem: `
        <h3 class="tituloc">Vermicompostagem</h3>
        <p class="descc">A vermicompostagem utiliza minhocas para transformar resíduos orgânicos em húmus rico em nutrientes. Para começar:</p>
        <ul class="listac">
            <li>Adquira minhocas californianas (espécie ideal para compostagem).</li>
            <li>Use uma composteira com várias camadas ou caixas plásticas furadas.</li>
            <li>Alimente as minhocas com resíduos vegetais picados e evite alimentos ácidos.</li>
        </ul>
    `
};

// Evento para exibir informações
tipoCompostagem.addEventListener('change', (event) => {
    const tipo = event.target.value;
    if (compostagemData[tipo]) {
        informacoesCompostagem.innerHTML = compostagemData[tipo];
        informacoesCompostagem.style.display = 'block';
    } else {
        informacoesCompostagem.style.display = 'none';
    }
});