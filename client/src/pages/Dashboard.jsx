import { NavLink } from "react-router-dom";
import "../styling/Dashboard.css";

export default function Dashboard() {
    return (
        <div class="backimg">
            <nav className="navbar navbar-expand-xl navbar-light bg-dark">
                    <NavLink className="nav-link" to="/">
                        <button className="btn btn-logout">Log Out</button>
                    </NavLink>
            </nav>

            <div className="dashboard-container">
                <h1 className="dashboard-title">DayCare Management System</h1>

                <div className="row">
                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Guardian">
                            <button className="btn btn-primary btn-lg btn-block">Guardian</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Appointment">
                            <button className="btn btn-secondary btn-lg btn-block">Appointment</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Children">
                            <button className="btn btn-success btn-lg btn-block">Children</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Teacher">
                            <button className="btn btn-danger btn-lg btn-block">Teachers</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
