import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import "../css/issueviewpage.css";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const IssueViewPage = () => {
    let params = useParams();
    const [numPages, setNumPages] = useState(0);

    function onDocumentLoadSuccess(docload:{numPages:number}) {
        setNumPages(docload.numPages);
        console.log(params);
    }

    return (
        <div className="viewer">
        <header>
        <Link className = 'back' to='/'>BACK</Link> <h1>ISSUE {params.issue_num}</h1>
        </header>
        <div className="doc-container">
            <div className = "doc">
                <Document file={"/issues/"+params.issue_num+"-compressed.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        </div>
        </div>
        );
}
export default IssueViewPage;