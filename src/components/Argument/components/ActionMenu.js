import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TinyPopover from "react-tiny-popover";

function ActionMenu(props) {

    const {
        children,
        show,
        handleClose,
        actions,
        classnames = [],
        onMove,
    } = props;

    classnames.push("h5p-discussion-actionmenu");

    return (
        <TinyPopover
            containerClassName={classnames.join(" ")}
            isOpen={show}
            position={["bottom"]}
            windowBorderPadding={0}
            disableReposition={true}
            onClickOutside={handleClose}
            content={({ targetRect }) => (
                <div
                    className={"h5p-discussion-popover-actionmenu"}
                    role={"listitem"}
                    style={{width: targetRect.width + 10}}
                >
                    <ul>
                    {actions.map((action, index) => (
                        <li
                            key={"action-" + index}
                        ><label>
                            <span className={"h5p-ri hri-unchecked"} onClick={event => {
                            onMove(action.target);
                            handleClose();
                        }}/>{action.label}</label></li>
                    ))}
                    </ul>
                    <button
                        onClick={handleClose}
                        className={"visible-hidden"}
                    >Close</button>
                </div>
            )}
        >
            {children}
        </TinyPopover>
    );
}

ActionMenu.propTypes = {
    canDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    actions: PropTypes.array,
    translate: PropTypes.func,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    classnames: PropTypes.array,
};

export default ActionMenu;