import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPatient, createPatient, updatePatient } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [patientData, setPatientData] = useState({ name: '', email: '', phone: '', address: '' });

  const { data, error, isLoading } = useQuery(['patient', id], () => getPatient(id), {
    enabled: !!id,
    onSuccess: (data) => setPatientData(data.data),
  });

  const mutation = useMutation(id ? updatePatient : createPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      navigate('/patients');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...patientData, id });
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><span>Loading...</span></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error loading patient</div>;

  return (
    <div className="container mt-5">
      <h2>{id ? 'Edit Patient' : 'Add Patient'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={patientData.name}
            onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={patientData.email}
            onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            value={patientData.phone}
            onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            value={patientData.address}
            onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PatientForm;
