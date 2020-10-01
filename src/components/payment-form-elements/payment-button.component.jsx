import React from 'react'

const SubmitButton = ({processing, error, children, disabled}) => (
  <button
    className={`SubmitButton custom-button ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

export default SubmitButton