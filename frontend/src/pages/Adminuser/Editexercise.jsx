import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config/BaseUrl";
import { useSnackbar } from "notistack";

function Editexercise() {
    const navigate=useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [caloriesburned, setCaloriesburned] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${baseUrl}/admin/exercise/${id}`).then((response) => {
      setName(response.data.name);
      setMuscle(response.data.muscle);
      setEquipment(response.data.equipment);
      setDifficulty(response.data.difficulty);
      setInstructions(response.data.instructions);
      setCaloriesburned(response.data.caloriesburned);
      setDuration(response.data.duration);
      setPhoto(response.data.photo);
    });
  }, []);
  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("equipment", equipment);
      formData.append("muscle", muscle);
      formData.append("difficulty", difficulty);
      formData.append("instructions", instructions);
      formData.append("caloriesburned", caloriesburned);
      formData.append("duration", duration);
      formData.append("photo", photo);
  
      const response = await axios.put(`${baseUrl}/admin/editexercise/${id}`, formData);
            
            enqueueSnackbar("Edited successfully", { variant: "success" });
            navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal show={show}>
        <Modal.Header className="text-bg-dark">
          <Modal.Title>Add Exercises</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                accept="image/png, image/jpeg"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Equipment:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Muscle:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Calories burned:</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={caloriesburned}
                onChange={(e) => setCaloriesburned(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration:</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Difficulty:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructions:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-bg-dark">
          <Button variant="secondary" onClick={()=>navigate(-1)}>
            Back
          </Button>
          <Button variant="primary" onClick={handleEdit} >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Editexercise;
