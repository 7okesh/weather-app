import React, { useState } from "react";
import styled from "styled-components";
import { Search, MapPin, Star, CloudSun } from "./WeatherIcons";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeroIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 20px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(254, 240, 138, 0.4) 0%, rgba(254, 215, 170, 0.1) 70%);
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
`;

const Title = styled.h2`
  color: #0f172a;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 6px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 13px;
  margin: 0 0 24px;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 6px 10px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: #1e293b;
  padding: 8px 10px;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchButton = styled.button`
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const GpsButton = styled.button`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  background: #f1f5f9;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
    color: #0f172a;
  }
`;

const ChipSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  gap: 8px;
`;

const ChipLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChipsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background: #eff6ff;
    border-color: #93c5fd;
    color: #1d4ed8;
  }
`;

const POPULAR_CITIES = ["London", "New York", "Tokyo", "Paris", "Delhi", "Sydney"];

const CityComponent = ({
  onSearch,
  onGeoLocate,
  favorites = [],
  isLoading,
}) => {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput.trim());
    }
  };

  return (
    <Container>
      <HeroIconWrapper>
        <CloudSun size={68} color="#f59e0b" strokeWidth={1.75} />
      </HeroIconWrapper>

      <Title>Weather Forecast</Title>
      <Subtitle>Enter a city name or use your current location</Subtitle>

      <SearchForm onSubmit={handleSubmit}>
        <Search size={18} color="#94a3b8" />
        <SearchInput
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search city, e.g. Tokyo..."
          autoFocus
        />
        <SearchButton type="submit" disabled={isLoading || !cityInput.trim()}>
          {isLoading ? "Loading..." : "Search"}
        </SearchButton>
      </SearchForm>

      <GpsButton type="button" onClick={onGeoLocate} disabled={isLoading}>
        <MapPin size={16} color="#2563eb" />
        Use My Current Location
      </GpsButton>

      {favorites.length > 0 && (
        <ChipSection>
          <ChipLabel>Favorite Cities</ChipLabel>
          <ChipsWrap>
            {favorites.map((fav) => (
              <Chip key={fav} type="button" onClick={() => onSearch(fav)}>
                <Star size={12} color="#eab308" fill="#eab308" />
                {fav}
              </Chip>
            ))}
          </ChipsWrap>
        </ChipSection>
      )}

      <ChipSection>
        <ChipLabel>Popular Cities</ChipLabel>
        <ChipsWrap>
          {POPULAR_CITIES.map((popCity) => (
            <Chip key={popCity} type="button" onClick={() => onSearch(popCity)}>
              {popCity}
            </Chip>
          ))}
        </ChipsWrap>
      </ChipSection>
    </Container>
  );
};

export default CityComponent;