import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllNotes, deleteNote } from '../api';
import Navbar from '../components/Navbar';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getAllNotes();
                setNotes(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Anda yakin ingin menghapus catatan ini?");
        if (!confirmed) return;
        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className="container mt-5"><p>Loading...</p></div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="box">
                    <h1 className="title has-text-centered">Catatan Saya</h1>
                    <div className="buttons is-right">
                        <button onClick={() => navigate("/add")} className="button is-primary">+ Catatan Baru</button>
                    </div>
                    <table className='table is-striped is-fullwidth'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Judul</th>
                                <th>Isi Pesan</th>
                                <th>Tanggal dibuat</th>
                                <th>Terakhir dirubah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={note.id}>
                                    <td>{index + 1}</td>
                                    <td><strong>{note.judul}</strong></td>
                                    <td>{note.isi.length > 50 ? `${note.isi.substring(0, 50)}...` : note.isi}</td>
                                    <td>{new Date(note.tanggal_dibuat).toLocaleString()}</td>
                                    <td>{new Date(note.tanggal_diupdate).toLocaleString()}</td>
                                    <td>
                                        <div className="buttons">
                                            <button onClick={() => navigate(`/view/${note.id}`)} className="button is-small is-primary">Lihat</button>
                                            <button onClick={() => navigate(`/edit/${note.id}`)} className="button is-small is-info">Edit</button>
                                            <button onClick={() => handleDelete(note.id)} className='button is-small is-danger'>Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NoteList;