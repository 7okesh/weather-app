# 🌦️ Weather Pulse — Modern Real-Time Weather Dashboard

A sleek, responsive, and feature-rich weather dashboard built with **React 18**, **styled-components**, and the **OpenWeatherMap API**.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![styled-components](https://img.shields.io/badge/styled--components-6.5.3-db7093?logo=styled-components)
![Lucide Icons](https://img.shields.io/badge/Icons-Lucide-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 📍 **GPS Geolocation**: 1-click "Use My Current Location" auto-detection with browser Geolocation API.
- 🔍 **City Search & Quick Chips**: Search any global city or pick popular ones (London, New York, Tokyo, Paris, Delhi, Sydney).
- ⭐ **Favorites System**: Save and pin favorite cities to `localStorage` for instant one-click access.
- 🌡️ **Dual Temperature Units**: Seamlessly switch between Celsius (°C) and Fahrenheit (°F).
- 📊 **Detailed Weather Metrics**:
  - Humidity (%)
  - Wind Speed & Direction (m/s or mph)
  - Atmospheric Pressure (hPa)
  - Sunrise & Sunset Times
  - Visibility Range (km)
  - "Feels Like" thermal index
- ⏱️ **Hourly Timeline (Next 24 Hours)**: Scrollable 3-hour interval breakdown of upcoming temperatures and conditions.
- 📅 **5-Day Daily Forecast**: Min/Max daily temperatures and precipitation probability.
- 🎨 **Modern Responsive UI**: Clean cards, subtle glassmorphism, floating micro-animations, and mobile-first design.
- ⚡ **Smart Client-Side Caching**: 10-minute caching layer to conserve API requests and prevent rate-limiting.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=3000
BROWSER=none
```
> Get a free API key at [OpenWeatherMap](https://openweathermap.org/api).

### 4. Start Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (with `createRoot` concurrent mode)
- **Styling**: `styled-components`
- **Icons**: `lucide-react`
- **HTTP Client**: `axios`
- **Fonts**: Plus Jakarta Sans

---

## 📜 License
MIT License. Feel free to use and contribute!
