import React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDeviceOwnershipRequest } from "../redux/actions/getDeviceOwnershipAction";

const DeviceOwnership = () => {
  const dispatch = useDispatch();

  const AllStoreData = (state) => state;

  const DeviceOwnershiped = useSelector(
    (state) => state.GetDeviceOwnershipDetails?.getDeviceOwnershipDetails?.Data
  );

  useEffect(() => {
    dispatch(getDeviceOwnershipRequest());
  }, []);

  return (
    <>
      <p className="h3">Device Ownership</p>
      <hr />
      <table className="table table-striped table-hover">
        <thead className="bg-secondary text-white">
          <tr>
            <th>Location</th>
            <th>Own Laptop</th>
            <th>Rental Laptop</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {DeviceOwnershiped?.length > 0 &&
            DeviceOwnershiped?.map((Model) => {
              return (
                <tr>
                  <td>{Model.Location}</td>
                  <td>{Model.OwnedCount}</td>
                  <td>{Model.RentalCount}</td>
                  <td>{Model.TotalCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default DeviceOwnership;
