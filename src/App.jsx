import React, { useEffect, useState } from "react";
import "./Participant.css"; // our CSS file

// Dummy data (for local dev / testing)
// const dummyResponse = {
//   studentList: [
//     {
//       _id: "68b0518a9797e9f7758c3d88",
//       studentId: "202355904",
//       fullName: "John Moises",
//       courseYear: "BSCOE 21M1",
//       house: "makakalikasan",
//       backendDate: "2025-08-28",
//       noAttend: 1,
//     },
//     {
//       _id: "68b05bcf13247b040d478f15",
//       studentId: "202412345",
//       fullName: "Maria Lopez",
//       courseYear: "BSIT 22A2",
//       house: "makabansa",
//       backendDate: "2025-08-28",
//       noAttend: 1,
//     },
//     {
//       _id: "68b05bea13247b040d478f16",
//       studentId: "202398765",
//       fullName: "Carlos Reyes",
//       courseYear: "BSCS 21B1",
//       house: "makatao",
//       backendDate: "2025-08-28",
//       noAttend: 1,
//     },
//     {
//       _id: "68b05bf313247b040d478f17",
//       studentId: "202376543",
//       fullName: "Angela Santos",
//       courseYear: "BSEE 23C1",
//       house: "makakalikasan",
//       backendDate: "2025-09-02",
//       noAttend: 1,
//     },
//     {
//       _id: "68b05bfe13247b040d478f18",
//       studentId: "202354321",
//       fullName: "Sophia Gonzales",
//       courseYear: "BSARCH 24D1",
//       house: "makatao",
//       backendDate: "2025-09-05",
//       noAttend: 1,
//     },
//   ],
// };

// const API_URL = import.meta.env.VITE_API_URL;

const url = 'https://new-esa-fest.vercel.app/api/';

export default function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 🔹 Using dummyResponse for now
    // setParticipants(dummyResponse.studentList);

    fetch(`${url}getstudents`)
      .then((res) => res.json())
      .then((data) => setParticipants(data.studentList || []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  

  // Filtering logic
  const filteredParticipants = participants.filter((p) => {
    const matchesHouse = selectedHouse === "All" || p.house === selectedHouse;
    const matchesYear = selectedYear === "All" || p.courseYear === selectedYear;
    const matchesSearch = p.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesHouse && matchesYear && matchesSearch;
  });

  // Unique dropdown values
  const uniqueHouses = ["All", ...new Set(participants.map((p) => p.house))];
  const uniqueYears = ["All", ...new Set(participants.map((p) => p.courseYear))];

  return (
    <div className="container">
      <h1 className="title">ESA FESTIVAL</h1>

      {/* Filters */}
      <div className="filters">
        <span className="filter-label">Filters</span>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedHouse}
          onChange={(e) => setSelectedHouse(e.target.value)}
        >
          {uniqueHouses.map((house, i) => (
            <option key={i} value={house}>
              {house}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {uniqueYears.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="list">
        {filteredParticipants.length > 0 ? (
          filteredParticipants.map((p) => (
            <div key={p._id} className="card">
              <h2>{p.fullName}</h2>
              <p>{p.courseYear}</p>
              <p>{p.house}</p>
              <p>
                Days Attended: <strong>{p.noAttend}</strong>
              </p>
              <small>Backend Date: {p.backendDate}</small>
            </div>
          ))
        ) : (
          <p className="empty">No participants found.</p>
        )}
      </div>
    </div>
  );
}
