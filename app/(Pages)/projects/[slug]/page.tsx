import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { BackgroundWithoutParticles } from "@/app/_LayoutComponents/background"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { projectDetails } from "@/app/_Constants/data"

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
}

type PageProps = {
  params: {
    slug: string
  }
}

const projectDetailsPage = async({ params }: PageProps) => {

    const { slug } = await params

    console.log(slug)

    const project = projectDetails.find(
    (project) => slugify(project.title) === slug
  )

  if (!project) return notFound()

  return (
    <article className="min-h-screen p-5 bg-background text-foreground/85 z-0 relative">

        <BackgroundWithoutParticles/>

        <div className="flex justify-between items-center mb-7">

            <button className="font-mono">
            <Link
            href={'/projects'}
            >
                ← Back
            </Link>
            </button>

            {/* Read More → */}

            <button className="font-mono">
            <Link
            href={'/'}
            >
                Home
            </Link>
            </button>

        </div>

        <div className="grid md:grid-cols-3 mt-2.5">

            <div className="md:col-span-2 p-5 border">
                <div className="p-10 h-full w-full">
                    <Carousel>
                    <CarouselContent>
                        {
                            project.images.map((img, index)=>(
                                <CarouselItem key={index} className="flex justify-center items-center">
                                    <div className="relative w-full h-70">
                                        <Image
                                        src={img}
                                        alt={`image-${index}`}
                                        sizes="400px"
                                        fill
                                        className="object-contain"
                                        priority
                                        />
                                    </div>
                                </CarouselItem>
                            ) )
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    </Carousel>
                </div>
            </div>
            <div className="">
                <div className="border p-2.5">
                    <h5 className="font-mono m-1.5">Name:</h5>
                    <p>{project.title}</p>
                </div>
                <div className="border p-2.5">
                    <h5 className="font-mono m-1.5">Type:</h5>
                    { project.type.map((item, index)=> (
                        <Badge key={index} variant={"outline"} className="mx-1.5">{item}</Badge>
                    )) }
                </div>
                <div className="border p-2.5">
                    <h5 className="font-mono m-1.5">Stack:</h5>
                    { project.stack.map((item, index)=> (
                        <Badge key={index} variant={"outline"} className="mx-1.5">{item}</Badge>
                    )) }
                </div>
                <div className="border p-2.5">
                    <h5 className="font-mono m-1.5">Source Code:</h5>
                    <Link
                    href={`${project.sourceCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline">
                        <p>{project.sourceCode}</p>
                    </Link>
                </div>
                {
                    project.demo ? 
                    (
                    <div className="border p-2.5">
                        <h5 className="font-mono m-1.5">Demo:</h5>
                        <p>{project.demo}</p>
                    </div>
                    ):(
                        <div className="border p-2.5">
                            <h5 className="font-mono m-1.5">Demo:</h5>
                            <p>Not available yet.</p>
                        </div>
                    )
                }
                
            </div>

        </div>

        <div className="mt-3">
            <div className="border p-2.5">
                <h5 className="font-mono m-1.5">Overview:</h5>
                <p >{project.overview}</p>
            </div>
            <div className="border p-2.5">
                <h5 className="font-mono m-1.5">Purpose:</h5>
                <p >{project.purpose}</p>
            </div>
            <div className="border p-2.5">
                <h5 className="font-mono m-1.5">Thought Process:</h5>
                <p >{project.thoughtProcess}</p>
            </div>
            <div className="border p-2.5">
                <h5 className="font-mono m-1.5">Takeaways:</h5>
                <p >{project.takeaways}</p>
            </div>
        </div>

    </article>
  )
}

export default projectDetailsPage