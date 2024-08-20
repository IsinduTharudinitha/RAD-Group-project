import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Guardian.css";
import Dashboard from './Dashboard';

const GuardianPage = () => {
    const [guardians, setGuardians] = useState([]);
    const [newGuardian, setNewGuardian] = useState({
        GuardianID: '',
        Name: '',
        Email: '',
        TelephoneNum: '',
    });
    const [selectedGuardian, setSelectedGuardian] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchGuardians();
    }, []);

    const fetchGuardians = async () => {
        try {
            const response = await axios.get('/Guardians');
            setGuardians(response.data);
        } catch (error) {
            console.error('Error fetching guardians:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewGuardian((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newGuardian);
        try {
            await axios.post('/Guardians/create', newGuardian);
            setNewGuardian({
                GuardianID: '',
                Name: '',
                Email: '',
                TelephoneNum: '',
            });
            fetchGuardians();
        } catch (error) {
            console.error('Error creating guardian:', error);
        }
    };

    const handleDelete = async (GuardianID) => {
        try {
            await axios.delete(`/Guardians/delete/${GuardianID}`);
            fetchGuardians();
        } catch (error) {
            console.error('Error deleting guardian:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedGuardian) return;
        try {
            await axios.put(`/Guardians/update/${selectedGuardian.GuardianID}`, selectedGuardian);
            setEditMode(false);
            setSelectedGuardian(null);
            fetchGuardians();
        } catch (error) {
            console.error('Error updating guardian:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedGuardian((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (guardian) => {
        setSelectedGuardian(guardian);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Guardian Page</h2>

            <div className="guardian-details">
                <table>
                    <thead>
                        <tr>
                            <th>Guardian ID</th>
                            <th>Guardian Name</th>
                            <th>Guardian Email</th>
                            <th>Telephone number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guardians.map((guardian) => (
                            <tr key={guardian.GuardianID}>
                                <td>{guardian.GuardianID}</td>
                                <td>{guardian.Name}</td>
                                <td>{guardian.Email}</td>
                                <td>{guardian.TelephoneNum}</td>
                                <td>
                                    <button onClick={() => handleDelete(guardian.GuardianID)}>Delete</button>
                                    <button onClick={() => handleEditClick(guardian)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedGuardian && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Guardian</h3>
                            <form className='guardian-form'>
                                <input
                                    type="text"
                                    name="GuardianID"
                                    placeholder="Guardian ID"
                                    value={selectedGuardian.GuardianID}
                                    onChange={(e) => setSelectedGuardian({ ...selectedGuardian, GuardianID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Guardian Name"
                                    value={selectedGuardian.Name}
                                    onChange={(e) => setSelectedGuardian({ ...selectedGuardian, Name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Guardian Email"
                                    value={selectedGuardian.Email}
                                    onChange={(e) => setSelectedGuardian({ ...selectedGuardian, Email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Guardian Type"
                                    value={selectedGuardian.TelephoneNum}
                                    onChange={(e) => setSelectedGuardian({ ...selectedGuardian, TelephoneNum: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Guardian</h3>
                            <form onSubmit={handleSubmit} className='guardian-form'>
                                <input
                                    type="text"
                                    name="GuardianID"
                                    placeholder="Guardian ID"
                                    value={newGuardian.GuardianID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Guardian Name"
                                    value={newGuardian.Name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Guardian Email"
                                    value={newGuardian.Email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Telephone Number "
                                    value={newGuardian.TelephoneNum}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Guardian</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default GuardianPage;