import {useState,useCallback} from 'react';

type UseToogleHook = [boolean, (val?: any) => void];

export default (defaultValue = false): UseToogleHook  => {
	const [value,setValue] = useState(defaultValue);
	const toggleValue = useCallback((val?: any) => {
		if(val && typeof val === 'boolean') setValue(val);
		else setValue(prev => !prev)
	},[]) 
	return [value, toggleValue]
}