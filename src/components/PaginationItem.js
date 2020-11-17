import React from "react";
import { Pagination } from "react-bootstrap";
import "../App.css";

const PaginationItem = ({ pageNum, setPageNum, totalPageNum, loading }) => {
  const handleClick = (page) => {
    if (!loading) {
      setPageNum(parseInt(page));
    }
  };

  const handleClickOnFirst = (e) => {
    if (!loading) {
      setPageNum(1);
      e.preventDefault();
    }
  };

  const handleClickOnLast = (e) => {
    if (!loading) {
      setPageNum(totalPageNum);
      e.preventDefault();
    }
  };
  const handleClickOnNext = (e) => {
    if (pageNum < totalPageNum && !loading) {
      setPageNum((num) => num + 1);
      e.preventDefault();
    }
  };
  const handleClickOnPrev = (e) => {
    if (pageNum > 1 && !loading) {
      setPageNum((num) => num - 1);
      e.preventDefault();
    }
  };

  return (
    <Pagination
      className="justify-content-center pagination "
      disabled={loading}
    >
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item
        className="page-item active"
        active={pageNum === 1}
        onClick={() => handleClick(1)}
      >
        {1}
      </Pagination.Item>

      {pageNum - 1 > 1 && <Pagination.Ellipsis />}
      {pageNum > 1 && pageNum < totalPageNum && (
        <Pagination.Item active>{pageNum}</Pagination.Item>
      )}
      {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}

      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClick(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      )}

      <Pagination.Next
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnNext}
      />
      <Pagination.Last
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnLast}
      />
    </Pagination>
  );
};

export default PaginationItem;
