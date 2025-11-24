import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../Firebase/Context/useAuth/useAuth";

const SendPercel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const serviceCenter = useLoaderData();
  const regionsDeulicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDeulicate)];

  // explore useMemo useFallback
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const handleSendSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minimumCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minimumCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database

        axiosSecure.post("/parcels2", data).then((res) => {
          console.log("after saving data", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/myParcel");

            Swal.fire({
              position: "top-center",
              showConfirmButton: false,
              timer: 2500,
              text: "Parcel has created, Please pay",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Send a parcel</h2>
      <form className="mt-12 p-4" onSubmit={handleSubmit(handleSendSubmit)}>
        {/* Parcel type */}
        <div className="flex gap-5 items-center">
          <label>
            <input
              type="radio"
              name="radio-4"
              {...register("parcelType")}
              value={"document"}
              className="radio radio-secondary mr-2"
              defaultChecked
            />
            Document
          </label>
          <label>
            <input
              type="radio"
              name="radio-4"
              {...register("parcelType")}
              value={"non-document"}
              className="radio radio-secondary mr-2"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8 ">
          <fieldset className="fieldset">
            <label className="label font-semibold text-[14px]">
              Parcel Name
            </label>
            <input
              {...register("parcelName")}
              type="text"
              className="input outline-none w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label font-semibold text-[14px]">
              Parcel Weight (KG)
            </label>
            <input
              {...register("parcelWeight")}
              type="number"
              className="input outline-none  w-full"
              placeholder="Parcel Weight(KG)"
            />
          </fieldset>
        </div>
        {/* Two column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Info */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-bold mb-8">Sender Details</h4>
            {/* Sender Name */}
            <label className="label font-semibold text-[14px]">
              Sender Name
            </label>
            <input
              {...register("senderName")}
              type="text"
              defaultValue={user?.displayName}
              className="input outline-none w-full"
              placeholder="Sender Name"
            />
            {/* sender Email */}
            <label className="label font-semibold text-[14px]">
              Sender Email
            </label>
            <input
              {...register("senderEmail")}
              defaultValue={user?.email}
              value={user?.email}
              readOnly
              type="text"
              className="input outline-none w-full"
              placeholder="Sender Email"
            />

            {/* Sender region */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>
            {/* Sender district */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(senderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Address */}
            <label className="label font-semibold text-[14px] mt-4">
              Sender Address
            </label>
            <input
              {...register("senderAddress")}
              type="text"
              className="input outline-none w-full"
              placeholder="Sender Address"
            />

            {/* textarea */}
            <legend className="fieldset-legend">Pickup Instruction</legend>
            <textarea
              {...register("senderTextarea")}
              className="textarea h-24 outline-none w-full"
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-bold mb-8">Receiver Details</h4>
            {/* Receiver Name */}
            <label className="label font-semibold text-[14px]">
              Receiver Name
            </label>
            <input
              {...register("receiverName")}
              type="text"
              className="input outline-none w-full"
              placeholder="Receiver Name"
            />
            {/* Receiver Email */}
            <label className="label font-semibold text-[14px]">
              Receiver Email
            </label>
            <input
              {...register("receiverEmail")}
              type="text"
              className="input outline-none w-full"
              placeholder="Receiver Email"
            />

            {/* Receiver region */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Receiver district */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Address */}
            <label className="label font-semibold text-[14px] mt-4">
              Receiver Address
            </label>
            <input
              {...register("receiverAddress")}
              type="text"
              className="input outline-none w-full"
              placeholder="Receiver Address"
            />

            {/* textarea */}
            <legend className="fieldset-legend">Pickup Instruction</legend>
            <textarea
              {...register("receiverTextarea")}
              className="textarea h-24 outline-none w-full"
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>
        </div>
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendPercel;
