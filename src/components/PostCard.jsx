import { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router';

function PostCard({ post }) {

    return (
        <div className="post-card relative rounded-lg shadow-lg group overflow-hidden">
            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                    <picture>
                        <img
                            src={`https://placehold.co/600x320/png?text=${post.title.split(" ")[0].toUpperCase()}`}
                            alt="Author Avatar"
                            className="w-full h-full"
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
