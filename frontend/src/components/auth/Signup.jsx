import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>
                        Sign Up
                    </h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="tirth"></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" placeholder="tirth@gmail.com"></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="number" placeholder="tirth@gmail.com"></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" placeholder="tirth@gmail.com"></Input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup