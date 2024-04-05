"use client"
import * as React from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
export default function TrackParcel() {
    const [colis, setColis] = React.useState(null);
    const [colisId, setColisId] = React.useState('');

    // Fonction pour récupérer les détails du colis depuis Firebase
    async function fetchColis() {
        try {
            const colisDoc = doc(firestore, 'package', colisId);
            const colisSnapshot = await getDoc(colisDoc);
            if (colisSnapshot.exists()) {
                setColis(colisSnapshot.data());
            } else {
                console.error('Le colis avec cet ID n\'existe pas');
                setColis(null);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du colis:', error);
        }
    }

    const handleChange = (event) => {
        setColisId(event.target.value);
    };

      // Appel fetchColis lorsque colisId change
      React.useEffect(() => {
        if (colisId) {
          fetchColis();
        }
      }, [colisId]);

    return (
        <div className='text-center'>
            <h1>Page des Colis</h1>
            <label htmlFor="colisId">Saisir l'ID du colis: </label>
            <input
                type="text"
                id="colisId"
                value={colisId}
                onChange={handleChange}
            />
            {colis && (
                <div>
                    <h2>Détails du Colis numero {colisId}</h2>
                    <p><strong>Adresse:</strong> {colis.address || colis.addresse}</p>
                    <p><strong>Poids (en kg):</strong> {colis.weight}</p>
                    <p><strong>Destination:</strong> {colis.destination}</p>
                    <p><strong>Statut:</strong> {colis.status}</p>
                    <p><strong>Entrepot:</strong>{colis.warehouse}</p>
                </div>
            )}
        </div>
    );
}