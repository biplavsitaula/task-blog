import { useEffect, useState } from 'react'
import SearchComponent from '../components/Search';
import CardSkeleton from '../components/CardSkeleton';
import Error from '../components/Error';
import { usePosts } from '../hooks/usePosts';
import useQueryParams from '../hooks/useQueryParams';
import PostCard from '../components/PostCard';

function Home() {
    const { searchParams, pageParams, handleSearch, handlePageChange } = useQueryParams()
    const { data, loading, error, totalPages } = usePosts({ page: pageParams });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pageParams]);

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between mb-4 '>
                <h1 className='text-3xl font-bold'>Posts</h1>
                <SearchComponent searchTerm={searchParams} onSearch={handleSearch} />
            </div>
            {/* {data && <GenreComponent />} */}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {loading
                    && Array.from({ length: 10 }).map((_, i) =>
                        <CardSkeleton key={i} />
                    )}
            </div>

            {error && <Error>{error.message}</Error>}

            {!loading && data && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {data?.posts?.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>}

            <div className='mt-4 mx-auto w-fit'>
                <button className='cursor-pointer bg-black text-white px-4 py-2 rounded' onClick={() => handlePageChange(Number(pageParams) - 1)}>Prev</button>
                <span style={{ margin: "0 10px" }}>{pageParams || 1} / {totalPages}</span>
                <button className='cursor-pointer bg-black text-white px-4 py-2 rounded' onClick={() => handlePageChange(Number(pageParams) + 1)}>Next</button>
            </div>



        </div >
    )
}

export default Home