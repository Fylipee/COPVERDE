    const SearchInput = document.getElementById('barra-pesquisa');
    if (SearchInput) {
        SearchInput.addEventListener('botao-buscar', function() {
            const searchTerm = this.value.toLowerCase();
            const topics = reportsTableBody.getElementsByTagName('tr');

            Array.from(topic).forEach(topic =>{
                const topics = topics.getElementsByTagName('td');
                const match = Array.from(topics).some(topics => topic.textContent.toLowerCase() .includes(searchTerm));
                row.style.display = match ? '' : 'none';

        });
    });
}   else {
    console.error("Campo de pesquisa não encontrado");
}


function findTopic() {
    firebase.firestore()
    .collection('topicos_forum')

    .get().then(snapshot =>{
        const topics = snapshot.docs.map(doc => doc.data())
        cleanTopicsFromScreen()
        addTopicsToScreen(topics)
    })
};

function cleanTopicsFromScreen () {
    clear = document.getElementById('topics');
    clear.innerHTML = ""
};

function addTopicsToScreen(topics) {
    const unorderedList = document.getElementById('topics');
    topics.forEach(topic => {       
        const li = document.createElement('li');
            const titulo = document.createElement('h3');
            titulo.innerHTML = topic.titulo; 
            li.appendChild(titulo);

            const descricao = document.createElement('p');
            descricao.innerHTML = topic.descricao;
            li.appendChild(descricao);

            const tags = document.createElement('div');
            tags.className = 'tags';        
                const span = document.createElement('Span');
                span.Classname = 'tag';
                span.innerHTML = topic.tags;
                li.appendChild(span);          
            li.appendChild(tags);
        unorderedList.appendChild(li);
    })
};

function cadastrarTopico() {
    createTopic()

    firebase.firestore()
    .collection('topicos_forum')
    .add(createTopic())
    .then(() => {
        alert("Novo topico criado")
        findTopic()
    })
    .catch(() => {
        alert("Erro ao criar topico")
    })
};

function createTopic() {
    return{
        titulo: form.titulo().value,
        descricao: form.descricao().value,
        tags: form.tags().value
    }
};

const form = {
    titulo: () => document.getElementById('titulo'),
    descricao: () => document.getElementById('descricao'),
    tags: () => document.getElementById('tags')
};

findTopic()