import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveNote } from '../api.js';
import Navbar from '../components/Navbar.jsx';

const AddNote = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await saveNote({ judul, isi });
            navigate("/list");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="box p-5">
                    <h1 className="title">Buat Catatan Baru</h1>
                    <form onSubmit={handleSave}>
                        <div className="field">
                            <label className="label">Judul Catatan</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={judul}
                                    placeholder='Masukkan judul catatan'
                                    onChange={(e) => setJudul(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Isi Catatan</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    value={isi}
                                    placeholder='Tulis isi catatan...'
                                    onChange={(e) => setIsi(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="buttons mt-4">
                            <button type='submit' className="button is-success">Simpan</button>
                            <button type='button' className="button is-danger" onClick={() => navigate("/list")}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNote;