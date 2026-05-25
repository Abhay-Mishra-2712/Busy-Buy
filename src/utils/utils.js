import data from "./data";
import {
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const addDataToCollection = async () => {
  try {
    const productsRef = collection(db, "products");
    const existingSnapshot = await getDocs(productsRef);

    if (!existingSnapshot.empty) {
      // Products already exist — skip seeding
      return;
    }

    const batch = writeBatch(db);
    data.forEach((product) => {
      const docRef = doc(db, "products", product.id.toString());
      batch.set(docRef, product);
    });
    await batch.commit();
    console.log("✅ Products seeded!");
  } catch (error) {
    console.error("Seed error:", error);
  }
};

const getProductsUsingProductIds = async (cart) => {
  const productIds = Object.keys(cart)
    .filter((key) => key !== "date" && !isNaN(Number(key)))
    .map(Number);

  if (!productIds.length) return false;

  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(
    query(productsRef, where("id", "in", productIds)),
  );

  return productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    date: cart?.date,
    quantity: cart[doc.data().id],
  }));
};

const getUserCartProducts = async (uid) => {
  const docRef = doc(db, "usersCarts", uid);
  const docSnap = await getDoc(docRef);
  return { docRef, data: docSnap.data() };
};

const convertDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export {
  addDataToCollection,
  getProductsUsingProductIds,
  getUserCartProducts,
  convertDate,
};
