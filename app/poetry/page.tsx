import { FadeIn } from '@/components/ui/fade-in'
import Plum from '@/components/plum'

export default function PoetryPage() {
    return (
        <>
            <Plum />
            <FadeIn>
                <div className="space-y-24 font-serif italic text-lg pr-4 relative z-10">
                    <h1 className="text-3xl font-bold text-foreground mb-8 not-italic font-sans tracking-tight">
                        poetry
                    </h1>

                    <article className="space-y-6">
                        <h2 className="text-2xl font-bold not-italic font-sans text-foreground">Sabel Bloom</h2>
                        <div className="leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            {`i was alone  
noon light sliding in like it was scared to stay  
iron chair biting into me  
three apple slices on the plate  
edges turning rust  
softening into something almost sinful  

and i thought  
that’s your skin  
exactly  
the way it gives itself to air  
the way it darkens  
and still ends up sweeter  

people keep throwing the word beautiful at you  
like it’s enough  
like it could ever hold you  
they never see how you move  
slow  
certain  
like the last chess piece  
that knows it’s already won  

i see though  
i see the small things  
the half-second your lashes drop  
the way your breath catches  
when you think no one’s listening  
the tiny scar on your wrist  
that only shows in certain light  

you’re the moon  
wearing all your own clouds  
and i’m still here  
watching fruit go bad  
just to understand  
how something can rot  
and still be the most gorgeous thing  
in the room  

even if you were less beautiful  
(which you never could be)  
you’d still be  
so much beautiful  
it hurts  
to look  
directly  
at you`}
                        </div>
                        <p className="text-sm font-sans not-italic text-muted mt-4">— Armaan</p>
                    </article>

                    <article className="space-y-6">
                        <h2 className="text-2xl font-bold not-italic font-sans text-foreground">Crimsonapple</h2>
                        <div className="leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            {`nothing ever happens
and i still write to you
on the inside of matchbooks
on the steam of the mirror after showers
on the dark side of my pillow
where no one looks
i keep your name
folded small
in the pocket of a coat
i never wear anymore
it’s soft now
like fabric that’s been washed too many times
like the memory of your mouth
outside, the streetlights hum
the same tired song
and every car that passes
sounds like the one
you never came back in
i light another cigarette
watch the smoke curl
into the shape of your shoulders
it disappears
just like you did
slow
quiet
beautiful
i don’t want loud
i don’t want answers
i just want to stay here
in this room
where the air still tastes like you
breathing nothing
feeling everything
nothing ever happens
but i still wait
like a song on repeat
that forgot how to end
and if you ever walked back in
i wouldn’t even ask why
i’d just let the ash fall
and say your name
once
soft
like a secret
the night already knows`}
                        </div>
                        <p className="text-sm font-sans not-italic text-muted mt-4">— Armaan</p>
                    </article>
                </div>
            </FadeIn>
        </>
    )
}
