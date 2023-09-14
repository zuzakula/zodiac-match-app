import Svg, { Rect } from "react-native-svg";
import { View } from "react-native";

const ProgressBar = ({ progress }) => {
  const barWidth = 230;
  const progressWidth = (progress / 100) * barWidth;

  return (
    <View>
      <Svg width={barWidth} height={"7"}>
        <Rect
          width={barWidth}
          height={"100%"}
          fill={"white"}
          rx={3.5}
          ry={3.5}
        ></Rect>
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={"purple"}
          rx={3.5}
          ry={3.5}
        ></Rect>
      </Svg>
    </View>
  );
};

export default ProgressBar;
