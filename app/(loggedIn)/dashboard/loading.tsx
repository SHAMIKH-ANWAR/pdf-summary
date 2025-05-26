import BgGradient from "@/components/common/bg-gradient";

function HeaderSkeleton(){
    return <div></div>
}


function SummaryCardSkeleton(){
    return (
        <div>
            
        </div>


export default function LoadingSummaries(){
    return(
        <div className="min-h-screen relative">
            <BgGradient className="from-emerald-200 via-teal-20 to-cyan-200"/>
            <section className="container px-10 py-24 mx-auto flex flex-col gap-4">
                <HeaderSkeleton/>
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SummaryCardSkeleton key={index} />
                    ))}
                </div>
            </section>
        </div>
    )
}