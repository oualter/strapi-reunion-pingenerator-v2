import { useRef } from "react";
export default function CoordsBox(props) {
  // console.log('CoordsBox props => ', props)
  const { xpos, ypos } = props;
  const ref = useRef(null);

  const handleCopy = () => {
    // some action
    console.log("copy function");
  };

  return (
    <>

      <label>
        position de l'épingle :
        <input
          ref={ref}
          value={xpos + ", " + ypos}
        />
      </label>
    </>
  );
}
