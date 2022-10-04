import {
    attr,
    FASTElement,
    observable,
    RepeatBehavior,
    RepeatDirective,
    Updates,
    ViewTemplate,
} from "@microsoft/fast-element";
import { Orientation } from "@microsoft/fast-web-utilities";
import { Virtualizing } from "./virtualizing.js";

class _VirtualList extends FASTElement {}
interface _VirtualList extends Virtualizing {}

/**
 * A virtualizing base class for the {@link @microsoft/fast-foundation#(FASTVirtualList:class)} component.
 *
 * @beta
 */
export class VirtualList extends Virtualizing(_VirtualList) {}

/**
 *  The Virtual List class
 *
 * @public
 */
export class FASTVirtualList extends VirtualList {
    /**
     * Whether or not to recycle the html container used to display items.
     * May help performance but containers may retain artifacts from previous use that
     * developers will need to clear.
     *
     * @public
     */
    @attr({ attribute: "recycle", mode: "boolean" })
    public recycle: boolean = false;

    /**
     * The ViewTemplate used in the items repeat loop
     *
     * @public
     */
    @observable
    public itemTemplate: ViewTemplate;
    private itemTemplateChanged(): void {
        if (this.$fastController.isConnected) {
            this.initializeRepeatBehavior();
        }
    }

    /**
     * The ViewTemplate used to render list item contents
     *
     * @public
     */
    public itemContentsTemplate: ViewTemplate;
    protected itemContentsTemplateChanged(): void {
        if (this.$fastController.isConnected) {
            this.initializeRepeatBehavior();
        }
    }

    /**
     * The default ViewTemplate used to render items vertically.
     *
     * @internal
     */
    public defaultVerticalItemTemplate: ViewTemplate;

    /**
     * The default ViewTemplate used to render items horizontally.
     *
     * @internal
     */
    public defaultHorizontalItemTemplate: ViewTemplate;

    // reference to the repeat behavior used to render items
    protected itemsRepeatBehavior: RepeatBehavior | null = null;

    // the placeholder element used by the repeat behavior
    protected itemsPlaceholder: Node;

    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.itemsPlaceholder === undefined) {
            this.itemsPlaceholder = document.createComment("");
            this.appendChild(this.itemsPlaceholder);
        }

        if (!this.itemTemplate) {
            this.itemTemplate =
                this.orientation === Orientation.vertical
                    ? this.defaultVerticalItemTemplate
                    : this.defaultHorizontalItemTemplate;
        }

        Updates.enqueue(() => this.initializeRepeatBehavior());
    }

    /**
     * @internal
     */
    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    /**
     * initialize repeat behavior for render items
     */
    protected initializeRepeatBehavior(): void {
        if (!this.renderItems || !this.itemTemplate) {
            return;
        }

        if (this.itemsRepeatBehavior) {
            this.clearRepeatBehavior();
        }

        const itemsRepeatDirective = new RepeatDirective(
            x => x.renderItems,
            x => x.itemTemplate,
            { positioning: true, recycle: this.recycle }
        );
        this.itemsRepeatBehavior = itemsRepeatDirective.createBehavior({
            [itemsRepeatDirective.nodeId]: this.itemsPlaceholder,
        });

        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        this.$fastController.addBehaviors([this.itemsRepeatBehavior!]);
    }

    protected clearRepeatBehavior(): void {
        if (!this.itemsRepeatBehavior) {
            return;
        }
        this.itemsRepeatBehavior.unbind();
    }
}
