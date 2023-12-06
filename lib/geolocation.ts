import Geolocation from "@react-native-community/geolocation";

// Request permission to access location
const requestLocationPermission = () => {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization("whenInUse").then((result) => {
      if (result === "granted") {
        resolve();
      } else {
        reject("Location permission not granted");
      }
    });
  });
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(`Error getting location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

// Example usage
const getAndCheckDistance = async () => {
  try {
    await requestLocationPermission();
    const userLocation = await getCurrentLocation();

    // Now you can use userLocation.latitude and userLocation.longitude

    // Example: Calculate distance from another user
    const otherUserLocation = {
      latitude: 37.7749, // Replace with other user's latitude
      longitude: -122.4194, // Replace with other user's longitude
    };

    const distance = calculateDistance(userLocation, otherUserLocation);

    console.log(`Distance to other user: ${distance} meters`);
  } catch (error) {
    console.error(error);
  }
};

// Helper function to calculate distance between two points using Haversine formula
const calculateDistance = (point1, point2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLon = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.latitude)) *
      Math.cos(toRadians(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance * 1000; // Convert to meters
};

const toRadians = (angle) => {
  return (angle * Math.PI) / 180;
};
