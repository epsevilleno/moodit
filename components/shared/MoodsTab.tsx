import { redirect } from "next/navigation";
import MoodCard from "../cards/MoodCard";
import { fetchUserPosts } from "@/lib/actions/user.actions";


interface Props{
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const MoodsTab = async ({ currentUserId, accountId, accountType,}: Props) => {
    let result = await fetchUserPosts(accountId);

    if(!result) redirect('/')
    // w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5
    return (
        <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
            {result.moods
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((mood:any) => (
                    <div key={mood._id} className="p-1 rounded-lg shadow-md bg-chilean-pink-0 border border-misty-rose rounded-2xl"> 
                    <MoodCard 
                        key={mood._id}
                        id={mood._id}
                        currentUserId={currentUserId}
                        parentId = {mood.parentId}
                        content= {mood.text}
                        moodImage= {mood.moodImage}
                        author = {
                            accountType === 'User'
                            ? { name: result.name, image: result.image, id: result.id }
                            : { name: mood.author.name, image: mood.author.image, id: mood.author.id }
                        }
                        createdAt = {mood.createdAt}
                        />
                    </div>
                ))} 
        </section> 

    )
}

export default MoodsTab;