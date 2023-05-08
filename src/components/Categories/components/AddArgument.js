import React from 'react';
import PropTypes from 'prop-types';
import {useDiscussionContext} from 'context/DiscussionContext';

function AddArgument(props) {

  const context = useDiscussionContext();
  const {
    onClick,
  } = props;

  return (
    <button
      aria-label={context.translate('addArgument')}
      className={'h5p-discussion-header-argument-add'}
      onClick={onClick}
      type={'button'}
    >
      <span
        className={'h5p-discussion-argument-add-icon fa fa-plus'}
      />
      <span className={'h5p-discussion-argument-add-text'}>{context.translate('addArgument')}</span>
    </button>
  );
}

AddArgument.propTypes = {
  displayFull: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddArgument;
