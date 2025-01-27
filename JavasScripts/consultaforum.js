
function checkUserLogin() {
    const user = firebase.auth().currentUser;
    const newTopicButton = document.getElementById('newTopicButton');
    const loginMessage = document.getElementById('loginMessage');

    if (user) {
        newTopicButton.style.display = 'block';
        loginMessage.style.display = 'none';
    } else {
        newTopicButton.style.display = 'none';
        loginMessage.style.display = 'block';
    }
}

firebase.auth().onAuthStateChanged(checkUserLogin);

function findTopic() {
    firebase.firestore()
    .collection('topicos_forum')
    .get()
    .then(snapshot => {
        const topics = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        cleanTopicsFromScreen();
        addTopicsToScreen(topics);
    });
}

function cleanTopicsFromScreen() {
    const clear = document.getElementById('topics');
    clear.innerHTML = "";
}

// Adiciona os tópicos à tela
function addTopicsToScreen(topics) {
    const unorderedList = document.getElementById('topics');
    topics.forEach(topic => {
        const li = document.createElement('li');
        li.classList.add('discursao-container');

        const divtitx = document.createElement('div');
        divtitx.classList.add('discursao-title-container');

        const titulo = document.createElement('h3');
        titulo.innerHTML = topic.titulo;
        titulo.classList.add('discursao-title');
        divtitx.appendChild(titulo);

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('ri-delete-bin-line');
        divtitx.appendChild(deleteButton);

        li.appendChild(divtitx);
        
        // Verifica se o usuário logado é o mesmo que criou o tópico
        const user = firebase.auth().currentUser;
        if (user && topic.userId === user.uid) {
            deleteButton.style.display = 'inline-block';
            deleteButton.onclick = () => deleteTopic(topic.id);
        } else {
            deleteButton.style.display = 'none';
        }

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
        });

        metadataContainer.appendChild(tagsContainer);

        const userInfoContainer = document.createElement('div');
        userInfoContainer.classList.add('user-info-container');

        const nomeuser = document.createElement('span');
        nomeuser.innerHTML = topic.userName || "Visitante";
        userInfoContainer.appendChild(nomeuser);

        const iconcoversation = document.createElement('i');
        iconcoversation.classList.add('ri-chat-3-line');
        userInfoContainer.appendChild(iconcoversation);

        const tempopostagem = document.createElement('span');
        tempopostagem.innerHTML = formatDate(topic.createdAt);
        userInfoContainer.appendChild(tempopostagem);

        metadataContainer.appendChild(userInfoContainer);

        li.appendChild(metadataContainer);
        unorderedList.appendChild(li);
    });
}

// Função para excluir um tópico
function deleteTopic(topicId) {
    const confirmDelete = confirm("Você tem certeza que deseja excluir este tópico?");
    if (!confirmDelete) return;

    firebase.firestore().collection('topicos_forum').doc(topicId).delete()
        .then(() => {
            alert("Tópico excluído com sucesso");
            findTopic();
        })
        .catch(() => {
            alert("Erro ao excluir o tópico");
        });
}

function cadastrarTopico() {
    const topic = createTopic();

    if (Object.keys(topic).length === 0) {
        alert("Você precisa estar logado para criar um tópico.");
        return;
    }

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
}

function createTopic() {
    const user = firebase.auth().currentUser;
    if (user) {
        return {
            titulo: form.titulo().value,
            descricao: form.descricao().value,
            tags: form.tags().value,
            userId: user.uid,
            userName: user.displayName || user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
    }
    return {};
}

// Formulário de criação de tópico
const form = {
    titulo: () => document.getElementById('titulo'),
    descricao: () => document.getElementById('descricao'),
    tags: () => document.getElementById('tags')
};

// Função para formatar a data
function formatDate(timestamp) {
    const date = timestamp ? timestamp.toDate() : new Date();
    return `${date.getHours()}:${date.getMinutes()} ${date.toDateString()}`;
}

function openModalf() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

function closeModalf() {
    document.getElementById('newTopicModal').style.display = 'none';
}

findTopic();