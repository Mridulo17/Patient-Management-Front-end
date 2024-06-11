import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPatient } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery(['patient', id], () => getPatient(id));

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><span>Loading...</span></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error loading patient</div>;

  const patient = data.data;

  return (
    <div className="container mt-5">
      <h2>Patient Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {patient.name}</h5>
          <p className="card-text"><strong>Email:</strong> {patient.email}</p>
          <p className="card-text"><strong>Phone:</strong> {patient.phone}</p>
          <p className="card-text"><strong>Address:</strong> {patient.address}</p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
