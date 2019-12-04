import React, {useEffect, useRef, useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import EditableArgument from "./components/EditableArgument";
import UnEditableArgument from "./components/UnEditableArgument";
import ActionMenu from "./components/ActionMenu";
import classnames from "classnames";
import DragArrows from "./components/DragArrows";
import {getDnDId} from "../utils";

function Argument(props) {

    const innerRef = useRef();
    const [refReady, setRef] = useState(false);

    const {
        argument,
        onArgumentChange,
        enableEditing = false,
        isDragging = false,
        isDragEnabled = true,
        actions,
    } = props;

    const [showPopover, togglePopover] = useState(false);

    function toggle() {
        togglePopover(prevState => !prevState);
    }

    useEffect(() => {
        setRef(true);
    }, [innerRef]);

    let displayStatement;
    if (enableEditing) {
        displayStatement = (
            <EditableArgument
                argument={argument.argumentText}
                inEditMode={argument.editMode}
                onBlur={onArgumentChange}
                idBase={argument.id}
            />
        );
    } else {
        displayStatement = (
            <UnEditableArgument
                argument={argument.argumentText}
            />
        );
    }



    return (
        <div
            id={getDnDId(argument)}
            aria-expanded={showPopover}
            className={"h5p-discussion-argument-container"}
            ref={innerRef}
        >
            {refReady && (
                <ActionMenu
                    actions={actions}
                    show={showPopover}
                    handleClose={toggle}
                    innerRef={innerRef.current}
                >
                    <div
                        className={classnames("h5p-discussion-argument", {
                            "h5p-discussion-active-draggable": isDragEnabled && isDragging
                        })}
                    >
                        <div
                            className={"h5p-discussion-argument-provided"}
                        >
                            {isDragEnabled && (
                                <>
                                    <DragArrows/>
                                </>
                            )}
                            {displayStatement}
                            <button
                                className={"h5p-discussion-argument-actions"}
                                aria-label={"See available actions"}
                                onClick={toggle}
                            >
                                <span className={"fa fa-caret-down"}/>
                            </button>
                        </div>
                    </div>
                </ActionMenu>
            )}
        </div>
    );
}

Argument.propTypes = {
    argument: PropTypes.object,
    onArgumentChange: PropTypes.func,
    enableEditing: PropTypes.bool,
    onArgumentDelete: PropTypes.func,
    isDragging: PropTypes.bool,
    isDragEnabled: PropTypes.bool,
    actions: PropTypes.array,
};

export default Argument;