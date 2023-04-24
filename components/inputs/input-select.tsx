import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

type inputSelectProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: any) => void;
};

export function InputSelect({ options, value, onChange }: inputSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={value => {}}
        onSelectItem={item => {
          onChange(item.value);
        }}
      />
    </>
  );
}
