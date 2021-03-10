import React from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import styled from '../../theme-styled'
import { pdfjs, Document, Page } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export interface PdfViewerWindowProps {
  title: string
  url: string
  open: boolean
  close: () => void
}

const DocumentWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.base};
  text-align: center;
  overflow: hidden;
  padding: 25px;
`

const PageWrapper = styled.div`
  .page-item {
    canvas {
      margin: 0 auto;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
      width: 100% !important;
      height: auto !important;
    }
  }
`

const PdfViewerWindow = (props: PdfViewerWindowProps) => {
  const modalHeight = document.body.offsetHeight - 200

  return (
    <Modal size="large" open={props.open} onClose={props.close} closeIcon>
      <Header content={props.title} />
      <DocumentWrapper>
        <Document file={props.url}>
          <PageWrapper>
            <Page
              className="page-item"
              height={modalHeight - 50}
              pageNumber={1}
            />
          </PageWrapper>
        </Document>
      </DocumentWrapper>
      <Modal.Actions>
        <Button primary as="a" compact size="small" href={props.url}>
          <Icon as="i" name="download" />
          Download
        </Button>
        <Button size="small" onClick={props.close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PdfViewerWindow
