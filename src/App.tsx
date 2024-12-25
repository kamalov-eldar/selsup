import { useState } from "react";

type ParamType = "string";

interface Param<T = ParamType> {
    id: number;
    name: string;
    type: T;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: string[];
}

interface PropsParamEditor {
    params: Param[];
    paramValues: ParamValue[];
    handleInputChange: (paramId: number, value: string) => void;
}

const ParamEditor = ({ params, paramValues, handleInputChange }: PropsParamEditor) => {
    return (
        <div>
            {params.map((param) => {
                const value = paramValues.find((pv) => pv.paramId === param.id)?.value || "";

                return (
                    <div key={param.id} style={{ marginBottom: "10px" }}>
                        <label style={{ marginRight: "10px" }}>{param.name}</label>
                        <input type="text" value={value} onChange={(e) => handleInputChange(param.id, e.target.value)} />
                    </div>
                );
            })}
        </div>
    );
};

const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" },
    ],
    colors: [],
};

const App = () => {
    const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

    const handleInputChange = (paramId: number, value: string) => {
        setParamValues((prevParamValues) => {
            const updatedParamValues = prevParamValues.map((paramValue) => {
                if (paramValue.paramId === paramId) {
                    return { ...paramValue, value };
                }
                return paramValue;
            });

            return updatedParamValues;
        });
    };

    const handleGetModel = () => {
        console.log(paramValues);
        return paramValues;
    };

    return (
        <div>
            <h1>Редактор параметров</h1>
            <ParamEditor params={params} paramValues={paramValues} handleInputChange={handleInputChange} />
        </div>
    );
};

export default App;
