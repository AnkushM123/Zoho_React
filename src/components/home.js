import Layout from "./layout"
import { useState, useEffect } from "react"
import homeService from '../core/services/home-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { configureToastOptions } from "../core/services/toast-service";

function Home() {
    const [employees, setEmployees] = useState([]);
    const jwtToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await homeService(jwtToken);
                setEmployees(result.data);
            } catch (error) {
                const toastOptions = configureToastOptions();
                toast.options = toastOptions;
                toast.error(error);
            }
        };
        fetchData();
    }, [jwtToken]);

    return (
        <div >
            <Layout></Layout>
            <div class="col-md-11 mb-11" style={{ marginLeft: "40px", marginTop: "40px" }}>
                <div class="card example-1 scrollbar-ripe-malinka" style={{ height: "300px" }}>
                    <div class="card-body">
                        <h4 id="section1"><strong> Team Overview:</strong></h4>
                        <br></br>
                        {
                            employees.map((employee, index) =>
                                <p style={{ color: "darkcyan" }}>{index + 1}.<img src={process.env.REACT_APP_DOMAIN_URL + `/${employee.avatar}`} alt="Employee" height="30px" width="30px" style={{ borderRadius: "50%" }} /> {employee.name}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home