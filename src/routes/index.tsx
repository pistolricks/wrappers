import SwiperWrapper from "~/components/wrappers/swiper-wrapper";
import SelectoWrapper from "~/components/wrappers/selecto-wrapper";
import {animate} from "~/components/wrappers/gsap/animation";
import {For} from "solid-js";
import WsWrapper from "~/components/wrappers/ws-wrapper";

export default function Home() {
    return (
        <main class="mx-auto text-center text-gray-700">
            <h1 class="max-6-xs my-16 text-6xl font-thin text-sky-700 border-b border-sky-700">
                Wrappers
            </h1>
            <h2 class="sm:max-6-xs my-16 text-6xl font-thin text-sky-700">
                Selecto
            </h2>
            <SelectoWrapper continueSelect={true}>
                <For each={new Array(100)}>
                    {(_, i) => (
                        <li class="grid size-10 place-items-center rounded-lg border">
                            {i() + 1}
                        </li>
                    )}
                </For>
            </SelectoWrapper>
            <h2 class="sm:max-6-xs my-16 text-6xl font-thin text-sky-700">
                Swiper
            </h2>
            <SwiperWrapper class={"w-screen h-screen sm:w-56 sm:h-56"}>
                <For each={new Array(24)}>
                    {(_, i) => (
                        <div
                            use:animate
                            style={{

                                background: "hsl(0 100% 50%)",
                                display: "flex",
                                "align-items": "center",
                                "justify-content": "center",
                            }}
                            class="swiper-slide">
                            {i() + 1}
                        </div>
                    )}
                </For>
            </SwiperWrapper>

            <WsWrapper id={1} username={"Erik Smith"}/>




        </main>
    );
}
