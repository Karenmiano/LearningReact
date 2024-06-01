import React from "react";
import ReactDOM from "react-dom/client";

const skillsList = [
  {
    skill: "HTML+CSS",
    level: "intermediate",
    color: "blue",
  },
  {
    skill: "Javascript",
    level: "beginner",
    color: "yellow",
  },
  {
    skill: "C",
    level: "advanced",
    color: "blue",
  },
  {
    skill: "Python",
    level: "advanced",
    color: "purple",
  },
  {
    skill: "Flask",
    level: "advanced",
    color: "orange",
  },
  {
    skill: "SQL",
    level: "advanced",
    color: "pink",
  },
];

function App() {
  return (
    <div
      style={{
        width: "300px",
        margin: "40px",
        border: "4px solid #222",
        padding: "20px",
      }}
    >
      <Avatar />
      <Description />
      <SkillsList />
    </div>
  );
}

function Avatar() {
  return (
    <img
      src="/avatar.jpg"
      style={{ width: "150px", height: "150px" }}
      alt="avatar"
    />
  );
}

function Description() {
  return (
    <div>
      <h2>Karen Miano</h2>
      <p>
        Full stack web developer with an inclination to back-end development.
        Loves watching sci-fi movies and series, really thinking about the
        future in tech. Human being without a favourite dish.
      </p>
    </div>
  );
}

function SkillsList() {
  return (
    <div
      style={{
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        marginTop: "8px",
      }}
    >
      {skillsList.map((skill) => (
        <Skill skill={skill.skill} level={skill.level} color={skill.color} />
      ))}
      {/* <Skill skill="HTML+CSS" strength="&#x1F4AA;" color="blue" />
      <Skill skill="Javascript" strength="&#x1F44D;" color="yellow" />
      <Skill skill="C" strength="&#x1F4AA;" color="blue" />
      <Skill skill="Python" strength="&#x1F4AA;" color="purple" />
      <Skill skill="Flask" strength="&#x1F4AA;" color="orange" />
      <Skill skill="SQL" strength="&#x1F4AA;" color="pink" /> */}
    </div>
  );
}

function Skill({ skill, level, color }) {
  return (
    <p
      style={{
        backgroundColor: color,
        margin: "5px 5px",
        padding: "2px 12px",
        borderRadius: "5px",
      }}
    >
      {skill}
      <span>
        {level === "beginner" && " 👶"}
        {level === "intermediate" && " 👍"}
        {level === "advanced" && " 💪"}
      </span>
    </p>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
