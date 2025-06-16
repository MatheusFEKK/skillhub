import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, doc, getDoc, setDoc} from "firebase/firestore";
import { db, auth } from "../firebase/connectionFirebase";

export const useUserStats = () => {
  const [postCount, setPostCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [deslikeCount, setDeslikeCount] = useState(0);
  const [achievements, setAchievements] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    // Consulta todos os posts do user logado
    const postsQuery = query(collection(db, "posts"), where("UIDUser", "==", userId));

    // escuta os posts em temoo real
    const unsubscribePosts = onSnapshot(postsQuery, async (snapshot) => {
      const posts = snapshot.docs.map(doc => doc.data());

      const totalPosts = posts.length;
      const totalLikes = posts.reduce((acc, post) => acc + (post.Likes?.length || 0), 0);
      const totalDeslikes = posts.reduce((acc, post) => acc + (post.Deslikes?.length || 0), 0);

      setPostCount(totalPosts);
      setLikeCount(totalLikes);
      setDeslikeCount(totalDeslikes);

    // verifica quais conquistas devem ser desbloqueada
      const unlockedAchievements: { [key: string]: boolean } = {};
      if (totalPosts >= 1) unlockedAchievements["post_1"] = true;
      if (totalLikes >= 1) unlockedAchievements["likes_1"] = true;
      if (totalDeslikes >= 1) unlockedAchievements["deslikes_1"] = true;

      const achRef = doc(db, "achievements", userId);
      const achSnap = await getDoc(achRef);
      const existing = achSnap.exists() ? achSnap.data() : {};

      const updated = { ...existing, ...unlockedAchievements };

      if (JSON.stringify(existing) !== JSON.stringify(updated)) {
        await setDoc(achRef, updated, { merge: true });
      }

      setAchievements(updated);
    });

    const achRef = doc(db, "achievements", userId);
    const unsubscribeAchievements = onSnapshot(achRef, (snap) => {
      if (snap.exists()) {
        setAchievements(snap.data());
      }
    });

    return () => {
      unsubscribePosts();
      unsubscribeAchievements();
    };
  }, []);

  return { postCount, likeCount, deslikeCount, achievements };
};
