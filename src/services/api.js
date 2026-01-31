import { db } from "./firebase";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

export const fetchCourses = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback for demo/development if no DB connection
        return [];
    }
};

export const fetchBlogs = async () => {
    try {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        // Fallback for demo/development if no DB connection for now. 
        // In real app, rethrow or handle explicitly.
        // But since we have no data, let's just return empty.
        console.error("Error fetching blogs:", error);
        return [];
    }
};

export const addContactMessage = async (data) => {
    try {
        await addDoc(collection(db, "contacts"), {
            ...data,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        throw error;
    }
};
