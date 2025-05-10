import {Title} from "@solidjs/meta";
import Counter from "~/components/Counter";
import {css} from "@tokenami/css";
import SelectoWrapper from "~/components/wrappers/selecto-wrapper";
import {For} from "solid-js";

export default function Home() {
    return (
        <main class="mx-auto p-4 text-center text-gray-700">
            <h1 class="max-6-xs my-16 text-6xl font-thin text-sky-700">
                Wrappers
            </h1>
            <SelectoWrapper>
                <For each={new Array(100)}>
                    {(_, i) => (
                        <li class="grid size-10 place-items-center rounded-lg border">
                            {i() + 1}
                        </li>
                    )}
                </For>
            </SelectoWrapper>
        </main>
    );
}
