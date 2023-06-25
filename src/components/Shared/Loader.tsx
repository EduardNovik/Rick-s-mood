import { FC, ReactElement } from "react";

import { Audio } from "react-loader-spinner";

const Loader: FC = (): ReactElement => {
  return (
    <div data-testid="loader-component">
      <Audio
        height="100"
        width="100"
        color="gray"
        ariaLabel="audio-loading"
        wrapperStyle={{ margin: "50px", justifyContent: "center" }}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};
export default Loader;
