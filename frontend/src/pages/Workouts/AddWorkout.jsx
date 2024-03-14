import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../config/BaseUrl";
import { DataContext } from "../../context/Datacontext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function AddWorkout() {
  const { userId, token } = useContext(DataContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [exercise, setExercise] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0); // Assuming duration is in minutes
  const [calories, setCalories] = useState(0); // Assuming initial calorie value is 0
  const [muscle, setMuscle] = useState(""); // Assuming muscle starts as an empty string
  const [equipment, setEquipment] = useState("");

  const currentData = data.find((res) => res.name === exercise);

  useEffect(() => {
    axios.get(`${baseUrl}/admin/exercise`).then((response) => {
      setData(response.data);
      // console.log(response.data);
    });
    console.log("data", data);
    if (currentData) {
      setDescription(currentData.instructions);
      setDuration(currentData.duration);
      setCalories(currentData.caloriesburned);
      setMuscle(currentData.muscle);
      setEquipment(currentData.equipment);
    }
  }, [exercise]);
  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !goal ||
      !exercise ||
      !description ||
      !duration ||
      !calories ||
      !muscle ||
      !equipment
    ) {
      console.error("Please fill in all required fields.");
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });

      return;
    }

    try {
      const requestData = {
        name,
        goal,
        exercise,
        description,
        duration,
        calories,
        muscle,
        equipment,
      };

      const response = await axios.post(`${baseUrl}/workout`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 201) {
        console.log("Workout successfully added:", response.data);
        enqueueSnackbar("Workout successfully added", { variant: "success" });
        navigate(-1);
        // Optionally, reset form fields or perform other actions upon successful addition
      } else {
        console.error(
          "Failed to add workout. Unexpected status code:",
          response.status
        );
        enqueueSnackbar("Failed to add workout. Unexpected status code", {
          variant: "error",
        });

        // Handle unexpected status codes here
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Request failed with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request made but no response received:", error.request);
      } else {
        // Something else happened in setting up the request that triggered an error
        console.error("Error setting up request:", error.message);
      }
      console.error("Error details:", error.config);
    }
  };

  return (
    <div className="profile-edit-container">
      <h1>Add Workout</h1>
      <form action="" onSubmit={(e) => handleCreate(e)}>
        <div className="profile-edit-inputs">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter workout plan name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="goals">Goal:</label>
          <select
            id="goals"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select Goal</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="general fitness">General Fitness</option>
          </select>
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="exercise">Exercises:</label>
          <select
            id="exercise"
            name="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value="">Select Goal</option>
            {data.map((val) => (
              <option value={val && val.name}>{val.name}</option>
            ))}
          </select>
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Muscle</label>
          <input type="hidden" name="muscle" value={muscle} />
          <input type="text" value={muscle} readOnly />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Equipments</label>
          <input type="hidden" name="equipment" value={equipment} />
          <input type="text" value={equipment} readOnly />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Instructions</label>
          <input type="hidden" name="description" value={description} />
          <textarea value={description} readOnly></textarea>
        </div>

        <div className="profile-edit-inputs">
          <label htmlFor="">Duration</label>
          <input type="hidden" name="duration" value={duration} />
          <input type="number" value={duration} readOnly />
        </div>

        <div className="profile-edit-inputs">
          <label htmlFor="">Calories</label>
          <input type="hidden" name="calories" value={calories} />
          <input type="number" value={calories} readOnly />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddWorkout;
