"use client";

export const TextInput=({
    placeholder,
    onChange,
    label,
    type
}:{
    placeholder:string;
    onChange: (value:string)=>void;
    label:string;
    type:string
})=>{
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline- focus:ring-blue-500 focus:border-blue-500 outline-[#8869f5] block w-full p-2.5" placeholder={placeholder} ></input>
    </div>
}