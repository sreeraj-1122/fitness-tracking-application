import React from "react";
import { Button, Card } from "react-bootstrap";
import { data } from "../nutrition";
import './Nutrition.css'
function Nutrition() {
  return (
    <section>
      <h1 className="text-center py-2 text-success">Nutrition</h1>
      <div className="nutrition-section">
        {data.map((val) => (
          <>
            <Card
              style={{
                width: "23rem",
                marginBottom: "20px",
                fontSize: "16px",
                height: "30rem",
              }}
            >
              <Card.Img 
                variant="top"
                src={val.image_url}
              />
               <Card.Title className="m-0 px-4 pt-2 ">{val.name}</Card.Title>
              <Card.Body className="nutrition-body">
               
                
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Calories:</span> {val.calories}
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Serving size: </span>{val.serving_size_g} g
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Total fat</span>: {val.fat_total_g} g
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">
                  Saturated fat:</span> {val.fat_saturated_g} g
                </Card.Text>
                <Card.Text  className="m-0 p-0">
                  <span className="fw-medium">protein:</span> {val.protein_g} g
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">sodium:</span> {val.sodium_mg} mg
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Potassium:</span> {val.potassium_mg} mg
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Cholesterol:</span> {val.cholesterol_mg} mg
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Carbohydrates:</span> {val.carbohydrates_total_g} g
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Fiber:</span> {val.fiber_g} g
                </Card.Text>
                <Card.Text className="m-0 p-0">
                  <span className="fw-medium">Sugar:</span> {val.sugar_g} g
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
    </section>
  );
}

export default Nutrition;
