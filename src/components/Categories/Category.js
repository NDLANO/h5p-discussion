import React from 'react';
import PropTypes from 'prop-types';
import Statement from "../StatementTypes/Statement";
import Column from "../Column/Column";
import HeaderIcon from "./components/HeaderIcon";
import AddArgument from "./components/AddArgument";
import Argument from "../Argument/Argument";
import classnames from "classnames";
import {Draggable} from "react-beautiful-dnd";

function Category(props) {

    const {
        argumentsList,
        additionalClassName,
        droppableId,
        addArgument,
        title,
        includeHeader,
        useNoArgumentsPlaceholder,
        onMove,
    } = props;

    additionalClassName.unshift("h5p-discussion-category");

    return (
        <div className={additionalClassName.join(" ")}>
            {includeHeader && (
                <div className={"h5p-discussion-category-header"}>
                    <HeaderIcon />
                    {title}
                    {addArgument && (
                        <AddArgument
                            onClick={e => console.log("add support for adding arguments")}
                        />
                    )}
                </div>
            )}
            <div className={"h5p-discussion-category-content " + droppableId}>
                <Column
                    additionalClassName={"h5p-discussion-argument-list"}
                    droppableId={droppableId}
                >
                    {useNoArgumentsPlaceholder && argumentsList.length === 0 && (
                        <span>No arguments</span>
                    )}
                    {argumentsList.map((argument, index) => (
                        <Draggable
                            draggableId={"test-" + argument.id}
                            index={index}
                            key={argument.id}
                            //isDragDisabled={draggableType === 'sequenced' && statement.isPlaceholder}
                        >
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        className={"h5p-discussion-draggable-container"}
//                                        aria-label={getAriaLabel()}
                                    >
                                        <div
                                            className={classnames("h5p-discussion-draggable-element", {
                                                'h5p-discussion-no-transform': props.disableTransform,
                                            })}
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            <Argument
                                                argument={argument}
                                                onMove={onMove}
                                            />
                                        </div>
                                    </div>
                                )
                            }}
                        </Draggable>
                    ))}
                </Column>
            </div>
        </div>
    );
}

Category.propTypes = {
    argumentsList: PropTypes.array,
    additionalClassName: PropTypes.array,
    droppableId: PropTypes.string.isRequired,
    title: PropTypes.string,
    addArgument: PropTypes.bool,
    includeHeader: PropTypes.bool,
    useNoArgumentsPlaceholder: PropTypes.bool,
};

Category.defaultProps = {
    argumentsList: [],
    columnClassName: [],
    additionalClassName: [],
    title: "Title",
    addArgument: true,
    includeHeader: true,
    useNoArgumentsPlaceholder: true,
};

export default Category;