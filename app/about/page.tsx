export default function AboutPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-foam mb-8">
          <span className="text-iris">~/</span>about
        </h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-text">
            just a <span className="text-rose">20-year-old nerd</span> with too many browser tabs open
            and an unhealthy relationship with vim.
          </p>

          <p className="text-subtle">
            this is where i dump my thoughts—half-baked ideas, debugging journeys,
            and the occasional epiphany that strikes at 3am.
            <span className="text-foam"> what i write here is what makes sense to me</span>,
            which may or may not align with reality. proceed with caution.
          </p>

          <p className="text-subtle">
            i write about code, tech, and whatever else crosses my mind.
            sometimes it's insightful. mostly it's just me trying to sound smart.
          </p>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'About',
  description: 'About me and this blog',
}