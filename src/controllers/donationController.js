import { db } from "../firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserDonations = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const q = query(collection(db, "donations"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        let donations = [];
        querySnapshot.forEach((doc) => {
            donations.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, donations };
    } catch (error) {
        console.error("Error fetching donations:", error);
        return { success: false, error: error.message };
    }
};
