import React from 'react';
import useParams from "react-router-dom";

import Detail from './index';

function GetId() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <Detail id={id} />
        </div>
    );
}

export default GetId;