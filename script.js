// Historique des événements
let eventHistory = [];
let lastTemperature = 20;
let lastHumidityAir = 60;
let lastHumiditySoil = 50;

// Fonction pour ajouter un événement à l'historique
function addEvent(eventType, eventMessage) {
    const now = new Date();
    const time = String(now.getHours()).padStart(2, '0') + ':' + 
                String(now.getMinutes()).padStart(2, '0') + ':' + 
                String(now.getSeconds()).padStart(2, '0');
    
    eventHistory.unshift({ type: eventType, message: eventMessage, time: time });
    
    // Garder seulement les 10 derniers événements
    if (eventHistory.length > 10) {
        eventHistory.pop();
    }
    
    updateHistoryDisplay();
}

// Fonction pour mettre à jour l'affichage de l'historique
function updateHistoryDisplay() {
    const historyContainer = document.getElementById('historyContent');
    historyContainer.innerHTML = '';
    
    if (eventHistory.length === 0) {
        historyContainer.innerHTML = '<div class="history-item">En attente de modifications...</div>';
    } else {
        eventHistory.forEach(event => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item history-' + event.type;
            historyItem.innerHTML = `<span class="history-time">${event.time}</span> - ${event.message}`;
            historyContainer.appendChild(historyItem);
        });
    }
}

function ouvrirVolets() {
    alert('✅ Les volets sont ouverts !');
    console.log('Volets ouverts');
    addEvent('volets', '🔓 Volets ouverts');
}

function fermerVolets() {
    alert('✅ Les volets sont fermés !');
    console.log('Volets fermés');
    addEvent('volets', '🔒 Volets fermés');
}

// Affichage en temps réel de la température (sans enregistrement)
function updateTemperatureDisplay() {
    const slider = document.getElementById('temperatureSlider');
    const tempDisplay = document.getElementById('tempValue');
    const temperature = slider.value;
    tempDisplay.textContent = temperature + '°C';
}

// Enregistrement du changement de température quand la souris est relâchée
function recordTemperatureChange() {
    const slider = document.getElementById('temperatureSlider');
    const temperature = slider.value;
    
    if (temperature !== lastTemperature) {
        addEvent('temperature', `🌡️ Température: ${lastTemperature}°C → ${temperature}°C`);
        lastTemperature = temperature;
    }
    console.log('Température définie à: ' + temperature + '°C');
}

// Affichage en temps réel de l'humidité air (sans enregistrement)
function updateHumidityAirDisplay() {
    const slider = document.getElementById('humidityAirSlider');
    const humDisplay = document.getElementById('humidityAirValue');
    const humidity = slider.value;
    humDisplay.textContent = humidity + '%';
}

// Enregistrement du changement d'humidité air quand la souris est relâchée
function recordHumidityAirChange() {
    const slider = document.getElementById('humidityAirSlider');
    const humidity = slider.value;
    
    if (humidity !== lastHumidityAir) {
        addEvent('humidity', `💧 Humidité air: ${lastHumidityAir}% → ${humidity}%`);
        lastHumidityAir = humidity;
    }
    console.log('Humidité de l\'air définie à: ' + humidity + '%');
}

// Affichage en temps réel de l'humidité sol (sans enregistrement)
function updateHumiditySoilDisplay() {
    const slider = document.getElementById('humiditySoilSlider');
    const humDisplay = document.getElementById('humiditySoilValue');
    const humidity = slider.value;
    humDisplay.textContent = humidity + '%';
}

// Enregistrement du changement d'humidité sol quand la souris est relâchée
function recordHumiditySoilChange() {
    const slider = document.getElementById('humiditySoilSlider');
    const humidity = slider.value;
    
    if (humidity !== lastHumiditySoil) {
        addEvent('humidity', `🌱 Humidité sol: ${lastHumiditySoil}% → ${humidity}%`);
        lastHumiditySoil = humidity;
    }
    console.log('Humidité de la terre définie à: ' + humidity + '%');
}

// Fonction pour mettre à jour la date et l'heure
function updateDateTime() {
    const now = new Date();
    
    // Format de la date : JJ/MM/AAAA
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    
    // Format de l'heure : HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds}`;
    
    // Déterminer la saison
    const month_num = now.getMonth();
    let season = '';
    if (month_num >= 2 && month_num <= 4) {
        season = '🌱 Printemps';
    } else if (month_num >= 5 && month_num <= 7) {
        season = '☀️ Été';
    } else if (month_num >= 8 && month_num <= 10) {
        season = '🍂 Automne';
    } else {
        season = '❄️ Hiver';
    }
    
    // Mettre à jour le contenu
    document.getElementById('dateDisplay').textContent = dateStr;
    document.getElementById('timeDisplay').textContent = timeStr;
    document.getElementById('seasonDisplay').textContent = season;
}

// Mettre à jour au chargement et chaque seconde
updateDateTime();
setInterval(updateDateTime, 1000);
