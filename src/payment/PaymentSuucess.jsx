import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../Hooks/AxiosSecure/useAxiosSecure";

const PaymentSuucess = () => {
  const [SearchParams] = useSearchParams();
  const sessionId = SearchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId)
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
  }, [axiosSecure, sessionId]);

  return (
    <div>
      <h1>Payment success </h1>
      <h1>transactionId: {paymentInfo.transactionId}</h1>
      <h1>trackingId: {paymentInfo.trackingId}</h1>
    </div>
  );
};

export default PaymentSuucess;
