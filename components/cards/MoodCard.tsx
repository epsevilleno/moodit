import Link from "next/link";
import Image from "next/image";
import DeleteMood from "../forms/DeleteMood";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    moodImage: string;
    author: {
        name: string;
        image: string;
        id: string;
    
    }
    createdAt: string;
}

const MoodCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    createdAt,
    moodImage,
}: Props) => {

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    const formattedTime = new Date(createdAt).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

      return (
    <div className="">
        <div className="flex flex-row p-5 bg-chilean-pink-0 rounded-2xl">
            <div>
            <Link href={`/mood/${id}`}>
            <div className="relative mb-2 h-150 w-full max-w-150">
                {moodImage ? (
                    <Image 
                    src={moodImage}
                    alt="Mood Image"
                    className="object-cover rounded-md w-full"
                    layout="responsive"
                    width={150}
                    height={150}
                    />
                    ): null }
            </div> 

            <div className="flex flex-col">
                <p className="heading2-semibold overflow-y-auto mt-3 text-chilean-snow break-words">{content}</p>
                <div className="flex-col flex-center text-light-3">
                    <p className="mt-3 lg:small-regular text-snow-1 mt-2 mb-2">
                        {formattedDate} {formattedTime}
                    </p>
                        
                    <DeleteMood
                        moodId={JSON.stringify(id)}
                        currentUserId="currentUserId"
                        authorId={author.id}
                        parentId={parentId}
                    />
                    
                </div>
            </div> 
            </Link>
            </div>
            
        </div>
    </div>

            /* the current sakto one
            <div className="flex flex-row p-8 bg-dark-2 border border-dark-4 rounded-2xl">
            <div>

            <div className="relative mb-2 h-150 w-150">
                {moodImage ? (
                    <Image 
                    src={moodImage}
                    alt="Mood Image"
                    className="object-cover rounded-md w-full"
                    layout="fixed"
                    width={150}
                    height={150}
                    />
                    ): null }
            </div> 

            <div className="flex flex-col">
                <p className="overflow-y-auto mt-3 text-light-1">{content}</p>
                <div className="flex-col flex-center text-light-3">
                    <p className="mt-3 subtle-semibold lg:small-regular ">
                        {formattedDate} {formattedTime}
                    </p>
                        
                    <DeleteMood
                        moodId={JSON.stringify(id)}
                        currentUserId="currentUserId"
                        authorId={author.id}
                        parentId={parentId}
                    />
                    
                </div>
            </div> 
            </div>
        </div>
            
            
            
            ====
            
            <div className="flex bg-dark-2 border border-dark-4 rounded-2xl">
            / <DeleteMood
                moodId={JSON.stringify(id)}
                currentUserId={currentUserId}
                authorId={author.id}
                parentId={parentId}
            />
            <div className="flex-1">
                <div className="p-4 rounded-md">
                    <Link href={`/mood/${id}`}>
                        <div className=" relative mb-2 h-50 w-50">
                            {moodImage ? (
                            <Image 
                                src={moodImage}
                                alt="Mood Image"
                                className="object-cover rounded-md h-50 w-50"
                                layout="responsive"
                                width={50}
                                height={50}
                            />
                            ): null }
                        </div> 

                        <div className="overflow-y-auto h-16 text-light-1">
                            <p>{content}</p>
                            <div className="flex-center gap-2 text-light-3">
                                <p className="subtle-semibold lg:small-regular ">
                                    {formattedDate} {formattedTime}
                                </p>
                            </div>
                        </div> 
                    </Link>
                </div>
            </div>
        </div>        
        
        <div className="flex-row post-mood">
            <div className="flex-between">
                <Link href={`/mood/${id}`}>
                    <div className="relative h-100 items-center">
                    {moodImage ? (
                        <Image 
                            src={moodImage}
                            alt="Mood Image"
                            className="post-mood_img rounded-md"
                            width={100}
                            height={100}
                        />
                    ): 
                        null
                    }
                    </div>
                    <div className="small-medium lg:base-medium py-5 text-light-1">
                        <p>{content}</p>
                    </div>

                    
                </Link>

                <div className="flex items-center gap-3">
                    
                    <div className="flex flex-col">

                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">
                                {formattedDate} {formattedTime}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div> */
    )

}

export default MoodCard;