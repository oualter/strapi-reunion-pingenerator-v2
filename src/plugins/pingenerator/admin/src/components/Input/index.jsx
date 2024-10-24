import { useState, useRef, useEffect } from "react";
import {
  Typography,
  DatePicker,
  Box,
  Button,
  Field,
  FieldLabel,
  FieldInput,
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system";
import MapImage from "./../MapImage";
// import getTrad from "../../utils/getTrad";
import "./../../assets/css/imagepin.css";
import { useFetchClient } from "@strapi/helper-plugin";

const Input = ({ attribute, name, onChange, value }) => {
  const { get } = useFetchClient();
  const ref = useRef({ x: 0, y: 0 });
  // const { formatMessage } = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [pins, setPins] = useState(value ? value : []);
  const [savedPins, setSavedPins] = useState([]);
  const [postID, setPostID] = useState([]);

  const handleCoordsChange = async (pins) => {
    setPins(pins);
    onChange({
      target: {
        name,
        type: attribute.type,
        value: pins,
      },
    });
  };

  const handleRegisterData = (dataCoords) => {
    setPins(dataCoords);
    ref.current.value = dataCoords[0].x + ", " + dataCoords[0].y;
    handleCoordsChange(ref.current.value);
  };

  const handleGetPinCoords = async () => {
    const pinsBridgeReq = await get("/pingenerator/pincoords").then((res) => {
      const { referrer } = res.data[res.data.length - 1];
      const lastIndexOfSlashBeforeIdReferrer = referrer.lastIndexOf("/");
      const tempPostID = referrer.slice(lastIndexOfSlashBeforeIdReferrer + 1);
      setPostID(tempPostID);
      const pinsBridgeData = res.data;
      setSavedPins(pinsBridgeData);
    });
    // console.log("pinsBridgeReq => ", pinsBridgeReq);
  };
  // handle asynchronous setstate thanks to useeffects
  useEffect(() => {
    handleGetPinCoords();
  }, [isVisible]);

  return (
    <>
      <Button
        onClick={() => {
          setIsVisible((prev) => !prev);
          handleGetPinCoords();
        }}
      >
        Epingler sur la carte
      </Button>
      <Field name="pincoordsfield" required={false}>
        <FieldLabel>
          Coordonnées de l'épingle &nbsp;
          <FieldInput
            ref={ref}
            name="pincoords"
            // disabled={disabled}
            value={value}
            onChange={handleCoordsChange}
          />
        </FieldLabel>
      </Field>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Placer la microfiction sur l'image
            </Typography>
          </ModalHeader>
          <ModalBody>
            <div className="imageplaceholder-wrapper">
              <div className="image-placeholder">
                <MapImage handleRegisterData={handleRegisterData} />
              </div>
              {savedPins.map((pin, index) => {
                const { pingenerator } = pin;
                const { id } = pin;
                // console.log("postID => ", postID);
                if (!pingenerator) {
                  return true;
                }
                let savedPinX = pingenerator.split(",")[0];
                let savedPinY = pingenerator.split(",")[1];
                return (
                  <div
                    key={id}
                    className={
                      id == postID ? "savedpin thispostpin" : "savedpin"
                    }
                    style={{
                      width: "10px",
                      height: "10px",
                      left: savedPinX + "%",
                      top: savedPinY + "%",
                    }}
                  >
                    {" "}
                  </div>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setIsVisible((prev) => !prev)}
                variant="tertiary"
              >
                Annuler
              </Button>
            }
            endActions={
              <>
                <Button
                  onClick={() => {
                    setIsVisible((prev) => !prev);
                  }}
                >
                  Valider le nouvel emplacement de l'épingle
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};
export default Input;
