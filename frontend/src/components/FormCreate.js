import React, { useState } from "react";
import axios from 'axios';


const POST_MEMBER_API = "http://127.0.0.1:8000/api/member";
export default function Info(Props) {
    const [message, setMessage] = useState('');
    let initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    };
    let checkedValue = "1";

    if ("member" in Props) {
        const { member } = Props;
        initialValues = {
            first_name: member.member.first_name,
            last_name: member.member.last_name,
            email: member.member.email,
            phone: member.member.phone
        }
        checkedValue = member.member.role;
    }

    let teamId = '';
    if ("teamId" in Props) {
        teamId = Props.teamId;
    }

    const [values, setValues] = useState(initialValues);
    const [checkedOption, setCheckedOption] = useState(checkedValue);
    const handleInputChange = (e) => {
        console.log("handleInputChange");
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    };
    const handleOptionChange = (e) => {
        setCheckedOption(e.target.value);
    }

    const handleOnSumbit = (e) => {
        e.preventDefault();
        let flag = true;
        if (values.first_name === "" || values.last_name === "" || values.email === "" || values.phone === "") {
            alert("Please fill all the fields");
            flag = false
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!values.email.match(validRegex)) {
            setMessage("Please enter a valid email address");
            flag = false;
        }

        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (!values.phone.match(re)) {
            setMessage("Please enter a valid phone number");
            flag = false;
        }
        const member = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            role: checkedOption,
            team: teamId
        };
        if (flag) {
            axios({
                method: 'post',
                url: POST_MEMBER_API,
                data: member
            }).then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    setMessage("Member added successfully");
                    window.location.reload();
                } else {
                    setMessage("Member not added");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };


    return (
        <div>
            <div className="flex flex-col justify-center w-9/12">
                <form className='input-search' onSubmit={handleOnSumbit}>
                    <div><h2>Info</h2></div>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            onChange={handleInputChange}
                            defaultValue={values.first_name === undefined ? "" : values.first_name}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={handleInputChange}
                            defaultValue={values.last_name === undefined ? "" : values.last_name}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            name='email'
                            onChange={handleInputChange}
                            defaultValue={values.email === undefined ? "" : values.email}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            name='phone'
                            onChange={handleInputChange}
                            defaultValue={values.phone === undefined ? "" : values.phone}
                            className="input input-bordered w-full max-w-xs" />
                    </div>

                    <h2>role</h2>
                    <div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Regulat - Can't delete members</span>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    value="1"
                                    checked={checkedOption === "1"}
                                    onChange={handleOptionChange}
                                    className="radio checked:bg-red-500"
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Admin - Can delete members</span>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    value="0"
                                    checked={checkedOption === "0"}
                                    onChange={handleOptionChange}
                                    className="radio checked:bg-blue-500" />
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-info" type='submit' >Submit</button>
                    {message && (<p className="error"> {message} </p>)}
                </form>
            </div>

        </div>

    )
}
