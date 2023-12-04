import { useEffect } from "react";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();

  const {
    data: posts,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isPostLoading && !posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.pages.map((item) =>
              item?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))
            )}
          </ul>
          {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
