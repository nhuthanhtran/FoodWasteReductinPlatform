// donationHistoryController.js
import { db } from "../firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

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

        const history = await Promise.all(snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            // Get user name from users collection
            let userName = "Unknown User";
            try {
                const userRef = doc(db, "users", data.recipient);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    userName = userSnap.data().name || userName;
                }
            } catch (err) {
                console.warn("Failed to fetch recipient user:", err);
            }

            // Get donation details from donations collection
            let foodType = "Unknown";
            let quantity = "N/A";
            try {
                const donationRef = doc(db, "donations", data.donationId);
                const donationSnap = await getDoc(donationRef);
                if (donationSnap.exists()) {
                    const d = donationSnap.data();
                    foodType = d.foodType || foodType;
                    quantity = d.quantity || quantity;
                }
            } catch (err) {
                console.warn("Failed to fetch donation info:", err);
            }

            return {
                id: docSnap.id,
                ...data,
                recipientName: userName,
                foodType,
                quantity,
            };
        }));

        return { success: true, history };
    } catch (error) {
        console.error("Error fetching donation history:", error);
        return { success: false, error: error.message };
    }
};
