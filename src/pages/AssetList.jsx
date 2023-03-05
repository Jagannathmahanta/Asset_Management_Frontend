import React from "react";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getAssetListRequiest} from "../redux/actions/getAssetlistAction"

import { getAssetTypeRequiest } from "../redux/actions/getModelAction";
import PagePagination from "../componets/PagePagination";

const AssetList= ()=>{

  const [locationId, setLocationId] = useState('')
  const [assettype, setAssettype] = useState('')
  const [owner, setOwner] = useState('')
  const [model_Name, setModel_Name] = useState('')
  

  

const assetname =useSelector((state)=>state.GetModelDetails?.modelDetails?.Data)
console.log("AssetName",assetname)
const locationList = useSelector((state) => state.GetLocationDetails?.locationDetails?.Data)
console.log("Location",locationList)

const dispatch = useDispatch();
const assetList=useSelector((state)=>state.GetAssetListData?.assetListData?.Data)

const [data,setData]=useState(assetList)

useEffect(()=>{
  dispatch(getAssetListRequiest())
  
},[])
useEffect(()=>{
  setData(assetList)
  console.log("Tanmaya",assetList)
},[assetList])


console.log("AssetList",assetList)

const assetType = useSelector((state) => state.getAssetType?.assetDetails?.Data)
console.log("ASSET TYPE",assetType)

const modelName=useSelector((state)=>state.GetModelListData?.modelListData?.Data)
console.log("Model Name",modelName)

const assetOwner=useSelector((state)=>state.GetAssetOwner?.assetOwner?.Data)
console.log("ASSET OWNER",assetOwner)


console.log("ASSET DATA ON STATE",data)
  
const [order,setOrder]=useState("ASC")
  const sorting=(col)=>{
    if(order === "ASC"){
      const sorted = [...data].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1
      
      );
      setData(sorted);
      setOrder("DSC")
    }

    if(order === "DSC"){
      const sorted = [...data].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1: -1
      
      );
      setData(sorted);
      setOrder("ASC")
    }

  }

useEffect(()=>{
   
    
    dispatch(getAssetTypeRequiest())
    // dispatch(getModelRequiest())
    // dispatch(getAssetOwnerRequiest())
},[])

const handleLocation = (event) => {
  const Id = event.target.value;
  console.log("Location", Id)
  setLocationId(Id)
}

const handleOwner = (event) => {
  const owner = event.target.value;
  console.log("Location", owner)
  setOwner(owner)
}

const handleAssetType = (event) => {
  const type = event.target.value;
  console.log("Location", type)
  setAssettype(type)
}

const handleModel = (event) => {
  const model = event.target.value;
  console.log("Location", model)
  setModel_Name(model)
}

const [perPage, setPerPage] = useState(data?.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);

  console.log("userList", perPage);

  const pageHandler = (pageNumber) => {
    console.log(pageNumber);
    setPerPage(data?.slice(pageNumber * 10 - 10, pageNumber * 10));
    setCurrentPage(pageNumber);
  };


    return(
    <>

    
    <p className="h3">Asset list</p>
        <hr />
        
        <table className="table table-striped table-hover">
            <thead className="bg-secondary text-white" data-sortable="true" data-sorter="alphanum">
                <tr>
                   
                    <th>Model Name <i  onClick={()=>sorting("modelName")} className="fa fa-sort" aria-hidden="true"></i>
                    {/* <select className="Select mx-1" onChange={handleModel}>
                    <option value="">All</option>

                      {
                        modelName?.map((model)=>(
                          <option key={model.id} value={model.modelName}>{model.modelName}</option>
                        ))
                      }
                    </select> */}

                    </th>
                    <th>Asset Type <i  onClick={()=>sorting("assetType")} className="fa fa-sort" aria-hidden="true"></i>
                    {/* <select className="Select mx-1" onChange={handleAssetType}>
                      <option value="">All</option>
                      {
                        assetType?.map((asset)=>(
                          <option key={asset.id} value={asset.assetType}>{asset.assetType}</option>
                        ))
                      }
                    </select> */}
                    </th>
                    <th>Asset Owner <i onClick={()=>sorting("assetOwner")} className="fa fa-sort" aria-hidden="true"></i>
                    {/* <select className="Select mx-1 " onChange={handleOwner}>
                      <option value="" className="">All</option>
                      {
                        assetOwner?.map((owner)=>(
                          <option key={owner.id} value={owner.assetOwner}>{owner.assetOwner}</option>
                        ))
                      }
                    </select> */}
                    </th>
                    <th>Vendor  <i onClick={()=>sorting("vendorName")} className="fa fa-sort" aria-hidden="true"></i>
                    </th>
                    <th>Serial No. <i  onClick={()=>sorting("serialNumber")} className="fa fa-sort" aria-hidden="true"></i>
                      </th>
                    <th>Received date</th>
                    <th>Returned date</th>
                    <th>Configuration</th>

                    <th >Location <i onClick={()=>sorting("location")} className="fa fa-sort" aria-hidden="true"></i>
                    {/* <select className="Select  mx-1" onChange={handleLocation}>
                      <option value="" >All</option>
                      {
                        locationList?.map((loc)=>{
                          return(
                            <option key={loc.id} value={loc.location} className="gap-3">{loc.location}</option>
                          )
                        })
                      }
                    </select> */}
                    </th>

                </tr>
            </thead>
            <tbody>
              
                { data?.length >0 &&
                  data?.filter((item) => (
                  (locationId === "" ? item : item.location == locationId)  &&
                  (assettype==="" ? item: item.asset_type == assettype) &&
                  (model_Name==="" ? item: item.model_name == model_Name) &&
                  (owner ==="" ? item: item.asset_owner == owner)

                  )).map((asset)=>{
                    
                    return(
                    <tr key={asset.id}>

                        <td>{asset.modelName}</td>
                        <td>{asset.assetType}</td>
                        <td>{asset.assetOwner}</td>
                        <td>{asset.vendorName}</td>
                        <td>{asset.serialNumber}</td>
                        <td>{asset.receivedDate?asset.receivedDate:"NA"}</td>
                        <td>{asset.returnedDate?asset.returnedDate:"NA"}</td>
                        <td>{asset.configuration}</td>
                        <td>{asset.location}</td>
                    </tr>
                    )
                  })
                
                }
            </tbody>
        </table>
     
        <PagePagination
        data={data}
        pageHandler={pageHandler}
        currentPage={currentPage}
        itemsPerPage={10} />
    </>
    );
}

export default AssetList;