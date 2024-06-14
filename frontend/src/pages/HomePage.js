// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchPdfs = async () => {
    try {
      const { data } = await api.get('/pdfs');
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const uploadPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await api.post('/pdfs', formData);
      fetchPdfs();
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="home-page">
      <h1>PDF Manager</h1>
      <form onSubmit={uploadPdf}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="application/pdf"
          placeholder="Select a PDF file"
        />
        <button type="submit">Upload PDF</button>
      </form>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf._id}>
            <span className="filename">{pdf.filename}</span>
            <button onClick={() => navigate(`/${pdf._id}`)}>
              View PDF
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
