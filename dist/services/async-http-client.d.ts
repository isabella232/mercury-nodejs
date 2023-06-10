import { Composable } from '../models/composable.js';
import { EventEnvelope } from '../models/event-envelope.js';
export declare class AsyncHttpClient implements Composable {
    name: string;
    initialize(): void;
    getName(): string;
    handleEvent(evt: EventEnvelope): Promise<any>;
}
