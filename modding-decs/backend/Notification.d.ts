export type NotificationData = {
    id: string;
    group: string;
    item: string;
    globalTimestampTriggered: number;
    globalTimestampRead: number | undefined;
};
export declare function isNotificationRead(data: NotificationData): boolean;
