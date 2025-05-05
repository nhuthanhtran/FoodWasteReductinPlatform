import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const DonationMap = ({ donationLocations, handleClaimDonation }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const initializeMap = (center) => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center,
                zoom: donationLocations.length > 0 ? 12 : 10,
                projection: "globe",
                attributionControl: false
            });

            map.current.addControl(new mapboxgl.AttributionControl({
                compact: true
            }), 'top-left');

            map.current.on("load", () => {
                map.current.resize();
            });

            donationLocations.forEach((location) => {
                console.log("Marker Location Data:", location);

                if (location.longitude && location.latitude) {
                    const popupContent = `
            <div style="color:#1a1a2e;font-size: 14px; font-weight: bold;">
                <p><strong>Food Type:</strong> ${location.foodType || "N/A"}</p>
                <p><strong>Quantity:</strong> ${location.quantity || "N/A"}</p>
                ${location.address || "Address not available"}
                <button id="claim-${location.id}" style="background-color:#007bff; color:white; padding:5px 10px; border:none; cursor:pointer;">
                    Claim Donation
                </button>
            </div>
        `;

                    const popup = new mapboxgl.Popup().setHTML(popupContent);

                    const marker = new mapboxgl.Marker({scale: 0.8})
                        .setLngLat([location.longitude, location.latitude])
                        .setPopup(popup)
                        .addTo(map.current);

                    marker.getElement().addEventListener("click", () => {
                        setTimeout(() => {
                            const claimButton = document.getElementById(`claim-${location.id}`);
                            if (claimButton) {
                                claimButton.addEventListener("click", () => {
                                    alert(`Claiming donation: ${location.foodType}, Quantity: ${location.quantity}`);
                                    handleClaimDonation(location.id);
                                });
                            }
                        }, 500);
                    });
                }
            });
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCenter = [position.coords.longitude, position.coords.latitude];
                initializeMap(userCenter);
            },
            (error) => {
                console.warn("Geolocation error:", error);
                const fallbackCenter = donationLocations.length > 0
                    ? [donationLocations[0].longitude, donationLocations[0].latitude]
                    : [-84.004964, 33.979497];
                initializeMap(fallbackCenter);
            },
            { enableHighAccuracy: true }
        );

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [donationLocations, handleClaimDonation]);

    return <div ref={mapContainer} className="map-container"
    style={{ width: "100%", height: "100%" }} />;
};


export default DonationMap;