import { PropTypes } from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <label htmlFor="filter">
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
        placeholder="Put the name for search"
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
