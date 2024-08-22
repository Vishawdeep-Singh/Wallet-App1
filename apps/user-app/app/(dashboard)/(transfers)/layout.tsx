import { TransferButtons } from "../../../components/TransferButtons"

export default function Layout({
    children
}:{
    children:React.ReactNode
}):JSX.Element{


    return <div className="w-full">
        
    <div className="text-6xl text-[#5640d7] pt-20 pl-10 font-bold">
        Transfer
    </div>
    <TransferButtons></TransferButtons>
    
        {children}
    </div>
}