import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EnviromentSelection() {
  const navigate = useNavigate();
  const [selectedEnv, setSelectedEnv] = useState(null);

  // Define available environments
  const environments = [
    { id: 'itLab', name: 'IT Lab', preset: 'itLab' },
    { id: 'universityHall', name: 'University Hall', preset: 'universityHall' },
  ];

  const handleEnvSelect = (env) => {
    setSelectedEnv(env);
  };

  const handleProceed = () => {
    if (selectedEnv) {
      // Store the selected environment and navigate to the editor
      if(selectedEnv.id=='itLab')
      {
        navigate('labEditor');
      }
      else{
        navigate('/SchoolEditor');
      }
      localStorage.setItem('selectedEnv', selectedEnv.preset);
    } else {
      alert('Please select an environment.');
    }
  };

  return (
    <div className="environment-selection-page">
      <h2>Select Your Environment</h2>
      <div className="environment-options">
        {environments.map((env) => (
          <div
            key={env.id}
            className={`environment-option ${"itLab" === env.id ? 'lab' : 'school'} ${selectedEnv?.id === env.id ? 'selected' : ''}`}
            onClick={() => handleEnvSelect(env)}
          >
            {env.name}
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={handleProceed}>
        Proceed to Editor
      </button>
    </div>
  );
}

export default EnviromentSelection;
