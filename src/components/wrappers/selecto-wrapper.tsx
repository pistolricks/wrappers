import {onCleanup, onMount, ParentComponent} from "solid-js";
import Selecto from "selecto";


const SelectoWrapper: ParentComponent<{
    selectByClick?: boolean;
    selectFromInside?: boolean;
    continueSelect?: boolean;
    toggleContinueSelect?: "shift" | "ctrl" | "alt";
    hitRate?: number;
}> = props => {
    let ref!: HTMLUListElement;

    const selectByClick = () => props.selectByClick ?? true;
    const selectFromInside = () => props.selectFromInside ?? true;
    const continueSelect = () => props.continueSelect ?? false;
    const toggleContinueSelect = () => props.toggleContinueSelect ?? "shift";
    const hitRate = () => props.hitRate ?? 0;


    onMount(() => {
        const selecto = new Selecto({
            // The container to add a selection element
            container: ref,
            // Selecto's root container (No transformed container. (default: null)
            rootContainer: null,
            // Targets to select. You can register a queryselector or an Element.
            selectableTargets: ["li"],
            // Whether to select by click (default: true)
            selectByClick: selectByClick(),
            // Whether to select from the target inside (default: true)
            selectFromInside: selectFromInside(),
            // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
            continueSelect: continueSelect(),
            // Determines which key to continue selecting the next target via keydown and keyup.
            toggleContinueSelect: toggleContinueSelect(),
            // The container for keydown and keyup events
            keyContainer: window,
            // The rate at which the target overlaps the drag area to be selected. (default: 100)
            hitRate: hitRate(),
        });

        selecto.on("select", e => {
            e.added.forEach(el => {
                el.classList.add("selected");
            });
            e.removed.forEach(el => {
                el.classList.remove("selected");
            });
        });
        onCleanup(() => {
           selecto.destroy();
        })
    })

    return (
        <ul ref={ref} class="flex flex-wrap justify-center gap-5 p-8 cursor-cell">
            {props.children}
        </ul>
    );
};

export default SelectoWrapper;