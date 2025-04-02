import { db } from "../services/Firebase";
import { addDoc, collection, setDoc, doc, getDoc,deleteDoc, QuerySnapshot,getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { toaster, Toaster } from "../components/ui/toaster";
export const useFireStore = () => {
  const addDocument = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };
  const addtoWatchlist = async (userID, dataID, data) => {
    try {
      if (await checkIfInWatchlist(userID, dataID)) {
        toaster.create({
          description: "already in watchlist",
          type: "error",
          action: {
            label: "x",
          },
          duration: 5000
        });
        return false
      }
      await setDoc(doc(db, "users", userID, "watchlist", dataID), data);
      toaster.create({
        description: "added to watchlist",
        type: "success",
        action: {
          label: "x",
        },
      });
    } catch (err) {
      console.log(err);
      toaster.create({
        description: "error saving to watchlist",
        type: "error",
        action: {
          label: "x",
        },
      });
    }
  };

  const checkIfInWatchlist = async (userID, dataID) => {
    const docRef = doc(
      db,
      "users",
      userID.toString(),
      "watchlist",
      dataID.toString()
    );
  
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      // doc.data() will be undefined in this case
      return false;
    }
  };
  
  const removefromWatchlist = async (userID, dataID) => {
    try {
      await deleteDoc(doc(db, "users",userID.toString(), "watchlist", dataID.toString()));
      toaster.create({
        description: "removed from watchlist",
        type: "success",
        action: {
          label: "x",
        },
      });
    } catch (err) {
      console.log(err);
      toaster.create({
        description: "error removing from watchlist",
        type: "error",
        action: {
          label: "x",
        },
      });
    }
  }
  
  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return { addDocument, addtoWatchlist, checkIfInWatchlist, removefromWatchlist, getWatchlist };
};

