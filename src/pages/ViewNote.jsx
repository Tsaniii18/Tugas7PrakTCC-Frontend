import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById } from '../api.js';
import Navbar from '../components/Navbar.jsx';

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNoteById(id);
                setNote(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) return <div className="container mt-5"><p>Loading...</p></div>;
    if (!note) return <div className="container mt-5"><p>Catatan tidak ditemukan</p></div>;

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="box p-5">
                    <h1 className="title">{note.judul}</h1>
                    <p className="content">{note.isi}</p>
                    <p><strong>Dibuat:</strong> {note.tanggal_dibuat}</p>
                    <p><strong>Terakhir diupdate:</strong> {note.tanggal_diupdate}</p>
                    <div className="buttons mt-4">
                        <button className="button is-primary" onClick={() => navigate("/list")}>Kembali</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;