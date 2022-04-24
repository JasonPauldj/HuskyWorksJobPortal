import React from 'react';
// Add css file here


const NewProjectForm = () => {
    return (
            <form>
                <div className='new-project__controls'>
                <label> Project Title <input name="project_title" /></label>
                <label> Start Date <input type="date" name="start_date" /></label>
                <label> End Date <input type="date" name="end_date" /></label>
                <label> Location <input name="location" /></label>
                <label> Description <input name="project_description" /></label><br/>
                </div>
                <div className='new-education__actions'>
                    <button type="submit">Save Details</button>
                </div>
            </form>
    )
};

export default NewProjectForm;