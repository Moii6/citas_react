const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {
  const { nombre, propietario, email, ingreso, sintomas, id } = paciente;

  const handleEliminar = () => {
    const respuesta = confirm("Estas seguro de eliminar a este paciente?");
    if (respuesta) {
      eliminarPaciente(id);
    }
  };
  return (
    <div className="mx-5 bg-white shadow-md px-5 py-10 mb-5 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: <span className="font-normal normal-case">{nombre}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Propietario:{" "}
        <span className="font-normal normal-case">{propietario}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        email: <span className="font-normal normal-case">{email}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Fecha de ingreso:{" "}
        <span className="font-normal normal-case">{ingreso}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        sintomas: <span className="font-normal normal-case">{sintomas}</span>
      </p>
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded"
          onClick={() => setPaciente(paciente)} //con el arrow funtcion se espera que suceda el onclick, sin este la funcion se ejecuta automaticamnte antes de tiempo
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
