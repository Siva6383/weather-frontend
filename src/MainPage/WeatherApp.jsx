import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./weather.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function WeatherApp() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username || "User";

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [mapPosition, setMapPosition] = useState([20.5937, 78.9629]); // India

    const fetchWeatherByCity = async (cityName) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
    };

    const fetchForecast = async (cityName) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setForecast(data.list.slice(0, 5));
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherByCoords(latitude, longitude);
        });
    }, []);

    const handleSearch = () => {
        if (!city) return;
        fetchWeatherByCity(city);
        fetchForecast(city);
    };

    function LocationMarker({ setPosition, fetchWeather }) {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                fetchWeather(lat, lng);
            },
        });
        return null;
    }


    return (
        <div className="weather-container">

            {/* Header */}
            <div className="weather-header">
                <h2>🌤 Weather Detection</h2>
                <div className="user-box d-flex align-items-center gap-3">
                    <span>Welcome, {username}</span>
                    <button className="btn btn-danger" onClick={() => navigate("/")}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="weather-search">
                <input
                    type="text"
                    placeholder="Enter city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Weather + Map Row */}
            {weather && weather.main && (
                <div className="weather-row">

                    {/* Weather Info (Left) */}
                    <div className="weather-info-box">
                        <h3>{weather.name}</h3>
                        <p>🌡 {weather.main.temp}°C</p>
                        <p>☁ {weather.weather[0].description}</p>
                        <p>💧 {weather.main.humidity}%</p>
                        <p>🌬 {weather.wind.speed} km/h</p>
                    </div>

                    {/* Map (Right) */}
                    <div className="weather-map-box">
                        
                            <MapContainer
                                center={mapPosition}
                                zoom={5}
                                style={{ height: "300px", width: "100%", borderRadius: "12px" }}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <LocationMarker
                                    setPosition={setMapPosition}
                                    fetchWeather={fetchWeatherByCoords}
                                />

                                <Marker position={mapPosition} />
                            </MapContainer>
                        
                    </div>

                </div>
            )}


            {/* Forecast */}
            {/* {forecast.length > 0 && (
                <div className="forecast-grid">
                    {forecast.map((item, i) => (
                        <div key={i} className="forecast-card">
                            <p>{item.dt_txt.split(" ")[1]}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt="icon"
                            />
                            <p>{item.main.temp}°C</p>
                        </div>
                    ))}
                </div>
            )} */}

            {/* Google Map
            {weather && weather.name && (
                <div className="weather-map">
                    <iframe
                        title="map"
                        width="100%"
                        height="320"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                        src={`https://maps.google.com/maps?q=${weather.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                </div>
            )} */}

        </div>
    );
}

export default WeatherApp;
