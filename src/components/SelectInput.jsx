import { Fragment } from 'react';
import { Form } from 'react-bootstrap';

function SelectField({ value, onChange, label, options, renderOptions }) {
  return (
    <Form.Group className='mb-4' controlId='formBasicEmail1'>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        {options.map((item, idx) => (
          <Fragment key={idx}>{renderOptions(item)}</Fragment>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectField;
