import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import NoteList from './pages/NoteList';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import ViewNote from './pages/ViewNote';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/list" element={<NoteList />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/view/:id" element={<ViewNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
