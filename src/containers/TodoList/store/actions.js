import {CHANGE_INPUT_VALUE} from './constants';

export const handleInputChange = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value,
})