import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";

const SendParcel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleFormSubmit = (data) => {
    const parcel = {
      parcelType: data.parcelType,
      parcelName: data.parcelName,
      parcelWeight: data.parcelWeight,
      sellerName: data.sellerName,
      sellerArea: data.sellerArea,
      sellerAddress: data.sellerAddress,
      sellerContact: data.sellerContact,
      sellerRegion: data.sellerRegion,
      receiverName: data.receiverName,
      receiverArea: data.receiverArea,
      receiverAddress: data.receiverAddress,
      receiverContact: data.receiverContact,
      receiverRegion: data.receiverRegion,
    };

    axiosSecure.post("/parcels2", parcel).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold my-8">Send Parcel</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h4 className="my-5 text-2xl font-semibold">
          Enter your parcel details
        </h4>
        {/* checkbox */}
        <div className="flex gap-[100px] items-center">
          <label>
            <input
              {...register("parcelType")}
              type="radio"
              value={"document"}
              className="radio mr-2"
              defaultChecked
            />
            Document
          </label>
          <label>
            <input
              {...register("parcelType")}
              type="radio"
              value={"Non-document"}
              className="radio mr-2"
            />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className=" flex gap-5 my-5 items-center w-full">
          <div className="flex-col w-full">
            <label className="label mb-1 font-semibold">Parcel Name</label>
            <input
              {...register("parcelName")}
              type="text"
              className="input outline-none w-full"
              placeholder="Parcel Name"
            />
          </div>
          <div className="flex-col w-full">
            <label className="label mb-1 font-semibold">
              Parcel Weight (KG)
            </label>
            <input
              {...register("parcelWeight")}
              type="text"
              className="input outline-none w-full"
              placeholder="Parcel Weight (KG)"
            />
          </div>
        </div>

        <div className="flex  gap-5 items-center">
          {/* Sender Details */}
          <div className="space-y-4">
            <h2 className="text-lg my-5 font-semibold">Sender Details</h2>

            <div className="flex gap-5">
              {/* Seller Name */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">Seller Name</label>
                <input
                  {...register("sellerName")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Seller Name"
                />
              </div>
              {/* Seller Area */}
              <div className=" flex flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Sender Pickup Wire house
                </label>
                <select
                  {...register("sellerArea")}
                  defaultValue="Pick a color"
                  className="select outline-none w-full "
                >
                  <option disabled={true}>Select Wire house</option>
                  <option>Dhaka</option>
                  <option>Rajshahi</option>
                  <option>Bangladesh</option>
                </select>
              </div>
            </div>

            <div className="flex gap-5">
              {/* Seller Address */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Seller Address
                </label>
                <input
                  {...register("sellerAddress")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Seller Address"
                />
              </div>
              {/* Sender Contact No */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Sender Contact No
                </label>
                <input
                  {...register("sellerContact")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Seller Contact"
                />
              </div>
            </div>

            {/* Seller Region */}
            <div className=" flex flex-col w-full">
              <label className="label mb-1 font-semibold">Your Region</label>
              <select
                {...register("sellerRegion")}
                defaultValue="Pick a color"
                className="select outline-none w-full "
              >
                <option disabled={true}>Select your region</option>
                <option>China</option>
                <option>America</option>
                <option>Bangladesh</option>
                <option>South Africa</option>
              </select>
            </div>
          </div>
          {/* Receiver Details */}
          <div className="space-y-4">
            <h2 className="text-lg my-5 font-semibold">Receiver Details</h2>

            <div className="flex gap-5">
              {/* Seller Name */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Receiver Name"
                />
              </div>
              {/* Receiver Area */}
              <div className=" flex flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Receiver Pickup Wire house
                </label>
                <select
                  {...register("receiverArea")}
                  defaultValue="Pick a color"
                  className="select outline-none w-full "
                >
                  <option disabled={true}>Select Wire house</option>
                  <option>Dhaka</option>
                  <option>Rajshahi</option>
                  <option>Bangladesh</option>
                </select>
              </div>
            </div>

            <div className="flex gap-5">
              {/* Receiver Address */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Receiver Address
                </label>
                <input
                  {...register("receiverAddress")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Receiver Address"
                />
              </div>
              {/* Receiver Contact No */}
              <div className="flex-col w-full">
                <label className="label mb-1 font-semibold">
                  Receiver Contact No
                </label>
                <input
                  {...register("receiverContact")}
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Receiver Contact"
                />
              </div>
            </div>

            {/* Seller Region */}
            <div className=" flex flex-col w-full">
              <label className="label mb-1 font-semibold">Your Region</label>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a color"
                className="select outline-none w-full "
              >
                <option disabled={true}>Select your region</option>
                <option>China</option>
                <option>America</option>
                <option>Bangladesh</option>
                <option>South Africa</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-primary my-5  text-black">
          Proceed to confirm booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
