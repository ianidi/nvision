import React from "react";
import ReactSelect, { components } from "react-select";
import AsyncSelect from "react-select/async";
import "./style.scss";

var classNames = require("classnames");

const SingleValue = ({ children, ...props }) => {
  return (
    <components.SingleValue {...props}>
      <div className="d-flex align-items-center">
        {props.data.dialCode && <div className={`flag-icon flag-icon-${props.data.value.toLowerCase()} flag-margin`} />}
        {props.data.label}
      </div>

      <style jsx>{`
        .flag-margin {
          margin-right: 12px;
        }
      `}</style>
    </components.SingleValue>
  );
};

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className="d-flex align-items-center">
        {props.data.dialCode && <div className={`flag-icon flag-icon-${props.data.value.toLowerCase()} flag-margin`} />}
        {props.data.label}
      </div>

      <style jsx>{`
        .flag-margin {
          margin-right: 12px;
        }
      `}</style>
    </components.Option>
  );
};

export const Select = ({ value, options, label, placeholder, name, setValue, isSearchable, hasError, async, query }) => {
  const [selectedOption, setSelectedOption] = React.useState(
    value && options ? { value, label: options.find((item) => item.value === value).label } : null
  );

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue(selectedOption.value);
  };

  const promiseOptions = async (inputValue) => {
    return await query(inputValue);
  };

  return (
    <React.Fragment>
      {async ? (
        <AsyncSelect
          value={selectedOption}
          onChange={handleChange}
          // onInputChange={handleInputChange}
          //default value
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          id={`id-${name}`}
          instanceId={`id-${name}`}
          inputId={`id-${name}`}
          components={{
            SingleValue,
            Option,
          }}
          placeholder={label ? label : placeholder}
          className={classNames({ select__container: true, select__container_error: hasError })}
          classNamePrefix="select"
        />
      ) : (
        <ReactSelect
          value={selectedOption}
          onChange={handleChange}
          id={`id-${name}`}
          instanceId={`id-${name}`}
          inputId={`id-${name}`}
          components={{
            SingleValue,
            Option,
          }}
          options={options}
          placeholder={label ? label : placeholder}
          isSearchable={isSearchable === true ? true : false}
          className={classNames({ select__container: true, select__container_error: hasError })}
          classNamePrefix="select"
        />
      )}
    </React.Fragment>
  );
}