import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Firebase/Context/useAuth/useAuth";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels2/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `Parcel status updated with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels2/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            showConfirmButton: false,
            timer: 2000,
            text: message,
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-2xl">Assigned Deliveries</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              return (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <>
                        {" "}
                        <button
                          onClick={() =>
                            handleStatusUpdate(parcel, "rider_arriving")
                          }
                          className="btn btn-primary mr-3 text-black"
                        >
                          Accept
                        </button>
                        <button className="btn btn-warning text-black">
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-green-500">Accepted</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-primary text-black"
                    >
                      {" "}
                      Mark as pick-up
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-primary ms-3 text-black"
                    >
                      {" "}
                      Mark as delivered
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
