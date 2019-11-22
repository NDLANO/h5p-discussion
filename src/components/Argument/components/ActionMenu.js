import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TinyPopover from "react-tiny-popover";
import classnames from 'classnames';
import trash from '@assets/trash.svg';
import {DiscussionContext} from "context/DiscussionContext";

function ActionMenu(props) {

    const context = useContext(DiscussionContext);
    const {
        translate
    } = context;
    const {
        children,
        show,
        handleClose,
        actions,
        onDelete,
        classNames = [],
    } = props;


    classNames.push("h5p-discussion-actionmenu");

    return (
        <TinyPopover
            containerClassName={classNames.join(" ")}
            isOpen={show}
            position={["bottom"]}
            windowBorderPadding={0}
            disableReposition={true}
            onClickOutside={handleClose}
            content={({targetRect}) => (
                <div
                    className={"h5p-discussion-popover-actionmenu"}
                    role={"listitem"}
                    style={{width: targetRect.width + 8}}
                >
                    <ul>
                        {actions.map((action, index) => (
                            <li
                                key={"action-" + index}
                            >
                                <label
                                    onClick={action.onSelect}
                                >
                                    <input
                                        value={action.id}
                                        type={"checkbox"}
                                        checked={action.activeCategory}
                                        onChange={action.onSelect}
                                        aria-labelledby={"action-" + index}
                                    />
                                    <span
                                        className={classnames("h5p-ri", {
                                        'hri-checked': action.activeCategory,
                                        'hri-unchecked': !action.activeCategory,
                                    })}/>
                                    <span
                                        id={"action-" + index}
                                        className={"h5p-discussion-popover-actionmenu-labeltext"}
                                    >
                                        {translate('moveTo')} "<span>{action.title}</span>"
                                    </span>
                                </label>
                            </li>
                        ))}
                        <li>
                            <label
                                onClick={onDelete}
                                className={"h5p-discussion-popover-actionmenu-delete"}
                            >
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        onDelete();
                                    }}
                                >
                                    <img
                                        src={trash}
                                        aria-hidden={true}
                                        alt={translate('deleteArgument')}
                                    />
                                    <span className="visible-hidden">{translate('close')}</span>
                                </button>
                                <span className={"h5p-discussion-popover-actionmenu-labeltext"}>{translate('deleteArgument')}</span>
                            </label>
                        </li>
                    </ul>
                    <button
                        onClick={handleClose}
                        className={"visible-hidden"}
                    >Close
                    </button>
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
    classNames: PropTypes.array,

};

export default ActionMenu;