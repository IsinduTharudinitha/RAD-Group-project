import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Children.css";
import Dashboard from './Dashboard';

const ChildrenPage = () => {
    const [childrens, setChildrens] = useState([]);
    const [newChildren, setNewChildren] = useState({
        ChildrenID: '',
        Name: '',
        Age: '',
        TelephoneNum: '',
    });
    const [selectedChildren, setSelectedChildren] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchChildrens();
    }, []);

    const fetchChildrens = async () => {
        try {
            const response = await axios.get('/Childrens');
            setChildrens(response.data);
        } catch (error) {
            console.error('Error fetching childrens:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewChildren((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newChildren);
        try {
            await axios.post('/Childrens/create', newChildren);
            setNewChildren({
                ChildrenID: '',
                Name: '',
                Age: '',
                TelephoneNum: '',
            });
            fetchChildrens();
        } catch (error) {
            console.error('Error creating children:', error);
        }
    };

    const handleDelete = async (ChildrenID) => {
        try {
            await axios.delete(`/Childrens/delete/${ChildrenID}`);
            fetchChildrens();
        } catch (error) {
            console.error('Error deleting children:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedChildren) return;
        try {
            await axios.put(`/Childrens/update/${selectedChildren.ChildrenID}`, selectedChildren);
            setEditMode(false);
            setSelectedChildren(null);
            fetchChildrens();
        } catch (error) {
            console.error('Error updating children:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedChildren((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (children) => {
        setSelectedChildren(children);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h1>Children</h1>

            <div className="children-details">
                <table>
                    <thead>
                        <tr>
                            <th>Children ID</th>
                            <th>Children Name</th>
                            <th>Children Age</th>
                            <th>Telephone number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childrens.map((children) => (
                            <tr key={children.ChildrenID}>
                                <td>{children.ChildrenID}</td>
                                <td>{children.Name}</td>
                                <td>{children.Age}</td>
                                <td>{children.TelephoneNum}</td>
                                <td>
                                    <button onClick={() => handleDelete(children.ChildrenID)}>Delete</button>
                                    <button onClick={() => handleEditClick(children)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedChildren && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Children</h3>
                            <form className='children-form'>
                                <input
                                    type="text"
                                    name="ChildrenID"
                                    placeholder="Children ID"
                                    value={selectedChildren.ChildrenID}
                                    onChange={(e) => setSelectedChildren({ ...selectedChildren, ChildrenID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Children Name"
                                    value={selectedChildren.Name}
                                    onChange={(e) => setSelectedChildren({ ...selectedChildren, Name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Age"
                                    placeholder="Children Age"
                                    value={selectedChildren.Age}
                                    onChange={(e) => setSelectedChildren({ ...selectedChildren, Age: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Children Type"
                                    value={selectedChildren.TelephoneNum}
                                    onChange={(e) => setSelectedChildren({ ...selectedChildren, TelephoneNum: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Children Registration Form</h3>
                            <form onSubmit={handleSubmit} className='children-form'>
                                <input
                                    type="text"
                                    name="ChildrenID"
                                    placeholder="Children ID"
                                    value={newChildren.ChildrenID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Children Name"
                                    value={newChildren.Name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Age"
                                    placeholder="Children Age"
                                    value={newChildren.Age}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Telephone Number "
                                    value={newChildren.TelephoneNum}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Children</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default ChildrenPage;