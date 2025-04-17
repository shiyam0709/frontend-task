import Header from "@/components/header"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useUser } from "@/context/UserContext"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import axios from "axios"
import React from 'react'

const Manager = () => {
    const { userInfo } = useUser();
    const location = useLocation();

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/api/products')
        return response.data
    }

    const fetchSales = async () => {
        const response = await axios.post('http://localhost:8080/api/sales', {
            region: userInfo.region,
        })
        return response.data
    }

    const fetchUsers = async () => {
        const response = await axios.post('http://localhost:8080/api/user/region', {
            region: userInfo.region,
        })
        return response.data
    }

    const { data: productsData } = useQuery({
        queryKey: ['productsList'],
        queryFn: fetchProducts,
    });

    const { data: salesData } = useQuery({
        queryKey: ['salesList'],
        queryFn: fetchSales,
    });

    const { data: usersData } = useQuery({
        queryKey: ['usersList'],
        queryFn: fetchUsers,
    });

    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <div className='flex grow items-center'>
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
                        {location.pathname === '/manager/sales' &&
                            <TableRow>
                                <TableHead>Sale id</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Prize</TableHead>
                            </TableRow>
                        }
                        {location.pathname === '/manager/users' &&
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
                        {location.pathname === '/manager/sales' && salesData?.map((sale) => (
                            <TableRow key={sale.sale_id}>
                                <TableCell>{sale.sale_id}</TableCell>
                                <TableCell>{sale.product_name}</TableCell>
                                <TableCell>{sale.region}</TableCell>
                                <TableCell>{sale.sale_date}</TableCell>
                                <TableCell>{sale.sale_amount}</TableCell>
                            </TableRow>
                        ))}
                        {location.pathname === '/manager/users' && usersData?.map((user) => (
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
            </div>
        </main>
    )
}

export default Manager