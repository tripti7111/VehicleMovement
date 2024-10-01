import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import carImg from "../assets/pngtree-vector-car-icon-png-image_515825.jpg";

const VehicleMap = () => {
  const [vehiclePosition, setVehiclePosition] = useState(null); // Current vehicle position
  const [route, setRoute] = useState([]); // Route coordinates
  const [currentIndex, setCurrentIndex] = useState(0); // To track the movement
  const [vehicleIcon, setVehicleIcon] = useState(null); // Vehicle icon
  const [isRouteDrawn, setIsRouteDrawn] = useState(false); // To check if route is drawn

  // Load vehicle icon once on component mount
  useEffect(() => {
    const icon = L.icon({
      iconUrl: carImg,
      iconSize: [32, 32],
    });
    setVehicleIcon(icon);
  }, []);

  // Fetch route data from the backend API
  const fetchRouteData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehicle-route"
      );
      setRoute(response.data); // Set the entire route in state
    } catch (error) {
      console.error("Error fetching vehicle route:", error);
    }
  };

  // Fetch the route once when the component is mounted
  useEffect(() => {
    fetchRouteData();
  }, []);

  // After the route is set, draw the path and wait to move the vehicle
  //   useEffect(() => {
  //     if (route.length > 0) {
  //       setIsRouteDrawn(true);  // Set flag when route is loaded
  //       setVehiclePosition(route[0]);  // Set vehicle to starting position
  //     }
  //   }, [route]);

  // Move the vehicle after the path is drawn
  useEffect(() => {
    if (route.length > 0 && isRouteDrawn) {
      const moveVehicle = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < route.length - 1) {
            setVehiclePosition(route[prevIndex + 1]); // Move vehicle to the next point
            return prevIndex + 1; // Increment the index
          } else {
            clearInterval(moveVehicle); // Clear the interval once the route is completed
            return prevIndex;
          }
        });
      }, 2000); // Move every 2 seconds

      return () => clearInterval(moveVehicle); // Clean up the interval on unmount
    }
  }, [isRouteDrawn, route]);

  return (
    <div>
      <button
        onClick={() => {
          setIsRouteDrawn(true);
          setVehiclePosition(route[0]);
        }}
        style={{ position: "relative", left: "350px", top: "300px" }}
      >
        Start
      </button>
      <h2>Vehicle Movement from Source to Destination</h2>
      <MapContainer
        center={[41.87475, -87.64525]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {route.length > 0 && (
          <>
            {/* Draw polyline for the entire route */}
            <Polyline
              positions={route.map((pos) => [pos.latitude, pos.longitude])}
              color="blue"
            />
          </>
        )}
        {vehiclePosition && vehicleIcon && (
          <>
            {/* Marker to show vehicle's current position */}
            <Marker
              position={[vehiclePosition.latitude, vehiclePosition.longitude]}
              icon={vehicleIcon}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
