"use client"
import { firestore } from '../firebase';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { getWarehouse } from './getwarehouse';

export default function AddPackage() {
    const { register, handleSubmit, reset } = useForm();

    const [warehouses, setWarehouse] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const warehouseList = await getWarehouse(firestore);
                console.log(warehouseList);
                setWarehouse(warehouseList);
            } catch (error) {
                console.error('Erreur lors de la récupération des entrepots :', error);
            }
        }
        fetchData();
    }, []);


    const onSubmit = async (data) => {
        try {
            const colisRef = collection(firestore, 'package');
            await addDoc(colisRef, data);
            console.log("Colis enregistré avec succès !");
            reset();
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du colis :", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className='text-align:center'>
                <h1>Enregistrement du colis </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="address">Address</label>
                    <input type="address" name="Address" placeholder="Address" required {...register('address')} />
                    <br />
                    <label htmlFor="destination">Destination</label>
                    <input type="destination" name="destination" placeholder="destination" required {...register('destination')} />
                    <br />
                    <label htmlFor="weight">Poids en kg</label>
                    <input type="weight" name="weight" placeholder="weight" required {...register('weight')} />
                    <br />
                    <label htmlFor="status">Status</label>
                    <select name="status" {...register("status")}>
                        <option value="">Veuillez selectionner une option</option>
                        <option value="En cours de livraison">En cours de livraison</option>
                        <option value="Acheminement">Acheminement</option>
                        <option value="Livré">Livré</option>
                        <option value="En attente du transporteur">En attente du transporteur</option>
                    </select>
                    <br />
                    <label htmlFor="warehouse"> Entrepot</label>
                    <select name="warehouse" required {...register('warehouse')}>
                        {warehouses.map((warehouse, index) =>
                            <option value={warehouse.id} key={index}>{warehouse.nom}</option>
                        )}
                    </select>
                    <br />
                    <button type="submit">Valider</button>
                </form>
            </div>
        </main>
    )
}