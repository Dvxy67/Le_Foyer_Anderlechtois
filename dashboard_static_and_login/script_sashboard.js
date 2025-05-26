// Données fictives pour démonstration
let alerts = [
    { id: 1, message: "Maintenance prévue le 20 mai", level: "info", active: true },
    { id: 2, message: "Problème de chauffage dans le bâtiment A", level: "warning", active: true },
    { id: 3, message: "Fermeture exceptionnelle le weekend prochain", level: "danger", active: false }
];

let buildings = [
    { id: 1, name: "Bâtiment A", address: "123 Rue Principale", coordinates: "48.8566, 2.3522" },
    { id: 2, name: "Bâtiment B", address: "456 Avenue Secondaire", coordinates: "48.8566, 2.3522" }
];

let photos = [
    { id: 1, title: "Façade principale", path: "/api/placeholder/200/150", building: "Bâtiment A" },
    { id: 2, title: "Hall d'entrée", path: "/api/placeholder/200/150", building: "Bâtiment B" },
    { id: 3, title: "Espace détente", path: "/api/placeholder/200/150", building: "Bâtiment A" }
];

// Gestionnaire d'onglets
document.querySelectorAll('.sidebar-item[data-tab]').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Mettre à jour la navigation active
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        
        // Afficher le contenu de l'onglet correspondant
        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(tabId + '-tab').classList.remove('hidden');
        
        // Mettre à jour le titre de l'en-tête
        const tabTitles = {
            'alerts': 'Gestion des alertes',
            'photos': 'Gestion des photos',
            'buildings': 'Gestion des bâtiments',
            'settings': 'Paramètres'
        };
        document.querySelector('.header-title').textContent = tabTitles[tabId];
    });
});

// Fonctions pour les alertes
function renderAlerts() {
    const tbody = document.getElementById('alerts-table-body');
    tbody.innerHTML = '';
    
    alerts.forEach(alert => {
        const tr = document.createElement('tr');
        
        // Message
        const tdMessage = document.createElement('td');
        tdMessage.textContent = alert.message;
        tr.appendChild(tdMessage);
        
        // Niveau
        const tdLevel = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `badge badge-${alert.level}`;
        
        const levelTexts = {
            'info': 'Information',
            'warning': 'Avertissement',
            'danger': 'Urgent'
        };
        badge.textContent = levelTexts[alert.level];
        
        tdLevel.appendChild(badge);
        tr.appendChild(tdLevel);
        
        // Statut
        const tdStatus = document.createElement('td');
        const statusBtn = document.createElement('button');
        statusBtn.className = `status-btn ${alert.active ? 'status-active' : 'status-inactive'}`;
        statusBtn.textContent = alert.active ? 'Active' : 'Inactive';
        statusBtn.onclick = () => toggleAlertStatus(alert.id);
        
        tdStatus.appendChild(statusBtn);
        tr.appendChild(tdStatus);
        
        // Actions
        const tdActions = document.createElement('td');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn action-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteAlert(alert.id);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn action-edit';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        
        tdActions.appendChild(deleteBtn);
        tdActions.appendChild(editBtn);
        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });
}

function addAlert() {
    const message = document.getElementById('alert-message').value.trim();
    const level = document.getElementById('alert-level').value;
    
    if (!message) return;
    
    const newAlert = {
        id: alerts.length > 0 ? Math.max(...alerts.map(a => a.id)) + 1 : 1,
        message: message,
        level: level,
        active: true
    };
    
    alerts.push(newAlert);
    renderAlerts();
    closeAlertModal();
}

function deleteAlert(id) {
    alerts = alerts.filter(alert => alert.id !== id);
    renderAlerts();
}

function toggleAlertStatus(id) {
    alerts = alerts.map(alert => 
        alert.id === id ? {...alert, active: !alert.active} : alert
    );
    renderAlerts();
}

// Fonctions pour les photos
function renderPhotos() {
    const grid = document.getElementById('photos-grid');
    grid.innerHTML = '';
    
    photos.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        const img = document.createElement('img');
        img.src = photo.path || 'https://via.placeholder.com/300x200';
        img.alt = photo.title;
        img.className = 'photo-img';
        
        const content = document.createElement('div');
        content.className = 'photo-content';
        
        const title = document.createElement('h3');
        title.className = 'photo-title';
        title.textContent = photo.title;
        
        const building = document.createElement('p');
        building.className = 'photo-building';
        building.textContent = photo.building;
        
        const actions = document.createElement('div');
        actions.className = 'photo-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn action-edit';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn action-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deletePhoto(photo.id);
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        content.appendChild(title);
        content.appendChild(building);
        content.appendChild(actions);
        
        card.appendChild(img);
        card.appendChild(content);
        
        grid.appendChild(card);
    });
}

function addPhoto() {
    const title = document.getElementById('photo-title').value.trim();
    const building = document.getElementById('photo-building').value;
    
    if (!title || !building) return;
    
    const newPhoto = {
        id: photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1,
        title: title,
        building: building,
        path: 'https://via.placeholder.com/300x200'
    };
    
    photos.push(newPhoto);
    renderPhotos();
    closePhotoModal();
}

function deletePhoto(id) {
    photos = photos.filter(photo => photo.id !== id);
    renderPhotos();
}

// Fonctions pour les bâtiments
function renderBuildings() {
    const tbody = document.getElementById('buildings-table-body');
    tbody.innerHTML = '';
    
    buildings.forEach(building => {
        const tr = document.createElement('tr');
        
        // Nom
        const tdName = document.createElement('td');
        tdName.textContent = building.name;
        tr.appendChild(tdName);
        
        // Adresse
        const tdAddress = document.createElement('td');
        tdAddress.textContent = building.address;
        tr.appendChild(tdAddress);
        
        // Coordonnées
        const tdCoordinates = document.createElement('td');
        tdCoordinates.textContent = building.coordinates;
        tr.appendChild(tdCoordinates);
        
        // Actions
        const tdActions = document.createElement('td');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn action-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteBuilding(building.id);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn action-edit';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        
        tdActions.appendChild(deleteBtn);
        tdActions.appendChild(editBtn);
        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });

    // Mise à jour des options de bâtiment dans le modal de photo
    const buildingSelect = document.getElementById('photo-building');
    buildingSelect.innerHTML = '<option value="">Sélectionner un bâtiment</option>';
    
    buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.name;
        option.textContent = building.name;
        buildingSelect.appendChild(option);
    });
}

function addBuilding() {
    const name = document.getElementById('building-name').value.trim();
    const address = document.getElementById('building-address').value.trim();
    const coordinates = document.getElementById('building-coordinates').value.trim();
    
    if (!name || !address) return;
    
    const newBuilding = {
        id: buildings.length > 0 ? Math.max(...buildings.map(b => b.id)) + 1 : 1,
        name: name,
        address: address,
        coordinates: coordinates || '0, 0'
    };
    
    buildings.push(newBuilding);
    renderBuildings();
    closeBuildingModal();
}

function deleteBuilding(id) {
    buildings = buildings.filter(building => building.id !== id);
    renderBuildings();
}

// Gestion des modals
// Modal Alertes
function openAlertModal() {
    document.getElementById('alert-modal').classList.remove('hidden');
    document.getElementById('alert-message').value = '';
    document.getElementById('alert-level').value = 'info';
}

function closeAlertModal() {
    document.getElementById('alert-modal').classList.add('hidden');
}

// Modal Photos
function openPhotoModal() {
    document.getElementById('photo-modal').classList.remove('hidden');
    document.getElementById('photo-title').value = '';
    document.getElementById('photo-building').value = '';
}

function closePhotoModal() {
    document.getElementById('photo-modal').classList.add('hidden');
}

// Modal Bâtiments
function openBuildingModal() {
    document.getElementById('building-modal').classList.remove('hidden');
    document.getElementById('building-name').value = '';
    document.getElementById('building-address').value = '';
    document.getElementById('building-coordinates').value = '';
}

function closeBuildingModal() {
    document.getElementById('building-modal').classList.add('hidden');
}

// Gestionnaires d'événements pour les boutons
document.getElementById('add-alert-btn').addEventListener('click', openAlertModal);
document.getElementById('close-alert-modal').addEventListener('click', closeAlertModal);
document.getElementById('cancel-alert-modal').addEventListener('click', closeAlertModal);
document.getElementById('save-alert').addEventListener('click', addAlert);

document.getElementById('add-photo-btn').addEventListener('click', openPhotoModal);
document.getElementById('close-photo-modal').addEventListener('click', closePhotoModal);
document.getElementById('cancel-photo-modal').addEventListener('click', closePhotoModal);
document.getElementById('save-photo').addEventListener('click', addPhoto);

document.getElementById('add-building-btn').addEventListener('click', openBuildingModal);
document.getElementById('close-building-modal').addEventListener('click', closeBuildingModal);
document.getElementById('cancel-building-modal').addEventListener('click', closeBuildingModal);
document.getElementById('save-building').addEventListener('click', addBuilding);

// Initialisation des données
renderAlerts();
renderPhotos();
renderBuildings();