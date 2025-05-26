import BgGradient from "@/components/common/bg-gradient";

function HeaderSkeleton(){
    
}

export default function LoadingSummaries(){
    return(
        <div className="min-h-screen relative">
            <BgGradient className="from-emerald-200 via-teal-20 to-cyan-200"/>
            <section className="container px-10 py-24 mx-auto flex flex-col gap-4">

            </section>
        </div>
    )
}