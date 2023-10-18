import React, {useState, useRef, useEffect} from 'react';
import PropsTypes from 'prop-types';
import classnames from 'classnames';
import {debounce} from '../../utils';

function EditableArgument(props) {

  const [inEditMode, toggleEditMode] = useState(props.inEditMode);

  const inputRef = useRef();

  useEffect(() => {
    if (inEditMode === true) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inEditMode === false) {
      toggleEditMode(true);
      inputRef.current.value = props.argument;
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const handleBlur = () => {
    toggleEditMode(false);
  };

  /**
   * Handle keydown events.
   * KeyDown is used instead of KeyUp to prevent focused input to be blurred
   * when arguments are added with the enter key.
   */
  const handleKeyDown = (event) => {
    // If enter key is pressed
    if (event.keyCode === 13) {
      if (inEditMode) {
        handleBlur();
      }
      else {
        handleClick();
      }
    }
  };

  const id = 'es_' + props.idBase;
  const labelId = 'label_' + id;
  const inputId = 'input_' + id;

  /*
   * TODO: Clean this up. This feels like a very weird construct. Why can't
   *       the `input` element be used on its own? Why the textbox wrapper that
   *       adds an extra level while there already is an input field? Also, why
   *       is ARIA labelling handled that way?
   */
  return (
    <div
      role={'textbox'}
      tabIndex={0}
      onClick={handleClick}
      className={'h5p-discussion-editable-container'}
      onKeyDown={handleKeyDown}
      aria-labelledby={labelId}
    >
      <div>
        <label
          title={props.argument}
          htmlFor={inputId}
          id={labelId}
          className={classnames('h5p-discussion-editable', {
            'hidden': inEditMode === false,
          })}
        >
          <span className={'visible-hidden'}>Argument</span>
          <input
            className={'h5p-discussion-editable'}
            ref={inputRef}
            onBlur={handleBlur}
            onChange={debounce(() => props.onBlur(inputRef.current.value), 200)}
            aria-label={'Edit argument ' + props.argument}
            id={inputId}
          />
        </label>
        <p
          className={classnames('h5p-discussion-noneditable', {
            'hidden': inEditMode === true,
          })}
        >
          {props.argument}
        </p>
      </div>
    </div>
  );
}

EditableArgument.propTypes = {
  argument: PropsTypes.string,
  inEditMode: PropsTypes.bool,
  onBlur: PropsTypes.func,
  idBase: PropsTypes.oneOfType([
    PropsTypes.string,
    PropsTypes.number,
  ]),
};

EditableArgument.defaultProps = {
  inEditMode: false,
};

export default EditableArgument;
