import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CircleInfoIcon = (props) => (
  <FontAwesome6 name="circle-info" size={24} color="black" {...props} />
);

export const HomeIcon = (props) => (
  <FontAwesome name="home" size={32} color="black" {...props} />
);

export const InfoIcon = (props) => (
  <FontAwesome name="info" size={32} color="black" {...props} />
);

export const SettingsIcon = (props) => (
  <AntDesign name="setting" size={24} color="black" {...props} />
);

export const NotiIcon = (props) => (
  <Ionicons name="notifications" size={24} color="black" {...props} />
);
