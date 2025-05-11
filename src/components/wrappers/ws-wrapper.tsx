import {createSignal, onMount, ParentComponent} from "solid-js";

const WsWrapper: ParentComponent = (props) => {

    let ref!: HTMLDivElement;

    let ws: WebSocket;

    const [getMessage, setMessage] = createSignal("");

    const connect = () => {
        ws = new WebSocket("ws://localhost:8080/ws");

        ws.onopen = function() {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = function(event) {
            let messageDisplay = ref;
            if (messageDisplay) {
                messageDisplay.innerHTML += `<p>${event.data}</p>`;
            }
        };

        ws.onclose = function() {
            console.log("WebSocket connection closed, retrying...");
            setTimeout(connect, 1000); // Reconnect after 1 second
        };

        ws.onerror = function(error) {
            console.error("WebSocket error:", error);
        };

    }


    const handleMessage = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        console.log( "Event:", target.value);
        setMessage(target.value);
      }
    };

    const handleSend = () => {
        ws.send(getMessage());
        setMessage("");
    }


    onMount(() => {
        connect();
    })

    return (
        <>
            <div ref={ref}>
                {props.children}
            </div>
            <input type="text" id="messageInput" onInput={handleMessage} value={getMessage()} placeholder="Enter your message"/>
            <button
                onClick={handleSend}
                type={"button"}>Send</button>
        </>
    );
};

export default WsWrapper;