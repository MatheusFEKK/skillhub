import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "../styles/GlobalStyles";
import AchievementCard from "../components/AchievementsCards";
import { useUserStats } from "../hooks/useUserStats";

export const Achievements: React.FC = () => {
  const { achievements } = useUserStats();

  return (
    <View style={[styles.root, { backgroundColor: "#EEF2F9", alignItems: "center" }]}>
      <ScrollView contentContainerStyle={[styles.gap3, { padding: 20 }]}>
        <AchievementCard
          title="Base da comunidade"
          description="Crie 10 postagens"
          iconActive={require("../../src/images/conquista.png")}
          iconInactive={require("../../src/images/conquista-off.png")}
          isActive={achievements["post_1"]}
          activeColor="#395DD3"
        />
        <AchievementCard
          title="Engajador"
          description="Ganhe 100 curtidas"
          iconActive={require("../../src/images/conquista-star.png")}
          iconInactive={require("../../src/images/conquista-star-off.png")}
          isActive={achievements["likes_1"]}
          activeColor="#54A7F4"
        />
        <AchievementCard
          title="Amaldiçoado"
          description="Consiga 100 deslikes"
          iconActive={require("../../src/images/conquista-bad-star.png")}
          iconInactive={require("../../src/images/conquista-off.png")}
          isActive={achievements["deslikes_1"]}
          activeColor="#660508"
        />
      </ScrollView>
    </View>
  );
};
