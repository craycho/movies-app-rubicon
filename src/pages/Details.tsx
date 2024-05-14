import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { detailsActions } from "../store/details-slice";
import { Movie, Series } from "../util/type-definitions";

import ItemDetails from "../components/ItemDetails";
import { useEffect } from "react";

export default function DetailsPage() {
  const dispatch = useDispatch();
  const currentItem = useSelector((state: RootState) => state.currentDetails);

  // Checks if sessionStorage has a valid movie/series stored on a page refresh
  useEffect(() => {
    if (!currentItem.name) {
      const sessionCurrentItem = sessionStorage.getItem("currentItem");

      if (sessionCurrentItem) {
        const parsedSessionItem: Movie | Series =
          JSON.parse(sessionCurrentItem);
        dispatch(detailsActions.setCurrentDetails(parsedSessionItem));
      }
    }
  }, []);

  return (
    <div className="details-layout">
      <div className="details-wrapper">
        {currentItem && <ItemDetails itemData={currentItem} />}
      </div>
    </div>
  );
}
