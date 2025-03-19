import { db } from "../firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getOpenRequests = async () => {
    try {
        const q = query(collection(db, "requests"), where("status", "==", "Pending"));
        const querySnapshot = await getDocs(q);

        let requests = [];
        querySnapshot.forEach((doc) => {
            requests.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, requests };
    } catch (error) {
        console.error("Error fetching donation requests:", error);
        return { success: false, error: error.message };
    }
};
