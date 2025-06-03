import { View, ScrollView } from "react-native";
import { styles } from "../styles/GlobalStyles";
import AchievementCard from "../components/AchievementsCards";

export const Achievements: React.FC = () => {
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: "#EEF2F9", alignItems: "center" },
      ]}
    >
      <ScrollView contentContainerStyle={[styles.gap3, { padding: 20 }]}>
        <AchievementCard
          title="Base da comunidade"
          description="Crie 10 postagens"
          iconActive={require("../../src/images/conquista.png")}
          iconInactive={require("../../src/images/conquista-off.png")}
          isActive
          activeColor="#395DD3"
        />
        <AchievementCard
          title="Ponte de conhecimento"
          description="Comente 5 vezes"
          iconActive={require("../../src/images/conquista.png")}
          iconInactive={require("../../src/images/conquista-off.png")}
          isActive={false}
          activeColor="#54A7F4"
        />
        <AchievementCard
          title="Engajador"
          description="Ganhe 100 curtidas"
          iconActive={require("../../src/images/conquista-star.png")}
          iconInactive={require("../../src/images/conquista-star-off.png")}
          isActive
          activeColor="#395DD3"
        />
        <AchievementCard
          title="Senior"
          description="Conquiste 100 seguidores"
          iconActive={require("../../src/images/conquista-star.png")}
          iconInactive={require("../../src/images/conquista-star-off.png")}
          isActive={false}
          activeColor="#54A7F4"
        />
        <AchievementCard
          title="Professor"
          description="Conquiste 500 seguidores"
          iconActive={require("../../src/images/conquista-star.png")}
          iconInactive={require("../../src/images/conquista-star-off.png")}
          isActive={false}
          activeColor="#395DD3"
        />
      </ScrollView>
    </View>
  );
};
