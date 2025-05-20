import React, { useState } from 'react'
const inputStyle =
    "text-xs text-gray-500 font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";



const partidoForm = () => {
    const [captain, setCaptain] = useState("")
    const [player1, setPlayer1] = useState("")
    const [player2, setPlayer2] = useState("")
    const [player3, setPlayer3] = useState("")
    const [player4, setPlayer4] = useState("")


    const handleCaptainChange = (event) => {
        setCaptain(event.target.value)
    }
    const handlePlayer1change = (event) => {
        setPlayer1(event.target.value)
    }
    const handlePlayer2change = (event) => {
        setPlayer2(event.target.value)
    }
    const handlePlayer3change = (event) => {
        setPlayer3(event.target.value)
    }
    const handlePlayer4change = (event) => {
        setPlayer4(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const team = {
            captain,
            player1,
            player2,
            player3,
            player4,

        }
        try {
            const response = await fetch('http://localhost:8080/api/partidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(team)
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
                        name='capitan'
                        value={capitan}
                        placeholder='ingrese capitan del equipo'
                        onChange={handleCaptainChange}
                        className={inputStyle} />

                    <input type="text"
                        name='jugadores'
                        value={player1}
                        onChange={handlePlayer1change}
                        placeholder='ingrese nombre de jugador'
                        className={inputStyle} />

                    <input type="text"
                        name='jugadores'
                        value={player2}
                        onChange={handlePlayer2change}
                        placeholder='ingrese nombre de jugador'
                        className={inputStyle} />

                    <input type="text"
                        name='jugadores'
                        value={player3}
                        onChange={handlePlayer3change}
                        placeholder='ingrese nombre de jugador'
                        className={inputStyle} />

                    <input type="text"
                        name='jugadores'
                        value={player4}
                        onChange={handlePlayer4change}
                        placeholder='ingrese nombre de jugador'
                        className={inputStyle} />
                </div>
                <button onChange={handleSubmit}>crear equipo</button>
            </form>
        </div>
    )
}

export default partidoForm