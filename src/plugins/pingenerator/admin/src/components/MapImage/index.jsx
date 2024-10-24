import { useFetchClient } from "@strapi/helper-plugin";
import { useEffect, useState } from "react";

export default function MapImage({ handleRegisterData }) {
  const { get } = useFetchClient();
  const [mapImageSrc, setMapImageSrc] = useState("");

  const HandleGetMapImg = async () => {
    const mapImageSrcGet = await get("/pingenerator/mapimage").then(
      (responseSrc) => {
        const { imageToPinOnUrl } = responseSrc.data;
        setMapImageSrc(imageToPinOnUrl);
      }
    );
  };

  useEffect(() => {
    HandleGetMapImg();
  }, []);

  const [localCoords, setLocalCoords] = useState({ x: 0, y: 0 });

  // dimensions de l'épingle
  const pinWidth = 10;
  const pinHeight = 10;

  // fonction pour accéder à l'objet js getBoundingClientRect permettant de récupérer les coordonnées
  let boundingClientRect = (event) => {
    return event.target.getBoundingClientRect();
  };

  const handleCalcXYCoords = (event) => {
    const rect = boundingClientRect(event);
    let imageWith = rect.width;
    let imageHeight = rect.height;
    // set x and y coordinates in percentage
    const newLocalCoords = {
      x: (((event.clientX - rect.left) / imageWith) * 100).toFixed(2),
      y: (((event.clientY - rect.top) / imageHeight) * 100).toFixed(2),
    };
    setLocalCoords([newLocalCoords]);
  };
  // objet épingle
  const [pins, setPins] = useState([]);

  // objet coordonnées de l'épingle choisie
  const [XYPosBox, setXYPosBox] = useState([]);

  const handlePinOnMap = (event) => {
    console.log("alors ça clique ?");
    const rect = boundingClientRect(event);
    let imageWith = rect.width;
    let imageHeight = rect.height;
    let xpos = (
      ((event.clientX - rect.left - pinWidth / 2) / imageWith) *
      100
    ).toFixed(2);
    let ypos = (
      ((event.clientY - rect.top - pinHeight / 2) / imageHeight) *
      100
    ).toFixed(2);
    // add a new pin
    const newPin = { x: xpos, y: ypos };
    // setPins([...pins, newPin]);  // ok for a set of pins
    setPins([newPin]);

    if (xpos) {
      handleRegisterData([{ x: xpos, y: ypos }]);
    } else {
      console.log("no data");
    }
  };

  return (
    <>
      <div className="legend">
        <div className="pin-legend-wrapper">
          <div
            className="pin"
            style={{
              width: pinWidth + "px",
              height: pinHeight + "px",
            }}
          ></div>
          <p>Nouvel emplacement de l'épingle</p>
        </div>
        <div className="pin-legend-wrapper">
          <div
            className="savedpin thispostpin"
            style={{
              width: pinWidth + "px",
              height: pinHeight + "px",
            }}
          ></div>
          <p>Vous êtes ici</p>
        </div>
        <div className="pin-legend-wrapper">
          <div
            className="savedpin"
            style={{
              width: pinWidth + "px",
              height: pinHeight + "px",
            }}
          ></div>
          <p>Autres épingles déjà ajoutées</p>
        </div>
        {localCoords[0] && (
          <p className="display-pos">
            Position souris : {localCoords[0].x}, {localCoords[0].y}
          </p>
        )}

        {pins[0] && (
          <p className="display-pos">
            Position épingle : {pins[0].x + ", " + pins[0].y}
          </p>
        )}
      </div>
      <img
        src={mapImageSrc}
        width="1000"
        height="auto"
        className="tomap"
        alt="basemap"
        onMouseMove={handleCalcXYCoords}
        onClick={handlePinOnMap}
      />

      {pins.map((elt, index) => (
        <div
          key={index}
          className="pin"
          style={{
            width: pinWidth + "px",
            height: pinHeight + "px",
            left: elt.x + "%",
            top: elt.y + "%",
          }}
        ></div>
      ))}
    </>
  );
}
