import { Form } from 'react-bootstrap';

// Context
import { useIssueContext } from 'context/issueContext';

function IssueOrderBy() {
  const { orderBy, setOrderBy } = useIssueContext();

  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <div className='row mb-5'>
      <h4 className='col-2 fw-light fs-5 min-w-heading'>Order By:</h4>
      <div className='col-3'>
        <Form.Select
          className='min-w-orderBy'
          value={orderBy}
          onChange={handleOrderBy}
        >
          <option value=''>Choose an option below</option>
          <option value='asc'>ASC</option>
          <option value='desc'>DESC</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default IssueOrderBy;
