import React from "react";
import styled from "styled-components";
import { WeatherIcon, MetricIcon, Star, RefreshCw, Search } from "./WeatherIcons";
import ForecastComponent from "./ForecastComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const BackSearchBtn = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionIconButton = styled.button`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const UnitSwitchButton = styled.button`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  height: 36px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 700;
  color: #1d4ed8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #dbeafe;
  }
`;

const MainCard = styled.div`
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
  border-radius: 20px;
  padding: 24px 20px;
  color: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.35);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -40px;
    right: -40px;
    width: 140px;
    height: 140px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const LocationHeader = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const CityName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
`;

const CountryDate = styled.span`
  font-size: 13px;
  opacity: 0.9;
  margin-top: 4px;
`;

const HeroRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  z-index: 1;
`;

const TempWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentTemp = styled.span`
  font-size: 52px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
`;

const ConditionText = styled.span`
  font-size: 15px;
  font-weight: 600;
  text-transform: capitalize;
  margin-top: 6px;
  opacity: 0.95;
`;

const FeelsLike = styled.span`
  font-size: 12px;
  opacity: 0.85;
  margin-top: 2px;
`;

const MetricsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 100%;
`;

const MetricsTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 14px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
`;

const MetricIconBox = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${(props) => props.bg || "#f1f5f9"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MetricTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const MetricTitle = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const WeatherInfoComponent = ({
  weather,
  forecast,
  unit = "metric",
  onResetSearch,
  onRefresh,
  onToggleUnit,
  onToggleFavorite,
  isFavorite = false,
}) => {
  if (!weather || !weather.main) return null;

  const tempSymbol = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  const formatSunTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const weatherCode = weather.weather?.[0]?.icon || "01d";
  const conditionDescription = weather.weather?.[0]?.description || "Clear sky";

  return (
    <Container>
      {/* Top Header Controls */}
      <TopBar>
        <BackSearchBtn type="button" onClick={onResetSearch}>
          <Search size={14} />
          Change City
        </BackSearchBtn>

        <RightControls>
          <UnitSwitchButton type="button" onClick={onToggleUnit}>
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </UnitSwitchButton>

          <ActionIconButton
            type="button"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            onClick={onToggleFavorite}
          >
            <Star
              size={18}
              color={isFavorite ? "#eab308" : "#94a3b8"}
              fill={isFavorite ? "#eab308" : "none"}
            />
          </ActionIconButton>

          <ActionIconButton type="button" title="Refresh weather" onClick={onRefresh}>
            <RefreshCw size={16} />
          </ActionIconButton>
        </RightControls>
      </TopBar>

      {/* Main Highlights Card */}
      <MainCard>
        <LocationHeader>
          <CityName>{weather.name}, {weather.sys?.country}</CityName>
          <CountryDate>{currentDate}</CountryDate>
        </LocationHeader>

        <HeroRow>
          <TempWrapper>
            <CurrentTemp>{Math.round(weather.main.temp)}{tempSymbol}</CurrentTemp>
            <ConditionText>{conditionDescription}</ConditionText>
            <FeelsLike>Feels like {Math.round(weather.main.feels_like)}{tempSymbol}</FeelsLike>
          </TempWrapper>

          <WeatherIcon code={weatherCode} size={88} color="#ffffff" />
        </HeroRow>
      </MainCard>

      {/* Weather Metrics Grid */}
      <MetricsSection>
        <MetricsTitle>Current Conditions</MetricsTitle>
        <MetricsGrid>
          <MetricCard>
            <MetricIconBox bg="#eff6ff">
              <MetricIcon type="humidity" size={22} color="#0284c7" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{weather.main.humidity}%</MetricValue>
              <MetricTitle>Humidity</MetricTitle>
            </MetricTextBox>
          </MetricCard>

          <MetricCard>
            <MetricIconBox bg="#ecfdf5">
              <MetricIcon type="wind" size={22} color="#059669" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{Math.round(weather.wind?.speed)} {speedUnit}</MetricValue>
              <MetricTitle>Wind Speed</MetricTitle>
            </MetricTextBox>
          </MetricCard>

          <MetricCard>
            <MetricIconBox bg="#fef3c7">
              <MetricIcon type="sunrise" size={22} color="#d97706" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{formatSunTime(weather.sys?.sunrise)}</MetricValue>
              <MetricTitle>Sunrise</MetricTitle>
            </MetricTextBox>
          </MetricCard>

          <MetricCard>
            <MetricIconBox bg="#ffedd5">
              <MetricIcon type="sunset" size={22} color="#ea580c" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{formatSunTime(weather.sys?.sunset)}</MetricValue>
              <MetricTitle>Sunset</MetricTitle>
            </MetricTextBox>
          </MetricCard>

          <MetricCard>
            <MetricIconBox bg="#f5f3ff">
              <MetricIcon type="pressure" size={22} color="#7c3aed" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{weather.main.pressure} hPa</MetricValue>
              <MetricTitle>Pressure</MetricTitle>
            </MetricTextBox>
          </MetricCard>

          <MetricCard>
            <MetricIconBox bg="#faf5ff">
              <MetricIcon type="visibility" size={22} color="#9333ea" />
            </MetricIconBox>
            <MetricTextBox>
              <MetricValue>{(weather.visibility / 1000).toFixed(1)} km</MetricValue>
              <MetricTitle>Visibility</MetricTitle>
            </MetricTextBox>
          </MetricCard>
        </MetricsGrid>
      </MetricsSection>

      {/* Forecast Component */}
      <ForecastComponent forecast={forecast} unit={unit} />
    </Container>
  );
};

export default WeatherInfoComponent;