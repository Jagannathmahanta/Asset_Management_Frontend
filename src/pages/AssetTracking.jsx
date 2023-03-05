import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { assetTrackingRequest } from "../redux/actions/assetTrackingAction";

let AssetTracking = () => {
  const dispatch = useDispatch();

  const [serialNumber, setserialNumber] = useState("");

  const [radioCheckState, setRadioCheckState] = useState("");


  const handleSerial = (e) => {
    const serialNumber = e.target.value;
    setserialNumber(serialNumber);
  };

  const [serialNo, setserialNo] = useState(true);
  const handleSerialNumber = (e) => {
    setserialNo(true);
    dispatch(assetTrackingRequest(serialNumber));
  };


  const assetTracking = useSelector(
    (state) => state.SetAssetTrackingDetails?.assetTracking
  );

  return (
    <>
      <h3>Asset Tracking</h3>
      <hr />
      <div className="container-fluid">
        <div className="row m-auto">
          <div className="col">
            <div className="row">
              <div className="col-md-4 m-auto">
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 m-auto">
                <div class="input-group">
                  <input
                    type="search"
                    name="search"
                    class="form-control rounded"
                    placeholder="Search by Device name or Serial No"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={handleSerial}
                  />
                  &nbsp;
                  <button
                    type="button"
                    name="search"
                    value="searchfield"
                    class="btn btn-outline-primary"
                    onClick={handleSerialNumber}
                  >
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {assetTracking?.Data?.length > 0 ? (
        <div className="mt-3">
          <div className="row text-center">
            <div className="col-md-8 m-auto">
              <div className="card">
                <div className="card-body cbody">
                  {assetTracking?.Data[0].serialNumber ? (
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Serial Number :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.serialNumber}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-3 text-end">
                      Configuration :
                    </label>

                    <div className="col-sm-4  mt-4">
                      {assetTracking?.Data?.length > 0 &&
                        assetTracking?.Data?.map((asset) => {
                          return (
                            <div key={asset.id}>
                              <div>{asset.configuration}</div>
                            </div>
                          );
                        })}
                    </div>

                    {assetTracking?.Data[0].deviceName ? (
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label mt-3 text-end">
                          Device Name :
                        </label>

                        <div className="col-sm-4  mt-4">
                          {assetTracking?.Data?.length > 0 &&
                            assetTracking?.Data?.map((asset) => {
                              return (
                                <div key={asset.id}>
                                  <div>{asset.deviceName}</div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {assetTracking?.Data[0].availableStatus === false && (
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label mt-3 text-end">
                          User Name :
                        </label>

                        <div className="col-sm-4  mt-4">
                          {assetTracking?.Data?.length > 0 &&
                            assetTracking?.Data?.map((asset) => {
                              return (
                                <div key={asset.id}>
                                  <div>{asset.username}</div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Asset-Type :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.assetType}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Manufacturer Name :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.manufacturerName}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Model Name :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.modelName}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Version :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.version}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Asset Ownership :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.assetOwner}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Vendor :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.vendorName}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Location :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.location}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Asset Available Status :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>
                                  {asset.availableStatus === true
                                    ? "Asset is Available"
                                    : "Asset is Not Available"}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>


                    {assetTracking?.Data[0].availableStatus === false && (     
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-3 text-end">
                        Asset Assigned date :
                      </label>

                      <div className="col-sm-4  mt-4">
                        {assetTracking?.Data?.length > 0 &&
                          assetTracking?.Data?.map((asset) => {
                            return (
                              <div key={asset.id}>
                                <div>{asset.assetAssignedDate}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : 
      (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card">
                <div className="card-body cbody">
                  <p className="text-center">{assetTracking?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default AssetTracking;
