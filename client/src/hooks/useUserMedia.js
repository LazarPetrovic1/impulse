import { useState, useEffect } from 'react';

function useUserMedia (requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    async function enableStream () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch (err) {
        // Removed for brevity
        console.error(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup () {
        mediaStream.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}

export default useUserMedia;
