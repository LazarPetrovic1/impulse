import React, { useRef, useState, useEffect, useCallback } from 'react'
import Measure from 'react-measure'
import styled, { css, keyframes } from 'styled-components'

function useCardRatio (initialRatio) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio)

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isLandscape = height <= width
      const ratio = isLandscape ? width / height : height / width

      setAspectRatio(ratio)
    }
  }, [])

  return [aspectRatio, calculateRatio]
}

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

function useOffsets (vWidth, vHeight, cWidth, cHeight) {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (vWidth && vHeight && cWidth && cHeight) {
      const x = vWidth > cWidth
        ? Math.round((vWidth - cWidth) / 2)
        : 0

      const y = vHeight > cHeight
        ? Math.round((vHeight - cHeight) / 2)
        : 0

      setOffsets({ x, y })
    }
  }, [vWidth, vHeight, cWidth, cHeight])

  return offsets
}

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
`

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`

export const Video = styled.video`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.6);
  border: 1px solid #ffffff;
  border-radius: 10px;
`

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background-color: #ffffff;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `
    }
  }}
`

export const Button = styled.button`
  width: 75%;
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  background: silver;
`

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' }
}

export function Camera ({ onCapture, onClear }) {
  const canvasRef = useRef()
  const videoRef = useRef()
  // const [imgs, setImgs] = useState(null)

  const [container, setContainer] = useState({ width: 0, height: 0 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true)
  const [isFlashing, setIsFlashing] = useState(false)

  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  const [aspectRatio, calculateRatio] = useCardRatio(1.586)
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  )

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  function handleResize (contentRect) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio)
    })
  }

  function handleCanPlay () {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth)
    setIsVideoPlaying(true)
    videoRef.current.play()
  }

  function handleCapture () {
    const context = canvasRef.current.getContext('2d')

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height
    )

    canvasRef.current.toBlob(blob => onCapture(blob), 'image/jpeg', 1)
    setIsCanvasEmpty(false)
    setIsFlashing(true)
  }

  function handleClear () {
    const context = canvasRef.current.getContext('2d')
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setIsCanvasEmpty(true)
    onClear()
  }

  if (!mediaStream) {
    return null
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            style={{
              height: `${container.height}px`
            }}
          >
            <Video
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`
              }}
            />

            <Overlay hidden={!isVideoPlaying} />

            <Canvas
              ref={canvasRef}
              width={container.width}
              height={container.height}
            />

            <Flash
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>

          {isVideoPlaying && (
            <Button type='button' onClick={isCanvasEmpty ? handleCapture : handleClear}>
              {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
            </Button>
          )}
        </Wrapper>
      )}
    </Measure>
  )
}

export default Camera
