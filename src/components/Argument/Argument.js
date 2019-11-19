import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import EditableArgument from "./components/EditableArgument";
import UnEditableArgument from "./components/UnEditableArgument";
import ActionMenu from "./components/ActionMenu";
import classnames from "classnames";
import DeleteStatement from "../DeleteStatement/DeleteStatement";
import DragArrows from "./components/DragArrows";

function Argument(props) {

    const {
        argument,
        onStatementChange,
        enableEditing = false,
        isDragging = false,
        onStatementDelete,
        isDragEnabled = true,
        onMove
    } = props;

    const elementRef = useRef();
    const [refReady, setRefReady] = useState(false);
    const [showPopover, togglePopover] = useState(false);

    useEffect(() => setRefReady(true), [elementRef]);

    function toggle() {
        togglePopover(prevState => !prevState);
    }

    let displayStatement;
    if (enableEditing) {
        displayStatement = (
            <EditableArgument
                statement={argument.argumentText}
                inEditMode={argument.editMode}
                onBlur={onStatementChange}
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
            role={"listitem"}
            className={"h5p-discussion-statement-container"}
            ref={elementRef}
            //onClick={toggle}
        >
            <ActionMenu
                actions={[{label: "FOR", target: 'pro'}, {label: "AGAINST", target: 'contra'}]}
                show={showPopover}
                handleClose={toggle}
                onMove={(target) => onMove(elementRef.current, 'test-' + argument.id, target)}
            >
                <div
                    className={classnames("h5p-discussion-statement", {
                        "h5p-discussion-active-draggable": isDragEnabled && isDragging
                    })}
                >
                    <div
                        className={"h5p-discussion-statement-provided"}
                    >
                        {isDragEnabled && (
                            <>
                                <DeleteStatement
                                    onClick={onStatementDelete}
                                />
                                <DragArrows/>
                            </>
                        )}
                        {displayStatement}
                        <div
                            className={"h5p-discussion-statement-actions"}
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
    onStatementChange: PropTypes.func,
    enableEditing: PropTypes.bool,
    onStatementDelete: PropTypes.func,
    isDragging: PropTypes.bool,
    isDragEnabled: PropTypes.bool,
};

export default Argument;