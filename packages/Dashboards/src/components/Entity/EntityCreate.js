import React from 'react'
import { withRouter } from 'react-router-dom'
import EntityForm from './EntityForm'
import { columnFields } from '../../config'
import entities from '../apis/entities'

// initialEntity with preset data
const initialEntity = {}
columnFields.forEach((columnField) => {
    initialEntity[[columnField]] = ""
})

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} EntityCreate site with EntityForm provided for entity creation
 * routed at /entity/new
 */
const EntityCreate = (props) => {
    /**
     * @param {object} entity represent entity object with props values that it will create 
     */
    const createEntity = async (entity) => {
        entity["company_id"] = ""
        entity["createdAt"] = ""
        entity["updatedAt"] = ""
        entity["Actions"] = ""
        await entities.post("/5f7e1bb2ab26a664b6e950c8/entities", entity)
        props.history.push("/entity")
    }

    return (
    <div>
        <EntityForm header="Create Entity" initialEntity={initialEntity} onSubmit={createEntity} />
    </div>
    )
}

export default withRouter(EntityCreate)
