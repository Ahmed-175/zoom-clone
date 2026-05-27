import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";

interface IUserMeeting {
  user: {
    email: string;
    username: string;
    id: string;
    picture: string;
  };
  stream: MediaStream | null;
  screen: MediaStream | null;
}

const usePeerRTC = (stream: MediaStream, meetingId: string) => {
  const { socket } = useSocket();
  const [stage, setStage] = useState<IUserMeeting | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<
    Record<string, IUserMeeting>
  >({});

  const peersRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  const createPeer = async (
    socketId: string,
    meetingId: string,
  ): Promise<RTCPeerConnection> => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peersRef.current.set(socketId, peer);

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    peer.ontrack = (event) => {
      const remoteStream = event.streams[0];

      setRemoteStreams((prev) => ({
        ...prev,
        [socketId]: remoteStream as any,
      }));
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("ice-candidate", {
          candidate: event.candidate,
          meetingId,
          to: socketId,
        });
      }
    };

    peer.onconnectionstatechange = () => {
      console.log("Peer connection state:", peer.connectionState);
    };

    return peer;
  };

  useEffect(() => {
    if (!socket || !stream) return;

    socket.emit("join-meeting", { meetingId });

    socket.on("user-joined", async ({ socketId }) => {
      try {
        const peer = await createPeer(socketId, meetingId);

        const offer = await peer.createOffer();

        await peer.setLocalDescription(offer);

        socket.emit("offer", {
          offer,
          to: socketId,
          meetingId,
        });
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    });

    socket.on("offer", async ({ offer, from, meetingId }) => {
      try {
        const peer = await createPeer(from, meetingId);

        await peer.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peer.createAnswer();

        await peer.setLocalDescription(answer);

        socket.emit("answer", {
          answer,
          to: from,
          meetingId,
        });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("answer", async ({ answer, from }) => {
      try {
        const peer = peersRef.current.get(from);

        if (!peer) return;

        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      try {
        const peer = peersRef.current.get(from);

        if (!peer || !candidate) return;

        await peer.addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    socket.on("user-left", ({ socketId }) => {
      const peer = peersRef.current.get(socketId);

      if (peer) {
        peer.close();
        peersRef.current.delete(socketId);
      }

      setRemoteStreams((prev) => {
        const copy = { ...prev };

        delete copy[socketId];

        return copy;
      });
    });

    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-left");

      peersRef.current.forEach((peer) => {
        peer.close();
      });

      peersRef.current.clear();
    };
  }, [socket, stream, meetingId]);

  return {
    remoteStreams,
  };
};

export default usePeerRTC;
