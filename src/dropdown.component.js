import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Popup } from "reactjs-popup";
import loadOptions from "./load-options";
const DropdownPagination = () => {
    const [value, setValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, onInputChangeRaw] = useState("");
    const [inputHistory, setInputHistory] = useState([]);
    const closeModal = () => setIsOpen(false);

    const onInputChange = (newInputValue, { action }) => {
        setInputHistory([
        ...inputHistory,
        {
            inputValue: newInputValue,
            action
        }
        ]);
        onInputChangeRaw(newInputValue);
    };
    const onChange = (newValue) => {
        setValue(newValue);
        console.log(inputValue)
        if (newValue.value === 0) {
            setIsOpen(true);
                    onInputChangeRaw(inputValue);
        }
    };

    const saveItem = () => {
        console.log("Agregar elemento: " + inputValue);
        closeModal();
    };
    return (
        <div
            style={{
                width: "60%",
                marginTop: "5%",
                marginLeft: "20%",
                marginRight: "20%",
            }}>

            <h1>CLIENTES</h1>

            <AsyncPaginate
                value={value}
                inputValue={inputValue}
                onInputChange={onInputChange}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                loadOptions={loadOptions}
                onChange={onChange}
                placeholder="Seleccionar empresa"
            />
            
            <Popup
                open={isOpen}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <div
                style = {{
                    padding: "10%",
                    border: "3px outset",
                    textAlign: "center"
                }}
                >
                    <span>
                        ¿Desea registrar la empresa: {inputValue}?
                    </span>
                    <br/>
                    <div>
                        <button
                            style = {{
                                padding: "1% 3% 1% 3%",
                                margin: "5% 10% 5% 10%",
                                backgroundColor: "#51902ee8"
                            }}
                            onClick = {saveItem} >
                            Si
                        </button>
                        <button
                            style = {{
                                padding: "1% 3% 1% 3%",
                                margin: "5% 10% 5% 10%",
                                backgroundColor: "#be3636e8"
                            }}
                            onClick = {closeModal} >
                            No
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default DropdownPagination;
