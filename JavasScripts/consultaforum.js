function findTopic() {
    firebase.firestore()
    .collection('topicos_forum')

    .get().then(snapshot =>{
        const topics = snapshot.docs.map(doc => doc.data())
        cleanTopicsFromScreen()
        addTopicsToScreen(topics);
        console.log(topics)
    })
}



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
}

findTopic()