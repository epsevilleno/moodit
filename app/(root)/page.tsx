import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from "next/image";
import { profileTabs } from "@/constants";
import MoodsTab from "@/components/shared/MoodsTab";

async function Page({ params }: { params: { id:string }}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            
            
            />

            <div className="mt-9">
                <Tabs defaultValue="moods" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image 
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={25}
                                    height={25}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden text-chilean-pink-2">{tab.label}</p>

                                {tab.label === 'Moods' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-chilean-pink-2">
                                        {userInfo?.moods?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}

                    </TabsList>
                    
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-{tab.label}`} value={tab.value} className="w-full text-light-1">
                                <MoodsTab 
                                    currentUserId={user.id}
                                    accountId={userInfo.id}
                                    accountType="User"
                                />                            
                        </TabsContent>
                    ))}

                </Tabs>
            </div>
        </section>
    )
}

export default Page;




/* import MoodCard from "@/components/cards/MoodCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();


  //can change the flex-col to flex-row to have a "boardlike effect later"
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-row flex-wrap gap-5">
        {result.posts.length === 0 ? (
          <p className="no-result">No Moods Found</p>
        ): (
          <>
          {result.posts.map((post) => (
            <MoodCard 
              key={post._id}
              id={post._id}
              currentUserId={user?.id || " "}
              parentId = {post.parentId}
              content= {post.text}
              author = {post.author}
              createdAt = {post.createdAt}
              moodImage = {post.moodImage}
            />
          ))}
          </>
        )}

      </section>
    </>
  )
} */