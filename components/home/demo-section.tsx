import { Pizza } from "lucide-react"
import { SummaryViewer } from "../summaries/summary-viewer"

const DEMO_SUMMARY = `
# 📌 Revolutionary SaaS Business Plan: The Future of Document Intelligence
- ✨ A comprehensive strategy to launch an AI-powered document management platform that transforms how businesses process and analyze critical information
- 🧠 The convergence of AI and document processing represents a $6.8B market opportunity with unprecedented growth potential

## 🗂️ Document Info
- 📄 Type: Strategic Business Plan
- 🎯 Audience: Investors, Entrepreneurs, Tech Leaders

## 💡 Highlights
- 🔑 AI-powered document summarization addresses critical pain points in information processing
- 🔑 Projected $2.5M revenue in year one with 1,000 active subscribers
- 🔑 Enterprise-grade security with GDPR compliance and end-to-end encryption

## 🧭 Why It Matters
- 💥 In today's information-heavy business environment, professionals waste 2.5 hours daily searching through documents. This platform eliminates that inefficiency by instantly transforming complex documents into actionable insights, enabling faster decision-making and dramatically improving productivity across organizations.

## 🧵 Main Takeaways
- 🔍 Market validation shows strong demand for automated document analysis tools
- 💪 Competitive advantage through advanced AI and intuitive user experience
- 🎯 Clear path to profitability with break-even projected by month 18

## 💼 Pro Tips
- 🛠️ Focus on B2B sales through direct outreach and strategic partnerships
- 💎 Implement agile development methodology to rapidly iterate based on user feedback
- 📈 Diversify revenue streams early to mitigate market risks and ensure sustainable growth

## 🧠 Key Terms
- 📘 NLP (Natural Language Processing): AI technology that helps computers understand human language
- 📗 SaaS (Software as a Service): Cloud-based software delivered through subscription model
- 📙 MVP (Minimum Viable Product): Basic version of product with core features for early testing

## 🏁 Final Thought
- 🧠 Success in the document intelligence space requires balancing cutting-edge AI capabilities with user-friendly design - the companies that master this balance will dominate the next decade of business productivity tools
`

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(50.1% 0.1%, 61% 35.6%, 98.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-600" />
          </div>
          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Resumen transforms{" "}
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">your PDF</span>{" "}
              documents into summaries
            </h3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6 w-full">
            <div className="w-full max-w-4xl">
              <SummaryViewer summary={DEMO_SUMMARY} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
