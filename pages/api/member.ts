import { db } from "@/firebase/config";
import { getFirestore, doc, setDoc, getDocs, collection, where, query } from "firebase/firestore";

export default async function addData(clct: any, id: any, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, clct, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
        console.log(e);
    }

    return { result, error };
}

export async function getData(clct: any) {
    try {
        const res: any = []
        let result = await getDocs(collection(db, clct))
        result.forEach((doc: any) => {
            console.log(doc.data());
            res.push({
                id: doc?.id,
                ...doc.data()
            })
        })
        return res
    } catch (error) {
        console.log(error);
    }
}