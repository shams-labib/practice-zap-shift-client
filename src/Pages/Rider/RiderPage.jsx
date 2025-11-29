import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../Firebase/Context/useAuth/useAuth";

const Rider = () => {
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

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          showConfirmButton: false,
          timer: 2500,
          text: "Your application has been submitted, Please Wat for response",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-black font-semibold">Be a rider</h1>
      <form
        className="mt-12 p-4"
        onSubmit={handleSubmit(handleRiderApplication)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* rider Info */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-bold mb-8">Rider Details</h4>
            {/* Rider Name */}
            <label className="label font-semibold text-[14px]">
              Rider Name
            </label>
            <input
              {...register("name")}
              type="text"
              defaultValue={user?.displayName}
              className="input outline-none w-full"
              placeholder="Rider Name"
            />
            {/* rider Email */}
            <label className="label font-semibold text-[14px]">
              Rider Email
            </label>
            <input
              {...register("email")}
              defaultValue={user?.email}
              type="text"
              className="input outline-none w-full"
              placeholder="Rider Email"
            />

            {/* rider region */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("region")}
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
            </fieldset>
            {/* rider district */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(riderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Address */}
            <label className="label font-semibold text-[14px] mt-4">
              Your Address
            </label>
            <input
              {...register("address")}
              type="text"
              className="input outline-none w-full"
              placeholder="rider Address"
            />
          </fieldset>

          {/* More Details */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-bold mb-8">More Details</h4>
            {/*  Driving License */}
            <label className="label font-semibold text-[14px]">
              Driving License
            </label>
            <input
              {...register("license")}
              type="text"
              className="input outline-none w-full"
              placeholder="Driving License"
            />
            {/* NID */}
            <label className="label font-semibold text-[14px]">NID</label>
            <input
              {...register("nid")}
              type="text"
              className="input outline-none w-full"
              placeholder="NID Number"
            />

            {/* Address */}
            <label className="label font-semibold text-[14px] mt-4">
              Bike Information
            </label>
            <input
              {...register("bike")}
              type="text"
              className="input outline-none w-full"
              placeholder="Bike Information"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Apply As A Rider"
          className="btn btn-primary text-black"
        />
      </form>
      ;
    </div>
  );
};

export default Rider;
