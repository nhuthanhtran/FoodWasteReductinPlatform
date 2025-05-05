import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/auth";

export const getUserSettings = async (userId) => {
    const userRef = doc(db, "users", userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
        return { success: true, data: docSnap.data() }
    } else {
        return { success: false, error: "No user settings found" }
    }
}

export const saveUserSettings = async (userId, data) => {
    try {
        const userRef = doc(db, "users", userId)
        await setDoc(userRef, data)
        return { success: true }
    } catch (err) {
        return { success: false, error: err.message }
    }
}


