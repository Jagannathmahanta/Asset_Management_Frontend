import { Pagination } from "react-bootstrap";
import React from "react";
import "./PagePagination.css";

const PagePagination = ({ data, pageHandler, currentPage ,itemsPerPage}) => {
  let items = [];
  for (let page = 1; page <= Math.ceil(data?.length / itemsPerPage); page++) {
    items.push(
      <Pagination.Item
        key={page}
        onClick={() => pageHandler(page)}
        active={currentPage === page}
      >
        {page}
      </Pagination.Item>
    );
  }

 
 const PageNUmbers = currentPage>2? items.slice(currentPage-2,currentPage+1):items.slice(0,3)

  return (
    <div className="page-pagination">
      
      <Pagination>
      <Pagination.Prev
      key="prev"
      onClick={() => (currentPage > 1 ? pageHandler(currentPage - 1) : "")}
    />
    {(currentPage > 1) ?<Pagination.Ellipsis />:""}
        { PageNUmbers}
       {( currentPage < items.length)? <Pagination.Ellipsis />:""}
       <Pagination.Next
      key="next"
      onClick={() =>
        currentPage < items.length  ? pageHandler(currentPage + 1) : ""
      }
    />
        </Pagination>
    </div>
  );
};

export default PagePagination;
