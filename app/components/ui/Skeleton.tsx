export default function Skeleton({className= "",}:{
    className?: string
}){
    return(
        <div className={`annimate-pulse bg-gray-200
             dark:bg-gray-300 rounded-md ${className}`} 
        />
    )
}