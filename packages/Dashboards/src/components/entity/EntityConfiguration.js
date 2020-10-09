import React from 'react'
import { withRouter } from 'react-router-dom'

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} EntityConfiguration site with provided configs for entity
 * routed at /entity/configuration
 */
const EntityConfiguration = (props) => {
    return (
        <div>EntityConfiguration</div>
    )
}

export default withRouter(EntityConfiguration)