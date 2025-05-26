import { Pizza } from "lucide-react"
import { SummaryViewer } from "../summaries/summary-viewer"

const DEMO_SUMMARY = `
# Executive Summary
This comprehensive business plan outlines the strategic vision and operational framework for launching a revolutionary SaaS platform in the document management space.

The proposed solution addresses critical pain points in document processing and analysis.

Key financial projections indicate strong growth potential with projected revenues of $2.5M in year one.

Market research validates significant demand for automated document summarization tools.

# Market Analysis
The global document management market is experiencing unprecedented growth, valued at $6.8 billion in 2023.

Target demographics include legal professionals, researchers, and business analysts who process large volumes of documents daily.

Competitive landscape analysis reveals limited solutions offering AI-powered summarization capabilities.

Market penetration strategy focuses on B2B sales through direct outreach and strategic partnerships.

# Product Features
Core functionality includes advanced AI-powered document analysis using state-of-the-art natural language processing.

User interface designed for intuitive navigation with responsive design across all devices.

Integration capabilities with popular cloud storage platforms including Google Drive, Dropbox, and OneDrive.

Real-time collaboration features enabling team-based document review and annotation.

Enterprise-grade security with end-to-end encryption and compliance with GDPR and SOC 2 standards.

# Financial Projections
Year 1 revenue target: $2.5M with 1,000 active subscribers across basic and premium tiers.

Customer acquisition cost projected at $150 per user with lifetime value of $2,400.

Operating expenses include development costs, marketing spend, and infrastructure scaling.

Break-even analysis indicates profitability by month 18 with positive cash flow thereafter.

Investment requirements total $1.2M for initial development and 24-month runway.

# Implementation Timeline
Phase 1 (Months 1-3): MVP development and beta testing with select customers.

Phase 2 (Months 4-6): Public launch with basic feature set and initial marketing campaigns.

Phase 3 (Months 7-12): Feature expansion, enterprise sales, and international market entry.

Phase 4 (Year 2): Advanced AI capabilities, mobile applications, and strategic acquisitions.

Risk mitigation strategies include diversified revenue streams and agile development methodology.
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
