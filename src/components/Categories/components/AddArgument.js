import React from 'react';
import PropTypes from 'prop-types';

AddArgument.propTypes = {
    displayFull: PropTypes.bool,
    onClick: PropTypes.func,
};

function AddArgument(props) {

    const {
        displayFull = false,
        onClick,
    } = props;

    if( displayFull !== true){
        return (
            <span
                className={"h5p-discussion-statement-add fa fa-plus"}
                onClick={onClick}
            />
        );
    } else {

    }
}

export default AddArgument;