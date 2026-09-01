import React from "react";
import styled from "styled-components";
import { WeatherIcon } from "./WeatherIcons";
import { processDailyForecast } from "../services/weatherService";

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HourlyScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px 2px 14px;
  margin-bottom: 18px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const HourlyCard = styled.div`
  flex: 0 0 78px;
  background: ${(props) => (props.isNow ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "rgba(241, 245, 249, 0.85)")};
  color: ${(props) => (props.isNow ? "#ffffff" : "#1e293b")};
  border-radius: 14px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: ${(props) => (props.isNow ? "0 4px 12px rgba(37, 99, 235, 0.25)" : "0 2px 4px rgba(0,0,0,0.03)")};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const HourlyTime = styled.span`
  font-size: 12px;
  font-weight: 600;
  opacity: ${(props) => (props.isNow ? 0.95 : 0.7)};
`;

const HourlyTemp = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

const DailyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DailyCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(248, 250, 252, 0.85);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  }
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
`;

const DayName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
`;

const DayDesc = styled.span`
  font-size: 11px;
  color: #64748b;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const PopBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #0284c7;
`;

const TempRange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const MaxTemp = styled.span`
  color: #0f172a;
  font-weight: 700;
`;

const MinTemp = styled.span`
  color: #94a3b8;
`;

const ForecastComponent = ({ forecast, unit = "metric" }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) return null;

  const tempSymbol = unit === "metric" ? "°C" : "°F";
  const hourlyList = forecast.list.slice(0, 8); // Next 24 hours (3-hour intervals)
  const dailyList = processDailyForecast(forecast.list);

  const formatHour = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  return (
    <ForecastContainer>
      {/* 24-Hour Forecast */}
      <SectionHeader>
        <SectionTitle>Hourly Forecast (Next 24h)</SectionTitle>
      </SectionHeader>
      <HourlyScroll>
        {hourlyList.map((item, idx) => (
          <HourlyCard key={item.dt} isNow={idx === 0}>
            <HourlyTime isNow={idx === 0}>{idx === 0 ? "Now" : formatHour(item.dt)}</HourlyTime>
            <WeatherIcon
              code={item.weather[0].icon}
              size={24}
              color={idx === 0 ? "#ffffff" : undefined}
            />
            <HourlyTemp>{Math.round(item.main.temp)}{tempSymbol}</HourlyTemp>
          </HourlyCard>
        ))}
      </HourlyScroll>

      {/* 5-Day Forecast */}
      <SectionHeader>
        <SectionTitle>5-Day Forecast</SectionTitle>
      </SectionHeader>
      <DailyList>
        {dailyList.map((day) => {
          const middleIcon = day.icons[Math.floor(day.icons.length / 2)] || day.icons[0];
          const commonDesc = day.descriptions[Math.floor(day.descriptions.length / 2)] || day.descriptions[0];
          return (
            <DailyCard key={day.fullDate}>
              <DayInfo>
                <DayName>{day.day}</DayName>
                <DayDesc>{commonDesc}</DayDesc>
              </DayInfo>

              <IconGroup>
                <WeatherIcon code={middleIcon} size={28} />
                {day.pop > 0.1 && (
                  <PopBadge>{Math.round(day.pop * 100)}%</PopBadge>
                )}
              </IconGroup>

              <TempRange>
                <MaxTemp>{Math.round(day.maxTemp)}{tempSymbol}</MaxTemp>
                <MinTemp>{Math.round(day.minTemp)}{tempSymbol}</MinTemp>
              </TempRange>
            </DailyCard>
          );
        })}
      </DailyList>
    </ForecastContainer>
  );
};

export default ForecastComponent;
