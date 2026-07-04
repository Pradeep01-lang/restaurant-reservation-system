import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="bg-dark text-white text-center py-5">
                <div className="container">
                    <h1 className="display-3 fw-bold">
                        🍽 Restaurant Reservation System
                    </h1>

                    <p className="lead mt-3">
                        Reserve your favorite table in just a few clicks.
                    </p>

                    <Link to="/book" className="btn btn-warning btn-lg mt-3">
                        Reserve Now
                    </Link>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">

                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body text-center">
                                <h2>🍽</h2>
                                <h4>Easy Booking</h4>
                                <p>
                                    Reserve tables quickly and securely.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body text-center">
                                <h2>⏰</h2>
                                <h4>Fast Service</h4>
                                <p>
                                    Instant reservation confirmation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body text-center">
                                <h2>⭐</h2>
                                <h4>Best Experience</h4>
                                <p>
                                    Comfortable dining with your family.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;