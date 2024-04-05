"use client"
import * as React from 'react'
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function StorageManagement() {

    async function getWarehouseList(firestore) {
        const warehouseCol = collection(firestore, 'warehouse');
        const warehouseSnapshot = await getDocs(warehouseCol);
        const warehouseList = warehouseSnapshot.docs.map(doc => doc.data());
        return warehouseList;
      }
    
    const [warehouses, setWarehouse] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            try {
                const warehouseList = await getWarehouseList(firestore);
                console.log(warehouseList);
                setWarehouse(warehouseList);
            } catch (error) {
                console.error('Erreur lors de la récupération des entrepots :', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1> Gestion des entrepots </h1>

            {warehouses.map((warehouse, index) =>
                <ul key={warehouse.id}>
                    <li><p> Nom de l'entrepot : </p>{warehouse.nom}</li>
                    <li><p> Adresse de l'entrepot : </p>{warehouse.adresse}</li>
                    <li><p>Capacite max de l'entrepot : </p>{warehouse.capacite}</li>
                </ul>
            )}

        </div>
    )
}