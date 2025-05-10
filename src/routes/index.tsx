import SwiperWrapper from "~/components/wrappers/swiper-wrapper";
import SelectoWrapper from "~/components/wrappers/selecto-wrapper";
import {rainbowHover} from "~/components/wrappers/gsap/animation";
import {For} from "solid-js";

export default function Home() {
    return (
        <main class="mx-auto p-4 text-center text-gray-700">
            <h1 class="max-6-xs my-16 text-6xl font-thin text-sky-700 border-b border-sky-700">
                Wrappers
            </h1>
            <h2 class="max-6-xs my-16 text-6xl font-thin text-sky-700">
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
            <h2 class="max-6-xs my-16 text-6xl font-thin text-sky-700">
                Swiper
            </h2>
            <SwiperWrapper>
                <For each={new Array(100)}>
                    {(_, i) => (
                        <div
                            use:rainbowHover
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


            <div

            />

        </main>
    );
}
