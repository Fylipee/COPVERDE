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
            span.innerHTML = tag.trim();
            tagsContainer.appendChild(span);
            
            // Dentro da função addTopicsToScreen ou onde você for exibir o nome do usuário:
        firebase.auth().onAuthStateChanged(user => {
        if (user) {
        // Se o usuário estiver logado
        nomeuser.innerHTML = user.displayName || user.email;  // Usa o nome de exibição ou e-mail
        } else {
        // Caso o usuário não esteja logado
       
        nomeuser.innerHTML = "Visitante";  // Exibe "Visitante" caso o usuário não esteja logado
        userInfoContainer.appendChild(nomeuser);
        }
        });
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
        tags: form.tags().value,
        userId: user.uid,
        createdAt: firebase.firestore.fieldValue.serverTimeStamp()
    };
};

const form = {
    titulo: () => document.getElementById('titulo'),
    descricao: () => document.getElementById('descricao'),
    tags: () => document.getElementById('tags')
    
    
};

function openModalf() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

function closeModalf() {
    document.getElementById('newTopicModal').style.display = 'none';
}

findTopic();