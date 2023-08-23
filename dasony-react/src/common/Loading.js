import React from 'react';

import {Oval} from 'react-loader-spinner';

function Loading(){
    return(
      <Oval
        color = "ff0000"
        height={100}
        width={100}
      />
    );
  }
  export default Loading;