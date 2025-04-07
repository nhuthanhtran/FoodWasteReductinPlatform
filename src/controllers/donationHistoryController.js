// donationHistoryController.js
import { db } from "../firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * Get claimed donation history for a specific user
 * @param {string} userId - The ID of the currently logged-in user
 * @returns {object} { success: true, history } OR { success: false, error }
 */
export const getUserDonationHistory = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const q = query(
            collection(db, "donationHistory"),
            where("userId", "==", userId)
        );

        const snapshot = await getDocs(q);

        const history = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return { success: true, history };
    } catch (error) {
        console.error("Error fetching donation history:", error);
        return { success: false, error: error.message };
    }
};
