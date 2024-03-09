import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureToastOptions } from "../core/services/toast-service";
import requestService from "../core/services/request-service";
import { useParams } from 'react-router-dom';
import leaveTypeService from '../core/services/leaveType-service';

function LeaveDetails() {
    const navigate = useNavigate();
    const { requestId } = useParams();
    const [request, setRequest] = useState({});
    const [leaveType, setLeaveType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await requestService.getByRequestId(requestId);
                setRequest(result.data[0]);
                const leaveTypeResult = await leaveTypeService(result.data[0].leaveId);
                setLeaveType(leaveTypeResult.data[0].leaveName);
            } catch (error) {
                const toastOptions = configureToastOptions();
                toast.options = toastOptions;
                toast.error(error);
            }
        }
        fetchData();
    }, [requestId]);

    const convertToDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    const backToLeaveTracker = () => {
        navigate('/leaveTracker');
    }

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'Approved';
            case 2:
                return 'Rejected';
            case 3:
                return 'Added';
            default:
                return '';
        }
    };

    return (<>
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div className="row">
                                <div className="col-sm-3 mb-2">
                                    <p className="form-label font-weight-bold">From-To:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p class="text-muted mb-0">{convertToDate(request.startDate)} - {convertToDate(request.endDate)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3 mb-2">
                                    <p className="form-label font-weight-bold">Total Days:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p class="text-muted mb-0">{request.totalDays}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3 mb-2">
                                    <p className="form-label font-weight-bold">Leave Type:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p class="text-muted mb-0">{leaveType}</p>
                                </div>
                            </div>
                            {request.reasonForLeave !== 'undefined' && (
                                <div class="row">
                                    <div class="col-sm-3 mb-2">
                                        <p class="form-label font-weight-bold">Reason For Leave:</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{request.reasonForLeave}</p>
                                    </div>
                                </div>
                            )}
                            {request.status !== 'undefined' && (
                                <div class="row">
                                    <div class="col-sm-3 mb-2">
                                        <p class="form-label font-weight-bold">Status:</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{getStatus(request.status)}</p>
                                    </div>
                                </div>
                            )}
                            {request.comment !== 'undefined' && (
                                <div className="row">
                                    <div className="col-sm-3 mb-2">
                                        <p className="form-label font-weight-bold">Comment:</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{request.comment}</p>
                                    </div>
                                </div>
                            )}
                            <button class="btn btn-dark" onClick={backToLeaveTracker}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default LeaveDetails;