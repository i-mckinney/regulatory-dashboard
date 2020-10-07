import React from 'react'
import { withRouter } from 'react-router-dom'
import EntityForm from './EntityForm'
import { columnFields } from '../../config'

// initialEntity with preset data
const initialEntity = {}
columnFields.forEach((columnField) => {
    initialEntity[[columnField]] = ""
})

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} UserCreate site with UserForm provided for user creation
 * routed at /user/new
 */
const EntityCreate = (props) => {
    /**
     * @param {object} user represent user object with props values that it will create 
     */
    const createEntity = async (entity) => {
        console.log(entity)
        props.history.push({ pathname: "/entity", state: entity})
    }

    return (
    <div>
        <EntityForm header="Create Entity" initialEntity={initialEntity} onSubmit={createEntity} />
    </div>
    )
}

export default withRouter(EntityCreate)
