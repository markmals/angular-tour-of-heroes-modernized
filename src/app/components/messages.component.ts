import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'app-messages',
    standalone: true,
    template: `
        <div class="flex flex-row">
            <button
                class="ml-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                type="button"
                (click)="messageService.clear()"
            >
                Clear Messages
            </button>
        </div>

        <div class="flow-root">
            <!-- Prevent CLS with a placeholder element: https://web.dev/cls/ -->
            @if (messageService.cleared) {
                <span></span>
            } @else if (!messageService.messages().length) {
                <span
                    class="px-2 py-1 text-sm font-medium"
                    role="status"
                >
                    <svg
                        class="mr-2 h-7 w-7 animate-spin fill-blue-600 text-gray-200"
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 100 101"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </span>
            } @else {
                <ul class="-mb-8" role="list">
                    @for (message of messageService.messages(); track message) {
                        <li>
                            <div class="relative pb-8">
                                <span
                                    class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                ></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span
                                            class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-gray-50"
                                        >
                                            <svg
                                                class="h-5 w-5 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    clip-rule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    fill-rule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">
                                                {{ message }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    }
                </ul>
            }
        </div>
    `,
})
export class MessagesComponent {
    messageService = inject(MessageService);
}
