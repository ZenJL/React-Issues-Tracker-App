import { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
// context
import { useIssueContext } from 'context/issueContext';

function IssueSearch() {
  const { setTextSearch } = useIssueContext();

  const [inputSearch, setInputSearch] = useState('');

  const debounceRef = useRef(null);

  const handleSearch = (e) => {
    const { value } = e.target;

    setInputSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setTextSearch(value);
    }, 700);
  };

  return (
    <div className='d-flex justify-content-between align-items-center mb-5'>
      <h3 className='w-100 mb-0 min-w-heading'>List Todo</h3>
      <Form.Control
        className='w-25 min-w-search'
        type='text'
        value={inputSearch}
        placeholder='Search by description...'
        onChange={handleSearch}
      />
    </div>
  );
}

export default IssueSearch;
