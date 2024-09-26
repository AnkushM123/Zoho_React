import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import VarifyEmail from "./components/varifyEmail";
import SetPassword from "./components/setPassword";
import Home from "./components/home";
import Profile from "./components/profile";
import Edit from "./components/edit";
import Layout from "./components/layout";
import Register from "./components/register";
import LeaveTracker from "./components/leaveTracker";
import ApplyLeave from "./components/applyLeave";
import Request from "./components/request";

function App() {
    return (
        <>
            <ToastContainer></ToastContainer>
            <Router>
                <Routes>
                <Route
                        index
                        element={<Login />}
                    />
                    <Route
                        exact
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        exact
                        path="/varifyEmail"
                        element={<VarifyEmail />}
                    />
                    <Route
                        exact
                        path="/setPassword"
                        element={<SetPassword />}
                    />
                    <Route element={<Layout/>}>
                    <Route
                        index
                        path="/home"
                        element={<Home />}
                    />
                    <Route
                        exact
                        path="/profile"
                        element={<Profile />}
                    />
                    <Route
                        exact
                        path="/edit"
                        element={<Edit />}
                    />
                    <Route
                        exact
                        path="/register"
                        element={<Register />}
                    />
                    <Route
                        exact
                        path="/leaveTracker"
                        element={<LeaveTracker />}
                    />
                    <Route
                        exact
                        path="/applyLeave"
                        element={<ApplyLeave />}
                    />
                    <Route
                        exact
                        path="/request"
                        element={<Request />}
                    />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;