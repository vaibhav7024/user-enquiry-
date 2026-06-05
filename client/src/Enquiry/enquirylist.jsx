import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export function EnquiryList({data,getAllenquiry,Swal ,setFormData}){
    let deleteRow = (delid)=>{

        // Swal.fire({
        //     title: "Do you want to save the data?",
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: "Save",

        //     }).then((result) => {
           
        //         if (result.isConfirmed) {

        //         axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
        //         .then((res)=>{
        //             toast.success(`Enquiry Deleted successfully`)
        //             getAllenquiry()
        //         })
        //     } else if (result.isDenied) {
        //         Swal.fire("Changes are not saved", "", "info");
        //     }
        //     });

    axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
        .then((res)=>{
            toast.success(`Enquiry Deleted successfully`)
            getAllenquiry()
        })

    }
    
    let editRow=(editid)=>{
        axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
        .then((res)=>{
            let data = res.data
            setFormData(data.enquiry)
        })
    }

    return(
        <div className='bg-gray-400 p-4'>
                <ToastContainer/>
                <h2 className='text-[20px] font-bold mb-4' > Enquiry List </h2>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableHeadCell>Sr. No</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>Message</TableHeadCell>
                            <TableHeadCell>Delete</TableHeadCell>
                            <TableHeadCell>Edit</TableHeadCell>
                        </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {
                                data.length>=1?
                                    data.map((item,index)=>{
                                        return(
                                            <TableRow key={index} className='bg-white dark:border-gray-700 dark:bg-gray-200'>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.phone}</TableCell>
                                                <TableCell>{item.message}</TableCell>
                                                <TableCell>
                                                    <button onClick={()=>deleteRow(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md' > Delete</button>
                                                </TableCell>
                                                <TableCell>
                                                    <button onClick={()=>editRow(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md' > Edit</button>
                                                </TableCell>
                                            </TableRow>
                                            
                                        )
                                    })
                                :
                                <TableRow className="bg-white dark:border-gray-200 dark:bg-gray-200">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 "> No data found </TableCell>
                                </TableRow>

                            }
                            
                        </TableBody>
                    </Table>
                    </div>
                </div>
    )
}
