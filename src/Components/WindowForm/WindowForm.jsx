import React from 'react';
import "./WindowForm.css";

export const WindowForm = (props) => {

    return (
        <>
            <div className="popup_gray_background" onClick={() => props.onClose()}> </div>
            <div className="popup_window">
                <div className="popup_window__block">
                    <img className="popup_window__block__left_img"
                        src={props.formInfo.image} alt={props.formInfo.title} />
                    <div className="popup_window__block__right_side">
                        <div className="popup_window__block__right_side__form_block">
                            <h2 className="form_block__header">{props.formInfo.title}</h2>
                            {props.formInfo.component}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}