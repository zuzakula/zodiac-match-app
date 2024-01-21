declare module "@react-native-community/geolocation" {
  export interface GeoCoordinates {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  }

  export interface GeoError {
    code: number;
    message: string;
  }

  export interface GeolocationStatic {
    getCurrentPosition(
      success: (position: GeoCoordinates) => void,
      error?: (error: GeoError) => void,
      options?: PositionOptions
    ): void;
  }

  const Geolocation: GeolocationStatic;
  export default Geolocation;
}
