import React from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useLocation, useNavigate } from "react-router-dom"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useUser } from '@/context/UserContext'


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { setUserInfo } = useUser();

    const handleLogout = () => {
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <header className='flex p-3 items-center shadow shadow-gray-400'>
            <h3 className="pl-3 text-2xl font-semibold tracking-tight">
                {currentPath === '/login' ? 'Hey There!' : 'Hey Akshay!'}
            </h3>
            <div className='ml-auto flex items-center space-x-2'>
                <ThemeToggle />
                {currentPath === '/' && (
                    <Button className='hover:cursor-pointer' onClick={() => navigate("/admin")}>
                        Edit Roles
                    </Button>
                )}
                {currentPath !== '/login' && (
                    <>
                        <Button className='hover:cursor-pointer' onClick={handleLogout}>
                            Logout
                        </Button>
                        <Sheet>
                            <SheetTrigger>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8 text-black border-2 border-black dark:text-gray-200 dark:border-gray-200 rounded-full hover:cursor-pointer p-0.5"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M12 14c-5 0-8 3-8 6v2h16v-2c0-3-3-6-8-6z" />
                                </svg>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Profile Information :</SheetTitle>
                                    <SheetDescription>
                                        Take a look at your personal details.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 px-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="firstname" className="text-right">
                                            First Name
                                        </Label>
                                        <Input id="firstname" value="Pedro Duarte" tabindex="-1" readOnly className="col-span-3 hover:cursor-default" />
                                        <Label htmlFor="lastname" className="text-right">
                                            Last Name
                                        </Label>
                                        <Input id="lastname" value="Pedro Duarte" tabindex="-1" readOnly className="col-span-3 hover:cursor-default" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" value="@peduarte" tabindex="-1" readOnly className="col-span-3 hover:cursor-default" />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header