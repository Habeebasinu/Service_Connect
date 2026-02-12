import React, { useState } from 'react'
import { ServiceAdd } from '../../api/api.jsx'
import { useNavigate } from 'react-router-dom'

function AddServices() {
  const [inp, setInp] = useState({
    companyname: "",
    service: "",
    employee: "",
    price: "",
    desc: "",
    accountstatus: "",
    date: "",
    img: null
  })

  const nav = useNavigate()
  const id = localStorage.getItem('id')

  const change = (e) =>
    setInp({ ...inp, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(inp).forEach(key =>
      formData.append(key, inp[key])
    )
    try {
      await ServiceAdd(id, formData)
      nav("/provider/service")
    } catch (error) {
      console.log("Service not added:", error)
      alert("Failed to add service. Check console for details.")
    }
  }

  return (
    <div className="min-h-screen  from-purple-100 via-purple-50 to-white flex items-center justify-center p-4 sm:p-6">
      
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="hidden md:flex flex-col justify-center gap-6 px-4">
          <h2 className="text-3xl font-extrabold text-purple-700">
            Add New Service
          </h2>
          <p className="text-gray-600">
            Fill in the details below to add your service.
            Make sure all information is accurate before submission.
          </p>
          <img
            src="https://img.icons8.com/ios/500/worker-male.png"
            alt="Service"
            className="w-3/4 mx-auto mt-4"
          />
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <h2 className="md:hidden text-2xl font-bold text-purple-700 text-center mb-2">
            Add New Service
          </h2>

          <input
            type="text"
            name="companyname"
            onChange={change}
            value={inp.companyname}
            placeholder="Company Name"
            className="input-style"
            required
          />

          <input
            type="date"
            name="date"
            onChange={change}
            value={inp.date}
            className="input-style"
            required
          />

          <input
            type="text"
            name="service"
            onChange={change}
            value={inp.service}
            placeholder="Service Name"
            className="input-style"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="employee"
              onChange={change}
              value={inp.employee}
              placeholder="Available Employees"
              className="input-style"
              required
            />
            <input
              type="text"
              name="price"
              onChange={change}
              value={inp.price}
              placeholder="Wage / Hour (₹)"
              className="input-style"
              required
            />
          </div>

          <textarea
            rows="3"
            name="desc"
            onChange={change}
            value={inp.desc}
            placeholder="Service Description"
            className="input-style"
            required
          />

          <input
            type="file"
            onChange={(e) =>
              setInp({ ...inp, img: e.target.files[0] })
            }
            className="input-style py-2"
          />

          <select
            name="accountstatus"
            onChange={change}
            value={inp.accountstatus}
            className="input-style"
            required
          >
            <option value="">Select Status</option>
            <option>Available</option>
            <option>Not Available</option>
          </select>

          <button
            type="submit"
            className="mt-4 py-3 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 shadow-lg transition"
          >
            Add Service
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddServices
