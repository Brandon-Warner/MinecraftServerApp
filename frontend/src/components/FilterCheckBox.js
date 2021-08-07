import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const FilterCheckBox = ({ classes }) => {
    // const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <FormControl className={classes.filter} component='fieldset'>
            <RadioGroup row aria-label='position' name='position' defaultValue='top'>
                <FormControlLabel
                    value='NO_FILTER'
                    control={<Radio color='primary' />}
                    label='All'
                    labelPlacement='top'
                    onClick={() => dispatch(setFilter('NO_FILTER'))}
                />
                <FormControlLabel
                    value='BLOCKED_FILTER'
                    control={<Radio color='primary' />}
                    label='Blocked'
                    labelPlacement='top'
                    onClick={() => dispatch(setFilter('BLOCKED_FILTER'))}
                />
                <FormControlLabel
                    value='AVAILABLE_FILTER'
                    control={<Radio color='primary' />}
                    label='Available'
                    labelPlacement='top'
                    onClick={() => dispatch(setFilter('AVAILABLE_FILTER'))}
                />
            </RadioGroup>
        </FormControl>
    )
}

export default FilterCheckBox
