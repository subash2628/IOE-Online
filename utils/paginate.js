import _ from "lodash";
import PropTypes from "prop-types";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // _.slice(items,startIndex);
  return _(items).slice(startIndex).take(pageSize).value();
}

paginate.propTypes = {
  items: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};
