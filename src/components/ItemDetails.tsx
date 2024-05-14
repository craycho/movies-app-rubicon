import { useNavigate } from "react-router-dom";
import { Details } from "../util/type-definitions";
import { posterBaseURL } from "../util/url-helpers";

import noImageAvailable from "../assets/imgs/no-image-available.png";
import "../assets/styles/details-styles.css";
import BackIcon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";

export default function ItemDetails({ itemData }: { itemData: Details }) {
  const navigate = useNavigate();
  const missingBackdrop = itemData.backdrop == null;

  return (
    <div className="item-details-container">
      <div className="back-btn-wrapper">
        <button className="back-btn" onClick={() => navigate("/")}>
          <BackIcon
            path={mdiChevronLeft}
            size={1}
            style={{ verticalAlign: -6.7 }}
          />
          Back
        </button>
      </div>
      <img
        className="item-details-poster"
        src={`${
          missingBackdrop ? noImageAvailable : posterBaseURL + itemData.backdrop
        }`}
        alt="Backdrop Picture"
      />
      <div className="item-details-title">{itemData.name}</div>
      <div className="item-details-overview">
        <h4>Overview:</h4>
        <p>{itemData.overview}</p>
      </div>
    </div>
  );
}
