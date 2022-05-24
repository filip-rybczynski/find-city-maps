import React from 'react';
import APICallCounter from "./../APICallCounter/APICallCounter";
import './footer.scss';

function Footer ({apiCallsLeft}) {
return (
<footer className={"footer"}>
    Footer placeholder
    <APICallCounter callsRemaining={apiCallsLeft}></APICallCounter>
</footer>
)
}

export default Footer;