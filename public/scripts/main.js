document.addEventListener('DOMContentLoaded', () => {
    const createGroupButton = document.getElementById('createGroupButton');
    const userSelectionModal = document.getElementById('userSelectionModal');
    const groupInfoModal = document.getElementById('groupInfoModal');
    const nextToGroupInfoButton = document.getElementById('nextToGroupInfoButton');
    const createGroupSubmitButton = document.getElementById('createGroupSubmitButton');
    const userSelectionDiv = document.getElementById('userSelection');
    const groupListDiv = document.getElementById('groupList');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId || userId.length !== 24) {
        alert('Invalid user ID');
        return;
    }

    let selectedUserIds = [];

    // Cargar la lista de grupos
    function loadGroups() {
        fetch(`/api/chats/groups/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos de los grupos:", data); // Verificar la respuesta en la consola
                if (data.success) {
                    groupListDiv.innerHTML = ''; // Limpiar antes de cargar grupos
                    data.data.forEach(group => {
                        const groupElement = document.createElement('div');
                        groupElement.textContent = group.name;
                        groupElement.classList.add('group-item');
                        groupElement.addEventListener('click', () => {
                            const username = urlParams.get('username');
                            window.location.href = `/chat.html?groupId=${group._id}&userId=${userId}&username=${username}`;
                        });

                        groupListDiv.appendChild(groupElement);
                    });
                } else {
                    console.error("Error en la carga de grupos:", data.message);
                }
            })
            .catch(err => {
                console.error("Error en la solicitud de carga de grupos:", err);
            });
    }

    createGroupButton.addEventListener('click', () => {
        userSelectionModal.classList.remove('hidden');
        loadUsers();
    });

    nextToGroupInfoButton.addEventListener('click', () => {
        selectedUserIds = Array.from(document.querySelectorAll('.user-item.selected')).map(el => el.dataset.userId);

        if (selectedUserIds.length > 0) {
            userSelectionModal.classList.add('hidden');
            groupInfoModal.classList.remove('hidden');
        } else {
            alert("Selecciona al menos un usuario.");
        }
    });

    createGroupSubmitButton.addEventListener('click', () => {
        const groupName = document.getElementById('groupName').value;
        const groupDescription = document.getElementById('groupDescription').value;

        if (groupName.trim() === '') {
            alert("El nombre del grupo es obligatorio.");
            return;
        }

        const groupData = {
            name: groupName,
            description: groupDescription,
            userIds: [...selectedUserIds, userId] // Incluir el creador en los participantes
        };

        console.log("Creando grupo con datos:", groupData);

        fetch('/api/chats/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(groupData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Grupo creado exitosamente:", data.data);
                    alert('Grupo creado exitosamente');
                    groupInfoModal.classList.add('hidden');
                    window.location.reload();
                } else {
                    alert('Error al crear el grupo');
                }
            });
    });

    function loadUsers() {
        fetch(`/api/users?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Usuarios cargados:", data.data);
                    userSelectionDiv.innerHTML = ''; // Limpiar antes de cargar usuarios
                    data.data.forEach(user => {
                        const userElement = document.createElement('div');
                        userElement.textContent = user.username;
                        userElement.classList.add('user-item');
                        userElement.dataset.userId = user._id;

                        userElement.addEventListener('click', () => {
                            userElement.classList.toggle('selected');
                        });

                        userSelectionDiv.appendChild(userElement);
                    });
                }
            });
    }

    loadGroups();  // Cargar los grupos al inicio
});
