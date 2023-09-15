import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label'>
        <input type='checkbox' id={props.name} name={props.name} className='filter-checkbox__default-checkbox'/>
        <div className='filter-checkbox__custom-checkbox'></div>
      </label>
    </div>
  );
}

export default FilterCheckbox;