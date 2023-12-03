import PostMood from "@/components/forms/PostMood";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
        <>
            <h1 className="head-text text-chilean-pink-0">Create Mood</h1>
            <PostMood userId={userInfo._id} />
        </>
    )

}

export default Page;