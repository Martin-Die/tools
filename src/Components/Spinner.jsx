import { RingLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    const loaderStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    };

    if (!loading) return null;

    return (
        <div style={loaderStyle}>
            <RingLoader size={150} />
        </div>
    );
};

export default Spinner;
