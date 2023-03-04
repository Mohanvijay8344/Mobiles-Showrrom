import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      {/* <Phone /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles/all"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? (
    <section>
      <h1>This is a Protected Route 🛡️🛡️</h1>
      {children}
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}

function checkAuth(res) {
  if(res.status === 400){
    throw Error("unauthorized")
  }else{
    return res.json()
  }
}
function logout() {
  localStorage.clear();
  window.location.href = "/";
}

function PhoneList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/mobiles/all",{
      headers: { 'x-auth-token': localStorage.getItem("token")},
    })
      .then((res) => checkAuth(res))
      .then((data) => setData(data))
      .catch((err) => logout())
  }, []);

  return (
    <div className="phone-list-container">
      {data.map((mob, index) => (
        <Phone mobile={mob} key={index} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  // const mobile = {
  //   model: "OnePlus 9 5G",
  //   img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //   company: "Oneplus",
  // };
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model} />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}

export default App;
