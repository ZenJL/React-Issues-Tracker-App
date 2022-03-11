import { Button } from 'react-bootstrap';

//// Context
import { useIssueContext } from 'context/issueContext';

function IssueFilter() {
  const { setFilterBy } = useIssueContext();

  const handleChangeStatus = (status) => () => {
    setFilterBy(status);
  };

  return (
    <div className='row mb-5'>
      <h4 className='col-2 fs-5 mb-0 min-w-heading'>Filter:</h4>
      <div className='col-10'>
        <Button
          className='me-2 btn-sm'
          variant='primary'
          onClick={handleChangeStatus('all')}
        >
          All
        </Button>
        <Button
          className='me-2 btn-sm'
          variant='success'
          onClick={handleChangeStatus('open')}
        >
          Open
        </Button>
        <Button
          className='me-2 btn-sm text-white'
          variant='info'
          onClick={handleChangeStatus('close')}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default IssueFilter;
