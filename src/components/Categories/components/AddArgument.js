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
            aria-label={context.translate('addArgument')}
            className={"h5p-discussion-header-argument-add"}
            onClick={onClick}
            type={"button"}
        >
            <span
                className={"h5p-discussion-argument-add-icon fa fa-plus"}
                aria-hidden={true}
            />
            <span className={"h5p-discussion-argument-add-text"}>{context.translate('addArgument')}</span>
        </button>
    );
}

export default AddArgument;