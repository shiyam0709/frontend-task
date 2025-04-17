import Header from '@/components/header'
import {
    Table,
    TableBody,
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
import { useUser } from '@/context/UserContext';

const Home = () => {
    const { userInfo } = useUser();
    const queryClient = useQueryClient();
    const [selectedRole, setSelectedRole] = useState({});

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/api/products')
        return response.data
    }

    const fetchSales = async () => {
        const response = await axios.get('http://localhost:8080/api/sales/all')
        return response.data
    }

    const fetchUsersList = async () => {
        const response = await axios.get('http://localhost:8080/api/admin')
        return response.data
    }

    const { data } = useQuery({
        queryKey: ['usersList'],
        queryFn: fetchUsersList,
    });

    const { data: productsData } = useQuery({
        queryKey: ['productsList'],
        queryFn: fetchProducts,
    });

    const { data: salesData } = useQuery({
        queryKey: ['salesList'],
        queryFn: fetchSales,
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
            alert('Failed to update role', error);
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
            <div className='flex pt-5 grow items-center'>
                {location.pathname !== '/admin' && (
                    <Table className='border-2 w-8/12 mx-auto'>
                        <TableHeader>
                            {location.pathname === '/' &&
                                <TableRow>
                                    <TableHead>Product id</TableHead>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Prize</TableHead>
                                </TableRow>
                            }
                            {location.pathname === '/admin/sales' &&
                                <TableRow>
                                    <TableHead>Sale id</TableHead>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Prize</TableHead>
                                </TableRow>
                            }
                            {location.pathname === '/admin/users' &&
                                <TableRow>
                                    <TableHead>User id</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Region</TableHead>
                                </TableRow>
                            }
                        </TableHeader>
                        <TableBody>
                            {location.pathname === '/' && productsData?.map((product) => (
                                <TableRow key={product.productId}>
                                    <TableCell>{product.productId}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                </TableRow>
                            ))}
                            {location.pathname === '/admin/sales' && salesData?.map((sale) => (
                                <TableRow key={sale.sale_id}>
                                    <TableCell>{sale.sale_id}</TableCell>
                                    <TableCell>{sale.product_name}</TableCell>
                                    <TableCell>{sale.region}</TableCell>
                                    <TableCell>{sale.sale_date}</TableCell>
                                    <TableCell>{sale.sale_amount}</TableCell>
                                </TableRow>
                            ))}
                            {location.pathname === '/admin/users' && data?.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.region}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {location.pathname === '/admin' && (
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
                )}
            </div>
            {location.pathname === '/admin' &&
                <Button className='w-[100px] mx-auto mb-5 hover:cursor-pointer' onClick={handleUpdateRoles}>
                    Update
                </Button>
            }
        </main>
    )
}

export default Home