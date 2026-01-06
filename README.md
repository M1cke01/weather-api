# 🌤️ Weather API - Proyecto Fullstack

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

API de clima construida con **Node.js y Express** que obtiene datos meteorológicos en tiempo real utilizando **Open-Meteo API**.  
Proyecto **fullstack** que incluye una **API REST** y un **frontend web** para la consulta del clima por ciudad.

---

## ✨ Características Principales

### 🚀 Backend (API REST)
- **Endpoint único**: `GET /weather/:ciudad`
- **Sin API Key requerida**: usa Open-Meteo API (100% gratuita)
- **Datos formateados**: respuestas en español y unidades métricas
- **Manejo de errores**: códigos HTTP apropiados (400, 404, 500)
- **Logging básico**: registro de solicitudes en consola
- **Código modular**: funciones helper para separación de lógica

---

### 🎨 Frontend (Interfaz Web)
- **Diseño responsive**: compatible con móvil y desktop
- **Búsqueda dinámica por ciudad**
- **Visualización clara**: temperatura, descripción y estado del clima
- **Manejo de estados**: loading, éxito y errores visuales
- **Consumo directo de la API local**

> El frontend se sirve desde el mismo servidor Express como archivos estáticos.

---

### 🔧 Características Técnicas
- Arquitectura **cliente–servidor**
- Consumo de **API externa** (Open-Meteo + Geocoding API)
- **Transformación de datos** antes de enviarlos al cliente
- Uso de **variables de entorno** para configuración del servidor
- Proyecto ideal para práctica de APIs y fullstack básico

---

## 🏗️ Arquitectura del Sistema

Frontend Web  
↓  
API Server (Node.js / Express)  
↓  
Geocoding API (obtención de coordenadas)  
↓  
Open-Meteo API (datos climáticos)

---

## 🔄 Flujo de Datos

1. El usuario ingresa una ciudad en el frontend  
2. El frontend realiza una petición a la API local  
3. La API consulta el servicio de geocoding para obtener coordenadas  
4. La API consulta Open-Meteo con dichas coordenadas  
5. Los datos se procesan y formatean  
6. El frontend muestra la información al usuario  

---

## 📡 Uso de la API

### Endpoint

```http
GET /weather/:ciudad
```
### Ejemplo de petición

```http
GET /weather/madrid
```
### Ejemplo de respuesta
```json
{
  "ciudad": "Madrid",
  "pais": "ES",
  "temperatura": "22°C",
  "sensacion_termica": "22°C",
  "humedad": "45%",
  "clima": "Parcialmente nublado",
  "icono": "⛅",
  "viento": "12 km/h",
  "coordenadas": {
    "lat": 40.4168,
    "lon": -3.7038
  }
}
```

## Prerrequisitos

- Node.js v14 o superior
- NPM

## Pasos

Clonar el repositorio

git clone https://github.com/M1cke01/weather-api.git
cd weather-api

## Instalar dependencias

npm install

## Iniciar el servidor

node index.js

## El servidor se ejecutará por defecto en:

http://localhost:3000
