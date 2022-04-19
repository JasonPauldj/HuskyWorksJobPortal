import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function FilterSectionComponent(props){

    const handleCheckboxChange = (event) =>{
        props.handleCheckboxChange(event.target.id)
    }

    //recevies an array of the values consisting of the filter options
    const Checkboxes = props.values.map((filterValue)=>{
     return(   
     <FormControlLabel key={filterValue}
        label={filterValue}
        control={<Checkbox checked={props.isChecked(filterValue)} onChange={handleCheckboxChange} inputProps={{id:filterValue, name:filterValue}}/>}
      />
      
      )
    })

    return(<>
    <h3 className="filterItem">{props.heading}</h3>
    {Checkboxes}
    </>)


}

export default FilterSectionComponent;