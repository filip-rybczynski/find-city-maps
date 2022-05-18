import React from 'react';
import PropTypes from 'prop-types';

function APICallCounter ({callsRemaining}) {
return (
<span>
You have {callsRemaining} API calls left for today
</span>
)
}

APICallCounter.propTypes = {
    callsRemaining: PropTypes.number,
}

export default APICallCounter;