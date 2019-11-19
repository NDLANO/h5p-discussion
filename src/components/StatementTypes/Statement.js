import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import EditableStatement from "./components/EditableStatement";
import UnEditableStatement from "./components/UnEditableStatement";
import ActionMenu from "./components/ActionMenu";
import classnames from "classnames";
import DeleteStatement from "../DeleteStatement/DeleteStatement";
import DragArrows from "./components/DragArrows";

function Statement(props) {

    const {
        argument,
        onStatementChange,
        enableEditing = false,
        isDragging = false,
        onStatementDelete,
        isDragEnabled = true,
    } = props;

    const elementRef = useRef();
    const [refReady, setRefReady] = useState(false);
    const [showPopover, togglePopover] = useState(false);

    useEffect(() => setRefReady(true), [elementRef]);

    function toggle(){
        togglePopover(prevState => !prevState);
    }

    let displayStatement;
    if (enableEditing) {
        displayStatement = (
            <EditableStatement
                statement={argument.statement}
                inEditMode={argument.editMode}
                onBlur={onStatementChange}
                idBase={argument.id}
            />
        );
    } else {
        displayStatement = (
            <UnEditableStatement
                statement={argument.statement}
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
                actions={["TEST", "TEST 2"]}
                innerRef={elementRef.current}
                show={showPopover}
                handleClose={toggle}
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
                        >
                            <span className={"fa fa-caret-down"} />
                        </div>
                    </div>
                </div>
            </ActionMenu>
        </div>
    );
}

Statement.propTypes = {
    argument: PropTypes.object,
    onStatementChange: PropTypes.func,
    enableEditing: PropTypes.bool,
    onStatementDelete: PropTypes.func,
    isDragging: PropTypes.bool,
    isDragEnabled: PropTypes.bool,
};

export default Statement;