import { Link } from "react-router-dom"
import { Heading } from "../../components/heading"
import DataPost from "./DataPost"
import { useSelector } from "react-redux"
import FileIcon from "../../components/Icon/FileIcon"
import { useEffect } from "react"

const PostItem = ({ data = {}, isSingle }) => {
    const { comments } = useSelector((state) => state.comments);
    const { categories } = useSelector((state) => state.categories);
    const dataCategory = categories.filter((cate) => cate._id === data?.category)
    const commentByPosts = comments.filter((comment) => comment?.id_post === data?._id);

    useEffect(() => {
        const divElements = document.querySelectorAll('.content_post.post_item div');
        const pElements = document.querySelectorAll('.content_post.post_item p');
        divElements?.forEach(div => {
            if (div.textContent.trim() === '')
                div.style.display = 'none';
        });
        pElements?.forEach(p => {
            if (p.textContent.trim() === '')
                p.style.display = 'none';
        });
    }, []);
    return (
        <div className={`overflow-hidden col-span-2 flex flex-col md:flex-row  h-full border-b lg:pb-5 pb-0 gap-5
        ${isSingle ? 'md:flex-col !col-span-1' : ''}
        `}>
            <Link to={`/detail/${data.slug}`}
                className={`w-full overflow-hidden h-full  lg:max-w-[238px] lg:h-[238px] 
                ${isSingle ? 'lg:max-w-full md:max-h-[200px] ' : ''}`}>
                <img src={data?.image} alt={data.title} className=' w-full h-full object-cover
                hover:scale-125 transition-all duration-500'/>
            </Link>
            <div className={`flex flex-col w-full  lg:p-2  gap-y-2  ${isSingle ? 'flex-1 h-full' : ''}`}>
                <div className="flex gap-x-2 text-primary font-medium mb-auto "><FileIcon />
                    <p className="text-[11px] uppercase lg:text-sm">{dataCategory[0]?.title}</p>
                </div>
                <div className=' flex flex-col  gap-y-5 h-full '>
                    <Link className="" to={`/detail/${data.slug} `}>
                        <Heading className='text-base leading-5 font-medium text-inherit  lg:text-xl uppercase'>
                            {data.title}
                        </Heading>
                    </Link>
                    <div className="line-clamp-4 lg:line-clamp-3">
                        <div dangerouslySetInnerHTML={{ __html: data?.content }}
                            className='content_post post_item !font-normal !text-gray-200' />
                    </div>
                </div>
                <DataPost timestamps={data?.timestamps} comments={commentByPosts?.length}
                    likes={data?.likes}></DataPost>
            </div>
        </div>
    )
}
export default PostItem