import React, { createContext, useState } from 'react';

export const CitaContext = createContext<any>(null);

export const CitaProvider = ({ children }: { children: React.ReactNode }) => {
  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState<any[]>([]);

  const agregarCita = (cita: any) => {
    setCitas([...citas, cita]);
  };

  return (
    <CitaContext.Provider value={{ paciente, setPaciente, citas, agregarCita }}>
      {children}
    </CitaContext.Provider>
  );
};