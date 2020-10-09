import React from 'react'
import { withRouter } from 'react-router-dom'

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} EntityCreate site with UserForm provided for entity creation
 * routed at /entity/new
 */
const EntityConfiguration = (props) => {
    return (
        <div>EntityConfiguration</div>
    )
}

export default withRouter(EntityConfiguration)