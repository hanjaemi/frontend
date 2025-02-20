import { forwardRef } from "react"

export const YoutubeVideo = forwardRef<HTMLIFrameElement, { videoId: string }>(function YoutubeVideo({ videoId }, ref) {
  // Extract video ID from full URL if necessary
  const id = videoId.includes("youtube.com") ? new URL(videoId).searchParams.get("v") : videoId

  return (
    <div className="aspect-video w-full">
      <iframe
        ref={ref}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
})

