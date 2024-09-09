import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375;

export const normalize = (size: any) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
