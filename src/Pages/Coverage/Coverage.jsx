import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [25.7466, 89.2517];
  const serviceData = useLoaderData();
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    const district = serviceData.find((c) =>
      c.district.toLowerCase().includes(value.toLowerCase())
    );
    if (district) {
      const cord = [district.latitude, district.longitude];
      console.log(district, cord);
      // Go to the location
      mapRef.current.flyTo(cord, 14);
    }
  };

  return (
    <div className="text-center my-20 space-y-8">
      <h2 className="text-3xl">We are available in 64 districts</h2>

      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              className="grow"
              placeholder="Search"
            />
          </label>
          <button className="btn">Search</button>
        </form>
      </div>
      {/* Map Container */}
      <div className="border w-full h-[500px]">
        <MapContainer
          center={position}
          ref={mapRef}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[500px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceData.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                {center.district} <br /> Service Area :{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
