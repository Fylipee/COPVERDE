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

// Função modificada para aceitar filtro
function findTopic(filterTag = '') {
    firebase.firestore()
    .collection('topicos_forum')
    .get()
    .then(snapshot => {
        const allTopics = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        
        const filteredTopics = filterTag ? 
            allTopics.filter(topic => topic.tags === filterTag) : 
            allTopics;
            
        cleanTopicsFromScreen();
        addTopicsToScreen(filteredTopics);
    });
}

document.getElementById('tagFilter').addEventListener('change', function() {
    findTopic(this.value);
});

function updateTagFilter(topics) {
    const tagFilter = document.getElementById('tagFilter');
    tagFilter.innerHTML = '<option value="">Todos os Tópicos</option>';
    
    const allTags = topics.flatMap(topic => 
        topic.tags.split(',').map(t => t.trim())
    ).filter((t, i, arr) => t && arr.indexOf(t) === i);
    
    allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

document.getElementById('tagFilter').addEventListener('change', function() {
    findTopic(this.value);
});

function cleanTopicsFromScreen() {
    const clear = document.getElementById('topics');
    clear.innerHTML = "";
}


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

        const iconContainer = document.createElement('div');
        iconContainer.style.position = 'relative';
        iconContainer.style.display = 'inline-block';

        const iconcoversation = document.createElement('i');
        iconcoversation.classList.add('ri-chat-3-line');
        iconcoversation.onclick = () => openCommentSection(topic.id);
        
        const commentCountBadge = document.createElement('span');
        commentCountBadge.classList.add('comment-count-badge');
        commentCountBadge.textContent = '0';
        
        iconContainer.appendChild(iconcoversation);
        iconContainer.appendChild(commentCountBadge);
        userInfoContainer.appendChild(iconContainer);

        loadCommentCount(topic.id, commentCountBadge);

        const tempopostagem = document.createElement('span');
        tempopostagem.innerHTML = formatDate(topic.createdAt);
        userInfoContainer.appendChild(tempopostagem);

        metadataContainer.appendChild(userInfoContainer);

        li.appendChild(metadataContainer);

        const commentSection = document.createElement('div');
        commentSection.id = `commentSection-${topic.id}`;
        commentSection.classList.add('comment-section');
        commentSection.style.display = 'none';
        li.appendChild(commentSection);

        unorderedList.appendChild(li);
    });
}

function loadCommentCount(topicId, badgeElement) {
    firebase.firestore()
    .collection('topicos_forum')
    .doc(topicId)
    .collection('comentarios')
    .onSnapshot(snapshot => {
        badgeElement.textContent = snapshot.size;
    });
}

function openCommentSection(topicId) {
    const commentSection = document.getElementById(`commentSection-${topicId}`);
    const user = firebase.auth().currentUser;

    if (!user) {
       const destamensagem = document.getElementById('loginMessage');
       destamensagem.classList.add('login-message-highlight');
       setTimeout(() => {
        destamensagem.classList.remove('login-message-highlight');
    }, 3000);

        return;
    }

    const isVisible = commentSection.style.display === 'block';
    commentSection.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        loadComments(topicId, commentSection);
    }
}

function loadComments(topicId, commentSection) {
    firebase.firestore()
    .collection('topicos_forum')
    .doc(topicId)
    .collection('comentarios')
    .orderBy('createdAt', 'asc')
    .get()
    .then(snapshot => {
        commentSection.innerHTML = '';
        snapshot.forEach(doc => {
            const comment = doc.data();
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.userName}:</strong> ${comment.text}
                <span class="comment-date">${formatDate(comment.createdAt)}</span>
            `;
            commentSection.appendChild(commentElement);
        });

        const commentInput = document.createElement('textarea');
        commentInput.classList.add('comment-input');
        commentInput.placeholder = 'Digite seu comentário...';
        commentSection.appendChild(commentInput);

        const commentButton = document.createElement('button');
        commentButton.classList.add('comment-button');
        commentButton.innerHTML = 'Comentar';
        commentButton.onclick = () => addComment(topicId, commentInput);
        commentSection.appendChild(commentButton);
    });
}

function addComment(topicId, commentInput) {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("Você precisa estar logado para comentar.");
        return;
    }

    const commentText = commentInput.value.trim();
    if (!commentText) {
        alert("O comentário não pode estar vazio.");
        return;
    }

    firebase.firestore()
    .collection('topicos_forum')
    .doc(topicId)
    .collection('comentarios')
    .add({
        text: commentText,
        userName: user.displayName || user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        commentInput.value = '';
        loadComments(topicId, document.getElementById(`commentSection-${topicId}`));
    })
    .catch(() => {
        alert("Erro ao adicionar comentário.");
    });
}

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
    const tagSelecionada = form.tags().value;
    
    // Validação da tag
    if (!tagSelecionada) {
        alert("⚠️ Selecione uma tag antes de criar o tópico!");
        return;
    }

    const topic = createTopic();
    
    if (Object.keys(topic).length === 0) {
        alert("🔒 Você precisa estar logado para criar um tópico.");
        return;
    }

    firebase.firestore()
    .collection('topicos_forum')
    .add(topic)
    .then(() => {
        closeModalf();
        form.titulo().value = '';
        form.descricao().value = '';
        form.tags().value = '';
        findTopic();
    })
    .catch(() => {
        alert("❌ Erro ao criar tópico");
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

const form = {
    titulo: () => document.getElementById('titulo'),
    descricao: () => document.getElementById('descricao'),
    tags: () => document.getElementById('tagFilter')
};

// FUNÇÃO FORMATDATE ATUALIZADA
function formatDate(timestamp) {
    const date = timestamp ? timestamp.toDate() : new Date();
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    return new Intl.DateTimeFormat('pt-BR', options).format(date)
        .replace(/(^\w{1})| (\w{1})/g, letra => letra.toUpperCase());
}

function openModalf() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

// FUNÇÃO PARA FECHAR MODAL
function closeModalf() {
    document.getElementById('newTopicModal').style.display = 'none';
}

findTopic();