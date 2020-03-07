import React from 'react';
import { connect } from 'react-redux';
import { getTokensAndSetAuthHeader } from '../api/cortexApi';

const username = 'yakir';
const password = 'mypass123';

const ApiDemo = ({ getTokensAndSetAuthHeader }) => {

    const handleLoginClick = () =>
        getTokensAndSetAuthHeader(username, password);        

    return (
        <div>
            <div>API Demo</div>
            <button onClick={ handleLoginClick }>Login</button>
        </div>
    );
}

const mdtp = {
    getTokensAndSetAuthHeader,
};

export default connect(null, mdtp)(ApiDemo);