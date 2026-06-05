import React, { useEffect, useState } from 'react'
import { Button, Label, TextInput ,Textarea} from "flowbite-react";
import { EnquiryList } from './Enquiry/enquirylist';
import { ToastContainer, toast } from 'react-toastify';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export default function Enquiry() {
    let [enquiryList,setenquiryList] =useState([])

    let[formdata,setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        message:'',
        _id:''
    })

    let saveEnquiry = (e)=>{
        
        e.preventDefault();
        // let formdata={
        //     name:e.target.name.value,
        //     email:e.target.email.value,
        //     phone:e.target.phone.value,
        //     message:e.target.message.value
        // }
        if(formdata._id){
            // update ...
            axios.put(`http://localhost:8020/api/website/enquiry/update/${formdata._id}`,formdata)
            .then((res)=>{
                toast.success('Enquiry updated successfully')
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:'',
                    _id:''
                })
                getAllenquiry();
            })
        }else{
            // insert ...
            axios.post(`http://localhost:8020/api/website/enquiry/insert`,formdata)
            .then((res)=>{
                console.log(res.data);
                toast.success('Enquiry saved successfully');
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                })
                getAllenquiry();
            })
        }
    }
    let getAllenquiry = ()=>{
        axios.get(`http://localhost:8020/api/website/enquiry/view`)
        .then((res)=>{
            return res.data
        })
        .then((finalData)=>{
            if(finalData.status){
                setenquiryList(finalData.enquiryList)
            }
        })
    }

    let getValue= (e)=>{
        let inputdata = e.target.name // name,email,phone,message
        let inputValue = e.target.value
        let oldData={...formdata}
        oldData[inputdata]=inputValue;
        setFormData(oldData);
    }

    useEffect(()=>{
        getAllenquiry()
    },[])

  return (
    <div>
        <ToastContainer/>
        <h1 className='text-[40px] text-center py-6 font-bold ' >User Enquiry</h1>

        <div className='grid grid-cols-[30%_auto] gap-4' >
            <div className='bg-gray-400 p-4' >
                <h2 className='text-[20px] font-bold' > Enquiry Form </h2>
                <form action="" onSubmit={saveEnquiry}>
                    <div className='py-3'>
                        <Label htmlFor="name"> Your Name </Label>
                        <TextInput className='bg-white py-1' type="text" value={formdata.name} onChange={getValue} name='name' placeholder="Enter Your Name" required />

                    </div>
                    <div className='py-3'>
                        <Label htmlFor="email"> Your Email </Label>
                        <TextInput className='bg-white py-1' type="email" value={formdata.email} onChange={getValue} name='email' placeholder="Enter Your Email" required />

                    </div>
                    <div className='py-3'>
                        <Label htmlFor="phone"> Your phone number </Label>
                        <TextInput className='bg-white py-1' type="text" value={formdata.phone} onChange={getValue} name='phone' placeholder="Enter Your phone number" required />

                    </div>
                    <div className='py-3'>
                        <Label htmlFor="message" > Your Message </Label>
                        <Textarea className='bg-white py-1' name='message' value={formdata.message} onChange={getValue} placeholder="Enter Your Message..." required rows={4} />
                    </div>
                    <div className='py-3'>
                        <Button  type="submit" className='w-full py-3 text-black bg-blue-400' >
                            {formdata._id? 'Update':'Save'} </Button>
                    </div>
                </form>
            </div>
            <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} swal={swal} setFormData={setFormData} />

        </div>

    </div>
  )
}

