"use client"

import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { useState } from 'react'
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from 'next/navigation';

function Topbar () {

    const router = useRouter();
    const pathname = usePathname();

    const { userId } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <section>
        <nav className="topbar fixed">
            <div className="flex items-center gap-4">
                <button onClick={toggleDrawer} className="">
                    <Image src="/assets/menu.svg" alt="menu" width={35} height={35} />
                </button>
            </div>

            <Link href="/" className="flex items-center gap-4">
                <div className=" flex items-center gap-4">
                    <Image src="/assets/logo.svg" alt="logo" width={35} height={35} />
                    <p className="text-heading3-bold text-light-1 max-xs:hidden">Mood.it</p>
                </div>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg" 
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>                
            </div>
        </nav>

        {isDrawerOpen && (
            <>
            <div className="fixed top-0 left-0 w-full h-full bg-chilean-pink-2 opacity-20 z-10" onClick={toggleDrawer}></div>
                <div className="leftsidebar z-20">
                    <div className="flex w-full flex-1 flex-col px-10 gap-6">
                        {sidebarLinks.map((link) => {
                            const isActive = (pathname.includes (link.route) && link.route.length > 1) || pathname === link.route;
                                if (link.route === "/profile") link.route = `${link.route}/${userId}`;
                                    return (
                                        <Link 
                                            href={link.route}
                                            key={link.label}
                                            className={`leftsidebar_link ${isActive && 'bg-peach-puff'}`}
                                        >
                                            <Image 
                                                src={link.imgURL}
                                                alt={link.label}
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'text-dark-byzantium'}`}
                                            />
                                            <p className={`text-light-1 max-lg:hidden ${isActive && 'text-dark-byzantium'}`}>{link.label}</p>
                                        </Link>
                                    )}
                        )}

                    </div>
                    
                    <div className="mt-10 px-10">
                        <SignedIn>
                            <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                                <div className="flex cursor-pointer gap-4 p-4">
                                    <Image
                                        src="/assets/logout.svg" 
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
                                    <p className="text-light-2 max-lg:hidden">Logout</p>
                                </div>
                            </SignOutButton>
                        </SignedIn>
                    </div>
                </div>
            </>
        )}
    </section>
    )
}

export default Topbar;