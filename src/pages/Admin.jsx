import Footer from '@/components/footer'
import Header from '@/components/header'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

const Home = () => {
    const queryClient = useQueryClient();
    const [selectedRole, setSelectedRole] = useState({});

    const fetchUsersList = async () => {
        const response = await axios.get('http://localhost:8080/api/admin')
        console.log(response.data)
        return response.data
    }

    const { data } = useQuery({
        queryKey: ['usersList'],
        queryFn: fetchUsersList,
    });

    const updateRole = async ({ userId, role }) => {
        const response = await axios.put('http://localhost:8080/api/admin/updaterole', {
            user_id: userId,
            role: role,
        })
        return response.data
    }

    const { mutate } = useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries(['usersList']);
        },
        onError: (error) => {
            console.error('Failed to update role:', error);
        },
    })

    const handleRoleChange = (userId, value) => {
        setSelectedRole((prev) => ({
            ...prev,
            [userId]: value,
        }));
    };

    const handleUpdateRoles = () => {
        Object.entries(selectedRole).forEach(([userId, role]) => {
            mutate({ userId, role });
        });
        setSelectedRole({});
    };

    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <div className='flex py-5 grow items-center'>
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
                        {data?.map((user) => (
                            <TableRow key={user.user_id} >
                                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end">
                                        <Select onValueChange={(value) => handleRoleChange(user.user_id, value)}>
                                            <SelectTrigger className="w-[150px]">
                                                <SelectValue placeholder="Change role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Roles</SelectLabel>
                                                    <SelectItem value="User">User</SelectItem>
                                                    <SelectItem value="Manager">Manager</SelectItem>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <Button className='w-[100px] mx-auto hover:cursor-pointer' onClick={handleUpdateRoles}>Update</Button>
            <Footer />
        </main>
    )
}

export default Home