import { ToastContainer, Toast } from 'react-bootstrap';

function IssueToast({ title, color = 'text-success', description }) {
  return (
    <ToastContainer
      className='position-fixed'
      position='top-end'
      style={{ zIndex: '999' }}
    >
      <Toast delay={3000} autohide>
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
          <strong className={`me-auto ${color}`}>{title}</strong>
          <small>A second ago</small>
        </Toast.Header>
        <Toast.Body>{description}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default IssueToast;
