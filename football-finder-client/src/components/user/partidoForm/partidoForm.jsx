import React, { useState } from 'react'
const inputStyle =
    "text-xs text-gray-500 font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";


const partidoForm = () => {
  const [nomPredio,setNomPredio] = useState("")
  const [fecha,setFecha] = useState("")
  const [horario,setHorario] = useState("")
  const [tipoCancha,setTipoCancha] = useState("")

  const handleNomPredioChange =(event) => {
    setNomPredio(event.target.value)
  }
  const handleFechaChange = (event) => {
    setFecha(event.target.value)
  }
  const handleHorarioChange = (event) => {
    setHorario(event.target.value)
  }

  const handleTipoCanchaChange = (event) => {
    setTipoCancha(event.target.value)
  }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const game = {
           nomPredio,
           fecha,
           horario,
           tipoCancha

        }
        try {
            const response = await fetch('http://localhost:8080/api/partidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            });

            if (response.ok) {
                alert("partido guardado correctamente")
            } else {
                alert("error al guardar el partido")
            }
        } catch (error) {
            console.error('error', error)
            alert('error de conexion')

        }
    }
    return (
        <div className='background-color:red'>
            <form onSubmit={handleSubmit}>
                <div className=''>
                    <input type="text"
                        name='nomPredio'
                        value={nomPredio}
                        placeholder='ingrese el nombre del predio'
                        onChange={handleNomPredioChange}
                        className={inputStyle} />

                    <input type="text"
                        name='fecha'
                        value={fecha}
                        onChange={handleFechaChange}
                        placeholder='ingrese la fecha del partido (dd/mm/aa)'
                        className={inputStyle} />

                    <input type="text"
                        name='horario'
                        value={horario}
                        onChange={handleHorarioChange}
                        placeholder='ingrese el horario del partido'
                        className={inputStyle} />

                    <input type="text"
                        name='tipoCancha'
                        value={tipoCancha}
                        onChange={handleTipoCanchaChange}
                        placeholder='ingrese el tipo de cancha'
                        className={inputStyle} />

                    
                </div>
                <button onChange={handleSubmit}>crear partido</button>
            </form>
        </div>
    )
}

export default partidoForm