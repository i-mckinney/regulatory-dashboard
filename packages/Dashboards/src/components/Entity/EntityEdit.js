import React from 'react'
import { withRouter } from 'react-router-dom'
import EntityForm from './EntityForm'
import entities from '../apis/entities'

/**
 * @param {Object} props Using the history property to route next component with data state and location for state object
 * @return {JSX} EntityEdit site with UserForm provided for edit entity
 * routed at /entity/edit/:id
 */
const EntityEdit = (props) => {
    const entity = { ...props.location.state }
    const id = entity._id
    delete entity._id
    delete entity.company_id


    /**
     * @param {object} editedUser represent object with edited entity props values
     */
    const editEntity = async (editedEntity) => {
        await entities.put(`/5f7e1bb2ab26a664b6e950c8/entities/${id}`, editedEntity)
        props.history.push("/entity")
    }

    return (
    <div>
        <EntityForm header="Edit Entity" initialEntity={entity} onSubmit={editEntity} />
    </div>
    )
}

export default withRouter(EntityEdit)
