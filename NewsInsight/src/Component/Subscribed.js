// Subscribe.js
import React, { useState } from "react";
import "./Subscribed.css";

function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [healthScience, setHealthScience] = useState(false);
  const [sports, setSports] = useState(false);
  const [tech, setTech] = useState(false);
  const [Business, setBusiness] = useState(false);
  const [Entertainment, setEntertainment] = useState(false);
  const [Science, setScience] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleHealthScienceChange = () => setHealthScience(!healthScience);
  const handleSportsChange = () => setSports(!sports);
  const handleTechChange = () => setTech(!tech);
  const handleBusinessChange = () => setBusiness(!Business);
  const handleEntertainment = () => setEntertainment(!Entertainment);
  const handleScience = () => setScience(!Science);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        name,
        email,
        healthScience,
        sports,
        tech,
        Business,
        Entertainment,
        Science,
      };

      const response = await fetch("http://localhost:3001/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(requestBody);

      if (response.ok) {
        console.log("Subscription successful!");
        setEmail("");
        setName("");
        setHealthScience("");
        setSports("");
      } else {
        console.error("Subscription failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="subscribe-container">
      <h1>Subscribe</h1>
      <form className="subscribe-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="subscribe-input"
            placeholder="Enter your name"
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="subscribe-input"
            placeholder="Enter your email"
          />
        </label>
        <br />
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={healthScience}
              onChange={handleHealthScienceChange}
              className="subscribe-checkbox"
            />
            Health
          </label>
          <label>
            <input
              type="checkbox"
              checked={sports}
              onChange={handleSportsChange}
              className="subscribe-checkbox"
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              checked={tech}
              onChange={handleTechChange}
              className="subscribe-checkbox"
            />
            Tech
          </label>
          <label>
            <input
              type="checkbox"
              checked={Business}
              onChange={handleBusinessChange}
              className="subscribe-checkbox"
            />
            Business
          </label>
          <label>
            <input
              type="checkbox"
              checked={Entertainment}
              onChange={handleEntertainment}
              className="subscribe-checkbox"
            />
            Entertainment
          </label>
          <label>
            <input
              type="checkbox"
              checked={Science}
              onChange={handleScience}
              className="subscribe-checkbox"
            />
            Science
          </label>
        </div>
        <br />
        <button type="submit" className="subscribe-button">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
