import React from 'react';

const boxStyle = {
  border: '1px solid black',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '10px',
};

const inputStyle = {
  padding: '8px',
  marginRight: '10px',
};

const selectStyle = {
  padding: '8px',
};

const errorWrapperStyle = {
  minHeight: '16px',
  marginTop: '4px',
};

const errorTextStyle = {
  color: 'red',
  fontSize: '12px',
  lineHeight: '16px',
  visibility: 'visible',
};

const hiddenErrorStyle = {
  ...errorTextStyle,
  visibility: 'hidden',
};

const Child = ({ inputs, setInputs }) => {
  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    const item = { ...updated[index] };

    if (field === 'input') {
      item.input = value;

      if (!item.showRole && value.length > 0) {
        item.showRole = true;
      }

      if (item.showRole) {
        item.error = '';
      }
    } else if (field === 'role') {
      item.role = value;
    }

    updated[index] = item;

    // Add new input if last box is typed into
    if (
      field === 'input' &&
      index === inputs.length - 1 &&
      value.length === 1
    ) {
      updated.push({ input: '', role: 'Role 1', showRole: false, error: '', touched: false });
    }

    setInputs(updated);
  };

  const handleBlur = (index) => {
    const updated = [...inputs];
    const item = { ...updated[index] };

    if (!item.showRole) return;

    item.touched = true;
    const trimmed = item.input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmed === '') {
      item.error = 'Email is required';
    } else if (!emailRegex.test(trimmed)) {
      item.error = 'Invalid email';
    } else {
      item.error = '';
    }

    updated[index] = item;
    setInputs(updated);
  };

  return (
    <>
      {inputs.map((item, index) => (
        <div key={index} style={boxStyle}>
          <input
            type="text"
            placeholder="Type your email"
            value={item.input}
            style={inputStyle}
            onChange={(e) => handleChange(index, 'input', e.target.value)}
            onBlur={() => handleBlur(index)}
            onFocus={(e) => {
              if (!item.showRole && e.target.value.length > 0) {
                handleChange(index, 'input', e.target.value);
              }
            }}
          />
          {item.showRole && (
            <select
              value={item.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
              style={selectStyle}
            >
              <option>Role 1</option>
              <option>Role 2</option>
              <option>Role 3</option>
            </select>
          )}
          <div style={errorWrapperStyle}>
            <div style={item.showRole && item.touched && item.error ? errorTextStyle : hiddenErrorStyle}>
              {item.error || 'placeholder'}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Child;