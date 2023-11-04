import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
    messages = signal<string[]>([]);

    add(message: string) {
        this.messages.update(messages => [...messages, message]);
        this._cleared.set(false);
    }

    private _cleared = signal(false);

    get cleared() {
        return !this.messages().length && this._cleared();
    }

    clear() {
        this.messages.set([]);
        this._cleared.set(true);
    }
}
