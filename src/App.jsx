import './styles/css/style.css';
import 'aframe';
import 'aframe-environment-component';
import 'aframe-extras';
import 'aframe-event-set-component';
import './components/CustomLookControls';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabEditor from './pages/LabEditor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/labEditor" element={<LabEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
