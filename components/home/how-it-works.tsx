import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";


type Step = {
  icon: React.ReactNode;
  label: string;
  description: string;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      icon:<FileText size={64} strokeWidth={1.5}/>,
      label:"Upload your PDF",
      description:"Simply drag and drop your PDF document or click to upload",
    },
    {
      icon:<BrainCircuit size={64} strokeWidth={1.5}/>,
      label:"AI Analysis",
      description:"Our Advanced AI processes and analyzes your document instantly",
    },
    {
      icon:<FileOutput size={64} strokeWidth={1.5}/>,
      label:"Get Summary",
      description:"Recieve a clear , concise summary of your document"
    }
  ]
  return (
    <section className="relative overflow-hidden bg-gray-50">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(50.1% 0.1%, 61% 35.6%, 98.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>  
      <div className="text-center mb-16">
        <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">How it works</h2>
        <h3 className="font-bold text-3xl max-w-2xl mx-auto">
          Transform any PDF into an easy-to-digest summary in three simple steps
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
        {steps.map((step,idx)=>(
          <div className="relative flex items-stretch">
            <StepItem key={idx} {...step} />
            {idx<steps.length-1 && (
            <div className="hidden md:block top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <MoveRight size={32} strokeWidth={1} className="text-rose-400"></MoveRight>
            </div>
            )}
          </div>
          
        ))}
      </div>
    
    </section>
  )
}

function StepItem({icon,label,description}:Step){
  return(
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to transperant group-hover:from-rose-500/20 transition-colors">
        <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
        <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
        
      </div>
      
    </div>
  )
}

