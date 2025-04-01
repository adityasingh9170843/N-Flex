import { db } from "../services/Firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { toaster,Toaster } from "../components/ui/toaster"
export const useFireStore = () => {
  const addDocument = async (collectionName,data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };
  const addtoWatchlist = async (userID,dataID,data) => {
    try{
    
        await setDoc(doc(db,"users",userID,"watchlist",dataID),data);
        toaster.create({
                description: "added to watchlist",
                type: "success",
                action: {
                  label:"x"
                }
              })
    }
    catch(err){
      console.log(err)
      toaster.create({
              description: "error saving to watchlist",
              type: "error",
              action: {
                label:"x"
              }
            })
    }
  }
  
  return { addDocument,addtoWatchlist};
};

const checkIfInWatchlist = async (userID,dataID) =>{
    const docRef = doc(db,"users",userID,"watchlist",dataID);
}