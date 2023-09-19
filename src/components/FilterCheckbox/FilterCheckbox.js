import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label'>
        <input type='checkbox' id={props.id} name={props.name} className='filter-checkbox__default-checkbox'/>
        <span className='filter-checkbox__custom-checkbox'></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;