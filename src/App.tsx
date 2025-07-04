import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

const App = () => {

  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App;