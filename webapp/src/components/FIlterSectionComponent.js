import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function FilterSectionComponent(props){

    const handleCheckboxChange = (event) =>{
        props.handleCheckboxChange(event.target.id)
    }

    //recevies an array of the values consisting of the filter options
    const Checkboxes = props.values.map((filterValue)=>{
     return(   <FormControlLabel
        label={filterValue}
        control={<Checkbox checked={props.isChecked(filterValue)} onChange={handleCheckboxChange} inputProps={{id:filterValue}}/>}
      />)
    })

    return(<>
    {Checkboxes}
    </>)


}

export default FilterSectionComponent;