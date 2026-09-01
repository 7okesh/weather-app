import React from "react";
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
  Compass,
  Eye,
  MapPin,
  Search,
  Star,
  RefreshCw,
} from "lucide-react";

export const WeatherIcon = ({ code = "01d", size = 64, color, className }) => {
  const iconProps = {
    size,
    className,
    strokeWidth: 1.8,
  };

  switch (code) {
    // Clear sky
    case "01d":
      return <Sun {...iconProps} color={color || "#f59e0b"} />;
    case "01n":
      return <Moon {...iconProps} color={color || "#6366f1"} />;

    // Few clouds
    case "02d":
      return <CloudSun {...iconProps} color={color || "#f59e0b"} />;
    case "02n":
      return <CloudMoon {...iconProps} color={color || "#818cf8"} />;

    // Scattered clouds
    case "03d":
    case "03n":
      return <Cloud {...iconProps} color={color || "#64748b"} />;

    // Broken / overcast clouds
    case "04d":
    case "04n":
      return <Cloud {...iconProps} color={color || "#475569"} />;

    // Shower rain
    case "09d":
    case "09n":
      return <CloudDrizzle {...iconProps} color={color || "#0284c7"} />;

    // Rain
    case "10d":
    case "10n":
      return <CloudRain {...iconProps} color={color || "#0ea5e9"} />;

    // Thunderstorm
    case "11d":
    case "11n":
      return <CloudLightning {...iconProps} color={color || "#8b5cf6"} />;

    // Snow
    case "13d":
    case "13n":
      return <Snowflake {...iconProps} color={color || "#38bdf8"} />;

    // Mist / Fog / Haze
    case "50d":
    case "50n":
      return <CloudFog {...iconProps} color={color || "#94a3b8"} />;

    default:
      return <Sun {...iconProps} color={color || "#f59e0b"} />;
  }
};

export const MetricIcon = ({ type, size = 28, color }) => {
  const props = { size, strokeWidth: 2 };
  switch (type) {
    case "sunset":
      return <Sunset {...props} color={color || "#f97316"} />;
    case "sunrise":
      return <Sunrise {...props} color={color || "#eab308"} />;
    case "humidity":
      return <Droplets {...props} color={color || "#0ea5e9"} />;
    case "wind":
      return <Wind {...props} color={color || "#10b981"} />;
    case "pressure":
      return <Gauge {...props} color={color || "#6366f1"} />;
    case "temp":
    case "feels_like":
      return <Thermometer {...props} color={color || "#ef4444"} />;
    case "visibility":
      return <Eye {...props} color={color || "#8b5cf6"} />;
    case "direction":
      return <Compass {...props} color={color || "#06b6d4"} />;
    default:
      return <Thermometer {...props} color={color || "#64748b"} />;
  }
};

export {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
  Compass,
  Eye,
  MapPin,
  Search,
  Star,
  RefreshCw,
};
