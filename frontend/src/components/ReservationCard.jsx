function ReservationCard({ reservation, onCancel }) {
    return (
        <div className="card shadow mb-4 border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <h4>
                        🍽 Table {reservation.table.tableNumber}
                    </h4>

                    <span
                        className={
                            reservation.status === "Booked"
                                ? "badge bg-success fs-6"
                                : "badge bg-danger fs-6"
                        }
                    >
                        {reservation.status}
                    </span>

                </div>

                <hr />

                <p>
                    <strong>📅 Date :</strong>{" "}
                    {new Date(
                        reservation.reservationDate
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>🕒 Time :</strong>{" "}
                    {reservation.timeSlot}
                </p>

                <p>
                    <strong>👥 Guests :</strong>{" "}
                    {reservation.guests}
                </p>

                <p>
                    <strong>💺 Capacity :</strong>{" "}
                    {reservation.table.capacity}
                </p>

                {reservation.status === "Booked" && (

                    <button
                        className="btn btn-danger mt-2"
                        onClick={() => onCancel(reservation._id)}
                    >
                        Cancel Reservation
                    </button>

                )}

            </div>

        </div>
    );
}

export default ReservationCard;