import { View, Text, Image, StyleSheet } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface AchievementCardProps {
  title: string;
  description: string;
  iconActive: any;
  iconInactive: any;
  isActive?: boolean;
  activeColor?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  iconActive,
  iconInactive,
  isActive = false,
  activeColor = "#395DD3",
}) => {
  const borderColor = isActive ? activeColor : "#AAB1C6";
  const backgroundColor = isActive ? "#EEF2F9" : "#F4F7FD";
  const icon = isActive ? iconActive : iconInactive;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} style={{ width:80, height: 80 }} />
      </View>
      <View style={styles.gap2}>
        <Text style={[styles.fontWeightBold, styles.fontSize3]}>
          {title}
        </Text>
        <Text style={[styles.fontSize2, { color: "#7B8499" }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default AchievementCard;
