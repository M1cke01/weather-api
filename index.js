require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Función para obtener coordenadas de una ciudad
async function getCityCoordinates(city) {
    try {
        const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        
        if (response.data.results && response.data.results.length > 0) {
            return {
                lat: response.data.results[0].latitude,
                lon: response.data.results[0].longitude,
                name: response.data.results[0].name,
                country: response.data.results[0].country
            };
        }
        return null;
    } catch (error) {
        console.error('Error en geocoding:', error.message);
        return null;
    }
}

// Endpoint principal con Open-Meteo (SIN API Key)
app.get('/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        console.log(`Buscando: ${city}`);
        
        // 1. Obtener coordenadas
        const coords = await getCityCoordinates(city);
        if (!coords) {
            return res.status(404).json({ error: 'Ciudad no encontrada' });
        }
        
        // 2. Obtener clima con las coordenadas
        const weatherResponse = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=auto`
        );
        
        const current = weatherResponse.data.current_weather;
        const hourly = weatherResponse.data.hourly;
        
        // 3. Formatear respuesta
        const weatherData = {
            ciudad: coords.name,
            pais: coords.country,
            temperatura: `${Math.round(current.temperature)}°C`,
            sensacion_termica: `${Math.round(current.temperature)}°C`, // Open-Meteo no tiene feels_like
            humedad: hourly.relative_humidity_2m[0] ? `${hourly.relative_humidity_2m[0]}%` : 'N/A',
            clima: getWeatherDescription(current.weathercode),
            icono: getWeatherIcon(current.weathercode),
            viento: `${current.windspeed} km/h`,
            coordenadas: {
                lat: coords.lat,
                lon: coords.lon
            }
        };
        
        console.log('Clima obtenido:', weatherData.ciudad, weatherData.temperatura);
        res.json(weatherData);
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            error: 'Error del servidor',
            detalles: error.message 
        });
    }
});

// Helper: convertir código de clima a descripción
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Cielo despejado',
        1: 'Mayormente despejado',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Niebla',
        48: 'Niebla con escarcha',
        51: 'Llovizna ligera',
        53: 'Llovizna moderada',
        55: 'Llovizna intensa',
        61: 'Lluvia ligera',
        63: 'Lluvia moderada',
        65: 'Lluvia intensa',
        80: 'Chubascos ligeros',
        81: 'Chubascos moderados',
        82: 'Chubascos fuertes',
        95: 'Tormenta eléctrica',
        96: 'Tormenta con granizo ligero',
        99: 'Tormenta con granizo fuerte'
    };
    return weatherCodes[code] || 'Condiciones variables';
}

// Helper: obtener icono
function getWeatherIcon(code) {
    const iconCodes = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌧️',
        61: '🌧️',
        63: '🌧️',
        65: '⛈️',
        80: '🌦️',
        81: '🌧️',
        82: '⛈️',
        95: '⛈️',
        96: '⛈️',
        99: '⛈️'
    };
    return iconCodes[code] || '🌈';
}

// Endpoint de prueba
app.get('/test', (req, res) => {
    res.json({
        status: 'success',
        api: 'Open-Meteo',
        mensaje: 'API funcionando SIN necesidad de API Key',
        endpoint: 'GET /weather/:ciudad'
    });
});

// Página principal
app.get('/', (req, res) => {
    res.json({
        mensaje: '🌤️ Weather API funcionando',
        api: 'Open-Meteo (100% Gratis, sin API Key)',
        endpoints: {
            clima: 'GET /weather/:ciudad',
            test: 'GET /test',
            frontend: 'GET /index.html'
        },
        ejemplo: 'http://localhost:3000/weather/madrid'
    });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🌍 API: Open-Meteo (SIN API Key requerida)`);
    console.log(`🔗 Prueba: http://localhost:${PORT}/weather/madrid`);
    console.log(`🖥️  Frontend: http://localhost:3000`);
});