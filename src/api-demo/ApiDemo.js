import React from 'react';
import { connect } from 'react-redux';
import { getTokens } from '../api/api';

const username = 'yakir';
const password = 'mypass123';

const ApiDemo = ({ getTokens }) => {

    const handleLoginClick = () =>
        getTokens(username, password)
            // .then(responseAction => {
            //     const { access_token } = responseAction.payload;
            //     setDefaultHeader('cortex', 'Authorization', `Bearer ${ access_token }`);
            //     console.log('logged in.', responseAction);
            // })
            // .catch(failureAction => {
            //     console.log('failed to log in.', failureAction);
            // });            

    return (
        <div>
            <div>API Demo</div>
            <button onClick={ handleLoginClick }>Login</button>
        </div>
    );
}

const mdtp = {
    getTokens,//: promisifyApiAction(getTokens),
};

export default connect(null, mdtp)(ApiDemo);