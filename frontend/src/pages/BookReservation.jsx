import { useState } from "react";
import { createReservation } from "../services/reservationService";

function BookReservation() {
    const [formData, setFormData] = useState({
        reservationDate: "",
        reservationTime: "",
        guests: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createReservation(formData);

            alert(response.data.message);

            setFormData({
                reservationDate: "",
                reservationTime: "",
                guests: ""
            });

        } catch (error) {
            alert(error.response?.data?.message || "Reservation Failed");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <div className="card shadow-lg border-0">

                        <div className="card-header bg-dark text-white text-center">
                            <h2 className="mb-0">
                                🍽 Book Your Table
                            </h2>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        Reservation Date
                                    </label>

                                    <input
                                        type="date"
                                        name="reservationDate"
                                        className="form-control"
                                        value={formData.reservationDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        Time Slot
                                    </label>

                                    <select
                                        name="reservationTime"
                                        className="form-select"
                                        value={formData.reservationTime}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Time
                                        </option>

                                        <option>12:00 PM</option>
                                        <option>01:00 PM</option>
                                        <option>02:00 PM</option>
                                        <option>03:00 PM</option>
                                        <option>04:00 PM</option>
                                        <option>05:00 PM</option>
                                        <option>06:00 PM</option>
                                        <option>07:00 PM</option>
                                        <option>08:00 PM</option>
                                        <option>09:00 PM</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">
                                        Number of Guests
                                    </label>

                                    <input
                                        type="number"
                                        name="guests"
                                        className="form-control"
                                        placeholder="Enter Number of Guests"
                                        value={formData.guests}
                                        min="1"
                                        max="20"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                    >
                                        Reserve Table
                                    </button>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookReservation;