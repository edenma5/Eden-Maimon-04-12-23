import Autocomplete from "@mui/joy/Autocomplete";

const SearchBox = ({
  options,
  value,
  setValue,
  getForecast,
  getCityKey,
  inputValue,
  setInputValue,
  getOptions,
}) => {
  const handleInputChange = (e, value) => {
    const isValidInput = /^[a-zA-Z\s]*$/.test(value);

    if (isValidInput || value === "") {
      getOptions();
      setInputValue(() => value);
    }
  };

  const handleOnChange = (e, value) => {
    getCityKey(value.label);
    getForecast(value.id);
    setValue(() => value);
  };

  return (
    <div className="flex justify-center mt-10">
      <Autocomplete
        placeholder="Search City"
        isOptionEqualToValue={(option, value) => option.title === value.title}
        options={options ? options : [{ label: "No Options", id: 0 }]}
        value={value}
        onChange={(e, value) => handleOnChange(e, value)}
        disableClearable
        freeSolo
        inputValue={inputValue}
        onInputChange={handleInputChange}
        sx={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBox;
