// Função para abrir o modal de adição de lembrete
function openReminderModal() {
    document.getElementById('reminderModal').style.display = 'block';
}

// Função para fechar o modal de adição de lembrete
function closeReminderModal() {
    document.getElementById('reminderModal').style.display = 'none';
}

// Adiciona o evento de clique ao botão "Editar Perfil"
document.querySelector('.edit-profile').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    openModal(); // Abre o modal
});

// Fecha o modal quando o usuário clica fora da área do modal
window.onclick = function(event) {
    if (event.target == document.getElementById('editProfileModal')) {
        closeModal();
    }
    if (event.target == document.getElementById('reminderModal')) {
        closeReminderModal();
    }
}
// Lida com o envio do formulário de adição de lembrete
document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    alert('Lembrete adicionado com sucesso!'); // Mensagem de sucesso
    closeReminderModal(); // Fecha o modal após o envio
});

// Função para preview da imagem de perfil
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('profilePicture');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}