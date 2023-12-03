import MoodCard from "@/components/cards/MoodCard";
import { fetchMoodById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id:string }}) => {
    if(!params.id) return null;

    const user = await currentUser ();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const mood = await fetchMoodById(params.id);

    return (
    <section className="relative">
        <div>
            <MoodCard 
              key={mood._id}
              id={mood._id}
              currentUserId={user?.id || " "}
              parentId = {mood.parentId}
              content= {mood.text}
              author = {mood.author}
              createdAt = {mood.createdAt}
              moodImage = {mood.moodImage}
              //community = {post.community}
              //comments = {post.children}
            />
        </div>

        
    </section>
    )

}

export default Page;