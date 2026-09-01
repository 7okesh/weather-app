import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CityComponent from "./modules/CityComponent";
import WeatherInfoComponent from "./modules/WeatherInfoComponent";
import { fetchWeatherData, fetchWeatherByCoords } from "./services/weatherService";
import { CloudSun, RefreshCw } from "./modules/WeatherIcons";

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 16px;
  box-sizing: border-box;
  background: linear-gradient(145deg, #e0f2fe 0%, #ede9fe 50%, #fef3c7 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 460px;
  padding: 28px 24px;
  border-radius: 24px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  box-sizing: border-box;
  transition: all 0.3s ease;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const AppTitle = styled.h1`
  color: #0f172a;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #b91c1c;
  font-size: 13px;
  font-weight: 500;
  box-sizing: border-box;
`;

const ErrorCloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #b91c1c;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 12px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;

  & svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

function App() {
  const [currentCity, setCurrentCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState(() => localStorage.getItem("weather_unit") || "metric");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weather_favs") || "[]");
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("weather_favs", JSON.stringify(favorites));
  }, [favorites]);

  // Save unit to localStorage
  useEffect(() => {
    localStorage.setItem("weather_unit", unit);
  }, [unit]);

  const handleSearch = useCallback(
    async (cityName, searchUnit = unit) => {
      if (!cityName) return;
      setIsLoading(true);
      setErrorMessage("");

      try {
        const { current, forecast } = await fetchWeatherData(cityName, searchUnit);
        setWeatherData(current);
        setForecastData(forecast);
        setCurrentCity(current.name);
      } catch (err) {
        setErrorMessage(err.message || "Failed to load weather data.");
      } finally {
        setIsLoading(false);
      }
    },
    [unit]
  );

  const handleGeoLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const { current, forecast } = await fetchWeatherByCoords(latitude, longitude, unit);
          setWeatherData(current);
          setForecastData(forecast);
          setCurrentCity(current.name);
        } catch (err) {
          setErrorMessage(err.message || "Unable to retrieve weather for your location.");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        setErrorMessage(
          err.code === 1
            ? "Location permission was denied. Please search for a city manually."
            : "Location detection timed out or failed."
        );
      },
      { timeout: 10000 }
    );
  }, [unit]);

  const handleToggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (currentCity) {
      handleSearch(currentCity, newUnit);
    }
  };

  const handleToggleFavorite = () => {
    if (!currentCity) return;
    setFavorites((prev) =>
      prev.includes(currentCity)
        ? prev.filter((c) => c !== currentCity)
        : [...prev, currentCity]
    );
  };

  const handleResetSearch = () => {
    setWeatherData(null);
    setForecastData(null);
    setErrorMessage("");
  };

  const handleRefresh = () => {
    if (currentCity) {
      handleSearch(currentCity);
    }
  };

  // Attempt initial default location load if favorites exist or default city
  useEffect(() => {
    if (favorites.length > 0) {
      handleSearch(favorites[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppWrapper>
      <Container>
        <AppHeader>
          <CloudSun size={24} color="#2563eb" />
          <AppTitle>Weather Pulse</AppTitle>
        </AppHeader>

        {errorMessage && (
          <ErrorBanner>
            <span>{errorMessage}</span>
            <ErrorCloseBtn onClick={() => setErrorMessage("")}>&times;</ErrorCloseBtn>
          </ErrorBanner>
        )}

        {isLoading ? (
          <LoadingBox>
            <RefreshCw size={28} color="#2563eb" />
            <span>Fetching real-time meteorological data...</span>
          </LoadingBox>
        ) : weatherData ? (
          <WeatherInfoComponent
            weather={weatherData}
            forecast={forecastData}
            unit={unit}
            onResetSearch={handleResetSearch}
            onRefresh={handleRefresh}
            onToggleUnit={handleToggleUnit}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.includes(currentCity)}
          />
        ) : (
          <CityComponent
            onSearch={handleSearch}
            onGeoLocate={handleGeoLocation}
            favorites={favorites}
            isLoading={isLoading}
          />
        )}
      </Container>
    </AppWrapper>
  );
}

export default App;