import useSwr from "swr";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";
import { swrFetcher } from "../../utils";

const ModelSelect = ({ models, ...props }) => {
  const make = props.watch("make-select");
  const { data } = make
    ? useSwr(`/api/getModels?make=${make}`, swrFetcher, {
        dedupingInterval: 60000,
      })
    : [];
  const enhancedData = data || models;
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="model-select">Model</InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="all">
              <em>All models</em>
            </MenuItem>
            {enhancedData.map((model) => (
              <MenuItem
                key={model.model}
                value={model.model}
              >{`${model.model} (${model.count})`}</MenuItem>
            ))}
          </Select>
        }
        control={props.control}
        name={props.name}
        defaultValue={props.value ? props.value : "all"}
        value={props.value ? props.value : "all"}
        labelId="model-select"
        label="model"
      />
    </FormControl>
  );
};

export default ModelSelect;
