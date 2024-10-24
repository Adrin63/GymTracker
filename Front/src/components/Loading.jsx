import { Oval } from 'svg-loaders-react';

function Loading({ color = "#fdba74" }) {
    return (
        <div>
            <Oval fill={color} stroke={color} />
        </div>
    );
}

export default Loading;