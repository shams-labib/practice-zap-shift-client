import React from "react";
import useAuth from "../../Firebase/Context/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "delivery_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels2/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Completed Deliveries {parcels.length}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Pickup District</th>
                <th>Cost</th>
                <th>Payout</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.createdAt}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.cost}</td>
                  <td>{calculatePayout(parcel)}</td>
                  <td>
                    <button className="btn btn-primary text-black">
                      CashOut
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </h1>
    </div>
  );
};

export default CompletedDeliveries;
