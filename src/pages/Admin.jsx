import Footer from '@/components/footer'
import Header from '@/components/header'
import Combobox from "@/components/ui/combobox"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'

const Home = () => {
    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <div className='flex grow items-center'>
                <Table className='border-2 w-10/12 mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead >Current Role</TableHead>
                            <TableHead className="text-right">Change Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>John Doe</TableCell>
                            <TableCell>john.doe@example.com</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>
                                <div className="flex justify-end">
                                    <Combobox />
                                </div>
                            </TableCell>                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Footer />
        </main>
    )
}

export default Home