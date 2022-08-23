import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaeConfig";

export const getAllProducts = async (table) => {
  const colRef = collection(db, `${table}`);
  const querySnapshot = await getDocs(colRef);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getProductById = async (id, table) => {
  const docRef = doc(db, `${table}`, `${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const product = docSnap.data();
    return product;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
