import React, { FC, ReactElement } from "react";

import { Audio } from "react-loader-spinner";

const Loader: FC = (): ReactElement => {
  return (
    <Audio
      height="100"
      width="100"
      color="gray"
      ariaLabel="audio-loading"
      wrapperStyle={{margin: '50px', justifyContent:"center"}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};
export default Loader;
