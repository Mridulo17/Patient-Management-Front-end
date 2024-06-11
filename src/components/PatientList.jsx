import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery('patients', getPatients);

  const deleteMutation = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = data?.data.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><span>Loading...</span></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error loading patients</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient List</h2>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/patients/new" className="btn btn-primary">Create Patient</Link>
      </div>
      <div className='row'>
        <div className='col-4'>
        <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search patients"
          value={searchTerm}
          onChange={handleSearch}
        />
        </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <th scope="row">{patient.id}</th>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>
                  <Link to={`/patients/${patient.id}`} className="btn btn-info btn-sm me-2">Details</Link>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(patient.id)}
                    disabled={deleteMutation.isLoading && deleteMutation.variables === patient.id}
                  >
                    {deleteMutation.isLoading && deleteMutation.variables === patient.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
