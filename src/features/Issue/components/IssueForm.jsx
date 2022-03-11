import { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

//// Context
import { useIssueContext } from 'context/issueContext';

//// Components
import TextInput from 'components/TextInput';
import SelectField from 'components/SelectInput';
import IssueToast from './IssueToast';

const severityOptions = [
  {
    id: 1,
    label: 'Low',
    value: 'low',
  },
  {
    id: 2,
    label: 'Medium',
    value: 'medium',
  },
  {
    id: 3,
    label: 'High',
    value: 'high',
  },
];

function IssueForm() {
  const { addIssue, successAdding } = useIssueContext();

  const [isError, setIsError] = useState(false);

  const defaultForm = {
    id: uuidv4(),
    description: '',
    severity: 'low',
    status: 'new',
  };

  const [form, setForm] = useState({
    id: uuidv4(),
    description: '',
    severity: 'low',
    status: 'new',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.description === '') {
      setIsError(true);
      return;
    }

    // Adding new issue
    addIssue(form);

    setForm(defaultForm);
  };

  return (
    <>
      {successAdding && (
        <IssueToast
          title={'ADD SUCCESS!!'}
          description={'Issue added successfully.'}
        />
      )}

      <Form className='pb-4 border-bottom mb-4' onSubmit={handleSubmit}>
        <h1 className='text-center mb-3 py-2 fw-bold fs-1'>Issues Tracker</h1>

        <TextInput
          label={'Description'}
          placeholder='Describe the issue...'
          isError={form.description === '' && isError}
          ErrorMessage='Description field can not be empty'
          value={form.description}
          onChange={(e) =>
            setForm((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />

        <SelectField
          label='Severity'
          value={form.severity}
          options={severityOptions}
          renderOptions={(item) => (
            <option value={item.value}>{item.label}</option>
          )}
          onChange={(e) =>
            setForm((prevState) => ({
              ...prevState,
              severity: e.target.value,
            }))
          }
        />

        <div className='d-flex justify-content-end align-items-center '>
          <Button variant='primary' type='submit'>
            Add
          </Button>
        </div>
      </Form>
    </>
  );
}

export default IssueForm;
