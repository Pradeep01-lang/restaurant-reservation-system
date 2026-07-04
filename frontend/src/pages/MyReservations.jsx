import { useState, useEffect } from "react";
import ReservationCard from "../components/ReservationCard";

import {
    getMyReservations,
    cancelReservation
} from "../services/reservationService";

function MyReservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchReservations = async () => {

            try {

                const response = await getMyReservations();

                setReservations(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchReservations();

    }, []);

    const handleCancel = async (id) => {

        try {

            await cancelReservation(id);

            alert("Reservation Cancelled Successfully");

            const response = await getMyReservations();

            setReservations(response.data);

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">Loading Reservations...</p>

            </div>

        );

    }

    return (

        <div className="container mt-5 mb-5">

            <h2 className="mb-4 text-center">
                📋 My Reservations
            </h2>

            {reservations.length === 0 ? (

                <div className="alert alert-info text-center">

                    No Reservations Found

                </div>

            ) : (

                reservations.map((reservation) => (

                    <ReservationCard
                        key={reservation._id}
                        reservation={reservation}
                        onCancel={handleCancel}
                    />

                ))

            )}

        </div>

    );

}

export default MyReservations;