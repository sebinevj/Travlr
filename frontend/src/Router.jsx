import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './view/Login';
import App from './App';
import RegionPage from "./view/RegionPage";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/home" element={<App />} />
        <Route path="/regions/:name" element={<RegionPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
