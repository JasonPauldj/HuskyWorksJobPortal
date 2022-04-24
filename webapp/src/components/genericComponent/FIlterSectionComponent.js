import classes from './FilterSection.module.scss'

function FilterSectionComponent(props) {

  const handleCheckboxChange = (event) => {
    props.handleCheckboxChange(event.target.id)
  }

  //recevies an array of the values consisting of the filter options
  const Checkboxes = props.values.map((filterValue) => {
    return (
      <div key={filterValue} className={classes.checkboxSection}>
      <input type="checkbox" id={filterValue} name={filterValue} onChange={handleCheckboxChange}/>
      <label>{filterValue}</label>
      </div >

      // <FormControlLabel key={filterValue}
      //   label={filterValue}
      //   control={<Checkbox checked={props.isChecked(filterValue)} onChange={handleCheckboxChange} inputProps={{ id: filterValue, name: filterValue }} />}
      // />

    )
  })

  return (
  <div className={classes.filterContainer}>
    <div className={classes.filterName}>{props.heading}</div>
    <div className={classes.checkboxContainer}>
      {Checkboxes}
    </div>
  </div>)


}

export default FilterSectionComponent;