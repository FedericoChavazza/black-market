import { useFilters } from "@/context/FiltersContext";

import Checkbox from "@/components/Utils/Checkbox/Checkbox";

const Conditions = () => {
  const { state, setState } = useFilters();

  return (
    <div>
      <h3>Conditions</h3>
      <Checkbox value="New" state={state} setState={setState} label="New" />
      <Checkbox value="Used" state={state} setState={setState} label="Used" />
      <Checkbox
        value="Restored"
        state={state}
        setState={setState}
        label="Restored"
      />
    </div>
  );
};

export default Conditions;
