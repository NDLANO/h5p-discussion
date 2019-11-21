import React, {useState, useContext, useReducer, useCallback} from 'react';
import PropTypes from 'prop-types';
import {getBox} from 'css-box-model';
import {DiscussionContext} from 'context/DiscussionContext';
import Summary from "../Summary/Summary";
import {DragDropContext} from "react-beautiful-dnd";
import * as tweenFunctions from "tween-functions";
import Category from "../Categories/Category";
import {isMobile} from 'react-device-detect';
import Element from "../DragAndDrop/Element";
import Argument from "../Argument/Argument";
import Column from "../DragAndDrop/Column";
import {CategoryDataObject, ArgumentDataObject, getDnDId} from '../utils.js';

function Surface() {
    const context = useContext(DiscussionContext);

    const initalState = {
        categories: [],
        argumentsList: [],
    };

    function stateHeadQuarter(state, action) {
        switch (action.type) {
            case 'move':
                const {
                    from,
                    to
                } = action.payload;
                const newCategories = Array.from(state.categories);
                const movedArgument = newCategories[newCategories.findIndex(category => getDnDId(category) === from.droppableId)].connectedArguments.splice(from.index, 1);
                newCategories[newCategories.findIndex(category => getDnDId(category) === to.droppableId)].connectedArguments.splice(to.index, 0, movedArgument[0]);
                return {
                    ...state,
                    categories: newCategories
                };
            case 'editArgument': {
                const {
                    id,
                    argumentText,
                } = action.payload;
                const newArguments = Array.from(state.argumentsList);
                newArguments[id].argumentText = argumentText;
                return {
                    ...state,
                    argumentsList: newArguments
                };
            }
            case 'deleteArgument': {
                const {
                    id
                } = action.payload;
                const categories = JSON.parse(JSON.stringify(state.categories))
                    .map(category => {
                        category.connectedArguments = category.connectedArguments.filter(connectedArgument => connectedArgument !== id);
                        return category;
                    });
                const argumentsList = state.argumentsList.filter(argument => argument.id !== id);

                return {
                    ...state,
                    categories,
                    argumentsList,
                }
            }
            case 'reset':
                return init();
            default:
                return state;
        }
    }

    const memoizedReducer = useCallback(stateHeadQuarter, []);
    const [state, dispatch] = useReducer(memoizedReducer, initalState, init);

    let api;
    const autoDragSensor = value => {
        api = value;
    };

    const {
        collectExportValues,
        registerReset,
        translate,
        behaviour: {
            allowAddingOfArguments = true,
        }
    } = context;

    registerReset(() => dispatch({type: "reset"}));
    collectExportValues('userInput', () => ({categories: state.categories, argumentsList: state.argumentsList}));

    function init() {
        const {
            translate,
            params: {
                argumentsList = [],
            },
            behaviour: {
                randomizeArguments = true,
            }
        } = context;

        if (randomizeArguments === true) {
            argumentsList.sort(() => 0.5 - Math.random());
        }

        const argumentDataList = argumentsList.map((argument, index) => (new ArgumentDataObject({
            id: index,
            argumentText: argument,
        })));

        const categories = [];
        categories.push(new CategoryDataObject({
            id: 'unprocessed',
            isArgumentDefaultList: true,
            connectedArguments: argumentDataList.map(argument => argument.id)
        }));
        categories.push(new CategoryDataObject({
            id: 'pro',
            theme: 'h5p-discussion-pro',
            useNoArgumentsPlaceholder: true,
            title: translate('argumentsFor'),
        }));
        categories.push(new CategoryDataObject({
            id: 'contra',
            theme: 'h5p-discussion-against',
            useNoArgumentsPlaceholder: true,
            title: translate('argumentsAgainst'),
        }));

        return {
            categories,
            argumentsList: argumentDataList,
        }
    }

    function onDropEnd(dragResult) {
        let {
            combine,
            destination,
            source,
        } = dragResult;

        if (!combine && !destination) {
            return;
        }

        if (destination !== null && destination.droppableId === source.droppableId) {
            return;
        }

        dispatch({
            type: 'move', payload: {
                from: source,
                to: destination
            }
        });
    }

    function moveStepByStep(drag, values) {
        requestAnimationFrame(() => {
            const newPosition = values.shift();
            drag.move(newPosition);

            if (values.length) {
                moveStepByStep(drag, values);
            } else {
                drag.drop();
                scroll(newPosition);
            }
        });
    }

    function scroll(position) {
        const frame = window.frameElement ? parent : window;
        frame.scrollTo({
            top: position.y,
            behavior: 'smooth',
        });
    }

    const startMoving = function start(draggableElement, id, target) {
        const targetContainer = getBox(document.getElementById(target));

        const preDrag = api.tryGetLock(id);
        if (!preDrag) {
            return;
        }
        const dragElement = getBox(draggableElement);
        const start = dragElement.borderBox.center;
        const end = targetContainer.borderBox.center;
        const drag = preDrag.fluidLift(start);

        const points = [];
        const numberOfPoints = 10;
        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: tweenFunctions.easeOutCirc(i, start.x, end.x, numberOfPoints),
                y: tweenFunctions.easeOutCirc(i, start.y, end.y, numberOfPoints)
            });
        }

        moveStepByStep(drag, points);
    };

    return (
        <div
            className="h5p-discussion-surface"
        >
            <DragDropContext
                onDragEnd={onDropEnd}
                //onDragUpdate={onDropUpdate}
                //onDragStart={onDragStart}
                sensors={[autoDragSensor]}
            >
                {state.categories.map(category => (
                    <Category
                        key={category.id}
                        categoryId={category.id}
                        includeHeader={category.title !== null}
                        title={category.title}
                        additionalClassName={[category.theme]}
                        useNoArgumentsPlaceholder={category.useNoArgumentsPlaceholder}
                        addArgument={allowAddingOfArguments}
                    >
                        <Column
                            additionalClassName={"h5p-discussion-argument-list"}
                            droppableId={getDnDId(category)}
                        >
                            {category.useNoArgumentsPlaceholder && category.connectedArguments.length === 0 && (
                                <span>{translate('noArguments')}</span>
                            )}
                            {category.connectedArguments
                                .map(argument => state.argumentsList[state.argumentsList.findIndex(element => element.id === argument)])
                                .map((argument, index) => (
                                    <Element
                                        key={getDnDId(argument)}
                                        draggableId={getDnDId(argument)}
                                        dragIndex={index}
                                    >
                                        <Argument
                                            argument={argument}
                                            enableEditing={allowAddingOfArguments}
                                            onMove={startMoving}
                                            onArgumentChange={argumentText => dispatch({type: 'editArgument', payload: {id: argument.id, argumentText}})}
                                            onArgumentDelete={() => dispatch({type: 'deleteArgument', payload: {id: argument.id}})}
                                        />
                                    </Element>
                                ))}
                        </Column>
                    </Category>
                ))}
            </DragDropContext>
            <Summary/>
        </div>
    );
}

export default Surface;
