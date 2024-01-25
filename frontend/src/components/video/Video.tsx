import { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";

const Video = () => {
    const myFaceRef = useRef<HTMLVideoElement>(null);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [muted, setMuted] = useState(false);
    const [isVideoEnabled, setVideoEnabled] = useState(true);

    useEffect(() => {
        const getMedia = async () => {
            try {
                if (isVideoEnabled) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    });
                    if (myFaceRef.current) {
                        myFaceRef.current.srcObject = stream;
                    }
                    setMyStream(stream);
                } else {
                    if (myStream) {
                        myStream.getTracks().forEach(track => {
                            track.stop();
                        });
                        setMyStream(null);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };

        getMedia();

        return () => {
            if (myStream) {
                myStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, [isVideoEnabled]);

    const handleMuteClick = () => {
        if (myStream) {
            myStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
        }
        setMuted(prevMuted => !prevMuted);
    };

    const handleCameraClick = () => {
        setVideoEnabled(prevVideoEnabled => !prevVideoEnabled);
    };

    return (
        <>
            <video id="myFace" ref={myFaceRef} autoPlay playsInline />
            <button id="mute" onClick={handleMuteClick}>
                {muted ? "Unmute" : "Mute"}
            </button>
            <button id="camera" onClick={handleCameraClick}>
                {isVideoEnabled ? "Turn Camera Off" : "Turn Camera On"}
            </button>
        </>
    );
};

export default Video;
