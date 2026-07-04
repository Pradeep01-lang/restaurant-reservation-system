import { useState, useEffect } from "react";
import { getAllReservations } from "../services/reservationService";

function AdminDashboard() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchReservations = async () => {

            try {

                const response = await getAllReservations();

                setReservations(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchReservations();

    }, []);

    const totalReservations = reservations.length;

    const bookedReservations = reservations.filter(
        reservation => reservation.status === "Booked"
    ).length;

    const cancelledReservations = reservations.filter(
        reservation => reservation.status === "Cancelled"
    ).length;

    const totalTables = new Set(
        reservations.map(
            reservation => reservation.table.tableNumber
        )
    ).size;

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div className="spinner-border text-primary"></div>

                <h4 className="mt-3">
                    Loading Dashboard...
                </h4>

            </div>

        );

    }

    return (

        <div className="container mt-5 mb-5">

            <h2 className="text-center mb-5">
                📊 Admin Dashboard
            </h2>

            {/* Statistics */}

            <div className="row mb-5">

                <div className="col-md-3">

                    <div className="card bg-primary text-white shadow">

                        <div className="card-body text-center">

                            <h1>{totalReservations}</h1>

                            <h5>Total Reservations</h5>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card bg-success text-white shadow">

                        <div className="card-body text-center">

                            <h1>{bookedReservations}</h1>

                            <h5>Booked</h5>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card bg-danger text-white shadow">

                        <div className="card-body text-center">

                            <h1>{cancelledReservations}</h1>

                            <h5>Cancelled</h5>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card bg-warning text-dark shadow">

                        <div className="card-body text-center">

                            <h1>{totalTables}</h1>

                            <h5>Tables</h5>

                        </div>

                    </div>

                </div>

            </div>

            {/* Reservation Table */}

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h4 className="mb-0">

                        📋 Reservation Details

                    </h4>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover mb-0">

                        <thead className="table-dark">

                            <tr>

                                <th>Customer</th>

                                <th>Email</th>

                                <th>Table</th>

                                <th>Date</th>

                                <th>Time</th>

                                <th>Guests</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {reservations.map((reservation) => (

                                <tr key={reservation._id}>

                                    <td>
                                        {reservation.user.name}
                                    </td>

                                    <td>
                                        {reservation.user.email}
                                    </td>

                                    <td>
                                        Table {reservation.table.tableNumber}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.reservationDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {reservation.timeSlot}
                                    </td>

                                    <td>
                                        {reservation.guests}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                reservation.status === "Booked"
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }
                                        >
                                            {reservation.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;