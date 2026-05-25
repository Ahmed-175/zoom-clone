# Entry point of How Starting Meeting

after the user authenticated and now have valid JWT token and access to the home page, the user click on `Create Meeting` , the frontend send request to `[POST] /meeting/create`.

inside the Nestjs we generate random unique `meetingId` 

``` ts
import {randomUUID} from "crypto"
const meetingId = randomUUID();
```

after generate the `meetingId` we create new meeting inside database using `Prisma` . the meeting created with default meeting configs , then backend return the response to client 

``` json
{
	"meetingId" : "3f2f7d8b-1f0d-4d65-91a4-9a7dc1b4e123"
}
```

inside frontend after receive the `meetingId` , redirect user to `/meeting/${meetingId}`

## Meeting Page Lifecycle 

when user enter meeting page `meeting/:id` the frontend initialize socket connection with backend gateway 

``` ts
const socket = io("http://localhost:8000", {
      auth: {
        token: localStorage.getItem("access_token"),
      },
    });
```

after socket connected succefully , the client extract the `meetingId` from params of the current url 
``` ts
const {id : meetingID} = useParams()
```

then emit event to server : 

``` ts 
socket.emit("join:meeting", {
meetingId , 
})
```

## Join:meeint Flow Inside NestJS

inside websocket gateway: 
```ts 
@SubscribeMessage("join:meeting")  
handleJoinMeeting(  
@MessageBody() data: { meetingId: string },  
@ConnectedSocket() socket: Socket,  
) {  
socket.join(data.meetingId);  
}
```

you can add some configrations here like check the user has access to get into the meeting or the limit the number of users get the meeting or to get permissions from the creator to get into the Meeting. 

here socket joined to specific room using socket.io rooms system , this room represent the meeting itself  , now every user inside the same room can communicate with each other

## Notify Existing Users About New User 

after user joined successfully , server emit event to all users already inside room 

``` ts
socket.to(meetingId).emit("join:user" , {
userId : socket.data.user.id ,
socketId: socket.id
})
```

## Share Media Devices 

now we reached most important part , How users share 
- Camera 
- Mic
- Screen
and how to create `RTCPeerConnection` between users