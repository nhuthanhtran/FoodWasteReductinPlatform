import { db } from "../firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserRequest = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const q = query(collection(db, "requests"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        let requests = [];
        querySnapshot.forEach((doc) => {
            requests.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, requests };
    } catch (error) {
        console.error("Error fetching requests:", error);
        return { success: false, error: error.message };
    }
};