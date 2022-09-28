import { useState, useEffect } from "react";
import { where, query, collection, getDocs } from "firebase/firestore";
import { db } from "../libraries/firebase";

export default function useUser(user, uid) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserByUserId(user, uid) {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      setActiveUser(result[0]);
    }
    getUserByUserId(user, uid);
  }, [user?.uid]);

  return { userObj: activeUser, setActiveUser };
}
