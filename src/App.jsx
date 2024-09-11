import './styles/css/style.css';
import 'aframe';
import 'aframe-environment-component';
import 'aframe-extras';
import 'aframe-event-set-component';
import './components/CustomLookControls';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabEditor from './pages/LabEditor';
import SchoolEditor from './pages/SchoolEditor';
import EnviromentSelection from './pages/EnviromentSelection';
import AddAnnotations from "./pages/AddAnnotations.jsx"
import "./styles/css/style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<EnviromentSelection />} />
        <Route path="/labEditor" element={<LabEditor />} />
        <Route path="/SchoolEditor" element={<SchoolEditor />} />
        <Route path="/labEditor/add-annotations" element={<AddAnnotations />} />
        <Route path="/SchoolEditor/add-annotations" element={<AddAnnotations />} />
      </Routes>
    </Router>
  );
}

export default App;
