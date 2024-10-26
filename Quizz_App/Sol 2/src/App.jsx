import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Quiz from "./pages/Quizz/Quiz.jsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/started" element={<Quiz />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
