import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./Exercise.css";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
function Exercises() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/admin/exercise`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <section>
      <h1 className="text-center py-2 text-success">Exercises</h1>
      <div className="exercise-section">
        {data.map((val) => (
          <>
            <Card
              style={{
                width: "25rem",
                marginBottom: "20px",
                fontSize: "16px",
                height: "31rem",
              }}
            >
              <Card.Img
                variant="top"
                src={`${baseUrl}/${val.photo}`}
              />
              <Card.Body>
                <Card.Title className="m-0 p-0">{val.name}</Card.Title>
                <Card.Text className="m-0 py-1 ">
                {val.instructions}
                </Card.Text>
                <div className="card-exercise">

                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Difficulty</span>:{val.difficulty}
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Muscle group</span>:{val&&val.muscle}
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Calories burned</span>:{val.caloriesburned}
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Equipments :</span>{val.equipment}
                </Card.Text>
                <Card.Text>
                  <span className="fw-medium">Duration</span>: {val.duration} minutes
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </>
        ))}

        
          
      </div>
    </section>
  );
}

export default Exercises;
