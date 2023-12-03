import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions"; 
import { redirect } from "next/navigation"; 

async function Page() {
    const user = await currentUser ();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect(`/profile/${user.id}`);

    const userData = {
        id: user?.id,
        objectId:  userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || " ",
        bio: userInfo?.bio || " ",
        image: userInfo?.image || user?.imageUrl,
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text text-chilean-pink-0">Onboarding</h1>
            <p className="mt-3 text-base-regular text-chilean-pink-0">
                Finish setting up your profile to experience Mood.it
            </p>

            <section className="mt-9 bg-snow p-10">
                <AccountProfile 
                    user={userData} 
                    btnTitle="Continue" 
                />
            </section>
        </main>
    )
}

export default Page;