import { useState, useEffect } from "react";
import Error from "./Error";
const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    //en esta momento se esta usando para evitar los rerender que ocurren cada vez que se esta ingresando informacion la formulario
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setIngreso(paciente.ingreso);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random.toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validacion del formulario
    if ([nombre, propietario, email, ingreso, sintomas].includes("")) {
      //console.log("hay  al menos un campo vacio");
      setError(true);
      return;
    }
    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      ingreso,
      sintomas,
      id: generarId(),
    };
    if (paciente.id) {
      //si ya existe un id significa que se esta editandop la info
      objetoPaciente.id = paciente.id;
      /**al nuevo objeto con la info del paciente que se esta editando se le agrega el id que ya se habia generado
         cuando se creo de esta forma se toma como el mismo registro pero con datos actualizados**/
      const pacientesActualizados = pacientes.map((pacienteTemp) =>
        /**se itera la lista de los pacientes agregados para encontrar el que tenga un id igual al del paciente que se esta actualizando
         * si se cumple se agrega a la lista objetoPAciente con la info actualizada, si no se regresa pacienteTemp,
         * contiene la info tal y como esta en la lista de los pacientes agregados**/
        pacienteTemp.id === paciente.id ? objetoPaciente : pacienteTemp
      );
      setPacientes(pacientesActualizados);
      /**Al hook setPacientes (es el que renderiza la lista de los pacientes agregados) se le pasa la lista de pacientes actualizados */
      setPaciente({});
      /**por ultimo el objeto paciente (es que se edito) se limpia por medio del state setPaciente */
    } else {
      //si no existe un id significa que se esta agregando un nuevo registro
      objetoPaciente.id = generarId(); //al nuevo objeto con la info del paciente que se va a agregar como nuevo se le asigna un id
      setPacientes([...pacientes, objetoPaciente]); // en este caso los 3 puntos indican que se esta tomando una compia de la variable pacientes
    }

    //se reinicia el formulario regresando los states a su valor inicial
    setNombre("");
    setPropietario("");
    setEmail("");
    setIngreso("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminstralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        <div className="mb-5">
          {error && <Error mensaje="Todos los campos son obligatorios" />}
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="boder-2 w-full p-2 mt-2 placeholder-gray- rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="boder-2 w-full p-2 mt-2 placeholder-gray- rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email contacto"
            className="boder-2 w-full p-2 mt-2 placeholder-gray- rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="ingreso"
            className="block text-gray-700 uppercase font-bold"
          >
            fecha de Ingreso
          </label>
          <input
            id="ingreso"
            type="date"
            className="boder-2 w-full p-2 mt-2 placeholder-gray- rounded-md"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Que sintomas presenta?"
            className="boder-2 w-full p-2 mt-2 placeholder-gray- rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={paciente.id ? "editar paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
