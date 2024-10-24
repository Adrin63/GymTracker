import { Oval } from 'svg-loaders-react';

function Loading({ color = "#fdba74" }) {
    return (
        <div className='flex items-center justify-center'>
            <Oval fill={color} stroke={color} />
        </div>
    );
}

export default Loading;