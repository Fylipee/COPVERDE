function findTopic() {
    firebase.firestore()
    .collection('topicos_forum')
    .get()
    .then(snapshot => {
        const topics = snapshot.docs.map(doc => doc.data());
        cleanTopicsFromScreen();
        addTopicsToScreen(topics);
    });
};

function cleanTopicsFromScreen() {
    const clear = document.getElementById('topics');
    clear.innerHTML = "";
};

function addTopicsToScreen(topics) {
    const unorderedList = document.getElementById('topics');
    topics.forEach(topic => {       
        const li = document.createElement('li');
        li.classList.add('discursao-container');

        const titulo = document.createElement('h3');
        titulo.innerHTML = topic.titulo;
        titulo.classList.add('discursao-title');
        li.appendChild(titulo);

        const descricao = document.createElement('p');
        descricao.innerHTML = topic.descricao;
        li.appendChild(descricao);

        const metadataContainer = document.createElement('div');
        metadataContainer.classList.add('metadata-container');

        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');

        topic.tags.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerHTML = tag.trim();  // Remover espaços extras
            tagsContainer.appendChild(span);  
        });
        metadataContainer.appendChild(tagsContainer);

        const userInfoContainer = document.createElement('div');
        userInfoContainer.classList.add('user-info-container');

        const nomeuser = document.createElement('span');
        nomeuser.innerHTML = "user";
        userInfoContainer.appendChild(nomeuser);

        const iconcoversation = document.createElement('i');
        iconcoversation.classList.add('ri-chat-3-line');
        userInfoContainer.appendChild(iconcoversation);

        const tempopostagem = document.createElement('span');
        tempopostagem.innerHTML = "14:45pm";
        userInfoContainer.appendChild(tempopostagem);

        metadataContainer.appendChild(userInfoContainer);

        li.appendChild(metadataContainer);
        unorderedList.appendChild(li);
    });
}

function cadastrarTopico() {
    const topic = createTopic();

    firebase.firestore()
    .collection('topicos_forum')
    .add(topic)
    .then(() => {
        alert("Novo tópico criado");
        findTopic();
    })
    .catch(() => {
        alert("Erro ao criar tópico");
    });
};

function createTopic() {
    return {
        titulo: form.titulo().value,
        descricao: form.descricao().value,
        tags: form.tags().value
    };
};

const form = {
    titulo: () => document.getElementById('titulo'),
    descricao: () => document.getElementById('descricao'),
    tags: () => document.getElementById('tags')
};

// function displayTags() {
//     firebase.firestore()
//         .collection('topicos_forum')
//         .get()
//         .then(snapshot => {
//             const allTags = new Set();  // Usamos Set para evitar duplicação de tags
//             snapshot.docs.forEach(doc => {
//                 const tags = doc.data().tags;  // Supondo que 'tags' seja um array
//                 tags.forEach(tag => allTags.add(tag));
//             });

//             const tagsContainer = document.getElementById('tagsContainer');
//             allTags.forEach(tag => {
//                 const tagElement = document.createElement('span');
//                 // tagElement.className = 'tag';
//                 tagElement.textContent = tag;
//                 tagElement.onclick = () => filterByTag(tag);  // Filtra ao clicar na tag
//                 tagsContainer.appendChild(tagElement);
//             });
//         })
//         .catch(error => {
//             console.error("Erro ao carregar tags: ", error);
//         });
// }

// window.onload = function() {
//     displayTags();  // Carregar as tags ao carregar a página
//     findTopic();    // Carregar os tópicos
// };

// function filterByTag(tag) {
//     firebase.firestore()
//         .collection('topicos_forum')
//         .where('tags', 'array-contains', tag)  // Filtra tópicos com essa tag
//         .get()
//         .then(snapshot => {
//             const topics = snapshot.docs.map(doc => doc.data());
//             cleanTopicsFromScreen();
//             addTopicsToScreen(topics);
//         })
//         .catch(error => {
//             console.error("Erro ao filtrar tópicos: ", error);
//         });
// }


// Inicializar a busca pelos tópicos ao carregar a página
findTopic();


function openModalf() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

function closeModalf() {
    document.getElementById('newTopicModal').style.display = 'none';
}