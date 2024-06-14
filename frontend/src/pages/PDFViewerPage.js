import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './PDFViewerPage.css';

const PDFViewerPage = () => {
  const { id } = useParams();
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const { data } = await api.get(`/pdfs/${id}`);
        setPdf(data);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [id]);

  return (
    <div className="view-pdf">
      {pdf ? (
        <iframe src={pdf.url} title={pdf.filename} width="100%" height="600px"></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewerPage;
