import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";
function App() {
  /**lo que se encuentra como parametro en useState es el valor de inicio del state, es estos casos areglo y objeto vacio */
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  //useEffect detecta cuando hay una cambio en el objeto que tiene entre corchetes[] y ejecuta el codigo
  //para este caso que no hay nada en los corchetes el codigo se ejecutara una sola vez
  useEffect(() => {
    //el doble signo de interrogacion es una negacion, es decir si getItem(pacientes) no tiene info retorna un areglo vacio
    const obtenerLS = () => {
      setPacientes(JSON.parse(localStorage.getItem("pacientes")) ?? []);
    };
    obtenerLS();
  }, []);
  /** para este caso cuando el objeto pacientes cambie se van a guardar en local storage
   */
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  /**  en este caso la funcion filter va a retornar el o los registros que coincidan con la validadicon
   * al final el paciente con id igual al id que se esta intentando eliminar quda fuera de pacientesActualizados
   */
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );
    setPacientes(pacientesActualizados);
    /** al final por medio del state se actualia la lista de pacientes agregados
     * el state es el que permite el renderizado para que visualmente se borre el registro
     */
  };
  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
