import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "./Sample.less";
import samplePDF from "./SPW_Magazine_1.pdf";
import "../App.css";
import { Col, Container, Row } from "react-bootstrap";

export default function Magazines() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage(e) {
    changePage(-1);
    e.preventDefault();
  }

  function nextPage(e) {
    changePage(1);
    e.preventDefault();
  }

  return (
    <Container>
      <Row>
        <Col md={3} className="MagazineSection">
          <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
