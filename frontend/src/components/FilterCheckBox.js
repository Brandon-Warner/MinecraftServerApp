import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { makeStyles, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    filterCheckBox: {
        margin: '0 auto',
    },
}))

const FilterCheckBox = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <FormControl className={classes.filterCheckBox} component='fieldset'>
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
