import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import EditableArgument from "./components/EditableArgument";
import UnEditableArgument from "./components/UnEditableArgument";
import ActionMenu from "./components/ActionMenu";
import classnames from "classnames";
import DeleteStatement from "../DeleteStatement/DeleteStatement";
import DragArrows from "./components/DragArrows";
import {getDnDId} from "../utils";

function Argument(props) {

    const {
        argument,
        onArgumentChange,
        enableEditing = false,
        isDragging = false,
        onArgumentDelete,
        isDragEnabled = true,
        actions,
    } = props;

    const [showPopover, togglePopover] = useState(false);

    function toggle() {
        togglePopover(prevState => !prevState);
    }

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
            role={"listitem"}
            className={"h5p-discussion-argument-container"}
        >
            <ActionMenu
                actions={actions}
                show={showPopover}
                handleClose={toggle}
                onDelete={onArgumentDelete}
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
                                <DeleteStatement
                                    onClick={onArgumentDelete}
                                />
                                <DragArrows/>
                            </>
                        )}
                        {displayStatement}
                        <div
                            className={"h5p-discussion-argument-actions"}
                            onClick={toggle}
                        >
                            <span className={"fa fa-caret-down"}/>
                        </div>
                    </div>
                </div>
            </ActionMenu>
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