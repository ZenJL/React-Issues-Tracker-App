import { Form } from 'react-bootstrap';

function TextInput({
  label,
  value,
  onChange,
  isError,
  ErrorMessage,
  placeholder,
}) {
  return (
    <Form.Group
      className={isError ? 'mb-2' : 'mb-4'}
      controlId='formBasicEmail'
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isError && (
        <p className='text-center fs-5 text-danger mt-2 mb-0'>{ErrorMessage}</p>
      )}
    </Form.Group>
  );
}

export default TextInput;
