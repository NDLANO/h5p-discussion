import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DiscussionContext} from "context/DiscussionContext";

AddArgument.propTypes = {
    displayFull: PropTypes.bool,
    onClick: PropTypes.func,
};

function AddArgument(props) {

    const context = useContext(DiscussionContext);
    const {
        onClick,
    } = props;

    return (
        <button
            className={"h5p-discussion-header-argument-add"}
            onClick={onClick}
        >
            <span className={"h5p-discussion-argument-add-icon fa fa-plus"} />
            <span className={"h5p-discussion-argument-add-text"}>{context.translate('addArgument')}</span>
        </button>
    );
}

export default AddArgument;