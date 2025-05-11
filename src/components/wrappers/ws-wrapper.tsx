import {createSignal, onMount, createEffect, ParentComponent, createMemo, onCleanup, Component, For, Show} from "solid-js";
import { format } from 'timeago.js';

const WsWrapper: ParentComponent<{
    id: number;
    username: string;
    profileSrc: string;
}> = (props) => {

    let ref!: HTMLDivElement;

    let ws: WebSocket;

    const id = () => props.id;
    const username = () => props.username;
    const profileSrc = () => props.profileSrc;

    const [getMessage, setMessage] = createSignal("");
    const [getMessages, setMessages] = createSignal<string[]>([]);

    const connect = () => {
        ws = new WebSocket("ws://localhost:8080/ws");

        ws.onopen = function () {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = function (event) {
            let data = event.data;
            setMessages([...getMessages(), data]);
            console.log(getMessages())
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
        let time = new Date(Date.now());
        console.log(time)
        ws.send(`${id()}|${username()}|${profileSrc()}|${time.toISOString()}|${getMessage()}`);
        console.log("Sent message:", getMessage());
        setMessage("");
    }

    onMount(() => {
        connect();
    })

    const messages = createMemo<string[]>(() => {
        console.log(getMessages())
        return getMessages()
    })

    return (
        <div class={"p-4"}>
            <div class={"relative max-w-md mx-auto"}>
                <div class={"flex w-full flex-col gap-4 h-full overflow-y-auto p-4"}>
                    <For each={messages()}>
                        {(message: string) => (
                            <Show
                                fallback={<ChatReceived message={message} />}
                                when={message.split("|")[0] === id().toString() && message.split("|")[1] === username()}>
                                <ChatSent message={message} />
                            </Show>
                        )}
                    </For>
                </div>
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

const ChatReceived: Component<{
    message: string;
}> = props => {
    const messageParts = createMemo(() => props.message.split("|"));
    const username = () => messageParts()[1];
    const profileSrc = () => messageParts()[2];
    const date = createMemo(() => new Date(messageParts()[3]));
    const text = () => messageParts()[4];

    const [timeAgo, setTimeAgo] = createSignal(format(date(), 'en_US'));

    createEffect(() => {
        const intervalId = setInterval(() => {
            setTimeAgo(format(date(), 'en_US'));
        }, 60000); // Update every minute

        onCleanup(() => clearInterval(intervalId));
    });

    return (
        <div class="flex items-end gap-2">
            <img class="size-8 rounded-full object-cover" src={profileSrc()} alt="avatar" />
            <div class="mr-auto flex max-w-[70%] flex-col gap-2 rounded-r-radius rounded-tl-radius bg-surface-alt p-4 text-on-surface md:max-w-[60%] dark:bg-surface-dark-alt dark:text-on-surface-dark">
                <span class="font-semibold text-on-surface-strong dark:text-on-surface-dark-strong">{username()}</span>
                <div class="text-sm">
                    {text()}
                </div>
                <span class="ml-auto text-xs">{timeAgo()}</span>
            </div>
        </div>
    );
};

const ChatSent: Component<{
    message: string;
}> = props => {
    const messageParts = createMemo(() => props.message.split("|"));
    const username = () => messageParts()[1];
    // const profileSrc = () => messageParts()[2]; // Not used in ChatSent UI
    const date = createMemo(() => new Date(messageParts()[3]));
    const text = () => messageParts()[4];

    const [timeAgo, setTimeAgo] = createSignal(format(date(), 'en_US'));

    createEffect(() => {
        // Update timeAgo when the date prop changes (e.g. new message)
        setTimeAgo(format(date(), 'en_US'));
        const intervalId = setInterval(() => {
            setTimeAgo(format(date(), 'en_US'));
        }, 60000); // Update every minute

        onCleanup(() => clearInterval(intervalId));
    });

    return (
        <div class="flex items-end gap-2">
            <div class="ml-auto flex max-w-[70%] flex-col gap-2 rounded-l-radius rounded-tr-radius bg-primary p-4 text-sm text-on-primary md:max-w-[60%] dark:bg-primary-dark dark:text-on-primary-dark">
                {text()}
                <span class="ml-auto text-xs">{timeAgo()}</span>
            </div>
            <span class="flex size-8 items-center justify-center overflow-hidden rounded-full border border-outline bg-surface-alt text-sm font-bold tracking-wider text-on-surface dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark">
                {username().substring(0,1).toUpperCase()}
            </span>
        </div>
    );
};