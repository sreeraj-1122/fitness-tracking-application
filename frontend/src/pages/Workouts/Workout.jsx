import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";
import "./Workout.css";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { DataContext } from "../../context/Datacontext";
import { useSnackbar } from "notistack";
function Workout() {
  const { enqueueSnackbar } = useSnackbar();

  const { userId, token, isLoggedIn } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [completed, setComplete] = useState(true);
  const [data1, setData1] = useState([]);

  // console.log(complete);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    axios
      .get(`${baseUrl}/addworkout/${userId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      });
  };
  console.log(data);
  const data2 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  // const handleAdd = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("goal", goal);
  //     formData.append("exercise", exercise);
  //     formData.append("description", description);
  //     formData.append("duration", duration);
  //     formData.append("calories", calories);
  //     formData.append("muscle", muscle);
  //     formData.append("equipment", equipment);
  //     // console.log(formData);
  //     // formData.forEach((value, key) => {
  //     //   console.log(key, value);
  //     //   console.log(typeof(key));
  //     // });
  //     // console.log(name);
  //     // console.log(goal);
  //     // console.log(equipment);
  //     // console.log(muscle);
  //     // console.log(exercise);
  //     // console.log(description);
  //     // console.log(calories);
  //     // console.log(duration);
  //      // name,
  //       // goal,
  //       // equipment,
  //       // muscle,
  //       // exercise,
  //       // description,
  //       // calories,
  //       // duration
  //     const response = await axios.post(`${baseUrl}/addworkout`,formData,

  //      {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: "Bearer " + token,
  //       },
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      axios
        .delete(`${baseUrl}/workout/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          enqueueSnackbar("Deleted successfully", { variant: "success" });
          getData();
          handleClose();
        });
    } catch (error) {
      console.log(error);
    }
  };
  // const handleComplete=async(id)=>{

  //   try {
  //     axios.patch(`${baseUrl}/editworkout/${id}`,completed, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: "Bearer " + token,
  //       }
  //     }).then((response) => {
  //       enqueueSnackbar("completed successfully", { variant: "success" });
  //       console.log(response.data.completed);
  //       // setComplete(response.data.completed);
  //       setComplete(!completed)
  //       console.log('complete',completed);
  //       getData()
  //     });
  //    } catch (error) {
  //     console.log(error);
  //    }
  // }
  return (
    <div className="workout-mainsection">
      <h1 className="text-center text-success py-2 mt-3">Workouts</h1>
      <div className="workout-section">
        {/* <span className='add-workout'><FaPlus className='fs-4'/>
</span> */}
        <Table responsive="md" striped bordered hover variant="dark">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Workout name </th>
              <th>Goal</th>
              <th>Exercise</th>
              <th>Muscle</th>
              <th>Equipment</th>
              <th>Instructions</th>
              <th>Duration (minutes)</th>
              <th>Calories Burned</th>
              {/* <th>Complete</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => (
              <tr className="text-center" key={val._id}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.goal}</td>
                <td>{val.exercise}</td>
                <td>{val.muscle}</td>
                <td>{val.equipment}</td>
                <td>{val.description}</td>
                <td>{val.duration}</td>
                <td>{val.calories}</td>
                {/* <td className="text-center">
                  <TiTick className="fs-4 fw-bold " onClick={()=>handleComplete(val._id)}/>
                </td> */}
                <td className="text-center">
                  <ImCross className="fs-5 " onClick={handleShow} />
                </td>
                <Modal
                  show={show}
                  onHide={handleClose}
                  animation={false}
                  className="text-bg-dark"
                >
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
              </tr>
            ))}
          </tbody>
        </Table>
        <span className="d-flex justify-content-center ">
          {" "}
          <Button
            onClick={
              isLoggedIn
                ? () => navigate("/addworkouts")
                : () => navigate("/login")
            }
            variant="danger fw-medium"
          >
            Add workouts
          </Button>
        </span>
        
        {isLoggedIn ? (
          <>
             <hr className="mt-4" />
          <h4 className="text-center mt-3 fs-3 text-success ">Workout diagram</h4>
          <div className="diagram">
            <BarChart
              width={600}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 40, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="calories"
                fill="#0088FE"
                background={{ fill: "#FFBB28" }}
              />
              <Bar
                dataKey="duration"
                fill="#FF8042"
                background={{ fill: "#FFBB28" }}
              />
            </BarChart>
          </div>
          </>
       
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Workout;
