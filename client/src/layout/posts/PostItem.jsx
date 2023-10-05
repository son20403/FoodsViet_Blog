import { Link } from "react-router-dom"
import { Heading } from "../../components/heading"
import Avatar from "../customers/Avatar"
import DataPost from "./DataPost"
import { useSelector } from "react-redux"

const PostItem = ({ isHome, data = {} }) => {
    const { customers } = useSelector((state) => state.customers);
    const { comments } = useSelector((state) => state.comments);
    const dataCustomer = customers.filter((cus) => cus._id === data?.id_customer)
    const commentByPosts = comments.filter((comment) => comment?.id_post === data?._id);
    return (
        <div className={`overflow-hidden border shadow-soft rounded-xl flex flex-col relative h-full
        ${isHome ? 'post_item first:col-span-2 lg:first:shadow-transparent group' : ''}`}>
            <Link to={`/detail/${data.slug}`}
                className='post_item-img relative w-full flex-shrink-0 pb-[56.25%] overflow-hidden'>
                <img src={data?.image} alt={data.title} className='absolute top-0 left-0 w-full h-full object-cover
                hover:scale-125 transition-all duration-500
                ' />
            </Link>
            <div className="post_item-content flex-1 h-full">
                <div className=" flex flex-col w-full flex-1 h-full ">
                    <div className='m-2 lg:m-5 flex-1 flex flex-col h-full'>
                        <div className='h-full'>
                            <Link className="h-full flex group-first:items-end" to={`/detail/${data.slug}`}>
                                <Heading className='text-xs leading-5 lg:text-lg font-medium mb-4 text-inherit 
                                group-first:text-xl lg:group-first:text-2xl '>
                                    {data.title}
                                </Heading>
                            </Link>
                        </div>
                        <div className='flex items-center gap-x-2 lg:gap-x-4 mt-auto group-first:justify'>
                            <Avatar image={dataCustomer[0]?.image}></Avatar>
                            <p className='text-[11px] lg:text-sm font-medium'>{dataCustomer[0]?.full_name}</p>
                        </div>
                    </div>
                    <DataPost timestamps={data?.timestamps} comments={commentByPosts?.length}
                        likes={data?.likes}></DataPost>
                </div>
            </div>
        </div>
    )
}
export default PostItem

{/* <div className='flex text-[12px] lg:text-base items-center text-yellow-600 gap-1 mb-1'>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div> */}