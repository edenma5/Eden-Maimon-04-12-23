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
  return (
    <div>
      <Autocomplete
        placeholder="Search City"
        isOptionEqualToValue={(option, value) => option.title === value.title}
        options={options ? options : [{ label: "Loading...", id: 0 }]}
        value={value}
        onChange={(e, newValue) => {
          console.log(newValue.label);
          console.log(inputValue);
          setValue(newValue);
          getCityKey(newValue.label);
          getForecast();
        }}
        disableClearable
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          console.log(newInputValue);
          setInputValue(newInputValue);
          getOptions();
        }}
        // defaultValue={"tel aviv"}
        sx={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBox;
