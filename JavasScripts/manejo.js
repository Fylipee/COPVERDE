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
                const timestamp = doc.data().timestamp?.toDate();
                
                // Criar elementos
                const li = document.createElement('li');
                const materialContainer = document.createElement('div');
                const linhaSuperior = document.createElement('div');
                const dataLinha = document.createElement('div');
                const materialSpan = document.createElement('span');
                const deleteButton = document.createElement('button');
                const dataSpan = document.createElement('span');
            
                // Estilização básica
                materialContainer.style.width = '100%';
                materialContainer.style.margin = '8px 0';
                
                linhaSuperior.style.display = 'flex';
                linhaSuperior.style.justifyContent = 'space-between';
                linhaSuperior.style.alignItems = 'center';
                
                dataLinha.style.marginTop = '4px';
                dataSpan.style.color = '#666';
                dataSpan.style.fontSize = '0.8em';
            
                // Conteúdo
                materialSpan.textContent = material;
                deleteButton.textContent = 'Excluir';
                dataSpan.textContent = `Cadastrado em: ${timestamp.toLocaleDateString('pt-BR')}`;
            
                // Evento de exclusão
                deleteButton.onclick = () => materiaisRef.doc(doc.id).delete();
            
                // Montagem
                linhaSuperior.appendChild(materialSpan);
                linhaSuperior.appendChild(deleteButton);
                dataLinha.appendChild(dataSpan);
                materialContainer.appendChild(linhaSuperior);
                materialContainer.appendChild(dataLinha);
                li.appendChild(materialContainer);
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
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                document.getElementById('material').value = '';
            }
        });

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
        <p class="descc">A compostagem doméstica é uma forma prática de transformar resíduos orgânicos em adubo para o seu jardim ou horta.</p>
        <h4 class="titulod"> Passos para Começar: </h4>
        <ul class="listac">
            <li>Separe os resíduos orgânicos como restos de frutas, legumes, borra de café, etc.</li>
            <li>Evite colocar carne, laticínios ou gorduras, pois eles podem atrair pragas e criar problemas.</li>
            <li>Use uma composteira simples ou um balde perfurado com tampa para armazenar os resíduos.</li>
            <li>Adicione materiais como folhas secas, palha ou papel para ajudar a manter a composteira úmida e arejada.</li>
            <li>Mantenha a composteira úmida e arejada, e vire os resíduos regularmente para ajudar a decomposição.</li>
        </ul>
        <h5 class="titulod"> Benefícios da Compostagem Doméstica: </h5>
        <ul class="listac">
        <li>Redução de Resíduos: A compostagem doméstica ajuda a reduzir a quantidade de resíduos que vão para o lixo.</li>
        <li>Adubo Natural: A compostagem doméstica produz um adubo natural e rico em nutrientes para o seu jardim ou horta.</li>
        <li>Economia: A compostagem doméstica pode ajudar a economizar dinheiro em fertilizantes e outros produtos químicos.</li>
        </ul>
        <h6 class="titulod"> Dicas e Precauções: </h6>
        <ul class="listac">
            <li>Mantenha a composteira longe de animais e crianças para evitar problemas.</li>
            <li>Evite odores desagradáveis adicionando materiais como folhas secas ou palha.</li>
            <li>Mantenha a composteira limpa e livre de pragas para evitar problemas.</li>
        </ul>
    `,
    industrial: `
        <h3 class="tituloc">Compostagem Industrial</h3>
        <p class="descc">A compostagem industrial é realizada em larga escala por empresas ou indústrias.</p>
        <h4 class="titulod"> Passos para Começar: </h4>
        <ul class="listac">
            <li>Entre em contato com empresas locais que ofereçam serviços de coleta de resíduos orgânicos.</li>
            <li>Separe grandes quantidades de resíduos orgânicos de forma adequada.</li>
            <li>Considere visitar instalações para entender o processo.</li>
        </ul>
        <h5 class="titulod"> Benefícios da Compostagem Industrial: </h6>
        <ul class="listac">
            <li>Redução de Resíduos: A compostagem industrial ajuda a reduzir a quantidade de resíduos que vão para o lixo.</li>
            <li>Adubo Natural: A compostagem industrial produz um adubo natural e rico em nutrientes para o seu jardim ou horta.</li>
            <li>Economia: A compostagem industrial pode ajudar a economizar dinheiro em fertilizantes e outros produtos químicos.</li>
        </ul>
        <h6 class="titulod"> Dicas e Precauções: </h6>
        <ul class="listac">
            <li>Mantenha a composteira longe de animais e crianças para evitar problemas.</li>
            <li>Evite odores desagradáveis adicionando materiais como folhas secas ou palha.</li>
            <li>Mantenha a composteira limpa e livre de pragas para evitar problemas.</li>
        </ul>
    `,
    vermicompostagem: `
        <h3 class="tituloc">Vermicompostagem</h3>
        <p class="descc">A vermicompostagem utiliza minhocas para transformar resíduos orgânicos em húmus rico em nutrientes, no qual é uma excelente opção para quem deseja transformar resíduos orgânicos em adubo de alta qualidade de forma eficiente e sustentável.</p>
        <h4 class="titulod"> Passos para Começar: </h4>
        <ul class="listac">
            <li>A espécie ideal para compostagem é a minhoca californiana.</li>
            <li>Utilize uma composteira com várias camadas ou caixas plásticas furadas.</li>
            <li>Alimente as minhocas com resíduos vegetais picados e evite alimentos ácidos.</li>
        </ul>
        <h5 class="titulod"> Benefícios da Vermicompostagem: </h5>
        <ul class="listac">
            <li>A vermicompostagem produz húmus rico em nutrientes, ideal para o seu jardim ou horta.</li>
            <li>Ajuda a reduzir a quantidade de resíduos orgânicos que vão para o lixo.</li>
            <li>É um processo natural e ecológico que não utiliza produtos químicos.</li>
        </ul>
        <h6 class="titulod"> Dicas e Precauções: </h6>
        <ul class="listac">
            <li>Mantenha a Composteira Úmida: As minhocas precisam de um ambiente úmido para sobreviver e se reproduzir.</li>
            <li>Evite Alimentos Ácidos: Alimentos como cítricos e cebolas podem prejudicar as minhocas.</li>
            <li>Mantenha a Composteira Arejada: Certifique-se de que a composteira esteja bem arejada para evitar odores desagradáveis.</li>
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