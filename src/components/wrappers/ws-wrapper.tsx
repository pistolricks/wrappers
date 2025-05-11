import {createSignal, onMount, ParentComponent} from "solid-js";

const WsWrapper: ParentComponent<{
    id: number;
    username: string;
}> = (props) => {

    let ref!: HTMLDivElement;

    let ws: WebSocket;

    const id = () => props.id;
    const username = () => props.username;

    const [getMessage, setMessage] = createSignal("");

    const connect = () => {
        ws = new WebSocket("ws://localhost:8080/ws");

        ws.onopen = function () {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = function (event) {
            let messageDisplay = ref;
            if (messageDisplay) {
                messageDisplay.innerHTML += `<p>${event.data}</p>`;
            }
        };

        ws.onclose = function () {
            console.log("WebSocket connection closed, retrying...");
            setTimeout(connect, 1000); // Reconnect after 1 second
        };

        ws.onerror = function (error) {
            console.error("WebSocket error:", error);
        };

    }


    const handleMessage = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target) {
            console.log("Event:", target.value);
            setMessage(target.value);
        }
    };

    const handleSend = () => {
        ws.send(`${id()}|${username()}|${getMessage()}`);
        console.log("Sent message:", getMessage());
        setMessage("");
    }


    onMount(() => {
        connect();
    })

    return (
        <div class={"p-4"}>
            <div ref={ref}>
                {props.children}
            </div>
            <div class={"relative"}>
            <div
                class="rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-400">
                <textarea rows={"3"} id="messageInput" onInput={handleMessage} value={getMessage()}
                          placeholder="Enter your message"
                          class="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
            </div>
            <button
                class="absolute bottom-1 right-1 rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-400/80"
                onClick={handleSend}
                type={"button"}>
                Send
            </button>
            </div>
        </div>
    );
};

export default WsWrapper;