import { db } from "../firebase/auth";
import { auth } from "../firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";


export const claimDonation = async (donationId, recipientName) => {
    try {
        const donationRef = doc(db, "donations", donationId);

        // Update donation status
        await updateDoc(donationRef, {
            status: "Completed",
        });

        // Optional: log in donation history
        await addDoc(collection(db, "donationHistory"), {
            userId: auth.currentUser.uid, // ✅ Must be set to current user
            donationId,
            recipient: recipientName,
            status: "Delivered",
            date: new Date(),
        });

        return { success: true };
    } catch (error) {
        console.error("Error claiming donation:", error);
        return { success: false, error: error.message };
    }
};

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

export const getAvailableDonations = async () => {
    try {
        const q = query(collection(db, "donations"), where("status", "==", "Pending"));
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

export const createDonation = async (formData, requestId = null) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const donationRef = await addDoc(collection(db, "donations"), {
            userId: user.uid,
            foodType: formData.foodType,
            quantity: formData.quantity,
            expirationDate: formData.expirationDate,
            location: formData.location,
            pickupTime: formData.pickupTime,
            customPickupTime: formData.customPickupTime || null,
            isRecurring: formData.isRecurring,
            recurringFrequency: formData.isRecurring ? formData.recurringFrequency : null,
            relatedRequestId: requestId, // ✅ Optional link to request
            status: "Pending",
            createdAt: serverTimestamp(),
        });

        return { success: true, id: donationRef.id };
    } catch (error) {
        console.error("Error creating donation:", error);
        return { success: false, error: error.message };
    }
};