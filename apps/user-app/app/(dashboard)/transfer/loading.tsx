
import ClipLoader from "react-spinners/ClipLoader";


export default function(){
 
    return <div className="flex w-screen items-center justify-center h-screen">
        <div className="flex items-center justify-center m">
        <ClipLoader
color={"#00000"}
loading={true}

size={150}
aria-label="Loading Spinner"
data-testid="loader"
/>
        </div>
    </div>

}