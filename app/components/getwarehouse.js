import { collection, getDocs } from "firebase/firestore";

export async function getWarehouse(firestore) {
    const warehouseCol = collection(firestore, 'warehouse');
    const warehouseSnapshot = await getDocs(warehouseCol);
    
    const warehouses = [];

    warehouseSnapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data();
        warehouses.push({ id, nom: data.nom });
    });

    return warehouses;

    
}