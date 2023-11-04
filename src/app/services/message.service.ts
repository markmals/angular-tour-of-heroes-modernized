import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
    messages = signal<string[]>([]);

    add(message: string) {
        this.messages.update(messages => [...messages, message]);
    }

    clear() {
        this.messages.set([]);
    }
}
