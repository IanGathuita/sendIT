import Header from "./Components/Header/Header";
import LandingPage from "./Components/LandingPage/LandingPage";
import About from "./Components/About/About";
import Parcels from "./Components/Parcels/Parcels";
import Send from "./Components/Send/Send";
import Login from "./Components/LogIn/Login";
import SignUp from "./Components/SignUp/Signup";
import Footer from "./Components/Footer/Footer";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import TrackProgress from "./Components/TrackProgress/TrackProgress";
import NotFound from "./Components/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from "./Redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About></About>} />
          <Route path="/parcels" element={<Parcels></Parcels>} />
          <Route path="/send" element={<Send></Send>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/Signup" element={<SignUp></SignUp>} />
          <Route path="/trackprogress" element={<TrackProgress></TrackProgress>} />
          <Route path="/ForgotPassword" element={<ForgotPassword></ForgotPassword>} />
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;