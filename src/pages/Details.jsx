import { useParams } from 'react-router';
import useDetails from '../hooks/useDetails';
import Spinner from "../components/Spinner"

function Details() {
    const { id } = useParams();
    const { loading,details } = useDetails({ id });

    return (
        <div className='px-4 py-8 container mx-auto'>
            {loading && <Spinner/>}
            {details && (
                <div>
                    <h1 className="text-3xl first-letter:capitalize font-bold mb-4">{details.title}</h1>
                    <p className='first-letter:capitalize'>{details.body}</p>
                </div>
            )}
        </div>
    );
}

export default Details;
