"use client"

import Image from "next/image";
import { usePathname, useSearchParams} from "next/navigation";

import { handleDeleteMood } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
    moodId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;

  }

  function reloadPage() {
    window.location.reload();
  }
function DeleteMood ({
    moodId,
    currentUserId,
    authorId,
    parentId,

}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [deleted, setDeleted] = useState(false);

    const handleClick = async () => {
        await handleDeleteMood (JSON.parse(moodId));
        setDeleted(true);
        reloadPage();

    }

    //if (currentUserId !== authorId || pathname === "/") return null;
    
    return (
        <Image
            src='/assets/delete.svg'
            alt='delete'
            width={18}
            height={18}
            className='cursor-pointer object-contain'
            onClick={handleClick}

        />
    )
}

export default DeleteMood;