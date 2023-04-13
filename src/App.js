import "./App.css";
import Complain from "./components/complain/Complain";
import Track from "./components/track/Track";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Committee from "./components/committee/Committee";
import Municipal from "./components/municipal/Municipal";
import Industry from "./components/industry/Industry";
import MunicipalDashboard from "./components/municipal/MunicipalDashboard";
import CommitteelDashboard from "./components/committee/CommitteeDashboard";
import IndustryDashboard from "./components/industry/IndustryDashboard";
import IndustryLogin from "./components/industry/IndustryLogin";
import { useState } from "react";
import Counter from "./components/counter/Counter";
function App() {
  const [language, setlanguage] = useState("English");
  const changeLanguage = () => {
    if (language === "English") {
      setlanguage("odiya");
    } else {
      setlanguage("English");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Complain changeLanguage={changeLanguage} language={language} />
          }
        />
        <Route
          path="/committee"
          element={
            <Committee changeLanguage={changeLanguage} language={language} />
          }
        />
        <Route
          path="/municipal"
          element={
            <Municipal changeLanguage={changeLanguage} language={language} />
          }
        />
        <Route
          path="/track"
          element={
            <Track changeLanguage={changeLanguage} language={language} />
          }
        />
        <Route
          path="/industry"
          element={
            <Industry changeLanguage={changeLanguage} language={language} />
          }
        />
        <Route
          path="/municipalDashboard"
          element={
            <MunicipalDashboard
              changeLanguage={changeLanguage}
              language={language}
            />
          }
        />
        <Route
          path="/committeeDashboard"
          element={
            <CommitteelDashboard
              changeLanguage={changeLanguage}
              language={language}
            />
          }
        />
        <Route
          path="/indDash"
          element={
            <IndustryDashboard
              changeLanguage={changeLanguage}
              language={language}
            />
          }
        />
        <Route
          path="/industryLogin"
          element={
            <IndustryLogin
              changeLanguage={changeLanguage}
              language={language}
            />
          }
        />
        <Route path="/ct" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
