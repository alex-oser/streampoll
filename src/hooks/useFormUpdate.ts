import { useEffect } from "react";

export function useFormUpdate(props: any) {

  useEffect(() => {
    props.onValidationUpdate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isValid, props.dirty]);

}