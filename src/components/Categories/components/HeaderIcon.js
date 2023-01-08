import React from 'react';
import Thumb from './../../../../assets/thumb.svg';

function HeaderIcon() {
  return (
    <span
      className={"h5p-discussion-header-icon"}
    >
      <img
        alt={""} // Merely decoration
        src={Thumb}
      />
    </span>
  );
}

export default HeaderIcon;
