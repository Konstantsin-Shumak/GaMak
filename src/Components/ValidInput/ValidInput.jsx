import React, { useState, useMemo, useCallback } from 'react';
import './ValidInput.css';

export const ValidInput = (props) => {

    const [isValid, setIsValid] = useState([]);
    const { validate, onValidChanged, onChanged, type } = props;

    const validClassName = useMemo(() => {
        if (isValid === true) {
            return "valid";
        }
        else if (isValid === false) {
            return "invalid";
        }
        else {
            return "";
        }
    }, [isValid]);

    const checkValid = useCallback((inputText) => {
        if (inputText.length === 0) {
            setIsValid();
        }
        else if (validate(inputText)) {
            if (onValidChanged) {
                onValidChanged(true);
            }
            setIsValid(true);
        } else {
            if (onValidChanged) {
                onValidChanged(false);
            }
            setIsValid(false);
        }
    }, [validate, onValidChanged]);

    const onTextChanged = useCallback((event) => {
        const inputText = event.target.value;

        if (onChanged) {
            onChanged(inputText);
        }
        if (type !== "date") {
            checkValid(inputText);
        }
    }, [onChanged, checkValid, type]);

    return (
        <input
            className={`valid-input ${validClassName}`}
            type={props.type}
            placeholder={props.placeholder}
            onChange={onTextChanged}
        />
    )
}