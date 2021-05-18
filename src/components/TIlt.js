import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

function Tilt(props) {
  const { options, style, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} style={style} {...rest} />;
}

export default Tilt;
