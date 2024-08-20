import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Appointment.css";
import Dashboard from './Dashboard';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        AppointmentID: '',
        AppointmentDate: '',
        AppointmentGuardian: '',
        AppointmentChildren: '',
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/Appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewAppointment((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newAppointment);
        try {
            await axios.post('/Appointments/create', newAppointment);
            setNewAppointment({
                AppointmentID: '',
                AppointmentDate: '',
                AppointmentGuardian: '',
                AppointmentChildren: '',
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    const handleDelete = async (AppointmentID) => {
        try {
            await axios.delete(`/Appointments/delete/${AppointmentID}`);
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedAppointment) return;
        try {
            await axios.put(`/Appointments/update/${selectedAppointment.AppointmentID}`, selectedAppointment);
            setEditMode(false);
            setSelectedAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedAppointment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Appointment Page</h2>

            <div className="appointment-details">
                <table>
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Appointment Date</th>
                            <th>Guardian</th>
                            <th>No of Children</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.AppointmentID}>
                                <td>{appointment.AppointmentID}</td>
                                <td>{appointment.AppointmentDate}</td>
                                <td>{appointment.AppointmentGuardian}</td>
                                <td>{appointment.AppointmentChildren}</td>
                                <td>
                                    <button onClick={() => handleDelete(appointment.AppointmentID)}>Delete</button>
                                    <button onClick={() => handleEditClick(appointment)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedAppointment && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Appointment</h3>
                            <form className='appointment-form'>
                                <input
                                    type="text"
                                    name="AppointmentID"
                                    placeholder="Appointment ID"
                                    value={selectedAppointment.AppointmentID}
                                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, AppointmentID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AppointmentDate"
                                    placeholder="Appointment Name"
                                    value={selectedAppointment.AppointmentDate}
                                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, AppointmentDate: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AppointmentGuardian"
                                    placeholder="Appointment Author"
                                    value={selectedAppointment.AppointmentGuardian}
                                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, AppointmentGuardian: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AppointmentChildren"
                                    placeholder="Appointment Type"
                                    value={selectedAppointment.AppointmentChildren}
                                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, AppointmentChildren: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Appointment</h3>
                            <form onSubmit={handleSubmit} className='appointment-form'>
                                <input
                                    type="text"
                                    name="AppointmentID"
                                    placeholder="Appointment ID"
                                    value={newAppointment.AppointmentID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AppointmentDate"
                                    placeholder="Appointment Date"
                                    value={newAppointment.AppointmentDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AppointmentGuardian"
                                    placeholder="Appointment Guardian"
                                    value={newAppointment.AppointmentGuardian}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AppointmentChildren"
                                    placeholder="No of Children "
                                    value={newAppointment.AppointmentChildren}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Appointment</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default AppointmentPage;