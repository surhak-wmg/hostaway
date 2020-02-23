import React, { useMemo, memo } from 'react';

const Loader = () => {
    return useMemo(() => (
        <div>Loader</div>
    ), []);
};

export default memo(Loader);
