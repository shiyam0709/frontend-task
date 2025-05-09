import Header from "@/components/header"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from 'react'


const Home = () => {
    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/api/products')
        return response.data
    }

    const { data } = useQuery({
        queryKey: ['productsList'],
        queryFn: fetchProducts,
    });

    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <div className='flex grow items-center'>
                <Table className='border-2 w-8/12 mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product id</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Prize</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((product, i) => (
                            <TableRow key={product.productId}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}

export default Home