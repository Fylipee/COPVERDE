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
        li.classList.add('discursao-container')

        const titulo = document.createElement('h3');
        titulo.innerHTML = topic.titulo;
        titulo.classList.add('discursao-title')
        li.appendChild(titulo);

        const descricao = document.createElement('p');
        descricao.innerHTML = topic.descricao;
        li.appendChild(descricao);

        const tags = document.createElement('div');
        tags.className = 'tags';

        // Dividir as tags e criar um span para cada uma
        topic.tags.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerHTML = tag.trim();  // Remover espaços extras
            tags.appendChild(span);
        });

        li.appendChild(tags);
        unorderedList.appendChild(li);
    });
};

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

function displayTags() {
    firebase.firestore()
        .collection('topicos_forum')
        .get()
        .then(snapshot => {
            const allTags = new Set();  // Usamos Set para evitar duplicação de tags
            snapshot.docs.forEach(doc => {
                const tags = doc.data().tags;  // Supondo que 'tags' seja um array
                tags.forEach(tag => allTags.add(tag));
            });

            const tagsContainer = document.getElementById('tagsContainer');
            allTags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagElement.onclick = () => filterByTag(tag);  // Filtra ao clicar na tag
                tagsContainer.appendChild(tagElement);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar tags: ", error);
        });
}

window.onload = function() {
    displayTags();  // Carregar as tags ao carregar a página
    findTopic();    // Carregar os tópicos
};

function filterByTag(tag) {
    firebase.firestore()
        .collection('topicos_forum')
        .where('tags', 'array-contains', tag)  // Filtra tópicos com essa tag
        .get()
        .then(snapshot => {
            const topics = snapshot.docs.map(doc => doc.data());
            cleanTopicsFromScreen();
            addTopicsToScreen(topics);
        })
        .catch(error => {
            console.error("Erro ao filtrar tópicos: ", error);
        });
}


// Inicializar a busca pelos tópicos ao carregar a página
findTopic();
