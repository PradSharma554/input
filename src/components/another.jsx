import { useEffect, useState } from 'react';

const CustomInput = ({
  error,
  helperText,
  helperTextClass,
  errorTextClass,
  className,
  type,
  value,
  name,
  required,
  inputProps,
  endAdornment,
  startAdornment,
  testExp,
  errorText,
  classNameParent,
  suggestions = [],
  optionsClassName = '',
  ...props
}) => {
  const [internalError, setInternalError] = useState(error);
  const [internalErrorText, setInternalErrorText] = useState(errorText);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setInternalError(error);
  }, [error]);

  useEffect(() => {
    setInternalErrorText(errorText);
  }, [errorText]);

  const handleValidation = (value) => {
    if (required && value === '') {
      setInternalError(true);
      setInternalErrorText(errorText || 'This field is required');
    } else if (testExp && !new RegExp(testExp).test(value)) {
      setInternalError(true);
      setInternalErrorText(errorText);
    } else {
      setInternalError(false);
      setInternalErrorText('');
    }
  };

  return (
    <>
      <div
        className={`relative flex items-center ${classNameParent} ${
          internalError
            ? 'px-2 flex gap-2 w-full rounded-md border-0 py-1.5 text-red-500 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 bg-white/5'
            : 'px-2 flex gap-2 w-full rounded-md border-0 bg-transparent py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6'
        }`}
      >
        {startAdornment && <div className="text-gray-400">{startAdornment}</div>}
        <input
          type={type}
          value={value}
          name={name}
          required={required}
          className={`bg-transparent w-full ${className} ${props.disabled ? 'opacity-50' : ''}`}
          {...props}
          {...inputProps}
          onChange={(e) => {
            setFilteredOptions(
              suggestions.filter((option) => option.value.includes(e.target.value))
            );
            handleValidation(e.target.value);
            if (props.onChange) props.onChange(e);
          }}
          onFocus={(e) => {
            setFilteredOptions(
              suggestions.filter((option) => option.value.includes(e.target.value))
            );
            setIsFocused(true);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e);
            setTimeout(() => {
              setIsFocused(false);
            }, 500);
          }}
        />
        {endAdornment && <div className="text-gray-400">{endAdornment}</div>}

        {isFocused && filteredOptions && filteredOptions.length > 0 && (
          <ul
            className={`absolute top-full text-gray-600 bg-white w-full z-20 p-2 rounded-md shadow-lg left-0 overflow-auto ${optionsClassName}`}
          >
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  handleValidation(option.value);
                  props.onChange?.({ target: { value: option.value } });
                }}
                className="hover:bg-gray-50 p-1 rounded-md cursor-pointer"
              >
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      {helperText && !internalError && (
        <p className={`text-xs text-gray-500 ${helperTextClass}`}>{helperText}</p>
      )}
      {internalError && internalErrorText && (
        <p className={`text-xs text-red-500 ${errorTextClass}`}>{internalErrorText}</p>
      )}
    </>
  );
};

export default CustomInput;