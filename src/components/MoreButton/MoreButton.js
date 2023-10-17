import './MoreButton.css';

function MoreButton(props) {
  return (
    <div className='more-button'>
      <button className='more-button__button' onClick={props.onClick}>Ещё</button>
    </div>
  );
}

export default MoreButton;