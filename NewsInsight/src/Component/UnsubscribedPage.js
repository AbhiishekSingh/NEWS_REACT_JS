import React, { useState } from "react";
import axios from "axios";

function UnsubscribedPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to unsubscribe using the provided email
      const response = await axios.post("http://localhost:3001/unsubscribe", {
        email,
      });
      console.log(response.data);
      // Handle success or show a success message
      setSuccessMessage("Unsubscribed successfully!");
      setErrorMessage("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show an error message
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setEmail("");
      } else {
        setErrorMessage("An error occurred while unsubscribing.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Unsubscribe Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Unsubscribe
        </button>
      </form>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      {successMessage && <div className="text-success">{successMessage}</div>}
    </div>
  );
}

export default UnsubscribedPage;
