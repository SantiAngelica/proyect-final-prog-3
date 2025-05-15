import React, { useState } from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [team, setTeam] = useState({
        nameTeam: "",
        city: "",
        category: "",
        captan: "",
        players: Array(11).fill({ name: "", position: "" })
    });

    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        setTeam(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlayerChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPlayers = [...team.players];
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            [name]: value
        };

        setTeam(prev => ({
            ...prev,
            players: updatedPlayers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(team)
            });

            if (!res.ok) {
                ;
                alert("Error al registrar equipo.");
                return;
            }

            const data = await res.json();

            alert("Equipo registrado exitosamente.");
            navigate("/login");

        } catch (err) {
            alert("Error al registrar equipo.");
        }
    };

    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Registra tu equipo!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <FormControl
                            type='text'
                            name="nameTeam"
                            required
                            placeholder='Ingresar nombre del equipo'
                            onChange={handleTeamChange}
                            value={team.nameTeam}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormControl
                            type='text'
                            name="city"
                            required
                            placeholder='Ingresar la ciudad del equipo'
                            onChange={handleTeamChange}
                            value={team.city}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormControl
                            type='text'
                            name="category"
                            required
                            placeholder='Ingresar la categoría del equipo'
                            onChange={handleTeamChange}
                            value={team.category}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormControl
                            type='text'
                            name="captan"
                            required
                            placeholder='Ingresar el nombre del capitán'
                            onChange={handleTeamChange}
                            value={team.captan}
                        />
                    </FormGroup>

                    <hr />
                    <h5>Jugadores</h5>
                    {team.players.map((player, index) => (
                        <Row className="mb-2" key={index}>
                            <Col>
                                <FormControl
                                    type='text'
                                    name="name"
                                    placeholder={`Jugador ${index + 1} - Nombre`}
                                    value={player.name}
                                    onChange={(e) => handlePlayerChange(index, e)}
                                    required
                                />
                            </Col>
                            <Col>
                                <FormControl
                                    type='text'
                                    name='position'
                                    placeholder='Posición'
                                    value={player.position}
                                    onChange={(e) => handlePlayerChange(index, e)}
                                    required
                                />
                            </Col>
                        </Row>
                    ))}

                    <Row className="mt-4">
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Registrar equipo
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Register;
