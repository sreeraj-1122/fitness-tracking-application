import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { baseUrl } from "../../config/BaseUrl";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
function Adminexercise() {
  const { enqueueSnackbar } = useSnackbar();

  const [showdelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowDelete(false);
  };
  const handleShowDelete = () => setShowDelete(true);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [caloriesburned, setCaloriesburned] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    axios.get(`${baseUrl}/admin/exercise`).then((response) => {
      setData(response.data);
      setName("");
      setMuscle("");
      setEquipment("");
      setDifficulty("");
      setInstructions("");
      setCaloriesburned("");
      setDuration("");
      setPhoto(null);
    });
  };
  const handleDelete = async (id) => {
    axios.delete(`${baseUrl}/admin/exercise/${id}`).then((response) => {
      enqueueSnackbar("Deleted successfully", { variant: "success" });
      getData();
     
      handleClose();
    });
  };
  const handleSubmit = async () => {
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

      const response = await axios.post(
        `${baseUrl}/admin/addexercise`,
        formData
      );

      if (response.data === "send all fields") {
        enqueueSnackbar("Send all required fields", { variant: "error" });
      } else {
        enqueueSnackbar("Added successfully", { variant: "success" });
        getData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminuser-section">
      <h1>Exercises</h1>
      <Table responsive="md" striped bordered hover variant="dark">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Exercise Name </th>
            <th>Muscle</th>
            <th>Equipment</th>
            <th>Difficulty</th>
            <th>Instructions</th>
            <th>Calories burned</th>
            <th>Duration (Minutes)</th>

            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val,index) => (
            <>
              <tr className="text-center" key={val._id}>
                <td >{index+1}</td>
                <td>{val.name}</td>
                <td>{val.muscle}</td>
                <td>{val.equipment}</td>
                <td>{val.difficulty}</td>
                <td>{val.instructions}</td>
                <td>{val.caloriesburned}</td>
                <td>{val.duration}</td>

                <td className="text-center">
                  <MdModeEditOutline
                    className="fs-4 delete-user"
                    onClick={() => navigate(`/admin/editexercise/${val._id}`)}
                  />
                </td>
                <td className="text-center">
                  <ImCross
                    className="fs-5 delete-user"
                    onClick={handleShowDelete}
                  />
                </td>
              </tr>
              <Modal show={showdelete} onHide={handleClose} animation={false} className="text-bg-dark">
                <Modal.Header
                  closeButton
                  closeVariant="white"
                  className="text-bg-dark"
                >
                  <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-bg-dark">
                  Are You Sure To Delete
                </Modal.Body>
                <Modal.Footer className="text-bg-dark">
                  <Button variant="danger" onClick={handleClose}>
                    No
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleDelete(val._id)}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ))}
        </tbody>
      </Table>
      <span className="d-flex justify-content-center ">
        {" "}
        <Button onClick={handleShow} variant="danger fw-medium">
          Add exercise
        </Button>
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton closeVariant="white" className="text-bg-dark">
          <Modal.Title>Add Exercises</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Exercise Name"
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
                placeholder="Enter Equipment name"
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
                placeholder="Enter muscle name"
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
                placeholder="Enter Calories burned"
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
                placeholder="Enter Calories burned"
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
                placeholder="Enter difficulty level"
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
            <Modal.Footer className="text-bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
       
      </Modal>
    </div>
  );
}

export default Adminexercise;
