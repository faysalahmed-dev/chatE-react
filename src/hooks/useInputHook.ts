import { useState, useCallback, ChangeEvent } from 'react';

type UseInputHookI<StateI> = [
    StateI,
    (e: ChangeEvent<HTMLInputElement>) => any,
    () => void
];

export default (value = ''): UseInputHookI<string> => {
    const [state, setState] = useState(value);

    const setInputState = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }, []);

    const resetState = useCallback(() => setState(''), []);

    return [state, setInputState, resetState];
};
