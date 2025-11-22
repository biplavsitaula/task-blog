
import { Link } from 'react-router';
import image from '../assets/blog.jpg'

function PostCard({ post }) {

    return (
        <div className="post-card relative rounded-lg shadow-lg group overflow-hidden">
            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                    <picture className='w-full h-60'>
                        <img
                            src={image}
                            alt="Blog Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    </picture>

                </div>
                <Link to={`/${post.id}`}>
                    <h2 className="hover:underline text-lg mb-2 first-letter:capitalize">{post.title}</h2>
                </Link>
            </div>
        </div>
    );
}

export default PostCard;
